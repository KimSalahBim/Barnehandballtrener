// © 2026 barnehandballtrener.no. All rights reserved.
// api/team-page.js
// Single endpoint for all parent-facing team page operations.
// Routes by HTTP method + ?action= parameter:
//   GET                    → read (unauthenticated, token-based)
//   POST ?action=create    → create team page (authenticated, owner-only)
//   POST ?action=regenerate → regenerate token (authenticated, owner-only)
//   POST ?action=attend    → register attendance (unauthenticated, token-based)
//
// GDPR FILTERING (hardcoded, not configurable):
// NEVER returned: player skill, positions, absence_reason, minutes_played,
//   match_events (goals/assists), plan_json, grouping data, individual stats.
//
// Required env vars:
// - SUPABASE_URL
// - SUPABASE_SERVICE_ROLE_KEY

import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

var supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ========================================
// Shared helpers
// ========================================

function generateToken() {
  // Unambiguous alphabet: no I/l/O/0 confusion
  var chars = 'abcdefghjkmnpqrstuvwxyz23456789';
  var bytes = crypto.randomBytes(12);
  var token = '';
  for (var i = 0; i < 12; i++) {
    token += chars[bytes[i] % chars.length];
  }
  return token;
}

function isValidToken(t) {
  return typeof t === 'string' && t.length >= 8 && t.length <= 24 && /^[a-zA-Z0-9_-]+$/.test(t);
}

function getBaseUrl(req) {
  var rawHost = (req.headers['x-forwarded-host'] || req.headers.host || '').split(',')[0].trim();
  var host = rawHost.toLowerCase().replace(/:443$/, '').replace(/\.$/, '');
  var bare = host.split(':')[0];

  var isLocal = bare === 'localhost' || bare === '127.0.0.1';
  var isAllowed = isLocal ||
    bare === 'barnefotballtrener.no' || bare === 'www.barnefotballtrener.no' ||
    bare === 'barnehandballtrener.no' || bare === 'www.barnehandballtrener.no' ||
    bare === 'barnefotballtrener.vercel.app' ||
    bare === 'barnehandballtrener.vercel.app' ||
    (bare.endsWith('.vercel.app') && bare.startsWith('barnefotballtrener-')) ||
    (bare.endsWith('.vercel.app') && bare.startsWith('barnehandballtrener-'));

  if (!isAllowed) {
    var appUrl = (process.env.APP_URL || '').replace(/\/+$/, '');
    return appUrl || 'https://barnehandballtrener.no';
  }

  var proto = isLocal ? 'http' : 'https';
  return proto + '://' + host;
}

function parseBody(req) {
  try {
    return typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
  } catch (_) { return {}; }
}

async function authenticateCaller(req) {
  var authHeader = req.headers.authorization || '';
  var token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return null;
  var { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !user) return null;
  return user.id;
}

async function getDataOwner(teamId) {
  var { data: team } = await supabaseAdmin
    .from('teams').select('user_id').eq('id', teamId).single();
  return team ? team.user_id : null;
}

// ========================================
// Exercise + Theme lookup maps
// ========================================

