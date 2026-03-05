// ============================================================
// SPILLERE-FANEN: Modal i stedet for prompt-dialoger
// Tre endringer i core.js — kopier nøyaktig som beskrevet
// ============================================================


// ═══════════════════════════════════════════════════════════════
// ENDRING 1 av 3: CSS-injeksjon
// ═══════════════════════════════════════════════════════════════
//
// PLASSERING: Etter linje 38 (etter safeRemove-funksjonen),
//             FØR kommentaren "// Keys (per bruker hvis innlogget)"
//
// Lim inn MELLOM disse to eksisterende linjene:
//
//   }           ← slutten av safeRemove (linje 38)
//                                              ← tom linje 39
//   // -----    ← "Keys (per bruker..." (linje 40)
//
// ═══════════════════════════════════════════════════════════════

  // Rediger-spiller modal CSS
  (function() {
    var s = document.createElement('style');
    s.textContent =
      '.bf-edit-overlay{position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.5);display:flex;align-items:flex-end;justify-content:center;animation:bfFadeIn .15s ease-out}' +
      '@media(min-width:481px){.bf-edit-overlay{align-items:center}}' +
      '.bf-edit-modal{background:var(--bg-card,#fff);border-radius:16px 16px 0 0;width:100%;max-width:420px;max-height:90dvh;overflow-y:auto;padding:20px;animation:bfSlideUp .2s ease-out}' +
      '@media(min-width:481px){.bf-edit-modal{border-radius:16px}}' +
      '.bf-edit-modal h3{margin:0 0 16px;font-size:17px;font-weight:700;color:var(--text-800,#1e293b)}' +
      '.bf-edit-field{margin-bottom:14px}' +
      '.bf-edit-field label{display:block;margin-bottom:6px;font-weight:600;color:var(--text-700,#334155);font-size:14px}' +
      '.bf-edit-field input[type="text"],.bf-edit-field input[type="number"]{width:100%;padding:11px 14px;border:2px solid var(--border,#e2e8f0);border-radius:10px;font-size:15px;font-family:inherit;background:var(--bg-input,#f8fafc);color:var(--text-800,#1e293b);transition:border-color .2s;box-sizing:border-box}' +
      '.bf-edit-field input:focus{outline:none;border-color:var(--primary,#3b82f6);box-shadow:0 0 0 3px var(--primary-dim,rgba(59,130,246,.15))}' +
      '.bf-edit-toggle-group{display:flex;gap:0;border-radius:10px;overflow:hidden;border:2px solid var(--border,#e2e8f0)}' +
      '.bf-edit-toggle{flex:1;padding:10px;border:none;background:var(--bg-input,#f8fafc);color:var(--text-600,#64748b);font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;transition:background .15s,color .15s}' +
      '.bf-edit-toggle.active{background:var(--primary,#3b82f6);color:#fff}' +
      '.bf-edit-pos-group{display:flex;gap:6px}' +
      '.bf-edit-pos{flex:1;padding:10px;border:2px solid var(--border,#e2e8f0);border-radius:8px;background:var(--bg-input,#f8fafc);color:var(--text-600,#64748b);font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;transition:all .15s;text-align:center}' +
      '.bf-edit-pos.active-F{background:rgba(34,197,94,.12);color:#16a34a;border-color:rgba(34,197,94,.35)}' +
      '.bf-edit-pos.active-M{background:rgba(59,130,246,.12);color:#2563eb;border-color:rgba(59,130,246,.35)}' +
      '.bf-edit-pos.active-A{background:rgba(239,68,68,.12);color:#dc2626;border-color:rgba(239,68,68,.35)}' +
      '.bf-edit-actions{display:flex;gap:8px;margin-top:18px}' +
      '.bf-edit-actions button{flex:1}' +
      '.bf-edit-danger{background:var(--error-dim,#fef2f2);color:var(--error,#ef4444);border:1.5px solid var(--error,#ef4444);border-radius:10px;padding:11px 16px;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;transition:background .15s;width:100%;margin-top:20px}' +
      '.bf-edit-danger:hover{background:var(--error,#ef4444);color:#fff}' +
      '@keyframes bfFadeIn{from{opacity:0}to{opacity:1}}' +
      '@keyframes bfSlideUp{from{transform:translateY(40px);opacity:0}to{transform:translateY(0);opacity:1}}';
    document.head.appendChild(s);
  })();


