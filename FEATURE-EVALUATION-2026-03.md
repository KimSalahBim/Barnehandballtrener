# Feature evaluation and build order — barnehandballtrener.no

**Dato:** 13. mars 2026  
**Basis:** Lesing av index.html, core.js, season.js, workout.js, sesong-workout.js, sesong-kampdag.js, competitions.js, onboarding.js, api/invite-coach.js, exercises-data.js, nff-data.js, REALTIME-SYNC-ARKITEKTUR.md.

---

## A. Planned features — scores (1–5)

| Feature | User value | Growth potential | Revenue impact | Impl cost | Risk |
|--------|------------|------------------|----------------|-----------|------|
| Parent sharing link | 4 | 3 | 2 | 4 | 3 |
| Match report | 5 | 4 | 3 | 2 | 1 |
| Quick-start from Home (next match → bytteplan) | 5 | 3 | 3 | 3 | 2 |
| Realtime sync code (kampsynk) | 5 | 2 | 2 | 2 | 3 |
| Sweden adaptation | 2 | 4 | 3 | 5 | 2 |
| Season plans (named blocks on calendar) | 3 | 2 | 1 | 4 | 3 |
| Monthly/period plan PDF | 3 | 1 | 1 | 3 | 2 |
| Training winners + Player of the month | 3 | 2 | 1 | 3 | 2 |
| Offline mode (service worker) | 4 | 2 | 2 | 5 | 4 |
| Push / matchday reminders | 4 | 3 | 2 | 4 | 3 |

---

## B. Per-feature detail (planned)

### 1. Parent sharing link (read-only, no login)

- **Files to change:** New `api/parent-link.js` (create/revoke token, RLS), new `parent-attendance.html` or route in SPA (minimal page that loads `parent-attendance.js`), `season.js` (button “Del oppmøtelink” in event-detail that calls API and copies link), `core.js` or `season.js` (optional: list “aktive lenker” in settings).
- **New files:** `api/parent-link.js`, `parent-attendance.js`, `parent-attendance.css`, optionally `parent-attendance.html` if not hash-route.
- **Schema:** New table `event_share_links` (id, event_id, token UUID, created_at, expires_at, user_id). RLS: token-based read of event + event_players for that event only; insert/delete only for event owner.
- **MVP (1–2 dager):** Generer token per event, lagre i DB, vis “Kopier lenke”-knapp i event-detail. Egen minimal side som ved `?token=xxx` henter event + event_players og viser sjekkliste (navn, avkryssing). Ingen endring av event_players fra foresatte i MVP — kun visning; registrering av oppmøte kan være fase 2.
- **Biggest risk:** Token-lekkasje (lenke deles vidt); begrens med utløp (f.eks. 7 dager) og evt. rate limit på token-oppslag.

---

### 2. Match report (shareable post-game summary)

- **Files to change:** `season.js` — i `renderEventDetail` for completed matches: ny seksjon “Kamprapport” med sammendrag (resultat, hvem spilte, målscorere/assists fra `match_events`, keepere). Knapp “Del rapport” som genererer HTML eller PDF (samme mønster som workout PDF) og åpner Web Share eller nedlasting.
- **New files:** Ingen obligatoriske. Ev. `season-report.js` med én funksjon `buildMatchReportHtml(ev, eventAttendance, matchGoals)` som season.js kaller.
- **Schema:** Ingen. Bruker `events`, `event_players`, `match_events` (allerede lastet i event-detail).
- **MVP (1–2 dager):** I event-detail for `status === 'completed'`: bygg enkel HTML (tittel, dato, resultat, liste “Spilte: X min” fra event_players, målscorere fra match_events). Knapp som åpner i nytt vindu med “Lagre som PDF” / Web Share.
- **Biggest risk:** Lav. Isolert i event-detail-rendering; ingen ny state eller API.

---

### 3. Quick-start from Home (next match → one-click bytteplan)

- **Files to change:** `core.js` — ved vis av Spillere-fanen (eller ny “Hjem”-seksjon øverst): hent “neste kamp” (krever at season-modulen eksponerer eller at core henter fra Supabase). Alternativ: `season.js` eksponerer `window.__BF_getNextMatch(cb)` som core kaller. `index.html`: ev. ny seksjon over spillere-listen, eller ny tab “Hjem” i bunnmenyen som viser kort fra season (neste kamp + knapp).
- **New files:** Ev. `home-quick.js` (tynn modul som kobler core UI til season/campaign) for å unngå å legge for mye i core.js.
- **Schema:** Ingen. Leser `events` (filter: team/season, start_time >= now, type match/cup_match, sortert asc, limit 1). Team/season må være bestemt — f.eks. “siste brukte sesong” lagret i user_data eller localStorage.
- **MVP (1–2 dager):** På Spillere-fanen: under header, en boks “Neste kamp: [dato] [motstander]” + knapp “Lag bytteplan”. Klikk: naviger til Sesong → velg sesong hvis flere → åpne den kampen i event-detail → auto-åpne embedded kampdag (sesong-kampdag). Krever at core kan trigge “gå til sesong, åpne event X” (f.eks. hash `#sesong/event/EVENT_ID` eller `window.dispatchEvent` som season.js lytter på).
- **Biggest risk:** Kobling core ↔ season (navigasjon, hvilken sesong er “aktiv”). Begrens til: “én sesong per lag” eller “siste åpnede sesong” slik at du ikke må velge sesong i quick-start.

