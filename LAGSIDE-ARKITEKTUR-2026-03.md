# Lagside — Teknisk arkitektur

Dato: 14. mars 2026

---

## OVERSIKT

Én URL per lag (`barnefotballtrener.no/lag/<token>`), token-beskyttet, ingen innlogging.
Foreldre bokmerker lenken og ser: neste hendelse, oppmøteregistrering, kalender, kampresultat,
treningsinnhold (opt-in), trenerens beskjed (opt-in).

Ingen endring i eksisterende moduler utover ~30 linjer i `season.js` for toggle-UI.

---

## 1. DATABASE

### Ny tabell: `team_pages`

```sql
CREATE TABLE team_pages (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id     TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  token       TEXT NOT NULL UNIQUE,
  active      BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT now(),
  UNIQUE(team_id)
);

CREATE INDEX idx_team_pages_token ON team_pages(token) WHERE active = true;

ALTER TABLE team_pages ENABLE ROW LEVEL SECURITY;

-- Trenere kan lese/skrive sine egne (via team_members)
CREATE POLICY "team_pages_select" ON team_pages FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM team_members tm
    WHERE tm.team_id = team_pages.team_id
      AND tm.user_id = auth.uid()
      AND tm.status = 'active'
  ));

CREATE POLICY "team_pages_insert" ON team_pages FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "team_pages_update" ON team_pages FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM team_members tm
    WHERE tm.team_id = team_pages.team_id
      AND tm.user_id = auth.uid()
      AND tm.role = 'owner'
      AND tm.status = 'active'
  ));
```

Token-format: 12 tegn alfanumerisk (a-z, 0-9), generert server-side med `crypto.randomBytes(9).toString('base64url')`. Gir ~53 bits entropi. Tilstrekkelig for ikke-gjettbar lenke innenfor en lukket foreldregruppe.

### Nye kolonner i `events`

```sql
ALTER TABLE events ADD COLUMN IF NOT EXISTS parent_message TEXT;
ALTER TABLE events ADD COLUMN IF NOT EXISTS share_workout BOOLEAN DEFAULT false;
ALTER TABLE events ADD COLUMN IF NOT EXISTS share_fairness BOOLEAN DEFAULT false;
ALTER TABLE events ADD COLUMN IF NOT EXISTS share_comment TEXT;
```

- `parent_message`: Trenerens beskjed til foreldre (fritekst, maks 500 tegn)
- `share_workout`: Toggle — vis treningsinnhold på lagsiden
- `share_fairness`: Toggle — vis "X spillere deltok, Y keepere" på lagsiden
- `share_comment`: Trenerens kampoppsummering (fritekst, maks 500 tegn)

Alle nullable, alle default false/null. Ingen eksisterende data påvirkes.

---

## 2. API-ENDEPUNKTER (Vercel serverless)

### `api/team-page-create.js` (POST, autentisert)

Oppretter lagside for et lag. Kun owner kan opprette.

```
POST /api/team-page-create
Headers: Authorization: Bearer <supabase-session-token>
Body: { team_id: "t_xxxxxxxx" }
Response: { token: "a7x9k2m4p8q1", url: "https://barnefotballtrener.no/lag/a7x9k2m4p8q1" }
```

Logikk:
1. Verifiser sesjon (samme mønster som invite-coach.js)
2. Verifiser at caller er owner via team_members
3. Sjekk om team_pages allerede finnes for team_id → returner eksisterende
4. Generer token med `crypto.randomBytes(9).toString('base64url')`
5. INSERT i team_pages
6. Returner token + full URL

### `api/team-page-regenerate.js` (POST, autentisert)

Regenererer token. Gammel lenke dør umiddelbart. Kun owner.

```
POST /api/team-page-regenerate
Headers: Authorization: Bearer <supabase-session-token>
Body: { team_id: "t_xxxxxxxx" }
Response: { token: "ny_token_her", url: "..." }
```

### `api/team-page-read.js` (GET, uautentisert)

Henter all data for lagsiden. Token i URL. Ingen sesjon nødvendig.

```
GET /api/team-page-read?token=a7x9k2m4p8q1
Response: { team, season, events, players, training_series }
```