// ═══════════════════════════════════════════════════════════════
// ENDRING 2 av 3: showEditPlayerModal-funksjonen
// ═══════════════════════════════════════════════════════════════
//
// PLASSERING: Etter linje 1549 (slutten av updateStats()),
//             FØR linje 1551 (function renderPlayerList)
//
// Lim inn MELLOM disse to eksisterende linjene:
//
//   }           ← slutten av updateStats() (linje 1549)
//                                              ← tom linje 1550
//   function renderPlayerList() {              ← linje 1551
//
// ═══════════════════════════════════════════════════════════════

  function showEditPlayerModal(player) {
    var existing = document.getElementById('bfEditPlayerOverlay');
    if (existing) existing.remove();

    var pos = player.positions || ['F', 'M', 'A'];
    var useSkill = state.settings.useSkill;

    var overlay = document.createElement('div');
    overlay.id = 'bfEditPlayerOverlay';
    overlay.className = 'bf-edit-overlay';
    overlay.innerHTML =
      '<div class="bf-edit-modal">' +
        '<h3><i class="fas fa-user-pen" style="margin-right:8px;opacity:0.7"></i>Rediger spiller</h3>' +

        '<div class="bf-edit-field">' +
          '<label for="bfEditName">Navn</label>' +
          '<input type="text" id="bfEditName" value="' + escapeHtml(player.name) + '" maxlength="50" autocomplete="off">' +
        '</div>' +

        '<div class="bf-edit-field">' +
          '<label>Kan st\u00e5 i m\u00e5l?</label>' +
          '<div class="bf-edit-toggle-group" style="max-width:200px">' +
            '<button type="button" class="bf-edit-toggle' + (!player.goalie ? ' active' : '') + '" data-gk="false">Nei</button>' +
            '<button type="button" class="bf-edit-toggle' + (player.goalie ? ' active' : '') + '" data-gk="true">Ja</button>' +
          '</div>' +
        '</div>' +

        (useSkill ?
          '<div class="bf-edit-field">' +
            '<label for="bfEditSkill">Ferdighetsniv\u00e5 (1\u20136)</label>' +
            '<input type="number" id="bfEditSkill" min="1" max="6" value="' + (player.skill || 3) + '" style="max-width:100px">' +
          '</div>' : '') +

        '<div class="bf-edit-field">' +
          '<label>Posisjoner</label>' +
          '<div class="bf-edit-pos-group">' +
            '<button type="button" class="bf-edit-pos' + (pos.indexOf('F') >= 0 ? ' active-F' : '') + '" data-pos="F">Forsvar</button>' +
            '<button type="button" class="bf-edit-pos' + (pos.indexOf('M') >= 0 ? ' active-M' : '') + '" data-pos="M">Midtbane</button>' +
            '<button type="button" class="bf-edit-pos' + (pos.indexOf('A') >= 0 ? ' active-A' : '') + '" data-pos="A">Angrep</button>' +
          '</div>' +
        '</div>' +

        '<div class="bf-edit-actions">' +
          '<button class="btn-secondary" id="bfEditCancel">Avbryt</button>' +
          '<button class="btn-primary" id="bfEditSave"><i class="fas fa-check" style="margin-right:5px"></i>Lagre</button>' +
        '</div>' +

        '<button type="button" class="bf-edit-danger" id="bfEditDelete">' +
          '<i class="fas fa-trash" style="margin-right:6px"></i>Slett spiller' +
        '</button>' +

      '</div>';

    document.body.appendChild(overlay);

    // Lukk ved klikk utenfor
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) closeModal();
    });

    function closeModal() {
      overlay.remove();
      document.removeEventListener('keydown', escHandler);
    }

    // Lukk med Escape-tast
    function escHandler(e) {
      if (e.key === 'Escape') closeModal();
    }
    document.addEventListener('keydown', escHandler);

    // iOS Safari: forhindre body-scroll bak modalen
    overlay.addEventListener('touchmove', function(e) {
      var modal = overlay.querySelector('.bf-edit-modal');
      if (modal && modal.contains(e.target)) return;
      e.preventDefault();
    }, { passive: false });

    // Keeper-toggle
    var gkBtns = overlay.querySelectorAll('.bf-edit-toggle');
    gkBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        gkBtns.forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
      });
    });

    // Posisjons-toggle
    overlay.querySelectorAll('.bf-edit-pos').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var zone = btn.getAttribute('data-pos');
        btn.classList.toggle('active-' + zone);
      });
    });

    // Avbryt
    document.getElementById('bfEditCancel').addEventListener('click', closeModal);

    // Lagre
    document.getElementById('bfEditSave').addEventListener('click', function() {
      var nameInput = document.getElementById('bfEditName');
      var name = (nameInput.value || '').trim();

      if (!name) {
        showNotification('Navn kan ikke v\u00e6re tomt', 'error');
        nameInput.focus();
        return;
      }
      if (name.length > 50) {
        showNotification('Spillernavn m\u00e5 v\u00e6re maks 50 tegn (kun fornavn anbefales)', 'error');
        return;
      }

      if (name.indexOf(' ') !== -1 && player.name.indexOf(' ') === -1) {
        if (!window.confirm(
          '\u26a0\ufe0f PERSONVERN-ADVARSEL:\n\n' +
          'Navnet inneholder mellomrom og kan v\u00e6re et fullt navn.\n\n' +
          'For \u00e5 beskytte barns personvern b\u00f8r du KUN bruke fornavn.\n\n' +
          'Vil du fortsette likevel?'
        )) {
          nameInput.focus();
          return;
        }
      }

      // Les keeper-verdi
      var gkYesBtn = overlay.querySelector('.bf-edit-toggle[data-gk="true"]');
      var goalie = gkYesBtn ? gkYesBtn.classList.contains('active') : false;

      // Les nivå
      var skill = player.skill;
      if (useSkill) {
        var skillInput = document.getElementById('bfEditSkill');
        if (skillInput) {
          var v = Number(skillInput.value);
          if (Number.isFinite(v)) skill = Math.max(1, Math.min(6, Math.round(v)));
        }
      }

      // Les posisjoner
      var positions = [];
      overlay.querySelectorAll('.bf-edit-pos').forEach(function(btn) {
        var zone = btn.getAttribute('data-pos');
        if (btn.classList.contains('active-' + zone)) positions.push(zone);
      });
      if (positions.length === 0) positions = ['F', 'M', 'A'];

      // Oppdater spiller-objektet
      var oldName = player.name;
      player.name = name;
      player.skill = skill;
      player.goalie = goalie;
      player.positions = positions;

      saveState();
      publishPlayers();
      renderAll();
      showNotification('Spiller oppdatert', 'success');

      if (oldName !== name) {
        window.dispatchEvent(new CustomEvent('player:renamed', {
          detail: { playerId: player.id, newName: name, oldName: oldName }
        }));
      }

      closeModal();
    });

    // Slett
    document.getElementById('bfEditDelete').addEventListener('click', function() {
      if (!window.confirm('Slette "' + player.name + '"?')) return;

      state.players = state.players.filter(function(x) { return x.id !== player.id; });
      state.selection.grouping.delete(player.id);

      saveState();
      clearTimeout(_supabaseSaveTimer);
      supabaseDeletePlayer(player.id);
      renderAll();
      publishPlayers();
      showNotification('Spiller slettet', 'info');

      closeModal();
    });

    // Fokuser navn-feltet
    setTimeout(function() {
      var el = document.getElementById('bfEditName');
      if (el) el.focus();
    }, 100);
  }


