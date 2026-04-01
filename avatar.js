// avatar.js — Avatar system for Barnefotballtrener
// Standalone IIFE. Exposes window.Avatar.
(function() {
  'use strict';

  var AVATAR_PATH = '/avatars/';
  var AVATAR_COUNT = 496;
  var PICKER_ID = 'avatarPickerModal';

  // =====================================================
  // METADATA: 496 avatars, 3-char code per avatar
  // Char 1: J=Jente, G=Gutt
  // Char 2: A=6-10, B=11-14, C=15-16
  // Char 3: L=Blondt, B=Brunt, S=Svart, R=Rødt, H=Hijab
  // Index 0 = avatar-001, index 495 = avatar-496
  // =====================================================
  var _META = (
    // 1-10          11-20          21-30          31-40          41-50
    'JAL,JAB,JAR,JAB,JAS,JAS,JAS,JAS,JAL,JAB,' +
    'JAB,JAR,JAS,JAS,JAL,JAB,JAL,JAB,JAS,JAR,' +
    'GAL,GAB,GAR,GAB,GAS,GAS,GAS,GAS,GAL,GAB,' +
    'GAB,GAR,GAS,GAS,GAL,GAB,GAB,GAB,GAS,GAR,' +
    'JBL,JBB,JBS,JBS,JBR,JBB,JBL,JBS,JBS,JBR,' +
    // 51-60         61-70          71-80          81-90          91-100
    'JBB,JBB,JBS,JBL,JBS,JBB,GBL,GBB,GBS,GBS,' +
    'GBR,GBB,GBB,GBS,GBS,GBB,GBB,GBS,GBL,GBS,' +
    'GBB,GBB,JAS,GBB,JAS,GAS,JBL,GAB,JBS,GAB,' +
    'GAL,JBB,JAS,GBR,JAB,GBS,JBR,GAS,JAB,GBB,' +
    'GAS,JBS,GAR,JBB,GBB,JAL,GAS,JBB,JAS,GBB,' +
    // 101-110       111-120        121-130        131-140        141-150
    'JAL,JAL,JAL,JAL,JBL,JBL,JBL,JAL,GAL,GAL,' +
    'GAL,GAL,GBL,GBL,GBL,GBL,JAS,GAS,JAS,GBS,' +
    'JAS,GBS,JBS,GAS,JAS,GBS,JAB,GBS,JAB,JAS,' +
    'JBB,JAS,GAB,GAS,GBB,GBS,JAB,JAS,JBB,JAB,' +
    'GAS,GAB,GBB,GBS,JAB,GAS,JBS,GAB,JAS,JAS,' +
    // 151-160       161-170        171-180        181-190        191-200
    'JAS,JBS,GAS,GAS,GBS,GBS,JAB,GAB,JAB,GAB,' +
    'JBB,GBB,JBB,GBB,JAB,GAB,JAB,GAB,JBB,GBB,' +
    'JBS,GBB,JAL,JAB,JBS,JAR,GAL,GAB,GBB,GAL,' +
    'JAL,GAB,JAS,GAS,JAB,GAR,GAS,JAB,JBL,GBS,' +
    'JBS,GBB,JBB,GBS,JBR,GBL,JCL,JCB,JCS,JCR,' +
    // 201-210       211-220        221-230        231-240        241-250
    'JCB,JCB,JCS,JCS,GCL,GCB,GCS,GCB,GCS,GCL,' +
    'GCS,GCB,JCB,GCS,GCS,JCB,JAS,JAS,JBS,JAS,' +
    'GAS,GBS,GAS,GBS,JAS,JBS,GCS,GAS,JAS,GBS,' +
    'JAS,GBS,JAS,GBS,JAS,GBS,JAH,JAH,JBH,JAH,' +
    'JBH,JAH,JBH,JCH,JAL,GAB,JAS,GBB,JBS,GBS,' +
    // 251-260       261-270        271-280        281-290        291-300
    'GAL,JBB,GAL,GAB,GBB,GAS,JAR,GBB,JAS,GBB,' +
    'JAS,GAS,JAS,GAS,JBS,GBB,JBS,GBB,JAL,GAB,' +
    'JAS,GAB,JAB,GAS,JAR,GAB,JAL,GAB,JAS,GAB,' +
    'JBB,GBB,JBB,GBB,JBS,GBS,GAL,JBB,JAL,GAL,' +
    'JAL,GAL,JBL,GBL,JAL,GBL,JCL,GBL,JAL,GCL,' +
    // 301-310       311-320        321-330        331-340        341-350
    'JAL,GAL,JBL,GAL,JCL,GCL,GAL,JBL,JCL,GBL,' +
    'JAL,GAL,JAB,GAB,JBB,GAB,JBB,GAB,JAB,GCB,' +
    'JBB,GBB,JAB,GAB,JCB,GBB,JAB,GCB,JAB,GBB,' +
    'JBB,GAB,GCB,JAB,GBB,JAB,JAR,GAR,JBR,GAR,' +
    'JBR,GAR,JAR,GBR,JCR,GBR,JAR,GCR,JAR,GBR,' +
    // 351-360       361-370        371-380        381-390        391-400
    'JAR,GAR,JBR,GBR,JCR,GCR,JAS,GAS,JBS,GAS,' +
    'JBS,GAS,JAS,GBS,JCS,GBS,JAS,GCS,GAS,JAS,' +
    'JAS,JBS,GBS,JCS,GBS,GAS,JCB,GCS,GCB,JCS,' +
    'JCS,GCS,GCS,JCB,JCS,GCB,JCB,GCS,JCB,GCS,' +
    'JCB,GCL,JCS,GCB,GCR,JCS,GCS,JCS,JCB,GCL,' +
    // 401-410       411-420        421-430        431-440        441-450
    'JAL,GAB,JAB,GAS,JBB,GBB,JBS,GBL,JAS,GAB,' +
    'JCB,GAR,JBS,GAL,GCB,JAB,GBS,JBB,GAL,JBS,' +
    'JAL,GAB,JAS,GBB,JBB,GBS,JAR,GBB,JCB,GAL,' +
    'GCS,JAS,JAL,GAB,JAL,GAL,JBB,GBL,JBR,GAR,' +
    'JCB,GBL,JAL,JAB,JAS,GAS,JAS,GBS,JAS,GBS,' +
    // 451-460       461-470        471-480        481-490        491-496
    'JAS,GBS,JBS,GCS,GAS,JCS,JAL,JAB,JAS,JAB,' +
    'JBR,JBB,JAL,JBS,JAB,GAB,JAB,GAB,JBS,GBB,' +
    'JBB,GBS,JCB,GCS,GAS,JAB,GAS,JAS,GBB,JBS,' +
    'JBS,GBB,JAB,GCS,GAB,JAS,JCS,GAB,JAS,GAS,' +
    'JAS,GBS,JBS,GAS,JCS,GBS'
  ).split(',');

  function getMeta(avatarNum) {
    var code = _META[avatarNum - 1];
    if (!code || code.length !== 3) return null;
    return {
      gender: code[0],  // J or G
      age: code[1],     // A=6-10, B=11-14, C=15-16
      hair: code[2]     // L=blondt, B=brunt, S=svart, R=rødt, H=hijab
    };
  }

  // =====================================================
  // RENDER AVATAR
  // =====================================================
  function renderAvatar(filename, size, name) {
    size = size || 48;
    if (filename) {
      return '<img src="' + AVATAR_PATH + filename + '" ' +
        'alt="" ' +
        'width="' + size + '" height="' + size + '" ' +
        'style="border-radius:50%;display:block;object-fit:cover;" ' +
        'loading="lazy" ' +
        'onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\';">' +
        '<div class="av-fallback" style="display:' + (filename ? 'none' : 'flex') + ';width:' + size + 'px;height:' + size + 'px;border-radius:50%;background:var(--primary,#456C4B);color:#fff;align-items:center;justify-content:center;font-weight:800;font-size:' + Math.round(size * 0.4) + 'px;">' +
        (name ? name.charAt(0).toUpperCase() : '?') + '</div>';
    }
    return '<div class="av-fallback" style="display:flex;width:' + size + 'px;height:' + size + 'px;border-radius:50%;background:var(--primary,#456C4B);color:#fff;align-items:center;justify-content:center;font-weight:800;font-size:' + Math.round(size * 0.4) + 'px;">' +
      (name ? name.charAt(0).toUpperCase() : '?') + '</div>';
  }

  // =====================================================
  // AVATAR PICKER WITH FILTERS
  // =====================================================
  function openAvatarPicker(currentAvatar, playerName, onSelect) {
    var existing = document.getElementById(PICKER_ID);
    if (existing) existing.remove();

    // Filter state
    var filterGender = null; // null=all, 'J', 'G'
    var filterAge = null;    // null=all, 'A', 'B', 'C'
    var filterHair = null;   // null=all, 'L', 'B', 'S', 'R', 'H'

    var modal = document.createElement('div');
    modal.id = PICKER_ID;
    modal.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,0.6);display:flex;align-items:flex-end;justify-content:center;';

    var sheet = document.createElement('div');
    sheet.style.cssText = 'background:var(--bg-card,#fff);border-radius:20px 20px 0 0;width:100%;max-width:480px;max-height:85vh;display:flex;flex-direction:column;overflow:hidden;';

    // Header
    var header = document.createElement('div');
    header.style.cssText = 'padding:14px 20px;border-bottom:1px solid var(--border,#d8e4da);display:flex;justify-content:space-between;align-items:center;flex-shrink:0;';
    header.innerHTML = '<div style="font-weight:800;font-size:15px;color:var(--text-900,#1a1a1a);">Velg avatar' + (playerName ? ' for ' + playerName : '') + '</div>' +
      '<button id="avPickerClose" style="border:none;background:none;font-size:22px;cursor:pointer;color:var(--text-600,#666);padding:4px 8px;">✕</button>';

    // Preview + remove
    var preview = document.createElement('div');
    preview.style.cssText = 'padding:10px 20px;display:flex;align-items:center;gap:14px;border-bottom:1px solid var(--border,#d8e4da);flex-shrink:0;';
    preview.innerHTML = '<div id="avPickerPreview" style="flex-shrink:0;">' + renderAvatar(currentAvatar, 56, playerName) + '</div>' +
      '<div><div style="font-size:12px;color:var(--text-600,#888);">Nåværende</div>' +
      '<button id="avPickerRemove" style="margin-top:4px;border:1px solid var(--border,#d8e4da);background:var(--bg,#f3f6f3);border-radius:8px;padding:3px 10px;font-size:11px;cursor:pointer;font-weight:600;">Fjern avatar</button></div>';

    // Filter bar
    var filterBar = document.createElement('div');
    filterBar.style.cssText = 'padding:10px 16px;border-bottom:1px solid var(--border,#d8e4da);flex-shrink:0;display:flex;flex-direction:column;gap:6px;';

    var btnBase = 'border:1px solid var(--border,#d8e4da);border-radius:99px;padding:4px 10px;font-size:11px;cursor:pointer;font-weight:600;font-family:inherit;transition:all 0.12s;';
    var btnOff = btnBase + 'background:var(--bg,#f3f6f3);color:var(--text-700,#444);';
    var btnOn = btnBase + 'background:var(--primary,#456C4B);color:#fff;border-color:var(--primary,#456C4B);';

    function makeFilterRow(label, options) {
      var row = document.createElement('div');
      row.style.cssText = 'display:flex;align-items:center;gap:5px;flex-wrap:wrap;';
      row.innerHTML = '<span style="font-size:11px;font-weight:700;color:var(--text-500,#888);min-width:42px;">' + label + '</span>';
      for (var i = 0; i < options.length; i++) {
        var btn = document.createElement('button');
        btn.setAttribute('data-val', options[i].val);
        btn.textContent = options[i].label;
        btn.style.cssText = options[i].val === '' ? btnOn : btnOff;
        btn.type = 'button';
        row.appendChild(btn);
      }
      return row;
    }

    var genderRow = makeFilterRow('Kjønn', [
      { val: '', label: 'Alle' },
      { val: 'J', label: 'Jenter' },
      { val: 'G', label: 'Gutter' }
    ]);

    var ageRow = makeFilterRow('Alder', [
      { val: '', label: 'Alle' },
      { val: 'A', label: '6-10' },
      { val: 'B', label: '11-14' },
      { val: 'C', label: '15-16' }
    ]);

    var hairRow = makeFilterRow('Hår', [
      { val: '', label: 'Alle' },
      { val: 'L', label: 'Blondt' },
      { val: 'B', label: 'Brunt' },
      { val: 'S', label: 'Svart' },
      { val: 'R', label: 'Rødt' },
      { val: 'H', label: 'Hijab' }
    ]);

    filterBar.appendChild(genderRow);
    filterBar.appendChild(ageRow);
    filterBar.appendChild(hairRow);

    // Count badge
    var countBadge = document.createElement('div');
    countBadge.id = 'avFilterCount';
    countBadge.style.cssText = 'padding:4px 16px 0;font-size:11px;color:var(--text-400,#999);flex-shrink:0;';

    // Grid container (scrollable)
    var gridWrap = document.createElement('div');
    gridWrap.style.cssText = 'overflow-y:auto;padding:8px 12px 20px;flex:1;';
    var grid = document.createElement('div');
    grid.id = 'avPickerGrid';
    grid.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fill,minmax(52px,1fr));gap:5px;';
    gridWrap.appendChild(grid);

    // Build grid
    function rebuildGrid() {
      grid.innerHTML = '';
      var count = 0;
      for (var i = 1; i <= AVATAR_COUNT; i++) {
        var m = getMeta(i);
        if (!m) continue;
        if (filterGender && m.gender !== filterGender) continue;
        if (filterAge && m.age !== filterAge) continue;
        if (filterHair && m.hair !== filterHair) continue;

        var fname = 'avatar-' + String(i).padStart(3, '0') + '.png';
        var btn = document.createElement('button');
        btn.setAttribute('data-avatar', fname);
        btn.type = 'button';
        var isSelected = fname === currentAvatar;
        btn.style.cssText = 'border:2px solid ' + (isSelected ? 'var(--primary,#456C4B)' : 'transparent') + ';border-radius:12px;padding:2px;cursor:pointer;background:' + (isSelected ? 'var(--bg,#eef4ee)' : 'transparent') + ';outline:none;';
        btn.innerHTML = '<img src="' + AVATAR_PATH + fname + '" width="44" height="44" style="border-radius:50%;display:block;" loading="lazy">';
        grid.appendChild(btn);
        count++;
      }
      countBadge.textContent = count + ' av ' + AVATAR_COUNT + ' avatarer';
    }

    function updateFilterButtons(row, activeVal) {
      var btns = row.querySelectorAll('button');
      for (var b = 0; b < btns.length; b++) {
        btns[b].style.cssText = btns[b].getAttribute('data-val') === activeVal ? btnOn : btnOff;
      }
    }

    // Wire filter events
    function handleFilterClick(row, setter) {
      row.addEventListener('click', function(e) {
        var btn = e.target.closest('button[data-val]');
        if (!btn) return;
        var val = btn.getAttribute('data-val');
        setter(val || null);
        updateFilterButtons(row, val);
        rebuildGrid();
      });
    }

    handleFilterClick(genderRow, function(v) { filterGender = v; });
    handleFilterClick(ageRow, function(v) { filterAge = v; });
    handleFilterClick(hairRow, function(v) { filterHair = v; });

    // Assemble modal
    sheet.appendChild(header);
    sheet.appendChild(preview);
    sheet.appendChild(filterBar);
    sheet.appendChild(countBadge);
    sheet.appendChild(gridWrap);
    modal.appendChild(sheet);
    document.body.appendChild(modal);

    // Initial grid
    rebuildGrid();

    // Events
    function close() { modal.remove(); }
    modal.addEventListener('click', function(e) { if (e.target === modal) close(); });
    document.getElementById('avPickerClose').addEventListener('click', close);
    document.getElementById('avPickerRemove').addEventListener('click', function() {
      onSelect(null);
      close();
    });
    grid.addEventListener('click', function(e) {
      var target = e.target.closest('button[data-avatar]');
      if (!target) return;
      onSelect(target.getAttribute('data-avatar'));
      close();
    });
  }

  window.Avatar = {
    render: renderAvatar,
    openPicker: openAvatarPicker
  };
})();
