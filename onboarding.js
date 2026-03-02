// © 2026 Barnefotballtrener.no. All rights reserved.
// onboarding.js — First-time user onboarding wizard (v6)
// ================================================
// 3-step wizard: (1) Team + age class (2) Tips: how to add players (3) Demo substitution plan
// Triggered from core.js after loadPlayersFromSupabase via window.__BF_checkOnboarding().
// Saves via window.__BF_onboarding bridge API exposed by core.js.

(function () {
  'use strict';

  // ══════════════════════════════════════════════════════════════
  //  NFF age rules (self-contained subset)
  // ══════════════════════════════════════════════════════════════
  var NFF_RULES = {
    6:  { format: 3,  minutes: 20, label: '3er, 2\u00d710 min' },
    7:  { format: 3,  minutes: 20, label: '3er, 2\u00d710 min' },
    8:  { format: 5,  minutes: 30, label: '5er, 2\u00d715 min' },
    9:  { format: 5,  minutes: 40, label: '5er, 2\u00d720 min' },
    10: { format: 5,  minutes: 40, label: '5er, 2\u00d720 min' },
    11: { format: 7,  minutes: 50, label: '7er, 2\u00d725 min' },
    12: { format: 9,  minutes: 60, label: '9er, 2\u00d730 min' },
    13: { format: 11, minutes: 60, label: '11er, 2\u00d730 min' }
  };

  var AGE_OPTIONS = [
    'G6','G7','G8','G9','G10','G11','G12','G13',
    'J6','J7','J8','J9','J10','J11','J12','J13'
  ];

  // Example names for the demo plan
  var EXAMPLE_NAMES = [
    'Emma', 'Ola', 'Sofia', 'Liam', 'Nora',
    'Jakob', 'Ingrid', 'Lucas', 'Hedda', 'Oscar',
    'Maja', 'Aksel', 'Thea', 'Noah'
  ];

  // ══════════════════════════════════════════════════════════════
  //  Helpers
  // ══════════════════════════════════════════════════════════════
  function $(id) { return document.getElementById(id); }

  function esc(str) {
    return String(str || '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function safeLS(action, key, val) {
    try {
      if (action === 'get') return localStorage.getItem(key);
      if (action === 'set') localStorage.setItem(key, val);
    } catch (_) { return null; }
  }

  function parseAge(cls) {
    if (!cls) return null;
    var n = parseInt(String(cls).replace(/[^0-9]/g, ''));
    return (n >= 6 && n <= 13) ? n : null;
  }

  function getRule(cls) {
    var age = parseAge(cls);
    return (age && NFF_RULES[age]) ? NFF_RULES[age] : null;
  }

  function detectAgeClass(name) {
    if (!name) return '';
    var match = name.match(/\b([GJgj]\d{1,2})\b/);
    if (!match) return '';
    var cls = match[1].toUpperCase();
    return AGE_OPTIONS.indexOf(cls) !== -1 ? cls : '';
  }

  // ══════════════════════════════════════════════════════════════
  //  Analytics: lightweight funnel tracking
  // ══════════════════════════════════════════════════════════════
  var _events = [];

  function trackEvent(action, extra) {
    var evt = { a: action, t: Date.now() };
    if (extra) evt.d = extra;
    _events.push(evt);
  }

  function flushEvents() {
    if (_events.length === 0) return;
    try {
      if (window._bftCloud && window._bftCloud.save) {
        window._bftCloud.save('onboarding_events', JSON.stringify(_events));
      }
    } catch (_) {}
  }

  // ══════════════════════════════════════════════════════════════
  //  Demo substitution plan (greedy rotation with seeded shuffle)
  // ══════════════════════════════════════════════════════════════
  function seededShuffle(arr, seed) {
    var out = arr.slice();
    var s = 0;
    for (var i = 0; i < seed.length; i++) s = ((s << 5) - s + seed.charCodeAt(i)) | 0;
    for (var j = out.length - 1; j > 0; j--) {
      s = (s * 1103515245 + 12345) & 0x7fffffff;
      var k = s % (j + 1);
      var tmp = out[j]; out[j] = out[k]; out[k] = tmp;
    }
    return out;
  }

  function generateDemoPlan(playerNames, ageClass, teamName) {
    var rule = getRule(ageClass);
    var format = rule ? rule.format : 7;
    var totalMinutes = rule ? rule.minutes : 50;
    var N = playerNames.length;
    var P = Math.min(format, N);
    if (P < 1) return null;

    var benchSize = N - P;
    var numPeriods;
    if (benchSize === 0) numPeriods = 2;
    else if (benchSize <= 2) numPeriods = 3;
    else numPeriods = Math.min(4, Math.max(3, Math.ceil(N / P)));
    var periodLen = Math.round(totalMinutes / numPeriods);

    var shuffled = seededShuffle(
      Array.from({ length: N }, function (_, i) { return i; }),
      teamName || 'lag'
    );
    var minutesPlayed = new Array(N);
    for (var i = 0; i < N; i++) minutesPlayed[i] = 0;
    for (var si = 0; si < shuffled.length; si++) {
      minutesPlayed[shuffled[si]] = si * 0.001;
    }

    var keeperOrder = seededShuffle(
      Array.from({ length: N }, function (_, i) { return i; }),
      (teamName || '') + '_k'
    );
    var keeperCursor = 0;

    var periods = [];
    for (var p = 0; p < numPeriods; p++) {
      var indices = [];
      for (var j = 0; j < N; j++) indices.push(j);
      indices.sort(function (a, b) {
        return minutesPlayed[a] !== minutesPlayed[b]
          ? minutesPlayed[a] - minutesPlayed[b]
          : a - b;
      });

      var onField = indices.slice(0, P);
      var bench = indices.slice(P);

      for (var k = 0; k < onField.length; k++) {
        minutesPlayed[onField[k]] += periodLen;
      }

      var keeperIdx = -1;
      if (format > 3) {
        for (var kc = 0; kc < N; kc++) {
          var candidate = keeperOrder[(keeperCursor + kc) % N];
          if (onField.indexOf(candidate) !== -1) {
            keeperIdx = candidate;
            keeperCursor = (keeperCursor + kc + 1) % N;
            break;
          }
        }
      }

      var prevBenchSet = {};
      if (p > 0) {
        var prev = periods[p - 1].benchIndices;
        for (var b = 0; b < prev.length; b++) prevBenchSet[prev[b]] = true;
      }

      periods.push({
        start: p * periodLen,
        end: Math.min((p + 1) * periodLen, totalMinutes),
        onFieldIndices: onField,
        benchIndices: bench,
        keeperIdx: keeperIdx,
        prevBenchSet: prevBenchSet
      });
    }

    var intMinutes = minutesPlayed.map(function (m) { return Math.round(m); });
    var minVal = Math.min.apply(null, intMinutes);
    var maxVal = Math.max.apply(null, intMinutes);

    return {
      periods: periods,
      minutesPlayed: intMinutes,
      totalMinutes: totalMinutes,
      format: format,
      hasBench: benchSize > 0,
      fairnessDiff: maxVal - minVal,
      minMinutes: minVal,
      maxMinutes: maxVal,
      label: rule ? rule.label : format + 'er'
    };
  }

  // ══════════════════════════════════════════════════════════════
  //  Confetti burst (canvas)
  // ══════════════════════════════════════════════════════════════
  function fireConfetti(originX, originY) {
    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    } catch (_) {}

    var canvas = document.createElement('canvas');
    canvas.className = 'ob-confetti';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    var ctx = canvas.getContext('2d');

    var cx = typeof originX === 'number' ? originX : canvas.width * 0.5;
    var cy = typeof originY === 'number' ? originY : canvas.height * 0.6;

    var colors = ['#2563eb', '#059669', '#d97706', '#ec4899', '#8b5cf6', '#f59e0b'];
    var particles = [];
    for (var i = 0; i < 80; i++) {
      particles.push({
        x: cx + (Math.random() - 0.5) * 60,
        y: cy,
        vx: (Math.random() - 0.5) * 14,
        vy: -Math.random() * 16 - 3,
        size: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 12,
        opacity: 1
      });
    }

    var startTime = performance.now();
    var duration = 1400;

    function frame(now) {
      var elapsed = now - startTime;
      if (elapsed > duration) { canvas.remove(); return; }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var progress = elapsed / duration;

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx;
        p.vy += 0.35;
        p.y += p.vy;
        p.rotation += p.rotSpeed;
        p.opacity = Math.max(0, 1 - progress * 1.2);

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation * Math.PI / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        ctx.restore();
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  // ══════════════════════════════════════════════════════════════
  //  Wizard state
  // ══════════════════════════════════════════════════════════════
  var step = 1;
  var data = {
    teamName: '',
    ageClass: ''
  };
  var overlayEl = null;
  var busy = false;

  // ══════════════════════════════════════════════════════════════
  //  Public API
  // ══════════════════════════════════════════════════════════════

  // Main trigger (called by core.js after player load)
  window.__BF_checkOnboarding = function () {
    if (safeLS('get', 'bf_onboarding_done') === '1') return;

    // If user already has players, silently mark complete
    var players = window.players || [];
    if (players.length > 0) {
      markDone();
      return;
    }

    // Check skip counter: stop nagging after 3 dismissals
    var skips = parseInt(safeLS('get', 'bf_onboarding_skips') || '0', 10);
    if (skips >= 3) {
      markDone();
      return;
    }

    setTimeout(openWizard, 400);
  };

  // Re-entry: can be called from settings or help UI
  window.__BF_resetOnboarding = function () {
    safeLS('set', 'bf_onboarding_done', '0');
    safeLS('set', 'bf_onboarding_skips', '0');
  };

  // Wire up the re-run button in subscription modal (if it exists)
  function wireRerunButton() {
    var btn = document.getElementById('rerunOnboardingBtn');
    if (btn) {
      btn.addEventListener('click', function () {
        window.__BF_resetOnboarding();
        var modal = document.getElementById('subscriptionModal');
        if (modal) modal.classList.add('hidden');
        setTimeout(openWizard, 200);
      });
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wireRerunButton);
  } else {
    wireRerunButton();
  }

  function markDone() {
    safeLS('set', 'bf_onboarding_done', '1');
  }

  // ══════════════════════════════════════════════════════════════
  //  Open / Close
  // ══════════════════════════════════════════════════════════════
  function openWizard() {
    if (overlayEl) return;
    step = 1;
    var existingPlayers = (window.players && window.players.length > 0);
    data = {
      teamName: '',
      ageClass: '',
      isRerun: existingPlayers
    };
    busy = false;
    _events = [];

    overlayEl = document.createElement('div');
    overlayEl.id = 'obOverlay';
    overlayEl.className = 'ob-overlay';
    overlayEl.setAttribute('role', 'dialog');
    overlayEl.setAttribute('aria-modal', 'true');
    overlayEl.setAttribute('aria-labelledby', 'obTitle');
    document.body.appendChild(overlayEl);
    document.body.classList.add('ob-open');
    document.addEventListener('keydown', onEscKey);

    // Backdrop click = soft close
    overlayEl.addEventListener('click', function (e) {
      if (e.target === overlayEl) softClose();
    });

    // iOS: prevent body scroll-through behind modal
    overlayEl.addEventListener('touchmove', function (e) {
      var scrollArea = overlayEl.querySelector('.ob-card-scroll');
      if (scrollArea && scrollArea.contains(e.target)) return;
      // Also allow touch on footer buttons
      var footer = overlayEl.querySelector('.ob-footer');
      if (footer && footer.contains(e.target)) return;
      e.preventDefault();
    }, { passive: false });

    trackEvent('opened');
    renderStep();

    // Focus trap
    overlayEl.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var card = overlayEl.querySelector('.ob-card');
      if (!card) return;
      var focusable = card.querySelectorAll(
        'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first || !card.contains(document.activeElement)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last || !card.contains(document.activeElement)) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  function onEscKey(e) {
    if (e.key === 'Escape') softClose();
  }

  function softClose() {
    if (busy) return;
    trackEvent('skipped', { step: step });
    flushEvents();

    var skips = parseInt(safeLS('get', 'bf_onboarding_skips') || '0', 10);
    skips++;
    safeLS('set', 'bf_onboarding_skips', String(skips));
    if (skips >= 3) markDone();

    teardown();
  }

  function completeClose(callback) {
    trackEvent('completed', {
      ageClass: data.ageClass
    });
    flushEvents();

    markDone();

    try {
      if (window._bftCloud && window._bftCloud.save) {
        window._bftCloud.save('onboarding', JSON.stringify({
          completed: true,
          ageClass: data.ageClass || null,
          ts: new Date().toISOString()
        }));
      }
    } catch (_) {}

    teardown(callback);
  }

  function teardown(callback) {
    if (!overlayEl) return;
    document.removeEventListener('keydown', onEscKey);

    overlayEl.classList.add('ob-closing');
    setTimeout(function () {
      if (overlayEl && overlayEl.parentNode) {
        overlayEl.parentNode.removeChild(overlayEl);
      }
      overlayEl = null;
      document.body.classList.remove('ob-open');
      if (typeof callback === 'function') setTimeout(callback, 60);
    }, 260);
  }

  // ══════════════════════════════════════════════════════════════
  //  Shared UI helpers
  // ══════════════════════════════════════════════════════════════
  function progressHTML(active) {
    var dots = '';
    for (var i = 1; i <= 3; i++) {
      var cls = i < active ? 'ob-dot done' : i === active ? 'ob-dot active' : 'ob-dot';
      dots += '<div class="' + cls + '"></div>';
    }
    return '<div class="ob-progress">' + dots +
      '<span class="ob-step-count">Steg ' + active + ' av 3</span></div>';
  }

  // ══════════════════════════════════════════════════════════════
  //  Step router
  // ══════════════════════════════════════════════════════════════
  function renderStep() {
    if (!overlayEl) return;
    if (step === 1) renderStep1();
    else if (step === 2) renderStep2();
    else if (step === 3) renderStep3();

    var scrollArea = overlayEl.querySelector('.ob-card-scroll');
    if (scrollArea) scrollArea.scrollTop = 0;
  }

  // ══════════════════════════════════════════════════════════════
  //  STEP 1: Team name + age class (both required)
  // ══════════════════════════════════════════════════════════════
  function renderStep1() {
    var gutterOpts = AGE_OPTIONS.slice(0, 8).map(function (c) {
      return '<option value="' + c + '"' + (data.ageClass === c ? ' selected' : '') + '>' + c + '</option>';
    }).join('');
    var jenteOpts = AGE_OPTIONS.slice(8).map(function (c) {
      return '<option value="' + c + '"' + (data.ageClass === c ? ' selected' : '') + '>' + c + '</option>';
    }).join('');

    var currentTeamName = '';
    if (data.isRerun) {
      try {
        var bridge = window.__BF_onboarding;
        if (bridge && bridge.getCurrentTeamName) currentTeamName = bridge.getCurrentTeamName();
      } catch (_) {}
    }

    var titleText = data.isRerun ? 'Oppdater aldersklasse' : 'Velkommen!';
    var subtitleText = data.isRerun
      ? 'Velg riktig aldersklasse for ' + esc(currentTeamName || 'laget ditt') + ', s\u00e5 justerer vi kampdag-innstillingene.'
      : 'Fortell oss litt om laget ditt, s\u00e5 setter vi opp alt for deg.';

    var teamNameField = data.isRerun
      ? ''
      : '<div class="ob-field">' +
          '<label class="ob-label" for="obTeamName">Hva heter laget?</label>' +
          '<input type="text" id="obTeamName" class="ob-input" placeholder="F.eks. Steinkjer G10" maxlength="40" value="' + esc(data.teamName) + '" autocomplete="off">' +
        '</div>';

    overlayEl.innerHTML =
      '<div class="ob-card">' +
        '<div class="ob-card-scroll">' +
          progressHTML(1) +
          '<div class="ob-header">' +
            '<div class="ob-emoji">\u26BD</div>' +
            '<h2 class="ob-title" id="obTitle">' + titleText + '</h2>' +
            '<p class="ob-subtitle">' + subtitleText + '</p>' +
          '</div>' +
          '<div class="ob-body"><div class="ob-step-inner">' +
            teamNameField +
            '<div class="ob-field">' +
              '<label class="ob-label" for="obAgeClass">Aldersklasse</label>' +
              '<select id="obAgeClass" class="ob-select">' +
                '<option value="">Velg aldersklasse</option>' +
                '<optgroup label="Gutter">' + gutterOpts + '</optgroup>' +
                '<optgroup label="Jenter">' + jenteOpts + '</optgroup>' +
              '</select>' +
              '<div id="obFormatHint" class="ob-format-hint"></div>' +
            '</div>' +
          '</div></div>' +
        '</div>' +
        '<div class="ob-footer">' +
          '<button type="button" class="ob-btn ob-btn-skip" id="obSkip">Ikke n\u00e5</button>' +
          '<button type="button" class="ob-btn ob-btn-primary" id="obNext">Neste \u2192</button>' +
        '</div>' +
      '</div>';

    var nameInput = $('obTeamName');
    var select = $('obAgeClass');
    var hint = $('obFormatHint');

    setTimeout(function () {
      if (nameInput) nameInput.focus();
      else if (select) select.focus();
    }, 180);

    function updateHint() {
      var rule = getRule(select ? select.value : '');
      if (rule && hint) {
        hint.textContent = '\u2192 ' + rule.label;
        hint.classList.add('visible');
      } else if (hint) {
        hint.classList.remove('visible');
      }
    }
    if (select) {
      select.addEventListener('change', function () {
        select._userChanged = true;
        select.classList.remove('ob-error');
        updateHint();
      });
      updateHint();
    }

    if (nameInput) {
      nameInput.addEventListener('input', function () {
        nameInput.classList.remove('ob-error');
        if (select && !select._userChanged) {
          var detected = detectAgeClass(nameInput.value);
          if (detected && select.value !== detected) {
            select.value = detected;
            select.classList.remove('ob-error');
            updateHint();
          }
        }
      });
      nameInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { e.preventDefault(); $('obNext').click(); }
      });
    }

    $('obSkip').addEventListener('click', function () { softClose(); });

    $('obNext').addEventListener('click', function () {
      var name = (nameInput ? nameInput.value : '').trim();
      var age = select ? select.value : '';
      var valid = true;

      if (!data.isRerun && !name) {
        if (nameInput) nameInput.classList.add('ob-error');
        if (valid && nameInput) nameInput.focus();
        valid = false;
      }
      if (!age) {
        select.classList.add('ob-error');
        if (valid) select.focus();
        valid = false;
      }
      if (!valid) return;

      data.teamName = name;
      data.ageClass = age;
      trackEvent('step1', { ageClass: age, isRerun: !!data.isRerun });
      step = data.isRerun ? 3 : 2;
      renderStep();
    });
  }

  // ══════════════════════════════════════════════════════════════
  //  STEP 2: Tips — how to add players (guidance, not data entry)
  // ══════════════════════════════════════════════════════════════
  function renderStep2() {
    overlayEl.innerHTML =
      '<div class="ob-card">' +
        '<div class="ob-card-scroll">' +
          progressHTML(2) +
          '<div class="ob-header">' +
            '<div class="ob-emoji">\uD83D\uDCCB</div>' +
            '<h2 class="ob-title" id="obTitle">Slik legger du til spillere</h2>' +
            '<p class="ob-subtitle">N\u00e5r wizarden er ferdig, g\u00e5r du til <strong>Spillere</strong>-fanen for \u00e5 legge inn troppen.</p>' +
          '</div>' +
          '<div class="ob-body"><div class="ob-step-inner">' +

            '<div class="ob-tip-card">' +
              '<div class="ob-tip-icon">\u2B50</div>' +
              '<div class="ob-tip-content">' +
                '<div class="ob-tip-title">Sett ferdighetsniv\u00e5 p\u00e5 hver spiller</div>' +
                '<div class="ob-tip-text">Gi hver spiller et niv\u00e5 fra 1\u20136. Dette brukes til \u00e5 lage jevne treningsgrupper og rettferdige lag n\u00e5r dere deler opp.</div>' +
              '</div>' +
            '</div>' +

            '<div class="ob-tip-card">' +
              '<div class="ob-tip-icon">\uD83E\uDDE4</div>' +
              '<div class="ob-tip-content">' +
                '<div class="ob-tip-title">Marker hvem som kan st\u00e5 i m\u00e5l</div>' +
                '<div class="ob-tip-text">Bytteplanen roterer keeper automatisk mellom de som er markert som m\u00e5lvakt.</div>' +
              '</div>' +
            '</div>' +

            '<div class="ob-tip-card">' +
              '<div class="ob-tip-icon">\uD83D\uDD12</div>' +
              '<div class="ob-tip-content">' +
                '<div class="ob-tip-title">Bruk kun fornavn</div>' +
                '<div class="ob-tip-text">For barnas personvern anbefaler vi kun fornavn. Etternavn er ikke n\u00f8dvendig.</div>' +
              '</div>' +
            '</div>' +

            '<div class="ob-tip-card">' +
              '<div class="ob-tip-icon">\uD83D\uDCE5</div>' +
              '<div class="ob-tip-content">' +
                '<div class="ob-tip-title">Importer fra fil</div>' +
                '<div class="ob-tip-text">Har du spillerliste i en annen app? Du kan importere fra JSON-fil, eller legge dem til \u00e9n og \u00e9n.</div>' +
              '</div>' +
            '</div>' +

          '</div></div>' +
        '</div>' +
        '<div class="ob-footer">' +
          '<button type="button" class="ob-btn ob-btn-back" id="obBack">\u2190 Tilbake</button>' +
          '<button type="button" class="ob-btn ob-btn-primary" id="obNext">Se demo \u2192</button>' +
        '</div>' +
      '</div>';

    $('obBack').addEventListener('click', function () {
      step = 1;
      renderStep();
    });

    $('obNext').addEventListener('click', function () {
      trackEvent('step2_tips');
      step = 3;
      renderStep();
    });
  }

  // ══════════════════════════════════════════════════════════════
  //  STEP 3: Demo substitution plan (always example players)
  // ══════════════════════════════════════════════════════════════
  function renderStep3() {
    var demoNames;
    if (data.isRerun) {
      var existing = window.players || [];
      demoNames = existing.map(function (p) { return p.name; });
      if (demoNames.length === 0) {
        var ruleR = getRule(data.ageClass);
        demoNames = EXAMPLE_NAMES.slice(0, ruleR ? ruleR.format + 3 : 10);
      }
    } else {
      var ruleN = getRule(data.ageClass);
      var count = ruleN ? Math.min(ruleN.format + 3, EXAMPLE_NAMES.length) : EXAMPLE_NAMES.length;
      demoNames = EXAMPLE_NAMES.slice(0, count);
    }

    var plan = generateDemoPlan(demoNames, data.ageClass, data.teamName || 'lag');
    if (!plan) { step = 2; renderStep(); return; }

    var names = demoNames;

    // Build period cards
    var periodsHtml = '';
    for (var pi = 0; pi < plan.periods.length; pi++) {
      var per = plan.periods[pi];

      var fieldChips = '';
      for (var fi = 0; fi < per.onFieldIndices.length; fi++) {
        var idx = per.onFieldIndices[fi];
        var name = names[idx];
        var delay = 'style="animation-delay:' + (fi * 30) + 'ms"';
        if (idx === per.keeperIdx) {
          fieldChips += '<span class="ob-chip ob-chip-keeper" ' + delay + '>\uD83E\uDDE4 ' + esc(name) + '</span>';
        } else if (pi > 0 && per.prevBenchSet[idx]) {
          fieldChips += '<span class="ob-chip ob-chip-swapin" ' + delay + '>\u2191 ' + esc(name) + '</span>';
        } else {
          fieldChips += '<span class="ob-chip ob-chip-field" ' + delay + '>' + esc(name) + '</span>';
        }
      }

      var benchHtml = '';
      if (per.benchIndices.length > 0) {
        var benchChips = '';
        for (var bi = 0; bi < per.benchIndices.length; bi++) {
          benchChips += '<span class="ob-chip ob-chip-bench">' + esc(names[per.benchIndices[bi]]) + '</span>';
        }
        benchHtml = '<div class="ob-bench-label">Benk:</div><div class="ob-chips">' + benchChips + '</div>';
      }

      periodsHtml +=
        '<div class="ob-period">' +
          '<div class="ob-period-label">Minutt ' + per.start + '\u2013' + per.end +
            (per.benchIndices.length > 0 ? ' \u00B7 ' + per.onFieldIndices.length + ' p\u00e5 banen' : '') +
          '</div>' +
          '<div class="ob-chips">' + fieldChips + '</div>' +
          benchHtml +
        '</div>';
    }

    // Minutes bars
    var maxMin = 0;
    for (var m = 0; m < plan.minutesPlayed.length; m++) {
      if (plan.minutesPlayed[m] > maxMin) maxMin = plan.minutesPlayed[m];
    }
    var sorted = names.map(function (name, i) {
      return { name: name, minutes: plan.minutesPlayed[i] };
    }).sort(function (a, b) { return b.minutes - a.minutes; });

    var barsHtml = '';
    for (var si = 0; si < sorted.length; si++) {
      var pct = maxMin > 0 ? Math.round((sorted[si].minutes / maxMin) * 100) : 0;
      barsHtml +=
        '<div class="ob-bar-row">' +
          '<div class="ob-bar-name">' + esc(sorted[si].name) + '</div>' +
          '<div class="ob-bar-track"><div class="ob-bar-fill" data-pct="' + pct + '"></div></div>' +
          '<div class="ob-bar-val">' + sorted[si].minutes + ' min</div>' +
        '</div>';
    }

    // Legend
    var legendHtml = '';
    if (plan.hasBench) {
      var keeperLegend = plan.format > 3
        ? '<div class="ob-legend-item"><span class="ob-legend-dot lg-keeper"></span>Keeper</div>'
        : '';
      legendHtml =
        '<div class="ob-legend">' +
          '<div class="ob-legend-item"><span class="ob-legend-dot lg-field"></span>P\u00e5 banen</div>' +
          '<div class="ob-legend-item"><span class="ob-legend-dot lg-swapin"></span>Byttet inn</div>' +
          keeperLegend +
          '<div class="ob-legend-item"><span class="ob-legend-dot lg-bench"></span>Benk</div>' +
        '</div>';
    }

    // Fairness footer
    var fairnessText;
    if (plan.fairnessDiff === 0) {
      fairnessText = '\u2705 Perfekt! Alle f\u00e5r ' + plan.minMinutes + ' min spilletid';
    } else {
      fairnessText = '\u2705 Jevn spilletid: ' + plan.minMinutes + '\u2013' + plan.maxMinutes + ' min per spiller';
    }

    // Example notice (always shown for first-run)
    var exampleNotice = '';
    if (!data.isRerun) {
      exampleNotice =
        '<div class="ob-example-notice">' +
          '\uD83D\uDCA1 Dette er eksempelspillere. Legg til dine egne i <strong>Spillere</strong>-fanen etterp\u00e5.' +
        '</div>';
    }

    var subtitleText = 'Automatisk bytteplan for ' + esc(data.teamName || 'laget') + ' (' + plan.label + ')';

    overlayEl.innerHTML =
      '<div class="ob-card">' +
        '<div class="ob-card-scroll">' +
          progressHTML(3) +
          '<div class="ob-header">' +
            '<div class="ob-emoji">\u2728</div>' +
            '<h2 class="ob-title" id="obTitle">Slik fungerer det!</h2>' +
            '<p class="ob-subtitle">' + subtitleText + '</p>' +
          '</div>' +
          '<div class="ob-body ob-body-step3"><div class="ob-step-inner">' +
            exampleNotice +
            '<div class="ob-demo-wrap">' +
              '<div class="ob-demo-header">\u26BD Bytteplan \u00B7 ' + plan.format + 'er \u00B7 ' + plan.totalMinutes + ' min</div>' +
              periodsHtml +
              '<div class="ob-demo-footer">' + fairnessText + '</div>' +
            '</div>' +
            legendHtml +
            '<div class="ob-bars-section">' +
              '<div class="ob-label" style="margin:16px 0 8px;">Spilletid per spiller</div>' +
              barsHtml +
            '</div>' +
          '</div></div>' +
        '</div>' +
        '<div class="ob-footer">' +
          '<button type="button" class="ob-btn ob-btn-back" id="obBack">\u2190 Tilbake</button>' +
          '<button type="button" class="ob-btn ob-btn-primary" id="obFinish">\uD83D\uDE80 Start appen</button>' +
        '</div>' +
      '</div>';

    // Animate bars
    setTimeout(function () {
      var fills = overlayEl ? overlayEl.querySelectorAll('.ob-bar-fill') : [];
      for (var f = 0; f < fills.length; f++) {
        (function (el, delay) {
          setTimeout(function () { el.style.width = el.getAttribute('data-pct') + '%'; }, delay);
        })(fills[f], f * 40);
      }
    }, 120);

    $('obBack').addEventListener('click', function () {
      step = data.isRerun ? 1 : 2;
      renderStep();
    });

    $('obFinish').addEventListener('click', async function () {
      if (busy) return;
      busy = true;
      var btn = $('obFinish');
      if (!btn) return;
      btn.disabled = true;
      btn.innerHTML = '<span class="ob-spinner"></span>Setter opp\u2026';

      try {
        await withTimeout(applyWizardData(), 12000);

        try {
          var rect = btn.getBoundingClientRect();
          fireConfetti(rect.left + rect.width / 2, rect.top);
        } catch (_) {}

        var msg;
        if (data.isRerun) {
          msg = 'Aldersklasse oppdatert til ' + data.ageClass + '! Kampdag-innstillinger er justert.';
        } else {
          msg = data.teamName + ' er opprettet! G\u00e5 til Spillere for \u00e5 legge til troppen din.';
        }

        completeClose(function () {
          if (data.isRerun && typeof window.__BF_switchTab === 'function') {
            window.__BF_switchTab('kampdag');

            var rule = getRule(data.ageClass);
            if (rule) {
              var fmtEl = document.getElementById('kdFormat');
              var minEl = document.getElementById('kdMinutes');
              if (fmtEl) {
                fmtEl.value = String(rule.format);
                fmtEl.dispatchEvent(new Event('change', { bubbles: true }));
              }
              if (minEl) {
                minEl.value = String(rule.minutes);
                minEl.dispatchEvent(new Event('input', { bubbles: true }));
              }
            }
          }
          if (typeof window.showNotification === 'function') {
            window.showNotification(msg, 'success');
          }
        });
      } catch (e) {
        console.error('[onboarding] Apply failed:', e);
        busy = false;
        btn.disabled = false;
        btn.innerHTML = '\uD83D\uDE80 Start appen';

        var errMsg = (e && e.message === 'timeout')
          ? 'Nettverket er tregt. Pr\u00f8v igjen.'
          : 'Noe gikk galt. Pr\u00f8v igjen.';
        if (typeof window.showNotification === 'function') {
          window.showNotification(errMsg, 'error');
        }
      }
    });
  }

  // ══════════════════════════════════════════════════════════════
  //  Timeout wrapper
  // ══════════════════════════════════════════════════════════════
  function withTimeout(promise, ms) {
    return Promise.race([
      promise,
      new Promise(function (_, reject) {
        setTimeout(function () { reject(new Error('timeout')); }, ms);
      })
    ]);
  }

  // ══════════════════════════════════════════════════════════════
  //  Apply wizard data via core.js bridge
  // ══════════════════════════════════════════════════════════════
  var _applyGen = 0;

  async function applyWizardData() {
    var gen = ++_applyGen;
    var bridge = window.__BF_onboarding;
    if (!bridge) throw new Error('Bridge API not available');

    if (!data.isRerun) {
      // 1. Rename team
      if (data.teamName) {
        await bridge.renameCurrentTeam(data.teamName);
      }
      if (gen !== _applyGen) return;
      // No bulk player add — user adds players via Spillere tab with proper skill levels
    }

    // 2. Store age class for kampdag/season defaults
    if (data.ageClass) {
      safeLS('set', 'bf_ob_ageclass', data.ageClass);
      try {
        if (window._bftCloud && window._bftCloud.save) {
          window._bftCloud.save('age_class', JSON.stringify({ value: data.ageClass }));
        }
      } catch (_) {}
    }
  }

})();