// ═══════════════════════════════════════════════════════════════
// ENDRING 3 av 3: Oppdater renderPlayerList()
// ═══════════════════════════════════════════════════════════════
//
// Tre sub-endringer inne i renderPlayerList():
//
// ── 3a: Fjern slett-knappen fra kort-HTML (linje 1584) ───────
//
// SLETT denne linjen:
//
//           <button class="icon-btn delete" type="button" title="Slett">🗑️</button>
//
//
// ── 3b: Erstatt editBtn-handleren (linje 1622–1676) ─────────
//
// SLETT alt fra "const editBtn = card.querySelector('button.edit');"
// til og med den avsluttende "});  }" (linje 1676).
//
// ERSTATT MED:
//
// ═══════════════════════════════════════════════════════════════

      const editBtn = card.querySelector('button.edit');
      if (editBtn) {
        editBtn.addEventListener('click', () => {
          showEditPlayerModal(p);
        });
      }

// ═══════════════════════════════════════════════════════════════
//
// ── 3c: Fjern delBtn-handleren (linje 1678–1695) ────────────
//
// SLETT hele denne blokken:
//
//       const delBtn = card.querySelector('button.delete');
//       if (delBtn) {
//         delBtn.addEventListener('click', () => {
//           const ok = window.confirm(`Slette "${p.name}"?`);
//           if (!ok) return;
//           state.players = state.players.filter(x => x.id !== id);
//           // remove from selections
//           state.selection.grouping.delete(id);
//
//           saveState();
//           // Slett direkte fra Supabase (ikke vent på debounce)
//           clearTimeout(_supabaseSaveTimer); // unngå redundant debounce-upsert
//           supabaseDeletePlayer(id);
//           renderAll();
//           publishPlayers();
//           showNotification('Spiller slettet', 'info');
//         });
//       }
//
// (Slett-funksjonalitet ligger nå i modalen.)
//
// ═══════════════════════════════════════════════════════════════