var EX_MAP = {
    drink:{n:'Drikkepause',c:'pause'},
    custom:{n:'Egendefinert',c:''},
    tag:{n:'Sisten',c:'sjef_over_ballen'},
    pass_pair:{n:'Kast to og to',c:'sjef_over_ballen'},
    pass_move:{n:'Kast og bevegelse',c:'sjef_over_ballen'},
    shot:{n:'Kast på mål',c:'scoringstrening'},
    shot_race:{n:'Skuddstafett',c:'scoringstrening'},
    '1v1':{n:'1 mot 1',c:'spille_med_og_mot'},
    '2v1':{n:'2 mot 1',c:'spille_med_og_mot'},
    '3v2':{n:'3 mot 2',c:'spille_med_og_mot'},
    ssg:{n:'Smålagsspill',c:'smalagsspill'},
    game_activity:{n:'Fri spillaktivitet',c:'smalagsspill'},
    keeper:{n:'Keepertrening',c:'sjef_over_ballen'},
    defend_press:{n:'Forsvarstrening',c:'spille_med_og_mot'},
    ssg_theme:{n:'Spill med betingelser',c:'smalagsspill'},
    transition:{n:'Omstillingsspill',c:'smalagsspill'},
    wall_pass:{n:'Veggspill',c:'spille_med_og_mot'},
    keeper_play:{n:'Keeperduell',c:'sjef_over_ballen'},
    relay_ball:{n:'Stafett med ball',c:'sjef_over_ballen'},
    ball_sisten:{n:'Ballsisten',c:'sjef_over_ballen'},
    kongen_haugen:{n:'Kongen på haugen',c:'smalagsspill'},
    kastlek_halvdeler:{n:'Kastlek på to halvdeler',c:'sjef_over_ballen'},
    ball_luften:{n:'Kast ballen i luften',c:'sjef_over_ballen'},
    kast_vegg:{n:'Kast mot vegg',c:'sjef_over_ballen'},
    kanonball:{n:'Dansk kanonball',c:'smalagsspill'},
    kontring:{n:'Kontring to og to',c:'scoringstrening'},
    dribbling:{n:'Dribling',c:'sjef_over_ballen'},
    pass_run:{n:'Pasning i bevegelse',c:'sjef_over_ballen'},
    defensive_movement:{n:'Forsvarsstilling',c:'spille_med_og_mot'},
    jump_shot:{n:'Hoppskudd',c:'scoringstrening'},
    activity_course:{n:'Aktivitetsløype',c:'scoringstrening'},
    chain_tag:{n:'Lenkesisten',c:'sjef_over_ballen'},
};

var THEME_MAP = {
    kast_teknikk: 'Kastteknikk',
    mottak_pasning: 'Mottak og pasning',
    dribling_bevegelse: 'Dribling og bevegelse',
    finter: 'Finter og avløp',
    '1v1_duell': '1 mot 1',
    samarbeidsspill: 'Samarbeidsspill',
    forsvarsspill: 'Forsvarsspill',
    kontring_retur: 'Kontring og retur',
    linjespill: 'Linjespill',
    keeper: 'Målvakt',
    leik_stafett: 'Lek og stafett',
  };

// ========================================
// Rate limiter (in-memory, resets on cold start)
// ========================================

var rateLimits = {};
var RATE_WINDOW_MS = 60 * 1000;
var RATE_MAX = 30;

function checkRateLimit(key) {
  var now = Date.now();
  if (!rateLimits[key] || now - rateLimits[key].start > RATE_WINDOW_MS) {
    rateLimits[key] = { start: now, count: 1 };
    return true;
  }
  rateLimits[key].count++;
  return rateLimits[key].count <= RATE_MAX;
}

// ========================================
// ACTION: create
// ========================================

async function handleCreate(req, res) {
  var callerId = await authenticateCaller(req);
  if (!callerId) return res.status(401).json({ error: 'Ikke innlogget' });

  var body = parseBody(req);
  var teamId = body.team_id;
  if (!teamId) return res.status(400).json({ error: 'team_id is required' });

  // Verify owner
  var { data: membership } = await supabaseAdmin
    .from('team_members').select('role')
    .eq('team_id', teamId).eq('user_id', callerId).eq('status', 'active')
    .maybeSingle();

  if (!membership || membership.role !== 'owner') {
    return res.status(403).json({ error: 'Bare lageier kan opprette lagside' });
  }

  var dataOwnerId = await getDataOwner(teamId);
  if (!dataOwnerId) return res.status(404).json({ error: 'Laget finnes ikke' });

  // Check existing
  var { data: existing } = await supabaseAdmin
    .from('team_pages').select('token, active').eq('team_id', teamId).maybeSingle();

  var baseUrl = getBaseUrl(req);

  if (existing) {
    if (!existing.active) {
      var newToken = generateToken();
      await supabaseAdmin.from('team_pages')
        .update({ token: newToken, active: true }).eq('team_id', teamId);
      return res.status(200).json({ success: true, token: newToken, url: baseUrl + '/lag/' + newToken, created: false });
    }
    return res.status(200).json({ success: true, token: existing.token, url: baseUrl + '/lag/' + existing.token, created: false });
  }

  var token = generateToken();
  var { error: insertErr } = await supabaseAdmin.from('team_pages')
    .insert({ team_id: teamId, user_id: dataOwnerId, token: token, active: true });

  if (insertErr) {
    console.error('[team-page] Create error:', insertErr);
    return res.status(500).json({ error: 'Kunne ikke opprette lagside' });
  }

  return res.status(200).json({ success: true, token: token, url: baseUrl + '/lag/' + token, created: true });
}