---

### 4. Realtime sync code (kampsynk)

- **Files to change:** `season.js` — `startMatchSync`, `stopMatchSync`, `handleMatchEventChange`, `handleEventUpdate`, `refreshMatchUI` (ca. 80–100 linjer som i REALTIME-SYNC-ARKITEKTUR.md). Kall `startMatchSync(editingEvent.id)` i `renderEventDetail` når ev.type er match/cup_match; kall `stopMatchSync()` i `render()` når snView !== 'event-detail'. `season.css` eller `style.css`: liten “Live”-indikator.
- **New files:** Ingen.
- **Schema:** Ingen. Realtime er allerede aktivert på `match_events` og `events` i Supabase (per doc).
- **MVP (1–2 dager):** Kun P1 (kampsynk): mål/assists og resultat oppdateres på den andre trenerens skjerm innen 1–2 s. Oppmøte-synk (P2) kan være dag 2.
- **Biggest risk:** Subscription ikke stoppet ved navigering (minne/feil). Doc anbefaler defensiv `stopMatchSync()` i render(); følg det. Dobbel re-render ved egen endring kan dempes med user_id-sjekk i handler.

---

### 5. Sweden adaptation (3-period, barnfotboll.se)

- **Files to change:** `kampdag.js` og `sesong-kampdag.js` — algoritme må støtte 3 like perioder; format/labels på svensk. `season.js` — NFF-aldersregler erstattes/utvides med SvFF-regler for 6–12 år. UI-strenger: ny locale/språkfil eller branch for svensk.
- **New files:** Ev. `locale-sv.js`, `nff-data-sv.js` (eller utvid nff-data med språk).
- **Schema:** Ev. `teams.locale` eller app-wide setting for markedsbruk.
- **MVP (1–2 dager):** Ikke mulig i 1–2 dager. Minste MVP: egen deploy (bartfotboll.se) med hardkodet svensk + 3-period-algoritme kun for det formatet.
- **Biggest risk:** Duplisering av logikk (kampdag, sesong) mellom NO/SV; vedlikehold dobles. Anbefaling: parametriser periodeantall og regler, én kodebase.

---

### 6. Season plans (named blocks on calendar)

- **Files to change:** `season.js` — ny state og render for “planblokker” (navn, start/sluttdato, farge) som overlay på kalenderen. Dashboard kalender-tab: tegne blokker over event-listen eller i egen seksjon.
- **New files:** Ev. `season-plans.js` (ren modul for CRUD planblokker).
- **Schema:** Ny tabell `season_plan_blocks` (id, season_id, user_id, name, start_date, end_date, color, sort_order). RLS som events.
- **MVP (1–2 dager):** Kun visning: hardkode 1–2 blokker i frontend for én sesong for å validere UI. Full CRUD + persistence er dag 3+.
- **Biggest risk:** Kalender-UI blir raskt komplekst (overlap, sortering). Hold MVP til listevisning “Plan: Pre-season 1.–15. jan” over event-listen.

---

### 7. Monthly plan PDF / Period plan PDF

- **Files to change:** `season.js` — ny funksjon som bygger HTML for valgt måned/periode (events + ev. planblokker), samme mønster som iCal-eksport. Knapp “Last ned månedsplan (PDF)” som åpner nytt vindu med print-styles.
- **New files:** Ingen.
- **Schema:** Ingen.
- **MVP (1–2 dager):** I dashboard kalender: knapp “PDF for denne måneden”. Hent events i måned, bygg tabell (dato, type, tittel/motstander, sted), window.open + document.write + window.print().
- **Biggest risk:** Lav. Isolert funksjon som leser eksisterende events.

---

### 8. Training winners + Player of the month

