// © 2026 barnehandballtrener.no. All rights reserved.
// lagside.js — Parent-facing team page (standalone, no app dependencies)
// Information board only: calendar, announcements, results, training content.
// No player names, no attendance, no picker, no localStorage.
(() => {
  'use strict';

  var root = document.getElementById('lagside-root');
  var pathParts = window.location.pathname.split('/');
  var token = pathParts[2] || '';

  if (!token || token.length < 8) {
    showError('Ugyldig lenke', 'Denne lenken ser ikke riktig ut. Sjekk at du har fått riktig adresse fra treneren.');
    return;
  }

  var pageData = null;
  var LAST_SEEN_KEY = 'bf_lagside_seen_' + token;

  // ========================================
  // Helpers
  // ========================================

  function esc(s) {
    var d = document.createElement('div');
    d.textContent = s || '';
    return d.innerHTML;
  }

  function formatDate(iso) {
    var d = new Date(iso);
    var days = ['sondag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lordag'];
    return {
      day: days[d.getDay()],
      dayShort: days[d.getDay()].slice(0, 3),
      num: d.getDate(),
      month: d.getMonth(),
      time: String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'),
      date: d,
      iso: iso,
    };
  }

  var monthNames = ['januar', 'februar', 'mars', 'april', 'mai', 'juni',
    'juli', 'august', 'september', 'oktober', 'november', 'desember'];

  function isUpcoming(e) {
    return e.status !== 'completed' &&
      new Date(e.start_time) > new Date(Date.now() - 3 * 60 * 60 * 1000);
  }

  function isCompleted(e) { return e.status === 'completed'; }

  function nffCategoryColor(cat) {
    var colors = {
      sjef_over_ballen: '#2563eb',
      spille_med_og_mot: '#7c3aed',
      smalagsspill: '#059669',
      scoringstrening: '#dc2626',
    };
    return colors[cat] || '#94a3b8';
  }

  // ========================================
  // Data fetching
  // ========================================

  async function loadData() {
    try {
      var url = '/api/team-page?token=' + encodeURIComponent(token);

      var res = await fetch(url);
      if (res.status === 404) {
        showError('Lagsiden finnes ikke', 'Lenken er ugyldig eller deaktivert. Be treneren om en ny lenke.');
        return;
      }
      if (!res.ok) {
        showError('Noe gikk galt', 'Kunne ikke laste lagsiden. Pr\u00f8v igjen om litt.');
        return;
      }

      pageData = await res.json();
      render();
    } catch (err) {
      console.error('[lagside] Load error:', err);
      showError('Noe gikk galt', 'Sjekk internettforbindelsen og pr\u00f8v igjen.');
    }
  }

  // ========================================
  // Toast
  // ========================================

  function showToast(msg) {
    var existing = document.getElementById('lsToast');
    if (existing) existing.remove();
    var el = document.createElement('div');
    el.id = 'lsToast';
    el.className = 'ls-toast';
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(function () { el.remove(); }, 3500);
  }

  // ========================================
  // Error display
  // ========================================

  function showError(title, message) {
    root.innerHTML = '<div class="ls-error">' +
      '<h2>' + esc(title) + '</h2>' +
      '<p>' + esc(message || '') + '</p>' +
      '</div>';
  }

  function generateIcal(events, teamName) {
    function pad(n) { return String(n).padStart(2, '0'); }
    function icsLocalDate(iso) {
      var d = new Date(iso);
      return d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) +
        'T' + pad(d.getHours()) + pad(d.getMinutes()) + '00';
    }
    function icsEscape(s) {
      return (s || '').replace(/\\/g, '\\\\').replace(/;/g, '\\;')
        .replace(/,/g, '\\,').replace(/\n/g, '\\n');
    }

    var lines = [
      'BEGIN:VCALENDAR', 'VERSION:2.0',
      'PRODID:-//Barnehandballtrener//Lagside//NO',
      'CALSCALE:GREGORIAN',
      'X-WR-CALNAME:' + icsEscape(teamName),
      'BEGIN:VTIMEZONE', 'TZID:Europe/Oslo',
      'BEGIN:STANDARD', 'DTSTART:19701025T030000',
      'RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=10',
      'TZOFFSETFROM:+0200', 'TZOFFSETTO:+0100', 'TZNAME:CET',
      'END:STANDARD',
      'BEGIN:DAYLIGHT', 'DTSTART:19700329T020000',
      'RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=3',
      'TZOFFSETFROM:+0100', 'TZOFFSETTO:+0200', 'TZNAME:CEST',
      'END:DAYLIGHT', 'END:VTIMEZONE'
    ];

    events.forEach(function (e) {
      if (e.status === 'cancelled') return;
      var isMatch = e.type === 'match' || e.type === 'cup_match';
      var title = e.title || e.opponent || (isMatch ? 'Kamp' : 'Trening');
      if (isMatch && e.opponent && !e.title) title = teamName + ' vs ' + e.opponent;
      var dur = e.duration_minutes || 60;
      var endDate = new Date(new Date(e.start_time).getTime() + dur * 60000);

      lines.push('BEGIN:VEVENT');
      lines.push('DTSTART;TZID=Europe/Oslo:' + icsLocalDate(e.start_time));
      lines.push('DTEND;TZID=Europe/Oslo:' + icsLocalDate(endDate.toISOString()));
      lines.push('SUMMARY:' + icsEscape(title));
      if (e.location) lines.push('LOCATION:' + icsEscape(e.location));
      lines.push('UID:' + e.id + '@barnehandballtrener.no');
      lines.push('END:VEVENT');
    });

    lines.push('END:VCALENDAR');
    return lines.join('\r\n');
  }

  // ========================================
  // Render
  // ========================================

  function render() {
    if (!pageData) return;
    var d = pageData;
    var html = '';

    var hasNewAnnouncement = false;
    if (d.announcements && d.announcements.length > 0) {
      var lastSeen = null;
      try { lastSeen = localStorage.getItem(LAST_SEEN_KEY); } catch (_) {}
      var newestDate = d.announcements.reduce(function (max, a) {
        var t = new Date(a.created_at).getTime();
        return t > max ? t : max;
      }, 0);
      if (!lastSeen || newestDate > new Date(lastSeen).getTime()) {
        hasNewAnnouncement = true;
      }
      setTimeout(function () {
        try { localStorage.setItem(LAST_SEEN_KEY, new Date().toISOString()); } catch (_) {}
      }, 3000);
    }

    // Header
    html += '<div class="ls-header">' +
      '<h1>' + esc(d.team.name) +
      (hasNewAnnouncement ? '<span class="ls-new-dot"></span>' : '') + '</h1>';
    if (d.season) {
      html += '<div class="ls-header-sub">' + esc(d.season.name || '');
      if (d.nff) html += ' &middot; ' + esc(d.nff.age_class);
      html += '</div>';
    }
    html += '</div>';

    // Content
    html += '<div class="ls-content">';

    // Announcements
    if (d.announcements && d.announcements.length > 0) {
      html += '<div class="ls-announcements">';
      d.announcements.forEach(function(a) {
        var metaParts = ['Lagt ut ' + formatDate(a.created_at).num + '. ' + monthNames[formatDate(a.created_at).month]];
        if (a.expires_at) {
          var ef = formatDate(a.expires_at);
          metaParts.push('Utl\u00f8per ' + ef.num + '. ' + monthNames[ef.month]);
        }
        html += '<div class="ls-announcement">' +
          '<div class="ls-announcement-label">Fra trener</div>' +
          '<div class="ls-announcement-text">' + esc(a.text) + '</div>' +
          '<div class="ls-announcement-meta">' + metaParts.join(' \u00b7 ') + '</div>' +
        '</div>';
      });
      html += '</div>';
    }

    if (!d.season || !d.events || d.events.length === 0) {
      html += '<div class="ls-card"><p style="color:var(--ls-text-secondary);font-size:14px;text-align:center;padding:20px 0">' +
        'Ingen hendelser enda. Treneren har ikke lagt til kamper eller treninger.' +
        '</p></div>';
    } else {
      // Split events
      var upcoming = d.events.filter(isUpcoming);
      var completed = d.events.filter(isCompleted).reverse(); // newest first

      // Desktop grid: main + aside
      html += '<div class="ls-grid">';
      html += '<div class="ls-main">';

      // Hero: next upcoming event
      if (upcoming.length > 0) {
        html += renderHeroEvent(upcoming[0]);
      } else {
        html += '<div class="ls-card" style="text-align:center;padding:20px 14px">' +
          '<div style="font-size:14px;font-weight:600;margin-bottom:4px">Ingen kommende hendelser</div>' +
          '<div style="font-size:13px;color:var(--ls-text-secondary)">Treneren har ikke lagt til nye kamper eller treninger enda.</div>' +
          '</div>';
      }

      // Most recent completed match (with result)
      var lastMatch = completed.find(function (e) {
        return (e.type === 'match' || e.type === 'cup_match') && e.result_home != null;
      });
      if (lastMatch) {
        html += renderResultCard(lastMatch);
      }

      // Most recent completed training
      var lastTraining = completed.find(function (e) { return e.type === 'training'; });
      if (lastTraining) {
        html += renderPreviousTraining(lastTraining);
      }

      html += '</div>'; // .ls-main

      html += '<div class="ls-aside">';

      // Calendar: upcoming events (skip the hero)
      var calEvents = upcoming.slice(1);
      if (calEvents.length > 0) {
        html += '<div class="ls-section-title">Kommende</div>';
        html += '<div class="ls-card" style="padding:4px 14px">';
        calEvents.forEach(function (e) {
          html += renderCalendarItem(e);
        });
        html += '</div>';
      }

      if (d.events && d.events.length > 0) {
        html += '<button class="ls-ical-btn" id="lsIcalBtn">' +
          '<i class="fa-solid fa-calendar-plus"></i> Legg til i kalender</button>';
      }

      // Month summary
      if (upcoming.length > 0) {
        var monthGroups = {};
        upcoming.forEach(function (e) {
          var m = new Date(e.start_time).getMonth();
          if (!monthGroups[m]) monthGroups[m] = { training: 0, match: 0 };
          if (e.type === 'training') monthGroups[m].training++;
          else monthGroups[m].match++;
        });

        var months = Object.keys(monthGroups).sort(function (a, b) { return a - b; });
        months.forEach(function (mKey) {
          var mIdx = parseInt(mKey, 10);
          var mg = monthGroups[mKey];
          html += '<div class="ls-section-title">' +
            esc(monthNames[mIdx].charAt(0).toUpperCase() + monthNames[mIdx].slice(1)) +
            '</div>';
          html += '<div class="ls-card">';
          html += '<div class="ls-month-summary">';
          if (mg.training > 0) html += '<span>' + mg.training + ' treninger</span>';
          if (mg.match > 0) html += '<span>' + mg.match + ' kamper</span>';
          html += '</div>';
          html += '</div>';
        });
      }

      // Training schedule (from training_series)
      if (d.training_info && d.training_info.length > 0) {
        html += '<div class="ls-section-title">Faste treninger</div>';
        html += '<div class="ls-card">';
        d.training_info.forEach(function (t) {
          html += '<div style="font-size:13px;padding:4px 0">';
          html += esc(t.day.charAt(0).toUpperCase() + t.day.slice(1));
          if (t.time) html += ' kl ' + esc(t.time);
          if (t.duration) html += ' (' + t.duration + ' min)';
          if (t.location) html += '<br><span style="color:var(--ls-text-secondary);font-size:12px">' + esc(t.location) + '</span>';
          html += '</div>';
        });
        html += '</div>';
      }

      // Contact info
      if (d.contact_info) {
        html += '<div class="ls-contact"><div class="ls-contact-title">Kontakt</div>' +
          '<div class="ls-contact-text">' + esc(d.contact_info).replace(/\n/g, '<br>') + '</div></div>';
      }

      html += '</div>'; // .ls-aside
      html += '</div>'; // .ls-grid
    }

    // NFF info
    if (d.nff) {
      html += '<div class="ls-nff-info">' +
        'Aldersgruppe ' + esc(d.nff.age_class) + ': ' + d.nff.duration + ' min treninger. ' +
        esc(d.nff.description) +
        '</div>';
    }

    html += '</div>'; // .ls-content

    // Footer
    html += '<div class="ls-footer">' +
      '<a href="https://barnehandballtrener.no">barnehandballtrener.no</a>' +
      ' \u00b7 <a href="/privacy.html">Personvern</a>' +
      '</div>';

    root.innerHTML = html;

    var icalBtn = document.getElementById('lsIcalBtn');
    if (icalBtn && d.events) {
      icalBtn.addEventListener('click', function () {
        var ics = generateIcal(d.events, d.team.name || 'Lag');
        var blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
        var filename = (d.team.name || 'lag').replace(/[^a-zA-Z0-9\u00e6\u00f8\u00e5\u00c6\u00d8\u00c5]/g, '_') + '-kalender.ics';
        try {
          var file = new File([blob], filename, { type: 'text/calendar' });
          if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
            navigator.share({ files: [file], title: d.team.name + ' - kalender' }).catch(function () {});
            return;
          }
        } catch (_) {}
        try {
          var url = URL.createObjectURL(blob);
          var a = document.createElement('a');
          a.href = url; a.download = filename;
          document.body.appendChild(a); a.click(); a.remove();
          setTimeout(function () { URL.revokeObjectURL(url); }, 5000);
        } catch (_) { showToast('Kunne ikke eksportere kalender'); }
      });
    }
  }

  // ========================================
  // Render: Hero event card
  // ========================================

  function renderHeroEvent(e) {
    var f = formatDate(e.start_time);
    var isMatch = e.type === 'match' || e.type === 'cup_match';
    var html = '<div class="ls-card">';

    // Badge
    if (e.status === 'cancelled') {
      html += '<div class="ls-badge ls-badge-cancelled">Avlyst</div>';
    } else if (isMatch) {
      var isToday = new Date(e.start_time).toDateString() === new Date().toDateString();
      html += '<div class="ls-badge ls-badge-match">' + (isToday ? 'Kamp i dag' : 'Neste kamp') + '</div>';
    } else {
      html += '<div class="ls-badge ls-badge-training">Neste trening</div>';
    }

    // Title
    if (isMatch && e.opponent) {
      html += '<div class="ls-hero-title">' + esc(e.title || (pageData.team.name + ' vs ' + e.opponent)) + '</div>';
    } else if (isMatch) {
      html += '<div class="ls-hero-title">' + esc(e.title || 'Kamp ' + f.day) + '</div>';
    } else {
      html += '<div class="ls-hero-title">' + esc(e.title || 'Trening ' + f.day) + '</div>';
    }

    if (isMatch) {
      var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      html += '<div class="ls-logistics">';

      html += '<div class="ls-logistics-row">' +
        '<i class="fa-regular fa-clock"></i><div>' +
        '<div class="ls-logistics-primary">' +
        esc(f.day.charAt(0).toUpperCase() + f.day.slice(1)) + ' ' + f.num + '. ' +
        esc(monthNames[f.month]) + ' kl ' + f.time + '</div>' +
        (e.duration_minutes ? '<div class="ls-logistics-secondary">' + e.duration_minutes + ' min</div>' : '') +
        '</div></div>';

      if (e.location) {
        var mapsUrl = isIOS
          ? 'https://maps.apple.com/?q=' + encodeURIComponent(e.location)
          : 'https://maps.google.com/?q=' + encodeURIComponent(e.location);
        html += '<div class="ls-logistics-row">' +
          '<i class="fa-solid fa-location-dot"></i>' +
          '<a href="' + mapsUrl + '" target="_blank" rel="noopener" class="ls-logistics-link">' +
          esc(e.location) + ' <i class="fa-solid fa-arrow-up-right-from-square" style="font-size:10px;"></i></a></div>';
      }

      html += '<div class="ls-logistics-row">' +
        '<i class="fa-solid fa-' + (e.is_home ? 'house' : 'bus') + '"></i>' +
        '<div class="ls-logistics-primary">' + (e.is_home ? 'Hjemmekamp' : 'Bortekamp') + '</div></div>';

      if (e.format) {
        html += '<div class="ls-logistics-row"><i class="fa-solid fa-people-group"></i>' +
          '<div class="ls-logistics-primary">' + e.format + '-er håndball</div></div>';
      }

      if (e.parent_message) {
        html += '<div class="ls-logistics-row ls-logistics-message">' +
          '<i class="fa-solid fa-bullhorn"></i><div>' + esc(e.parent_message) + '</div></div>';
      }

      html += '</div>';
    } else {
      html += '<div class="ls-hero-meta">';
      html += esc(f.day.charAt(0).toUpperCase() + f.day.slice(1)) + ' ' + f.num + '. ' +
        esc(monthNames[f.month]) + ' kl ' + f.time;
      if (e.location) html += '<br>' + esc(e.location);
      if (e.duration_minutes) html += '<br>' + e.duration_minutes + ' min';
      html += '</div>';
    }

    html += '</div>';

    if (!isMatch && e.parent_message) {
      html += '<div class="ls-card"><div class="ls-message">' +
        '<i class="fa-solid fa-bullhorn"></i>' + esc(e.parent_message) +
        '</div></div>';
    }

    // Workout info (if shared)
    if (e.workout) {
      html += renderWorkoutCard(e.workout);
    }

    return html;
  }

  // ========================================
  // Render: Result card
  // ========================================

  function renderResultCard(e) {
    var f = formatDate(e.start_time);
    var html = '<div class="ls-card ls-result">';
    html += '<div class="ls-result-label">Forrige kamp ' + f.num + '. ' + esc(monthNames[f.month]) + '</div>';
    html += '<div class="ls-result-score">' + (e.result_home != null ? e.result_home : '?') +
      ' - ' + (e.result_away != null ? e.result_away : '?') + '</div>';

    var teamName = pageData.team.name || '';
    var opponent = e.opponent || '';
    if (opponent) {
      html += '<div class="ls-result-teams">' + esc(teamName) + ' vs ' + esc(opponent);
    } else {
      html += '<div class="ls-result-teams">' + esc(teamName);
    }
    if (e.is_home != null) html += ' (' + (e.is_home ? 'hjemme' : 'borte') + ')';
    html += '</div>';

    // Fairness (opt-in by coach, no minutes shown)
    if (e.fairness) {
      html += '<div class="ls-result-fairness">' +
        e.fairness.playersParticipated + ' spillere deltok' +
        '</div>';
    }

    // Coach comment
    if (e.share_comment) {
      html += '<div style="margin-top:10px;font-size:13px;color:var(--ls-text-secondary);text-align:left">' +
        esc(e.share_comment) + '</div>';
    }

    html += '</div>';
    return html;
  }

  // ========================================
  // Render: Previous training (compact)
  // ========================================

  function renderPreviousTraining(e) {
    var f = formatDate(e.start_time);
    var html = '<div class="ls-card">';
    html += '<div class="ls-prev-label">Forrige trening ' + f.num + '. ' + esc(monthNames[f.month]) + '</div>';
    html += '<div class="ls-prev-title">' + esc(e.title || 'Trening') + '</div>';

    if (e.duration_minutes) {
      html += '<div class="ls-prev-meta">' + e.duration_minutes + ' min</div>';
    }

    html += '</div>';

    // Workout info for previous training (if shared)
    if (e.workout) {
      html += renderWorkoutCard(e.workout);
    }

    return html;
  }

  // ========================================
  // Render: Workout card
  // ========================================

  function renderWorkoutCard(w) {
    var html = '<div class="ls-card">';
    html += '<div class="ls-workout-title">';
    if (w.theme) {
      html += esc(w.theme);
    } else {
      html += 'Treningsinnhold';
    }
    html += '</div>';

    if (w.blocks && w.blocks.length > 0) {
      html += '<div class="ls-workout-list">';
      w.blocks.forEach(function (b) {
        html += '<div class="ls-workout-item">' +
          '<div class="ls-workout-cat" style="background:' + nffCategoryColor(b.nffCategory) + '"></div>' +
          esc(b.exerciseName) +
          (b.minutes > 0 ? '<div class="ls-workout-min">' + b.minutes + ' min</div>' : '') +
          '</div>';
      });
      html += '</div>';
    }

    if (w.learningGoals && w.learningGoals.length > 0) {
      html += '<div class="ls-workout-goals">Laeringsmal: ' +
        w.learningGoals.map(esc).join('. ') + '</div>';
    }

    html += '</div>';
    return html;
  }

  // ========================================
  // Render: Calendar item
  // ========================================

  function renderCalendarItem(e) {
    var f = formatDate(e.start_time);
    var isMatch = e.type === 'match' || e.type === 'cup_match';

    var html = '<div class="ls-cal-item">';

    // Date
    html += '<div class="ls-cal-date">' +
      '<div class="ls-cal-day">' + esc(f.dayShort) + '</div>' +
      '<div class="ls-cal-num">' + f.num + '</div>' +
      '</div>';

    // Dot
    html += '<div class="ls-cal-dot ' + (isMatch ? 'ls-cal-dot-match' : 'ls-cal-dot-training') + '"></div>';

    // Info
    html += '<div class="ls-cal-info">';
    if (isMatch && e.opponent) {
      html += '<div class="ls-cal-info-title">vs ' + esc(e.opponent) + '</div>';
    } else if (isMatch) {
      html += '<div class="ls-cal-info-title">' + esc(e.title || 'Kamp') + '</div>';
    } else {
      html += '<div class="ls-cal-info-title">' + esc(e.title || 'Trening') + '</div>';
    }
    var sub = f.time;
    if (e.location) sub += ' &middot; ' + esc(e.location);
    html += '<div class="ls-cal-info-sub">' + sub + '</div>';
    html += '</div>';

    if (e.status === 'cancelled') {
      html += '<span class="ls-cal-cancelled">Avlyst</span>';
    }

    html += '</div>';

    return html;
  }

  // ========================================
  // Boot
  // ========================================

  loadData();
})();