// ========================================
// ACTION: regenerate
// ========================================

async function handleRegenerate(req, res) {
  var callerId = await authenticateCaller(req);
  if (!callerId) return res.status(401).json({ error: 'Ikke innlogget' });

  var body = parseBody(req);
  var teamId = body.team_id;
  if (!teamId) return res.status(400).json({ error: 'team_id is required' });

  var { data: membership } = await supabaseAdmin
    .from('team_members').select('role')
    .eq('team_id', teamId).eq('user_id', callerId).eq('status', 'active')
    .maybeSingle();

  if (!membership || membership.role !== 'owner') {
    return res.status(403).json({ error: 'Bare lageier kan regenerere lenke' });
  }

  var { data: page } = await supabaseAdmin
    .from('team_pages').select('id').eq('team_id', teamId).maybeSingle();

  if (!page) return res.status(404).json({ error: 'Ingen lagside funnet' });

  var newToken = generateToken();
  var { error: updateErr } = await supabaseAdmin
    .from('team_pages').update({ token: newToken, active: true }).eq('team_id', teamId);

  if (updateErr) {
    console.error('[team-page] Regenerate error:', updateErr);
    return res.status(500).json({ error: 'Kunne ikke regenerere lenke' });
  }

  return res.status(200).json({ success: true, token: newToken, url: getBaseUrl(req) + '/lag/' + newToken });
}

// ========================================
// ACTION: attend
// ========================================

async function handleAttend(req, res) {
  var body = parseBody(req);
  var token = body.token;
  var eventId = body.event_id;
  var playerId = body.player_id;
  var status = body.status;

  if (!token || !isValidToken(token)) return res.status(400).json({ error: 'Invalid token' });
  if (!eventId || !playerId || !status) return res.status(400).json({ error: 'event_id, player_id and status are required' });
  if (status !== 'yes' && status !== 'no' && status !== 'maybe') return res.status(400).json({ error: 'status must be yes, no, or maybe' });

  if (!checkRateLimit(token)) return res.status(429).json({ error: 'For mange forespørsler. Vent litt.' });

  // Verify token
  var { data: page } = await supabaseAdmin
    .from('team_pages').select('team_id').eq('token', token).eq('active', true).maybeSingle();
  if (!page) return res.status(404).json({ error: 'Ugyldig eller deaktivert lenke' });

  var ownerId = await getDataOwner(page.team_id);
  if (!ownerId) return res.status(404).json({ error: 'Laget finnes ikke' });

  // Verify event
  var { data: event } = await supabaseAdmin
    .from('events').select('id, season_id, status')
    .eq('id', eventId).eq('user_id', ownerId).maybeSingle();
  if (!event) return res.status(404).json({ error: 'Hendelsen finnes ikke' });
  if (event.status === 'cancelled') return res.status(400).json({ error: 'Hendelsen er avlyst' });
  if (event.status === 'completed') return res.status(400).json({ error: 'Hendelsen er allerede gjennomført' });

  // Verify player
  var { data: seasonPlayer } = await supabaseAdmin
    .from('season_players').select('player_id, player_name')
    .eq('season_id', event.season_id).eq('player_id', playerId)
    .eq('user_id', ownerId).eq('active', true).maybeSingle();
  if (!seasonPlayer) return res.status(404).json({ error: 'Spilleren finnes ikke' });

  // Check-then-update/insert (preserves coach's in_squad on existing rows)
  var attended = status === 'yes' ? true : (status === 'no' ? false : null);

  var { data: existingEp } = await supabaseAdmin
    .from('event_players').select('id')
    .eq('event_id', eventId).eq('player_id', playerId).maybeSingle();

  if (existingEp) {
    var { error: updateErr } = await supabaseAdmin.from('event_players')
      .update({ attended: attended, player_name: seasonPlayer.player_name })
      .eq('event_id', eventId).eq('player_id', playerId);
    if (updateErr) { console.error('[team-page] Attend update error:', updateErr); return res.status(500).json({ error: 'Kunne ikke registrere oppmøte' }); }
  } else {
    var { error: insertErr } = await supabaseAdmin.from('event_players')
      .insert({ event_id: eventId, season_id: event.season_id, user_id: ownerId,
        player_id: playerId, attended: attended, in_squad: status === 'yes',
        player_name: seasonPlayer.player_name });
    if (insertErr) {
      // Race condition: retry as update
      if (insertErr.code === '23505') {
        var { error: retryErr } = await supabaseAdmin.from('event_players')
          .update({ attended: attended, player_name: seasonPlayer.player_name })
          .eq('event_id', eventId).eq('player_id', playerId);
        if (retryErr) { console.error('[team-page] Attend retry error:', retryErr); return res.status(500).json({ error: 'Kunne ikke registrere oppmøte' }); }
      } else {
        console.error('[team-page] Attend insert error:', insertErr);
        return res.status(500).json({ error: 'Kunne ikke registrere oppmøte' });
      }
    }
  }

  return res.status(200).json({ ok: true });
}