- **Files to change:** `competitions.js` — allerede konkurranser med plasseringer. Utvid med “Mesterens mester”-aggregering over sesong (hvem vant flest enkeltøkter) og “Spiller av måneden” (manuell valg eller avledet fra konkurranser). `season.js` stats-tab eller egen liten seksjon: vis “Vinnere treningskonkurranser”, “Spiller av måneden”.
- **New files:** Ev. `season-highlights.js` som leser competitions-store og event-data.
- **Schema:** Ev. `user_data` nøkkel `season_highlights` (vinnere, spiller av måned) eller ny tabell. Competitions bruker i dag localStorage + _bftCloud.
- **MVP (1–2 dager):** “Spiller av måneden” = én navnevelger per måned lagret i user_data; vis i stats eller dashboard. “Treningsvinnere” = liste topp-3 fra eksisterende konkurranser (les competitions-store); vis i samme seksjon.
- **Biggest risk:** NFF-hensyn (ikke rangere barn offentlig). Hold det internt i appen og tydelig “for trenerens egen bruk”.

---

### 9. Offline mode (service worker)

- **Files to change:** Ny `sw.js` som cache-first for statiske filer og app shell; nettverk-first for API/Supabase. `index.html` eller `core.js`: registrering av service worker. Manifest allerede PWA-klar.
- **New files:** `sw.js`, ev. `sw-precache-config.js`.
- **Schema:** Ingen.
- **MVP (1–2 dager):** Ekstremt begrenset: cache index.html, core.js, style.css slik at “ingen nett” viser siste shell. Supabase-kall feiler uten nett uansett; full offline med queue krever langt mer (2–3 uker).
- **Biggest risk:** Høy. Cache-invalidering, versjonering, iOS-edge cases. Uten full offline-datasynk er brukervinningen liten.

---

### 10. Push notifications / matchday reminders

- **Files to change:** Backend: Vercel cron eller Supabase Edge Function som kjører daglig, finner events neste 24t, sender push via OneSignal/Firebase/Web Push. `core.js` eller onboarding: be om push-tillatelse, send subscription til eget API som lagrer i DB.
- **New files:** `api/push-subscribe.js`, `api/cron-send-reminders.js` (eller Supabase fn), ev. `push-manager.js` i frontend.
- **Schema:** `push_subscriptions` (id, user_id, endpoint, keys, created_at). RLS: user kan bare lese/slette egne.
- **MVP (1–2 dager):** Kun frontend: Web Push API, be om tillatelse, lagre subscription til eget endpoint. Ingen faktisk sending i MVP.
- **Biggest risk:** Brukere blokkerer varsler; iOS Web Push har begrenset støtte. Uforutsigbar leveringsrate.

---

## C. New ideas from codebase (3+)

### 11. “Kopier forrige ukes treningsøkt” (copy last week’s session)

- **Beskrivelse:** I Sesong → trening med tilknyttet økt: knapp “Bruk samme økt som forrige uke” eller “Kopier økt fra [dato]” som dupliserer blokkene til dagens/denne treningen.
- **Files to change:** `season.js` (renderEmbeddedWorkout / event-detail for training): finn siste workout for samme sesong/event-type, hent blocks, kall sesongWorkout med existingBlocks. `workout.js` / `sesong-workout.js`: allerede støtte for existingBlocks ved init.
- **New files:** Ingen.
- **Schema:** Ingen. Workouts har allerede event_id og season_id; spør siste workout for season der event_id er null eller for annen trening.
- **MVP (1–2 dager):** I event-detail for trening: knapp “Kopier fra forrige trening”. Hent siste lagret workout for currentSeason (event_id != null), last inn blocks i embedded workout-editor.
- **Scores:** User 4, Growth 2, Revenue 2, Cost 2, Risk 1.

---

### 12. “Neste kamp”-kort på Spillere-fanen (uten full quick-start)

- **Beskrivelse:** Øverst på Spillere-fanen: “Neste kamp: lørdag 15. mars vs X” med lenke “Gå til kamp” (hash til sesong + event). Ingen one-click generering i første omgang.
- **Files to change:** `core.js`: ved render av #players, hent “neste kamp” (krever tilgang til events — f.eks. window.__BF_getNextMatch fra season.js eller egen Supabase-query med team_id og events.start_time). Vis kort + lenke. `season.js`: eksponer `window.__BF_getNextMatch = function() { return nextMatchPromise; }` som henter fra loadSeasons/loadEvents hvis bruker har åpnet sesong, ellers enkel query.
- **New files:** Ingen.
- **Schema:** Ingen.
- **MVP (1–2 dager):** core.js: ved init eller ved vis av Spillere, kall API eller window.__BF_getNextMatch(); vis én linje + knapp “Åpne i Sesong”. Enklest hvis season.js ved loadSeasons cacher “neste kamp” per team og eksponerer den.
- **Scores:** User 5, Growth 3, Revenue 3, Cost 2, Risk 2.

---

### 13. Kamprapport som egen delbar side (shareable URL)

