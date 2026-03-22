# Lagside — Teknisk arkitektur

Sist oppdatert: 15. mars 2026 (etter GDPR-opprydding + V2.2)

---

## OVERSIKT

En URL per lag (barnefotballtrener.no/lag/TOKEN), token-beskyttet, ingen innlogging.
Foreldre bokmerker lenken og ser: neste hendelse, kalender, kampresultat,
treningsinnhold (opt-in), trenerens beskjeder (oppslagstavle), iCal-eksport,
avlysningsbadger, og kampdag-logistikkort med kart-lenke.

Helt separat fra appen: lagside.html/js/css har null avhengigheter til index.html/core.js/season.js.

**GDPR-beslutning 15. mars 2026:** Lagsiden viser NULL barnedata. Ingen spillernavn,
ingen oppmøteregistrering, ingen picker, ingen passord. Ren informasjonstavle.

---

## 1. DATABASE

### Tabell: team_pages
```
id          UUID PK
team_id     TEXT NOT NULL  -> teams(id) ON DELETE CASCADE, UNIQUE
user_id     UUID           -> auth.users(id) ON DELETE SET NULL (nullable)
token       TEXT NOT NULL UNIQUE
active      BOOLEAN DEFAULT true
settings    JSONB DEFAULT '{}'
created_at  TIMESTAMPTZ
```

settings JSONB inneholder:
- `announcements[]` — maks 3 beskjeder med tekst, created_at, expires_at
- `default_share_workout` — bool, vis treningsinnhold
- `contact_info` — fritekst kontaktinfo

Fjernede settings-felter (GDPR-opprydding):
- `default_show_attendance_count` — fjernet, lagsiden viser ikke oppmøte
- `default_share_fairness` — fjernet
- `passcode` — fjernet, unødvendig uten barnedata

### Kolonner i events (for lagside)
```
parent_message  TEXT           — trenerens beskjed til foreldre
share_workout   BOOLEAN (f)   — vis treningsinnhold
share_fairness  BOOLEAN (f)   — vis "X spillere deltok"
share_comment   TEXT           — trenerens kampoppsummering
status          TEXT           — 'planned', 'completed', 'cancelled'
```

### Ubrukt kolonne (beholdt i DB)
```
event_players.parent_rsvp TEXT — foreldre-RSVP, ubrukt etter GDPR-opprydding
```

---

## 2. FILER

| Fil | Linjer (ca.) | Beskrivelse |
|---|---|---|
| lagside.html | 26 | Standalone HTML, noindex, Font Awesome CDN |
| lagside.css | ~340 | Egne CSS-variabler, mobil-first, safe-area, desktop grid |
| lagside.js | ~400 | IIFE, kalender, iCal-eksport, logistikk-kort, avlysning |
| team-page-create.js | ~160 | Autentisert, owner-only, host-validert |
| team-page-regenerate.js | ~120 | Autentisert, owner-only, host-validert |
| team-page-read.js | ~370 | Uautentisert, GDPR-filtrert, EX_MAP |
| team-page-attend.js | ~190 | Uautentisert, rate-limited (UBRUKT etter GDPR-opprydding) |

---

## 3. GDPR-FILTRERING (server-side)

### ALDRI på lagsiden
Skill, positions, absence_reason, minutes_played, match_events, plan_json,
grouping, konkurranser, individuell statistikk, **spillernavn**, **oppmøte per barn**.

### ALLTID på lagsiden
Event-info (dato, tid, sted, type, motstander), kampresultat,
NFF-info (aldersgruppe, varighet), trenerens beskjeder (oppslagstavle),
kontaktinfo, avlysningsstatus.

### OPT-IN
Treningsinnhold (share_workout per event), trenerens beskjed (parent_message per event).

---

## 4. FUNKSJONER (deployet)

### V2 (15. mars 2026)
- **Oppslagstavle:** Maks 3 beskjeder med valgfri utløpsdato
- **Lagside-settings:** Tappbart kort → snView='lagside-settings'
- **Desktop layout:** To-kolonne grid over 700px
- **Kontaktinfo:** Fritekstfelt vist i kontaktboks
- **Toggle:** Del treningsinnhold (per hendelse + global standard)

### V2.0-fix (15. mars 2026)
- **Fjernet barnedata:** Ingen spillernavn, picker, oppmøte, passord
- **robots.txt:** Disallow /lag/ og /api/
- **privacy.html:** Seksjon 2.10 om lagside (ingen barnedata å beskrive)
- **terms.html:** Seksjon 5.2 om lagside
- **vercel.json:** Cache headers, X-Robots-Tag, /lag/ rewrite
- **delete-account.js:** team_pages eierskap-overføring for delte lag

### V2.2 (15. mars 2026)
- **Ny-beskjed-prikk:** Rød dot på lagnavn når ny beskjed er lagt ut (3 sek mark-as-read)
- **iCal-eksport:** VTIMEZONE Europe/Oslo, Web Share API → Blob fallback
- **Kampdag-logistikkort:** Strukturert kort for kamper med klikkbar kart-lenke (Apple Maps iOS, Google ellers)
- **Avlysning-badge:** Trener kan avlyse/gjenopprette i appen, badge på lagside + kalender

---

## 5. SIKKERHET

- Token: 12 tegn base64url, ugjettbar
- Host-validert URL (samme allowlist som Stripe-endepunkter)
- Rate limit: 30/min
- XSS: esc() for all brukerinput
- noindex: meta-tag + robots.txt + X-Robots-Tag header (tre lag)
- Avlysning race guard: `.eq('status', 'planned')` forhindrer avlysning av completed
- Ingen barnedata eksponeres (GDPR-opprydding)

---

## 6. KVALITETSSIKRING

10 QA-runder gjennomført. 15+ bugs funnet og fikset, inkludert:
- GDPR: fjernet all barnedata fra lagsiden
- Settings-handler merger i stedet for å overskrive JSONB
- delete-account.js: team_pages i eierskap-overføring
- iCal: VTIMEZONE for korrekte norske tider
- Avlysning: race condition guard
- CSS: ingen `:has()` (kompatibilitet)
- isUpcoming: inkluderer cancelled (foreldre ser avlyste hendelser)