// ========================================
// ACTION: read
// ========================================

async function handleRead(req, res) {
  var token = req.query.token;
  if (!token || !isValidToken(token)) return res.status(400).json({ error: 'Invalid token' });

  var playerId = req.query.player_id || null;

  // Look up page
  var { data: page, error: pageErr } = await supabaseAdmin
    .from('team_pages').select('team_id, active, settings')
    .eq('token', token).eq('active', true).maybeSingle();
  if (pageErr || !page) return res.status(404).json({ error: 'Lagsiden finnes ikke eller er deaktivert' });

  var teamId = page.team_id;

  // Team + owner
  var { data: team } = await supabaseAdmin
    .from('teams').select('name, user_id').eq('id', teamId).single();
  if (!team) return res.status(404).json({ error: 'Laget finnes ikke' });
  var ownerId = team.user_id;

  // Season (must match team_id)
  var now = new Date().toISOString();
  var { data: seasons } = await supabaseAdmin
    .from('seasons').select('id, name, format, age_class, start_date, end_date')
    .eq('user_id', ownerId).eq('team_id', teamId)
    .lte('start_date', now).order('start_date', { ascending: false }).limit(1);

  var season = (seasons && seasons.length > 0) ? seasons[0] : null;
  if (!season) {
    var { data: anySeason } = await supabaseAdmin
      .from('seasons').select('id, name, format, age_class, start_date, end_date')
      .eq('user_id', ownerId).eq('team_id', teamId)
      .order('start_date', { ascending: false, nullsFirst: false }).limit(1);
    season = (anySeason && anySeason.length > 0) ? anySeason[0] : null;
  }

  if (!season) {
    return res.status(200).json({ team: { name: team.name }, season: null, players: [], events: [], training_info: null, nff: null });
  }

  // Players — ONLY id + name
  var { data: rawPlayers } = await supabaseAdmin
    .from('season_players').select('player_id, player_name, active')
    .eq('season_id', season.id).eq('user_id', ownerId).eq('active', true);

  var players = (rawPlayers || []).map(function (p) {
    return { id: p.player_id, name: p.player_name };
  }).sort(function (a, b) { return (a.name || '').localeCompare(b.name || '', 'nb'); });

  // Events: upcoming + last 3 completed
  var { data: upcomingEvents } = await supabaseAdmin
    .from('events').select('id, type, title, start_time, duration_minutes, location, opponent, is_home, format, status, result_home, result_away, parent_message, share_workout, share_fairness, share_comment')
    .eq('season_id', season.id).eq('user_id', ownerId)
    .gte('start_time', new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString())
    .in('status', ['planned', 'cancelled'])
    .order('start_time', { ascending: true }).limit(20);

  var { data: recentEvents } = await supabaseAdmin
    .from('events').select('id, type, title, start_time, duration_minutes, location, opponent, is_home, format, status, result_home, result_away, parent_message, share_workout, share_fairness, share_comment')
    .eq('season_id', season.id).eq('user_id', ownerId)
    .eq('status', 'completed').order('start_time', { ascending: false }).limit(3);

  var allEventsMap = {};
  (upcomingEvents || []).forEach(function (e) { allEventsMap[e.id] = e; });
  (recentEvents || []).forEach(function (e) { allEventsMap[e.id] = e; });
  var allEvents = Object.values(allEventsMap).sort(function (a, b) {
    return new Date(a.start_time) - new Date(b.start_time);
  });

  // Attendance — NEVER absence_reason
  var eventIds = allEvents.map(function (e) { return e.id; });
  var eventAttendance = {};
  if (eventIds.length > 0) {
    var { data: rawAtt } = await supabaseAdmin
      .from('event_players').select('event_id, player_id, attended, in_squad')
      .eq('user_id', ownerId).in('event_id', eventIds);
    (rawAtt || []).forEach(function (ep) {
      if (!eventAttendance[ep.event_id]) eventAttendance[ep.event_id] = [];
      eventAttendance[ep.event_id].push(ep);
    });
  }

  // Workouts (only if shared)
  var workoutsByEvent = {};
  var woEventIds = allEvents
    .filter(function (e) { return e.share_workout && e.type === 'training'; })
    .map(function (e) { return e.id; });

  if (woEventIds.length > 0) {
    var { data: rawWo } = await supabaseAdmin
      .from('workouts').select('id, event_id, theme, duration_minutes, blocks')
      .in('event_id', woEventIds);

    (rawWo || []).forEach(function (w) {
      if (!w.event_id) return;
      var blocks = w.blocks || [];
      if (typeof blocks === 'string') { try { blocks = JSON.parse(blocks); } catch (_) { blocks = []; } }
      var safeBlocks = [];
      blocks.forEach(function (block) {
        var exercises = [block.a];
        if (block.kind === 'parallel' && block.b) exercises.push(block.b);
        exercises.forEach(function (ex) {
          if (!ex) return;
          var key = ex.exerciseKey || '';
          var lookup = EX_MAP[key];
          var name = (ex.customName && ex.customName.trim()) || (lookup ? lookup.n : key) || key;
          safeBlocks.push({ exerciseName: name, minutes: parseInt(ex.minutes, 10) || 0, nffCategory: lookup ? lookup.c : '' });
        });
      });
      workoutsByEvent[w.event_id] = {
        theme: (w.theme && THEME_MAP[w.theme]) || w.theme || null,
        totalMinutes: w.duration_minutes || 0, learningGoals: [], blocks: safeBlocks,
      };
    });
  }

  // Build response
  var events = allEvents.map(function (e) {
    var att = eventAttendance[e.id] || [];
    var confirmed = 0, declined = 0, unknown = 0, myStatus = null;
    att.forEach(function (ep) {
      if (ep.attended === true) confirmed++;
      else if (ep.attended === false) declined++;
      else unknown++;
      if (playerId && ep.player_id === playerId) {
        myStatus = ep.attended === true ? 'yes' : (ep.attended === false ? 'no' : 'maybe');
      }
    });
    var notResponded = Math.max(0, players.length - confirmed - declined - unknown);

    var fairness = null;
    if (e.share_fairness && e.status === 'completed') {
      fairness = { playersParticipated: att.filter(function (ep) { return ep.attended === true; }).length };
    }

    return {
      id: e.id, type: e.type, title: e.title, start_time: e.start_time,
      duration_minutes: e.duration_minutes, location: e.location,
      opponent: e.opponent, is_home: e.is_home, format: e.format, status: e.status,
      result_home: e.status === 'completed' ? e.result_home : null,
      result_away: e.status === 'completed' ? e.result_away : null,
      parent_message: e.parent_message || null,
      share_comment: e.status === 'completed' ? (e.share_comment || null) : null,
      fairness: fairness,
      workout: (e.share_workout && workoutsByEvent[e.id]) || null,
      attendance: { confirmed: confirmed, declined: declined, maybe: unknown, not_responded: notResponded, my_status: myStatus },
    };
  });

  // Training series
  var trainingInfo = null;
  var { data: series } = await supabaseAdmin
    .from('training_series').select('day_of_week, start_time, duration_minutes, location')
    .eq('season_id', season.id).eq('user_id', ownerId).limit(3);
  if (series && series.length > 0) {
    var dayNames = ['sondag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lordag'];
    trainingInfo = series.map(function (s) {
      return { day: dayNames[s.day_of_week] || '', time: s.start_time ? s.start_time.slice(0, 5) : '', duration: s.duration_minutes || 60, location: s.location || '' };
    });
  }

  // NFF info
  var nff = null;
  if (season.age_class) {
    var ageMatch = season.age_class.match(/(\d+)/);
    var age = ageMatch ? parseInt(ageMatch[1], 10) : null;
    if (age) {
      var dur = age <= 7 ? 60 : (age <= 9 ? 75 : 90);
      var lbl = age <= 7 ? '6-7 år' : (age <= 9 ? '8-9 år' : (age <= 12 ? '10-12 år' : '13-16 år'));
      nff = { age_class: lbl, duration: dur, description: 'NHF anbefaler variert trening med vekt på ballmestring, kast og bevegelse for ' + lbl + '.' };
    }
  }

  // Settings from team_pages
  var pageSettings = (page && page.settings) || {};
  var announcements = (pageSettings.announcements || []).filter(function(a) {
    return !a.expires_at || new Date(a.expires_at) > new Date();
  });

  return res.status(200).json({
    team: { name: team.name },
    season: { name: season.name, age_class: season.age_class, format: season.format },
    players: players, events: events, training_info: trainingInfo, nff: nff,
    announcements: announcements,
    contact_info: pageSettings.contact_info || '',
    defaults: {
      share_workout: !!pageSettings.default_share_workout,
      share_fairness: !!pageSettings.default_share_fairness,
      show_attendance_count: !!pageSettings.default_show_attendance_count,
    },
  });
}