- **Beskrivelse:** Etter fullført kamp: “Del kamprapport” genererer en offentlig (eller token-beskyttet) URL som viser rapporten (resultat, spilletid, målscorere) uten innlogging. Foresatte kan åpne lenken.
- **Files to change:** `season.js`: bygg rapport-URL (f.e. `/report.html?id=EVENT_ID&token=SHORT_TOKEN`). Ny side `report.html` + `report.js` som henter event, event_players, match_events via public API eller Supabase med RLS som tillater les med token. Backend: `api/report-public.js` som ved token validerer og returnerer kun nødvendige felter.
- **New files:** `report.html`, `report.js`, `api/report-public.js` (eller Supabase fn). Ev. tabell `event_share_tokens` (event_id, token, expires_at).
- **Schema:** Samme som parent link ev. — token per event med kort levetid.
- **MVP (1–2 dager):** Token lagres i `event_share_tokens`; rapport-URL med token; statisk report.html som kaller API med token og viser read-only HTML. Ingen redigering.
- **Scores:** User 5, Growth 4, Revenue 3, Cost 3, Risk 2.

---

### 14. Sesong-oversikt på første åpning (empty state)

- **Beskrivelse:** Når bruker har sesonger men ikke har åpnet Sesong-fanen i denne økten: vis på Mer-menyen eller som liten banner “Du har 2 kommende kamper denne uken” med direkte lenke til sesong.
- **Files to change:** `core.js` (Mer-meny eller header): ved klikk Mer, hent kommende events (samme som “neste kamp”) og vis antall. Ev. `season.js` eksponerer `getUpcomingCount()`.
- **New files:** Ingen.
- **Schema:** Ingen.
- **MVP (1–2 dager):** season.js: ved loadSeasons/loadEvents, sett window.__BF_upcomingCount (antall events start_time >= i dag, samme team). Core: i Mer-popup vis “X kommende kamper/treninger” og lenke til #sesong.
- **Scores:** User 3, Growth 2, Revenue 1, Cost 1, Risk 1.

---

## D. Ranked build order (alle 14)

| Rank | Feature | One-sentence justification |
|------|---------|----------------------------|
| 1 | **Realtime sync code (kampsynk)** | Allerede designet og lav implementasjonskostnad; løser reell smerte for to trenere samtidig og styrker differensiator. |
| 2 | **Match report (shareable)** | Høy brukerværdi, ingen schema-endring, isolert i season.js; rask å levere og enkelt å dele med foresatte. |
| 3 | **Quick-start / “Neste kamp”-kort** | Øker daglig bruk av bytteplan; start med enkel “Neste kamp”-kort på Spillere (rank 3a) deretter one-click bytteplan (rank 3b). |
| 4 | **Kopier forrige ukes treningsøkt** | Rask å bygge, bruker eksisterende workout/event API; sparer tid for trenere som kjører lik økt uke til uke. |
| 5 | **Kamprapport som delbar URL** | Naturlig utvidelse av match report; øker deling og potensiell vekst; kan bruke samme token-mønster som parent link senere. |
| 6 | **Monthly/period plan PDF** | Liten endring, nyttig for trenere som vil skrive ut månedsoversikt; ingen ny state eller schema. |
| 7 | **Training winners + Spiller av måneden** | Bygger på competitions.js; tydelig NFF-hensyn (internt bruk); moderat verdi for engasjement. |
| 8 | **Parent sharing link** | Stor verdi for oppmøte, men krever ny side, API og schema; gjør etter at rapport-delbar URL og token-mønster er på plass. |
| 9 | **Sesong-oversikt i Mer (upcoming count)** | Svært billig; bedre discoverability av sesong uten å endre arkitektur. |
| 10 | **Push / matchday reminders** | God idé på sikt; krever backend og abonnementslagring; start med kun “lagre subscription” i frontend. |
| 11 | **Season plans (named blocks)** | Nyttig for planlegging, men krever ny tabell og mer kalender-UI; gjør etter at enklere sesong-features er ute. |
| 12 | **Sweden adaptation** | Høy vekstpotensial men høy kostnad og vedlikeholdsbyrde; kun anbefalt hvis du aktivt vil gå inn i SV-markedet med egen deploy. |
| 13 | **Offline mode** | Stor teknisk risiko og begrenset nytte uten full offline-datasynk; utsett til PWA-strategi er avklart. |

---

## E. Supabase-schema (inferred from code)

Brukte tabeller i dag: `teams`, `team_members`, `players`, `user_data`, `seasons`, `events`, `event_players`, `match_events`, `season_players`, `workouts`, `training_series`. For parent link og delbar rapport: `event_share_links` eller `event_share_tokens` (event_id, token, expires_at, user_id). For push: `push_subscriptions`. For season plans: `season_plan_blocks`. Resten av planlagte features trenger ikke nye tabeller i MVP.