Logikk:
1. Slå opp token i team_pages WHERE active = true
2. Hent team_id og user_id (eierens ID)
3. Hent aktiv sesong for laget
4. Hent events for sesongen (kommende + siste 3 avsluttede)
5. Hent season_players (kun fornavn + player_id, ALDRI skill/positions)
6. Hent event_players for relevante events (kun player_id + attended + in_squad, ALDRI absence_reason)
7. Hent training_series for faste treninger
8. For events der share_workout = true: hent workout-data (blokker uten gruppeinndeling)
9. For events der share_fairness = true: beregn aggregater (antall deltakere, antall keepere)
10. Inkluder parent_message og share_comment der de finnes
11. HARDKODET FILTRERING (server-side, ikke client-side):
    - Aldri: absence_reason, player_skill, player_positions, minutes_played, individuell statistikk
    - Aldri: match_events (mål/assists per spiller)
    - Aldri: grouping-data fra workouts
    - Aldri: plan_json (bytteplan med spillernavn)

Response-shape:
```json
{
  "team": {
    "name": "Steinkjer G10"
  },
  "season": {
    "name": "Sesong 2026",
    "age_class": "G10",
    "format": 7
  },
  "players": [
    { "id": "p_xxx", "name": "Oliver" }
  ],
  "events": [
    {
      "id": "uuid",
      "type": "match",
      "title": "vs Verdal",
      "start_time": "2026-03-15T11:00:00",
      "location": "Guldbergaunet kunstgress",
      "opponent": "Verdal",
      "is_home": true,
      "format": 7,
      "status": "planned",
      "result_home": null,
      "result_away": null,
      "parent_message": "Husk leggskinn",
      "share_comment": null,
      "fairness": null,
      "workout": null,
      "attendance": {
        "confirmed": 11,
        "declined": 1,
        "unknown": 3,
        "my_status": null
      }
    }
  ],
  "training_info": {
    "day": "tirsdag",
    "time": "17:00",
    "location": "Guldbergaunet kunstgress",
    "duration": 75
  },
  "nff": {
    "age_class": "8-9",
    "duration": 75,
    "description": "NFF anbefaler variert trening..."
  }
}
```

Viktig: `attendance.my_status` populeres basert på `player_id` query parameter (se neste seksjon).

### `api/team-page-attend.js` (POST, uautentisert)

Registrerer oppmøte fra foreldre. Token + player_id + event_id.

```
POST /api/team-page-attend
Body: {
  token: "a7x9k2m4p8q1",
  event_id: "uuid",
  player_id: "p_xxx",
  status: "yes" | "no" | "maybe"
}
Response: { ok: true }
```

Logikk:
1. Verifiser token → hent team_id, user_id
2. Verifiser at event_id tilhører riktig sesong/team
3. Verifiser at player_id finnes i season_players for sesongen
4. Upsert i event_players:
   - attended = true (yes), false (no), null (maybe)
   - in_squad = true (yes), false (no/maybe)
   - player_name = snapshot fra season_players
   - user_id = eierens user_id (ikke foreldrenes — de har ingen)
   - season_id = fra eventet
5. Rate limiting: maks 30 requests per token per minutt (Vercel edge middleware eller enkel in-memory counter)

Viktig: Bruk supabaseAdmin (service_role) for INSERT/UPDATE, ikke foreldrenes sesjon (de har ingen).

---

## 3. NYE FILER

### `lagside.html` — Foreldre-siden

Standalone HTML-side, ingen avhengighet til index.html, core.js, season.js eller noe annet i appen.
Laster kun:
- `style.css` (gjenbruk eksisterende design tokens)
- `lagside.js` (ny, all logikk for siden)

Rute: `/lag/<token>` → vercel.json rewrite til `/lagside.html` med token som path parameter.

```html
<!doctype html>
<html lang="nb">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <title>Lagside — Barnefotballtrener</title>
  <meta property="og:title" content="Lagside — Barnefotballtrener">
  <meta property="og:description" content="Se kalender og meld oppmøte">
  <!-- Aldri spillernavn i OG-tags -->
  <link rel="stylesheet" href="/lagside.css">
</head>
<body>
  <div id="lagside-root"></div>
  <script src="/lagside.js"></script>
</body>
</html>
```

### `lagside.js` — All klient-logikk (~400-600 linjer estimert)

IIFE, ingen avhengigheter. Snakker kun med API-endepunktene.

