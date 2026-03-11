// © 2026 Barnefotballtrener.no. All rights reserved.
// sesong-workout.js — Innebygd treningsøkt-editor for Sesong-modulen.
// Full feature-paritet med workout.js via window._woShared.
// Eksporterer window.sesongWorkout = { init, destroy }
//
// Arkitektur: window.sesongWorkout.init(container, players, opts)
//   opts = { ageGroup, theme, title, date, eventId, seasonId,
//            workoutId, blocks, onSave, onBack }
//   onSave(payload) → Promise<{ id }>
//   onBack(finalDbId) → void
//
// Bugfikser inkludert:
//  [1] Singel _swSaveTimer-referanse
//  [2] _swDbId oppdateres etter onSave FØR onBack
//  [5] _swActive = false FØR onBack kalles
//  [7] _swDirty + reschedule-logikk ved concurrent save
//  [8] updateHeader() kalles etter addBlock
//  [9] bindGenererHandlers scoped til container, ikke document

(function () {
  'use strict';

  // ══════════════════════════════════════════════════════════
  // State
  // ══════════════════════════════════════════════════════════
  let _swActive    = false;
  let _swBlocks    = [];
  let _swDbId      = null;     // Supabase workouts.id for UPDATE vs INSERT
  let _swSaving    = false;    // [Bug 7] guard mot concurrent saves
  let _swDirty     = false;    // [Bug 7] uflushed endringer
  let _swSaveTimer = null;     // [Bug 1] singel timer-referanse
  let _swContainer = null;
  let _swPlayers   = [];
  let _swExpandedId = null;    // accordion: kun én blokk expanded om gangen
  let _swCallbacks = { onSave: null, onBack: null };
  let _swMeta      = {
    ageGroup: null, theme: null,
    title: '', date: '',
    eventId: null, seasonId: null,
  };

  // ══════════════════════════════════════════════════════════
  // Helpers — wraps _woShared
  // ══════════════════════════════════════════════════════════
  function sh()    { return window._woShared; }
  function esc(s)  { return sh().escapeHtml(s); }
  function clamp(v, min, max, fb) { return sh().clampInt(v, min, max, fb); }
  function exMeta(key) { return sh().EX_BY_KEY.get(key); }

  function uid() {
    return 'sw_' + Math.random().toString(16).slice(2) + Date.now().toString(16);
  }

  // ──────────────────────────────────────────────────────────
  // Exercise / block factory
  // ──────────────────────────────────────────────────────────
  function makeEx() {
    return { exerciseKey: 'tag', customName: '', minutes: 10,
             groupCount: 1, groupMode: 'even', comment: '' };
  }

  function makeBlock(kind) {
    const id = uid();
    if (kind === 'parallel') {
      return { id, kind: 'parallel',
               a: makeEx(),
               b: { ...makeEx(), exerciseKey: 'keeper', minutes: 12 } };
    }
    return { id, kind: 'single', a: makeEx() };
  }

  function migrateEx(raw) {
    return {
      exerciseKey: raw.exerciseKey || 'tag',
      customName:  String(raw.customName || ''),
      minutes:     clamp(raw.minutes, 0, 300, 10),
      groupCount:  clamp(raw.groupCount, 1, 20, 1),
      groupMode:   raw.groupMode || 'even',
      comment:     String(raw.comment || ''),
    };
  }

  function loadBlocks(raw) {
    if (!Array.isArray(raw) || !raw.length) return [makeBlock('single')];
    return raw.map(b => {
      const id = uid();
      if (b.kind === 'parallel') {
        return { id, kind: 'parallel',
                 a: migrateEx(b.a || {}), b: migrateEx(b.b || {}) };
      }
      return { id, kind: 'single', a: migrateEx(b.a || {}) };
    });
  }

  // ──────────────────────────────────────────────────────────
  // Display
  // ──────────────────────────────────────────────────────────
  function displayName(ex) {
    if (!ex) return '';
    const meta = exMeta(ex.exerciseKey);
    if (ex.exerciseKey === 'custom') return String(ex.customName || '').trim() || 'Egendefinert øvelse';
    if (meta) return meta.label;
    return 'Øvelse';
  }

  function totalMin() {
    let s = 0;
    for (const b of _swBlocks) {
      if (b.kind === 'parallel')
        s += Math.max(clamp(b.a?.minutes, 0, 300, 0), clamp(b.b?.minutes, 0, 300, 0));
      else
        s += clamp(b.a?.minutes, 0, 300, 0);
    }
    return s;
  }

  // ──────────────────────────────────────────────────────────
  // Save payload
  // ──────────────────────────────────────────────────────────
  function buildSavePayload() {
    return {
      dbId:             _swDbId,
      title:            _swMeta.title || '',
      date:             _swMeta.date  || null,
      age_group:        _swMeta.ageGroup  || null,
      theme:            _swMeta.theme     || null,
      event_id:         _swMeta.eventId   || null,
      season_id:        _swMeta.seasonId  || null,
      duration_minutes: totalMin() || null,
      is_template:      false,
      source:           'sesong',
      blocks: _swBlocks.map(b => {
        if (b.kind === 'parallel')
          return { kind: 'parallel', a: { ...b.a }, b: { ...b.b } };
        return { kind: 'single', a: { ...b.a } };
      }),
    };
  }

  // ══════════════════════════════════════════════════════════
  // Auto-save — [Bug 1] singel timer, [Bug 7] dirty + reschedule
  // ══════════════════════════════════════════════════════════
  function scheduleSave() {
    _swDirty = true;
    if (_swSaveTimer) clearTimeout(_swSaveTimer);
    _swSaveTimer = setTimeout(doAutoSave, 1500);
  }

  async function doAutoSave() {
    if (!_swActive) return;
    if (_swSaving) {
      // [Bug 7] Save pågår — reschedule, ikke mist endringene
      _swSaveTimer = setTimeout(doAutoSave, 600);
      return;
    }
    _swDirty   = false;
    _swSaving  = true;
    try {
      const result = await _swCallbacks.onSave(buildSavePayload());
      // [Bug 2] Oppdater _swDbId så neste save blir UPDATE, ikke INSERT
      if (result?.id && !_swDbId) _swDbId = result.id;
    } catch (e) {
      console.warn('[sesong-workout] auto-save feilet:', e?.message || e);
      _swDirty = true; // prøv på nytt ved neste endring
    } finally {
      _swSaving = false;
    }
  }

  // ══════════════════════════════════════════════════════════
  // Render — hoved-layout
  // ══════════════════════════════════════════════════════════
  function render() {
    if (!_swContainer) return;
    _swContainer.innerHTML = buildHTML();
    bindAll();
  }

  function buildHTML() {
    return `
      <div class="sw-root">
        ${buildHeader()}
        <div id="swNffBar">${buildNffBar()}</div>
        ${buildGenPanel()}
        <div id="swBlocks" class="sw-blocks"></div>
        <div class="sw-add-row">
          <button type="button" class="btn-secondary sw-add-btn" id="swAddBtn">
            <i class="fas fa-plus"></i> Legg til øvelse
          </button>
          <button type="button" class="btn-secondary sw-add-btn" id="swAddParBtn">
            <i class="fas fa-code-branch"></i> Parallelt
          </button>
        </div>
        <div class="sw-footer-actions">
          <button type="button" class="btn-primary" id="swSaveManBtn">
            <i class="fas fa-save"></i> Lagre
          </button>
          <button type="button" class="btn-secondary" id="swExportBtn">
            <i class="fas fa-file-pdf"></i> PDF
          </button>
        </div>
      </div>
    `;
  }

  function buildHeader() {
    const ageBadge = _swMeta.ageGroup
      ? `<span class="sw-meta-age">${esc(_swMeta.ageGroup)} år</span>` : '';
    const themeMeta = _swMeta.theme ? sh().NFF_THEME_BY_ID[_swMeta.theme] : null;
    const themePill = themeMeta
      ? `<span class="sw-meta-theme">${esc(themeMeta.icon)} ${esc(themeMeta.label)}</span>` : '';

    return `
      <div class="sw-header">
        <div class="sw-header-top">
          <button type="button" class="sw-back-btn" id="swBackBtn" title="Tilbake">
            <i class="fas fa-arrow-left"></i>
          </button>
          <div class="sw-header-info">
            <div class="sw-header-title">${esc(_swMeta.title || 'Treningsøkt')}</div>
            <div class="sw-header-sub">
              ${_swMeta.date ? esc(_swMeta.date) + ' &middot; ' : ''}<strong id="swTotalMin">${totalMin()}</strong> min
              ${ageBadge}${themePill}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function buildNffBar() {
    const shared = sh();
    const bal = shared.calculateNffBalance(_swBlocks, _swMeta.ageGroup || '8-9');
    if (bal.totalMinutes <= 0) return '';
    const age = _swMeta.ageGroup || '8-9';
    let html = '<div class="wo-meta-balance" style="margin:6px 0 10px;">';
    for (const cat of shared.NFF_CATEGORIES) {
      const b = bal.balance[cat.id];
      if (!b) continue;
      const pct = bal.totalMinutes > 0 ? Math.round((b.minutes / bal.totalMinutes) * 100) : 0;
      const recPct = b.recommendedPct || 0;
      html += `<div class="wo-meta-bal-seg" style="--bal-color:${cat.color};--bal-pct:${pct}%"
        title="${esc(shared.catShort(cat, age))}: ${b.minutes} min (${pct}%) — anbefalt ${recPct}%">
        <div class="wo-meta-bal-fill"></div>
        <span class="wo-meta-bal-label">${esc(shared.catShort(cat, age))}</span>
      </div>`;
    }
    html += '</div>';
    return html;
  }

  function buildGenPanel() {
    const templates = sh().NFF_TEMPLATES[_swMeta.ageGroup || '8-9'] || [];
    if (!templates.length) return '';
    let html = '<div class="sw-gen-wrap">';
    html += '<button type="button" class="btn-secondary sw-gen-toggle" id="swGenToggle">' +
            '📋 Øktmaler</button>';
    html += '<div class="sw-gen-pills" id="swGenPills" style="display:none;flex-wrap:wrap;gap:6px;margin-top:8px;">';
    templates.forEach((tpl, i) => {
      html += `<button type="button" class="wo-gen-pill" data-swTpl="${i}">${esc(tpl.title)}</button>`;
    });
    html += '</div></div>';
    return html;
  }

  // ══════════════════════════════════════════════════════════
  // Block rendering
  // ══════════════════════════════════════════════════════════
  function renderBlocks() {
    const el = document.getElementById('swBlocks');
    if (!el) return;

    if (!_swBlocks.length) {
      el.innerHTML = '<div class="sw-empty" style="padding:20px;text-align:center;color:#888;">' +
                     'Ingen øvelser ennå. Legg til med knappen under.</div>';
      updateHeader(); // [Bug 8]
      return;
    }

    el.innerHTML = _swBlocks.map((b, i) =>
      _swExpandedId === b.id ? renderExpanded(b, i) : renderCollapsed(b, i)
    ).join('');

    // Bind events per block
    for (let i = 0; i < _swBlocks.length; i++) {
      const b = _swBlocks[i];
      if (_swExpandedId === b.id) {
        bindExpanded(b, i);
      } else {
        const card = el.querySelector(`.sw-card[data-bid="${b.id}"]`);
        if (card) {
          card.addEventListener('click', (e) => {
            if (e.target.closest('.sw-mintap')) return;
            _swExpandedId = b.id;
            renderBlocks();
          });
        }
        const minTap = document.getElementById(`sw_${b.id}_mintap`);
        if (minTap) {
          minTap.addEventListener('click', (e) => {
            e.stopPropagation();
            inlineEditMin(b, minTap);
          });
        }
      }
    }

    updateHeader(); // [Bug 8] alltid oppdater header etter render
  }

  // ──────────────────────────────────────────────────────────
  // Collapsed card (bruker workout.js CSS-klasser for konsistens)
  // ──────────────────────────────────────────────────────────
  function renderCollapsed(b, idx) {
    const meta  = exMeta(b.a?.exerciseKey);
    const cat   = meta ? sh().NFF_CATEGORY_BY_ID[meta.nffCategory] : null;
    const color = cat ? cat.color : '#ccc';
    const name  = displayName(b.a);
    const isDrink = b.a?.exerciseKey === 'drink';
    const minutes = b.kind === 'parallel'
      ? Math.max(clamp(b.a?.minutes, 0, 300, 0), clamp(b.b?.minutes, 0, 300, 0))
      : clamp(b.a?.minutes, 0, 300, 0);

    const badges = [];
    if (b.kind === 'parallel')
      badges.push(`<span class="wo-h1-badge wo-h1-badge-par">∥ ${esc(displayName(b.b))}</span>`);
    if ((b.a?.comment || '').trim())
      badges.push('<span class="wo-h1-badge">📝</span>');

    return `<div class="sw-card wo-h1-collapsed" data-bid="${b.id}" style="--h1-color:${color}">
      <div class="wo-h1-stripe"></div>
      <div class="wo-h1-main">
        <div class="wo-h1-name">${isDrink ? '💧 ' : ''}${esc(name)}</div>
        ${badges.length ? `<div class="wo-h1-badges">${badges.join('')}</div>` : ''}
      </div>
      <div class="wo-h1-min sw-mintap" id="sw_${b.id}_mintap">
        ${minutes}<span class="wo-h1-min-unit">min</span>
      </div>
    </div>`;
  }

  // ──────────────────────────────────────────────────────────
  // Expanded card
  // ──────────────────────────────────────────────────────────
  function renderExpanded(b, idx) {
    const meta  = exMeta(b.a?.exerciseKey);
    const cat   = meta ? sh().NFF_CATEGORY_BY_ID[meta.nffCategory] : null;
    const color = cat ? cat.color : '#ccc';
    const isP   = b.kind === 'parallel';

    return `<div class="sw-card wo-h1-expanded" data-bid="${b.id}" style="--h1-color:${color}">
      <div class="wo-h1-stripe"></div>
      <div class="wo-h1-exp-body">
        ${renderEditor(b, 'a')}
        ${isP ? renderEditor(b, 'b') : ''}
        ${isP ? '<div class="small-text" style="opacity:0.75;margin-top:4px;">Parallelt: teller lengste varighet av A/B.</div>' : ''}
        <div class="wo-h1-actions">
          <button class="btn-small" type="button" id="sw_${b.id}_up" title="Flytt opp">↑</button>
          <button class="btn-small" type="button" id="sw_${b.id}_down" title="Flytt ned">↓</button>
          ${!isP ? `<button class="btn-small" type="button" id="sw_${b.id}_mkpar" title="Legg til parallell øvelse">∥ Parallelt</button>` : ''}
          <button class="btn-small btn-danger" type="button" id="sw_${b.id}_del">🗑 Slett</button>
          <button class="btn-small" type="button" id="sw_${b.id}_close">▲ Lukk</button>
        </div>
      </div>
    </div>`;
  }

  // ──────────────────────────────────────────────────────────
  // Exercise editor (bruker _woShared.renderExerciseTrigger)
  // ──────────────────────────────────────────────────────────
  function renderEditor(b, track) {
    const ex   = track === 'a' ? b.a : b.b;
    const idp  = `sw_${b.id}_${track}`;
    const meta = exMeta(ex.exerciseKey);
    const hasInfo = meta && meta.description && meta.steps;
    const showCustom = ex.exerciseKey === 'custom';

    return `<div class="wo-subcard">
      <div class="wo-subheader">
        <div class="wo-subtitle">${track === 'a' ? 'Øvelse' : 'Parallell øvelse'}</div>
      </div>
      <div class="wo-row">
        <div class="wo-field">
          <label class="wo-label">Velg øvelse</label>
          <div class="wo-select-row">
            ${sh().renderExerciseTrigger(b.id, track, ex)}
          </div>
          ${hasInfo ? `<button type="button" id="${idp}_infobtn" class="wo-info-expand" aria-label="Vis øvelsesinfo">
            <span class="wo-info-expand-text"><span class="wo-info-expand-icon">📖</span> Vis beskrivelse og trenertips</span>
            <span class="wo-info-expand-chevron">▼</span>
          </button>` : ''}
        </div>
        <div class="wo-field ${showCustom ? '' : 'wo-hidden'}" id="${idp}_cwrap">
          <label class="wo-label">Navn (manuelt)</label>
          <input id="${idp}_cname" class="input wo-input" type="text"
                 value="${esc(ex.customName || '')}" placeholder="Skriv inn navn">
        </div>
        <div class="wo-field wo-minutes">
          <label class="wo-label">Minutter</label>
          <input id="${idp}_min" class="input wo-input" type="number"
                 min="0" max="300" value="${clamp(ex.minutes, 0, 300, 10)}">
        </div>
      </div>
      <div id="${idp}_infopanel" class="wo-info-panel wo-hidden"></div>
      <div class="wo-row">
        <div class="wo-field">
          <label class="wo-label">Kommentar</label>
          <textarea id="${idp}_comment" class="input wo-input" rows="2">${esc(ex.comment || '')}</textarea>
        </div>
      </div>
    </div>`;
  }

  // ══════════════════════════════════════════════════════════
  // Event binding
  // ══════════════════════════════════════════════════════════
  function bindAll() {
    // [Bug 9] Bruk _swContainer som scope, ikke document
    const c = _swContainer;
    if (!c) return;

    c.querySelector('#swBackBtn')?.addEventListener('click', handleBack);
    c.querySelector('#swAddBtn')?.addEventListener('click', () => addBlock('single'));
    c.querySelector('#swAddParBtn')?.addEventListener('click', () => addBlock('parallel'));
    c.querySelector('#swSaveManBtn')?.addEventListener('click', handleManualSave);
    c.querySelector('#swExportBtn')?.addEventListener('click', exportPdf);

    // Øktmaler-toggle
    const genToggle = c.querySelector('#swGenToggle');
    const genPills  = c.querySelector('#swGenPills');
    if (genToggle && genPills) {
      genToggle.addEventListener('click', () => {
        const open = genPills.style.display !== 'none';
        genPills.style.display = open ? 'none' : 'flex';
      });
      // [Bug 9] Scoped querySelectorAll
      genPills.querySelectorAll('[data-swTpl]').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx  = parseInt(btn.dataset.swTpl, 10);
          const tpls = sh().NFF_TEMPLATES[_swMeta.ageGroup || '8-9'] || [];
          const tpl  = tpls[idx];
          if (tpl) loadTemplate(tpl);
          genPills.style.display = 'none';
        });
      });
    }

    renderBlocks();
  }

  function bindExpanded(b, idx) {
    const $ = id => document.getElementById(id);

    $(`sw_${b.id}_up`)?.addEventListener('click', () => moveBlock(b.id, -1));
    $(`sw_${b.id}_down`)?.addEventListener('click', () => moveBlock(b.id, 1));
    $(`sw_${b.id}_del`)?.addEventListener('click', () => deleteBlock(b.id));
    $(`sw_${b.id}_mkpar`)?.addEventListener('click', () => convertToParallel(b.id));
    $(`sw_${b.id}_close`)?.addEventListener('click', () => {
      _swExpandedId = null;
      renderBlocks();
    });

    bindEditor(b, 'a');
    if (b.kind === 'parallel') bindEditor(b, 'b');
  }

  function bindEditor(b, track) {
    const ex  = track === 'a' ? b.a : b.b;
    const idp = `sw_${b.id}_${track}`;
    const $   = id => document.getElementById(id);

    // Trigger → bottom sheet (via _woShared.openExercisePicker)
    const trigger = $(`wo_${b.id}_${track}_trigger`);
    if (trigger) {
      trigger.addEventListener('click', () => {
        sh().openExercisePicker(
          (newKey) => {
            ex.exerciseKey = newKey;
            ex.customName  = '';
            const m = sh().EX_BY_KEY.get(newKey);
            if (m && clamp(ex.minutes, 0, 300, 0) <= 0) ex.minutes = m.defaultMin ?? 10;
            scheduleSave();
            renderBlocks();
          },
          { ageGroup: _swMeta.ageGroup, blocks: _swBlocks }
        );
      });
    }

    // Custom name
    const cname = $(`${idp}_cname`);
    if (cname) cname.addEventListener('input', () => { ex.customName = cname.value; scheduleSave(); });

    // Minutes
    const min = $(`${idp}_min`);
    if (min) min.addEventListener('input', () => {
      ex.minutes = clamp(min.value, 0, 300, 0);
      updateHeader();
      scheduleSave();
    });

    // Comment
    const comment = $(`${idp}_comment`);
    if (comment) comment.addEventListener('input', () => { ex.comment = comment.value; scheduleSave(); });

    // Custom wrap visibility (when exercise changes to/from 'custom')
    const cwrap = $(`${idp}_cwrap`);
    if (cwrap) {
      const visible = ex.exerciseKey === 'custom';
      cwrap.classList.toggle('wo-hidden', !visible);
    }

    // Info panel toggle (lazy render via _woShared.renderInfoPanel)
    const infoBtn   = $(`${idp}_infobtn`);
    const infoPanel = $(`${idp}_infopanel`);
    if (infoBtn && infoPanel) {
      infoBtn.addEventListener('click', () => {
        const open = !infoPanel.classList.contains('wo-hidden');
        if (open) {
          infoPanel.classList.add('wo-hidden');
          infoBtn.classList.remove('wo-info-expand-active');
        } else {
          if (!infoPanel.dataset.rendered) {
            infoPanel.innerHTML = sh().renderInfoPanel(ex.exerciseKey);
            infoPanel.dataset.rendered = '1';
          }
          infoPanel.classList.remove('wo-hidden');
          infoBtn.classList.add('wo-info-expand-active');
        }
      });
    }
  }

  // ══════════════════════════════════════════════════════════
  // Block operations
  // ══════════════════════════════════════════════════════════
  function addBlock(kind) {
    const b = makeBlock(kind);
    _swBlocks.push(b);
    _swExpandedId = b.id;
    renderBlocks(); // [Bug 8] renderBlocks kaller updateHeader
    scheduleSave();
  }

  function deleteBlock(blockId) {
    if (!confirm('Slette denne øvelsen?')) return;
    _swBlocks = _swBlocks.filter(b => b.id !== blockId);
    if (_swExpandedId === blockId) _swExpandedId = null;
    renderBlocks();
    scheduleSave();
  }

  function moveBlock(blockId, delta) {
    const idx = _swBlocks.findIndex(b => b.id === blockId);
    if (idx === -1) return;
    const next = idx + delta;
    if (next < 0 || next >= _swBlocks.length) return;
    const [b] = _swBlocks.splice(idx, 1);
    _swBlocks.splice(next, 0, b);
    renderBlocks();
    scheduleSave();
  }

  function convertToParallel(blockId) {
    const idx = _swBlocks.findIndex(b => b.id === blockId);
    if (idx === -1) return;
    const b = _swBlocks[idx];
    if (b.kind === 'parallel') return;
    if (!confirm('Legge til en parallell øvelse i samme tidsblokk? (Total tid teller lengste varighet)')) return;
    _swBlocks[idx] = {
      id: b.id, kind: 'parallel',
      a: b.a,
      b: { ...makeEx(), exerciseKey: 'keeper', minutes: 12 },
    };
    renderBlocks();
    scheduleSave();
  }

  // ──────────────────────────────────────────────────────────
  // Inline minutt-redigering (collapsed-modus)
  // ──────────────────────────────────────────────────────────
  function inlineEditMin(b, el) {
    const cur = b.kind === 'parallel'
      ? Math.max(clamp(b.a?.minutes, 0, 300, 0), clamp(b.b?.minutes, 0, 300, 0))
      : clamp(b.a?.minutes, 0, 300, 0);

    const input = document.createElement('input');
    input.type      = 'number';
    input.className = 'wo-h1-min-input';
    input.min = '0'; input.max = '300';
    input.value = String(cur);
    el.textContent = '';
    el.appendChild(input);
    input.focus(); input.select();

    const commit = () => {
      const val = clamp(input.value, 0, 300, cur);
      b.a.minutes = val;
      if (b.kind === 'parallel' && b.b && clamp(b.b.minutes, 0, 300, 0) >= cur)
        b.b.minutes = val;
      renderBlocks();
      scheduleSave();
    };
    input.addEventListener('blur', commit);
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter')  input.blur();
      if (e.key === 'Escape') { input.value = String(cur); input.blur(); }
    });
  }

  // ──────────────────────────────────────────────────────────
  // Load øktmal fra NFF_TEMPLATES
  // ──────────────────────────────────────────────────────────
  function loadTemplate(tpl) {
    _swBlocks = tpl.blocks.map(step => {
      if (step.parallel) {
        const b = makeBlock('parallel');
        b.a.exerciseKey = step.a.key; b.a.minutes = step.a.min;
        b.b.exerciseKey = step.b.key; b.b.minutes = step.b.min;
        return b;
      }
      const b = makeBlock('single');
      b.a.exerciseKey = step.key;
      b.a.minutes     = step.min;
      return b;
    });
    if (tpl.theme) _swMeta.theme = tpl.theme;
    _swExpandedId = null;
    renderBlocks();
    scheduleSave();
    if (window.showNotification)
      window.showNotification((tpl.title || 'Øktmal') + ' lastet inn — juster fritt', 'success');
  }

  // ══════════════════════════════════════════════════════════
  // Header-oppdatering (total tid + NFF-bar)
  // ══════════════════════════════════════════════════════════
  function updateHeader() {
    const tot = document.getElementById('swTotalMin');
    if (tot) tot.textContent = String(totalMin());

    const barEl = document.getElementById('swNffBar');
    if (barEl) barEl.innerHTML = buildNffBar();
  }

  // ══════════════════════════════════════════════════════════
  // Manuell lagring + tilbake-navigasjon
  // ══════════════════════════════════════════════════════════
  async function handleManualSave() {
    if (_swSaveTimer) { clearTimeout(_swSaveTimer); _swSaveTimer = null; }
    await doAutoSave();
    if (window.showNotification)
      window.showNotification('Treningsøkt lagret', 'success');
  }

  async function handleBack() {
    // Flush ventende endringer
    if (_swDirty || _swSaveTimer) {
      if (_swSaveTimer) { clearTimeout(_swSaveTimer); _swSaveTimer = null; }
      if (_swDirty) await doAutoSave();
    }
    // Vent på pågående save (maks 3s)
    let waited = 0;
    while (_swSaving && waited < 3000) {
      await new Promise(r => setTimeout(r, 100));
      waited += 100;
    }
    const finalId = _swDbId;
    // [Bug 5] _swActive = false FØR onBack kalles
    _swActive = false;
    if (_swCallbacks.onBack) _swCallbacks.onBack(finalId);
  }

  // ══════════════════════════════════════════════════════════
  // PDF-eksport (standalone, ikke avhengig av workout.js DOM)
  // ══════════════════════════════════════════════════════════
  function exportPdf() {
    const shared  = sh();
    const title   = _swMeta.title || 'Treningsøkt';
    const date    = _swMeta.date  || '';
    const total   = totalMin();

    let prevCat = null;
    let acc     = 0;

    const blocksHtml = _swBlocks.map((b, i) => {
      const isP  = b.kind === 'parallel';
      const minA = clamp(b.a?.minutes, 0, 300, 0);
      const minB = isP ? clamp(b.b?.minutes, 0, 300, 0) : 0;
      const bMin = isP ? Math.max(minA, minB) : minA;
      acc += bMin;

      const metaA  = shared.EX_BY_KEY.get(b.a?.exerciseKey);
      const curCat = (metaA && metaA.nffCategory !== 'pause') ? metaA.nffCategory : null;
      let secRow   = '';
      if (curCat && curCat !== prevCat) {
        const catObj = shared.NFF_CATEGORY_BY_ID[curCat];
        if (catObj) {
          secRow = `<tr><td colspan="4" style="border-left:4px solid ${catObj.color};` +
                   `padding:5px 10px;font-size:11px;font-weight:800;` +
                   `color:${catObj.color};background:#f9fafb;">` +
                   `${esc(shared.catLabel(catObj, _swMeta.ageGroup))}</td></tr>`;
        }
      }
      if (curCat) prevCat = curCat;

      const nameA  = displayName(b.a);
      const nameB  = isP ? displayName(b.b) : '';
      const commA  = esc(String(b.a?.comment || '').trim());
      const commB  = isP ? esc(String(b.b?.comment || '').trim()) : '';
      const svgA   = metaA?.diagram
        ? `<div style="margin:6px 0 2px;">${shared.renderDrillSVG(metaA.diagram)}</div>` : '';

      if (!isP) {
        return `${secRow}<tr>
          <td style="color:#888;font-weight:800;width:40px;">${i + 1}</td>
          <td>
            <div style="font-weight:900;">${esc(nameA)}</div>
            ${svgA}
            ${commA ? `<div style="color:#666;font-size:12px;margin-top:3px;">${commA}</div>` : ''}
          </td>
          <td style="text-align:right;font-weight:900;width:70px;">${bMin}</td>
          <td style="text-align:right;color:#888;font-size:12px;width:50px;">${acc}'</td>
        </tr>`;
      }

      return `${secRow}<tr>
        <td style="color:#888;font-weight:800;">${i + 1}</td>
        <td>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <div style="border:1px solid #e2e8f0;border-radius:10px;padding:8px;">
              <div style="font-size:11px;color:#888;font-weight:800;margin-bottom:3px;">ØVELSE A</div>
              <div style="font-weight:900;">${esc(nameA)} <span style="color:#888;font-size:12px;">(${minA} min)</span></div>
              ${commA ? `<div style="color:#666;font-size:12px;">${commA}</div>` : ''}
            </div>
            <div style="border:1px solid #e2e8f0;border-radius:10px;padding:8px;">
              <div style="font-size:11px;color:#888;font-weight:800;margin-bottom:3px;">ØVELSE B</div>
              <div style="font-weight:900;">${esc(nameB)} <span style="color:#888;font-size:12px;">(${minB} min)</span></div>
              ${commB ? `<div style="color:#666;font-size:12px;">${commB}</div>` : ''}
            </div>
          </div>
        </td>
        <td style="text-align:right;font-weight:900;">${bMin}</td>
        <td style="text-align:right;color:#888;font-size:12px;">${acc}'</td>
      </tr>`;
    }).join('');

    // NFF-fordelingsbar
    const bal = shared.calculateNffBalance(_swBlocks, _swMeta.ageGroup || '8-9');
    let balHtml = '';
    if (bal.totalMinutes > 0) {
      balHtml = '<div style="margin-top:12px;">' +
                '<div style="font-size:11px;text-transform:uppercase;letter-spacing:.05em;' +
                'color:#888;font-weight:800;margin-bottom:6px;">NFF-fordeling</div>' +
                '<div style="display:flex;gap:4px;height:22px;">';
      for (const cat of shared.NFF_CATEGORIES) {
        const b   = bal.balance[cat.id];
        if (!b || !b.minutes) continue;
        const pct = Math.max(4, Math.round((b.minutes / bal.totalMinutes) * 100));
        balHtml += `<div style="flex:${pct};background:${cat.color}22;border-left:3px solid ${cat.color};` +
                   `border-radius:4px;display:flex;align-items:center;justify-content:center;` +
                   `font-size:9px;font-weight:800;color:${cat.color};">${b.minutes}m</div>`;
      }
      balHtml += '</div></div>';
    }

    // Temabeskrivelse
    const themeMeta = _swMeta.theme ? shared.NFF_THEME_BY_ID[_swMeta.theme] : null;
    const themeHtml = themeMeta
      ? `<div style="margin-top:3px;font-size:13px;opacity:0.9;">Tema: <strong>${esc(themeMeta.label)}</strong></div>` : '';

    const html = `<!doctype html><html lang="nb"><head><meta charset="utf-8">
<title>${esc(title)}</title>
<style>
  body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;background:#f6f8fc;}
  .wrap{max-width:900px;margin:0 auto;padding:16px;}
  .hdr{background:linear-gradient(135deg,#0b5bd3,#19b0ff);color:#fff;border-radius:16px;padding:14px 18px;margin-bottom:10px;}
  .hdr-t{font-size:18px;font-weight:900;line-height:1.2;}
  .hdr-s{font-size:13px;opacity:0.9;margin-top:2px;}
  .card{background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:14px;}
  table{width:100%;border-collapse:collapse;}
  th,td{vertical-align:top;padding:8px 10px;border-bottom:1px solid #e2e8f0;}
  th{font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:#888;}
  tr{page-break-inside:avoid;}
  .actions{margin-top:12px;text-align:center;}
  .btn{border:0;border-radius:10px;padding:10px 16px;font-weight:800;cursor:pointer;margin:4px;}
  .btn-p{background:#0b5bd3;color:#fff;}
  .btn-s{background:#1f2a3d;color:#fff;}
  .footer{text-align:center;margin-top:14px;font-size:11px;color:#888;}
  @media print{
    *{-webkit-print-color-adjust:exact;print-color-adjust:exact;}
    body{background:#fff;}
    .wrap{padding:0;}
    .actions{display:none!important;}
    .hdr,.card{border-radius:0;border-left:0;border-right:0;}
  }
</style></head><body>
<div class="wrap">
  <div class="hdr">
    <div class="hdr-t">${esc(title)}</div>
    <div class="hdr-s">${date ? esc(date) + ' &middot; ' : ''}Total: ${total} min${_swMeta.ageGroup ? ' &middot; ' + esc(_swMeta.ageGroup) + ' år' : ''}</div>
    ${themeHtml}
  </div>
  <div class="card">
    <table>
      <thead><tr>
        <th>#</th><th>Øvelse</th>
        <th style="text-align:right">Min</th>
        <th style="text-align:right">Akk.</th>
      </tr></thead>
      <tbody>${blocksHtml}</tbody>
    </table>
    ${balHtml}
  </div>
  <div style="text-align:center;font-size:1.5rem;font-weight:900;margin-top:14px;">${total} min totalt</div>
  <div class="actions">
    <button class="btn btn-p" onclick="window.print()">Lagre som PDF</button>
    <button class="btn btn-s" onclick="window.close()">Lukk</button>
  </div>
  <div class="footer">Laget med Barnefotballtrener.no</div>
</div></body></html>`;

    const w = window.open('', '_blank');
    if (!w) {
      if (window.showNotification)
        window.showNotification('Popup blokkert. Tillat popups for å eksportere.', 'error');
      return;
    }
    w.document.open(); w.document.write(html); w.document.close();
  }

  // ══════════════════════════════════════════════════════════
  // Public API
  // ══════════════════════════════════════════════════════════

  /**
   * Initialiser den innebygde treningsøkt-editoren.
   * @param {HTMLElement} container  - DOM-element økteeditoren rendres i
   * @param {Array}       players    - spillerliste fra season.js (for evt. fremtidig bruk)
   * @param {Object}      opts
   *   opts.ageGroup   {string|null}
   *   opts.theme      {string|null}
   *   opts.title      {string}
   *   opts.date       {string}  ISO-dato e.g. '2026-04-01'
   *   opts.eventId    {string|null}  Supabase event UUID
   *   opts.seasonId   {string|null}  Supabase season UUID
   *   opts.workoutId  {string|null}  Eksisterende workouts.id (for oppdatering)
   *   opts.blocks     {Array|null}   Eksisterende blokker å laste inn
   *   opts.onSave     {Function}     async (payload) => { id: string }
   *   opts.onBack     {Function}     (finalDbId) => void
   */
  function init(container, players, opts) {
    if (!window._woShared) {
      console.error('[sesong-workout] window._woShared ikke tilgjengelig. Er workout.js lastet?');
      return;
    }

    _swContainer   = container;
    _swPlayers     = players || [];
    _swCallbacks   = {
      onSave: opts.onSave || (async () => null),
      onBack: opts.onBack || (() => {}),
    };
    _swMeta = {
      ageGroup:  opts.ageGroup  || null,
      theme:     opts.theme     || null,
      title:     opts.title     || 'Treningsøkt',
      date:      opts.date      || '',
      eventId:   opts.eventId   || null,
      seasonId:  opts.seasonId  || null,
    };
    _swDbId       = opts.workoutId || null;
    _swBlocks     = opts.blocks ? loadBlocks(opts.blocks) : [makeBlock('single')];
    _swExpandedId = null;
    _swSaving     = false;
    _swDirty      = false;
    if (_swSaveTimer) { clearTimeout(_swSaveTimer); _swSaveTimer = null; }
    _swActive     = true;

    render();
    console.log('[sesong-workout] init — eventId:', _swMeta.eventId, '| dbId:', _swDbId);
  }

  /**
   * Rydder opp og klargjør for GC.
   * Brann-og-glem sluttlagring av uflushed endringer.
   */
  function destroy() {
    // [Bug 5] Sett inaktiv FØR alt annet
    _swActive = false;

    if (_swSaveTimer) { clearTimeout(_swSaveTimer); _swSaveTimer = null; }

    // Brann-og-glem sluttlagring
    if (_swDirty && _swCallbacks.onSave) {
      _swCallbacks.onSave(buildSavePayload())
        .then(r => { if (r?.id && !_swDbId) _swDbId = r.id; })
        .catch(() => {});
    }

    _swContainer = null;
    _swCallbacks = { onSave: null, onBack: null };
    console.log('[sesong-workout] destroy');
  }

  window.sesongWorkout = { init, destroy };

})();