// ========================================
// ACTION: settings
// ========================================

async function handleSettings(req, res) {
  var callerId = await authenticateCaller(req);
  if (!callerId) return res.status(401).json({ error: 'Ikke innlogget' });

  var body = parseBody(req);
  var teamId = body.team_id;
  if (!teamId) return res.status(400).json({ error: 'team_id is required' });

  var { data: membership } = await supabaseAdmin
    .from('team_members').select('role')
    .eq('team_id', teamId).eq('user_id', callerId).eq('status', 'active')
    .maybeSingle();

  if (!membership || membership.role !== 'owner') {
    return res.status(403).json({ error: 'Bare lageier kan endre innstillinger' });
  }

  var settings = body.settings || {};

  var announcements = Array.isArray(settings.announcements) ? settings.announcements.slice(0, 3) : [];
  announcements = announcements.map(function(a) {
    return {
      text: String(a.text || '').slice(0, 500),
      created_at: a.created_at || new Date().toISOString(),
      expires_at: a.expires_at || null,
    };
  });

  var clean = {
    announcements: announcements,
    default_share_workout: !!settings.default_share_workout,
    default_share_fairness: !!settings.default_share_fairness,
    default_show_attendance_count: !!settings.default_show_attendance_count,
    contact_info: String(settings.contact_info || '').slice(0, 500),
  };

  var { error } = await supabaseAdmin.from('team_pages')
    .update({ settings: clean })
    .eq('team_id', teamId);

  if (error) return res.status(500).json({ error: error.message });
  return res.json({ ok: true });
}

// ========================================
// Router
// ========================================

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    var action = req.query.action || '';

    if (req.method === 'GET') {
      return await handleRead(req, res);
    }

    if (req.method === 'POST') {
      if (action === 'create') return await handleCreate(req, res);
      if (action === 'regenerate') return await handleRegenerate(req, res);
      if (action === 'attend') return await handleAttend(req, res);
      if (action === 'settings') return await handleSettings(req, res);
      return res.status(400).json({ error: 'Unknown action. Use ?action=create|regenerate|attend|settings' });
    }

    res.setHeader('Allow', 'GET, POST, OPTIONS');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('[team-page] Unexpected error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