```javascript
(() => {
  'use strict';

  // 1. Parse token fra URL: /lag/<token>
  const token = window.location.pathname.split('/')[2];
  if (!token) { showError('Ugyldig lenke'); return; }

  // 2. Hent spillervalg fra localStorage
  const STORAGE_KEY = 'bf_lagside_' + token;
  let selectedPlayerId = null;
  try {
    selectedPlayerId = localStorage.getItem(STORAGE_KEY);
  } catch (_) {}

  // 3. Fetch data
  async function loadData() {
    const url = '/api/team-page-read?token=' + encodeURIComponent(token)
      + (selectedPlayerId ? '&player_id=' + encodeURIComponent(selectedPlayerId) : '');
    const res = await fetch(url);
    if (res.status === 404) { showError('Lagsiden finnes ikke eller er deaktivert'); return; }
    if (!res.ok) { showError('Kunne ikke laste data'); return; }
    const data = await res.json();
    render(data);
  }

  // 4. Spillervelger (første besøk)
  function showPlayerPicker(players) { /* ... */ }

  // 5. Render: kontekstuell hero + kalender + innhold
  function render(data) { /* ... */ }

  // 6. Oppmøteregistrering
  async function submitAttendance(eventId, status) {
    await fetch('/api/team-page-attend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token,
        event_id: eventId,
        player_id: selectedPlayerId,
        status
      })
    });
    loadData(); // refresh
  }

  // Boot
  loadData();
})();
```

### `lagside.css` — Egen stylesheet (~200-300 linjer)

Gjenbruker design tokens fra style.css (CSS custom properties) men er helt uavhengig.
Mobil-first, ingen desktop-spesifikk layout nødvendig.

### `api/team-page-create.js` (~60 linjer)
### `api/team-page-regenerate.js` (~40 linjer)
### `api/team-page-read.js` (~150 linjer)
### `api/team-page-attend.js` (~60 linjer)

Alle følger mønsteret fra `invite-coach.js`: supabaseAdmin, CORS-headers, JSON-parsing.

---

## 4. ENDRINGER I EKSISTERENDE FILER

### `season.js` (~30 linjer)

I event-detail-visningen (der treneren ser en spesifikk kamp/trening):
- Legg til toggle-rad under eksisterende innhold:
  - "Del treningsinnhold på lagside" (checkbox, bare for type='training')
  - "Del deltakerantall på lagside" (checkbox, bare for type='match')
  - "Beskjed til foreldre" (tekstfelt, begge typer)
  - "Kampkommentar" (tekstfelt, bare for completed match)
- Disse togglerne oppdaterer events-tabellen med de nye kolonnene.
- Ingen ny funksjonalitet i selve season-logikken.

I laginnstillinger-seksjonen (der invite/fjern trener allerede ligger):
- "Lagside for foreldre"-seksjon
- "Opprett lagside" / "Kopier lenke" / "Regenerer lenke"-knapper
- Kaller api/team-page-create og api/team-page-regenerate

### `vercel.json`

Ny rewrite-regel:
```json
{
  "source": "/lag/:token",
  "destination": "/lagside.html"
}
```

Ny header-regel:
```json
{
  "source": "/lag/:path*",
  "headers": [
    { "key": "X-Robots-Tag", "value": "noindex, nofollow" },
    { "key": "Cache-Control", "value": "no-store, max-age=0" }
  ]
}
```

### `privacy.html`

Ny seksjon 2.10:
```
2.10 Lagside (foreldre)

Treneren kan opprette en lagside — en nettadresse som deles med foresatte.
Lagsiden viser: lagets navn, kommende kamper og treninger med dato/tid/sted,
kampresultater, aggregert oppmøte (antall, ikke individuelle navn),
og eventuelt treningsinnhold og trenerens beskjed.

Foreldre som åpner lagsiden velger sitt barns fornavn fra spillerlisten
for å kunne registrere oppmøte. Valget lagres i nettleserens lokale lagring
(teknisk nødvendig funksjonskookie, ekomloven § 2-7b).

Alle med lenken kan se lagsiden. Treneren kan når som helst deaktivere
lenken eller generere en ny. Foresatte bør informeres om at barnas fornavn
er synlige for alle med lenken.

Behandlingsgrunnlag: berettiget interesse (GDPR art. 6 nr. 1 bokstav f) —
effektiv kommunikasjon mellom trener og foresatte om lagets aktiviteter.
```

### `terms.html`

Ny seksjon 5.2:
```
5.2 Lagside for foreldre

Lageier kan opprette en lagside — en nettadresse for foresatte.
Du er ansvarlig for å kun dele lenken med foresatte i laget,
i tråd med klubbens personvernrutiner. Lenken kan når som helst
deaktiveres via laginnstillinger i appen.
```

### `robots.txt`

Legg til:
```
Disallow: /lag/
```

---

## 5. DATAFLYT

```
Forelder åpner /lag/a7x9k2m4p8q1
          │
          ▼
    lagside.js parser token fra URL
          │
          ▼
    GET /api/team-page-read?token=...&player_id=p_xxx
          │
          ▼
    Serverless: team_pages → team_id → season → events → players
    Filtrering: fjern skill, positions, absence_reason, match_events,
                plan_json, grouping. Legg til aggregater.
          │
          ▼
    lagside.js rendrer kontekstuell side
          │
          ▼
    Forelder trykker "Kommer"
          │
          ▼
    POST /api/team-page-attend { token, event_id, player_id, status }
          │
          ▼
    Serverless: verifiser token → upsert event_players (supabaseAdmin)
          │
          ▼
    lagside.js refresher data
```

---

## 6. SIKKERHET

| Risiko | Tiltak |
|--------|--------|
| Token lekker utenfor foreldregruppe | Regenerer-knapp, 12-tegn entropi, kun fornavn eksponert |
| Brute force token-gjetting | 53 bits entropi = 9 quadrillion kombinasjoner, rate limit 30/min |
| Uautorisert oppmøteregistrering | Akseptabel risiko (identisk med WhatsApp "Oliver kommer ikke") |
| Søkemotorindeksering | noindex header, robots.txt, ingen OG med spillernavn |
| XSS via parent_message | Server-side escape, client-side textContent (ikke innerHTML) |
| SSRF/injection via token | Alfanumerisk whitelist-validering før DB-query |
| Persondata i response | Hardkodet server-side filtrering, aldri client-side |
| Link preview avslører spillernavn | OG-tags viser kun "Lagside — Barnefotballtrener" |

---

## 7. ESTIMAT

| Del | Timer |
|-----|-------|
| SQL: team_pages + ALTER events (4 kolonner) | 1 |
| api/team-page-create.js + regenerate.js | 2 |
| api/team-page-read.js (inkl. filtrering) | 3-4 |
| api/team-page-attend.js | 1-2 |
| lagside.html + lagside.css | 2-3 |
| lagside.js (rendering, oppmøte, spillervelger) | 4-6 |
| season.js: toggle-UI + lagside-knapper | 2-3 |
| vercel.json + robots.txt + privacy.html + terms.html | 1 |
| Testing (2 enheter, ulike spillere) | 2-3 |
| **Totalt** | **18-25 timer** |

---

## 8. MVP vs FULL

### MVP (ship first)

- Opprett/kopier lenke
- Neste hendelse med oppmøteknapper
- Kalender (kommende events)
- Kampresultat (uten rettferdighetsbevis)
- Spillervelger (localStorage)
- parent_message (trenerens beskjed)

### Fase 2

- Treningsinnhold (share_workout toggle)
- Rettferdighetsbevis (share_fairness toggle)
- Kampkommentar (share_comment)
- Månedsgruppering
- NFF aldersgruppe-info
- Forrige trening/kamp-kort

### Fase 3

- Regenerer lenke
- NFF sesongbalanse (aggregert)
- Fast treningsinfo fra training_series
- Push-varsler (web push, separat prosjekt)

---

## 9. BRANCH-STRATEGI

Ny branch: `lagside`

Filendringer:
- NYE: `lagside.html`, `lagside.css`, `lagside.js`, `api/team-page-create.js`,
  `api/team-page-regenerate.js`, `api/team-page-read.js`, `api/team-page-attend.js`
- ENDREDE: `season.js` (~30 linjer), `vercel.json` (~10 linjer),
  `privacy.html` (~15 linjer), `terms.html` (~8 linjer), `robots.txt` (1 linje)

Ingen endring i: `core.js`, `kampdag.js`, `workout.js`, `sesong-workout.js`,
`sesong-kampdag.js`, `index.html`.

Risiko for regresjoner: minimal. Lagsiden er en helt separat side med egne
API-endepunkter. De eneste eksisterende filene som endres er season.js
(additivt, nye toggles i event-detail) og vercel.json (ny rewrite).
