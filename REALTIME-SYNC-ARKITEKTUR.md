# Trener-synk med Supabase Realtime — Arkitektur

**Dato:** 12. mars 2026
**Status:** Design
**Branch:** realtime-sync (fra main)
**Prioritet 1:** Kampsynk (mål, resultat)

---

## PROBLEMET

Kim og Øyvind trener sammen. Under kamp registrerer Øyvind et mål. Kim ser det ikke
før han refresher appen. Begge må stå med mobilen for å ha oppdatert bilde.
Samme problem gjelder oppmøte, treningsøkter, og spillerendringer.

## LØSNINGEN

Supabase Realtime subscriptions. Appen lytter på endringer i tabellene og oppdaterer
UI automatisk innen 1-2 sekunder.

---

## FORUTSETNINGER

### Supabase-klient
`@supabase/supabase-js@2` er allerede lastet fra CDN. Realtime er inkludert.
Klienten er tilgjengelig som `window.supabase` etter auth.js init.

### Supabase Dashboard — må gjøres manuelt
Realtime må aktiveres per tabell i Supabase Dashboard:
1. Gå til Database → Replication
2. Aktiver Realtime for disse tabellene:
   - `match_events` (mål, assists)
   - `events` (resultat, status, oppmøte-endringer)
   - `event_players` (oppmøte)
3. Valgfritt (fase 2): `players`, `workouts`

Uten dette steget fungerer ikke subscriptions. RLS gjelder også for Realtime.

---

## PRIORITET 1: KAMPSYNK

### Tabeller som lyttes på

| Tabell | Hva | Hendelser |
|---|---|---|
| match_events | Mål og assists | INSERT, DELETE |
| events | Resultat (result_home, result_away, status) | UPDATE |

### Nye funksjoner i season.js

```javascript
// ─── REALTIME SYNC ────────────────────────────────────────

var _rtChannel = null;   // aktiv Supabase channel
var _rtEventId = null;   // event-ID vi lytter på

function startMatchSync(eventId) {
  stopMatchSync(); // rydd opp forrige

  var sb = getSb();
  if (!sb || !eventId) return;

  _rtEventId = eventId;

  _rtChannel = sb.channel('match-' + eventId)
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'match_events',
      filter: 'event_id=eq.' + eventId
    }, function(payload) {
      console.log('[realtime] match_events:', payload.eventType);
      handleMatchEventChange(payload);
    })
    .on('postgres_changes', {
      event: 'UPDATE',
      schema: 'public',
      table: 'events',
      filter: 'id=eq.' + eventId
    }, function(payload) {
      console.log('[realtime] events UPDATE:', payload.new);
      handleEventUpdate(payload);
    })
    .subscribe(function(status) {
      console.log('[realtime] subscription status:', status);
    });
}

function stopMatchSync() {
  if (_rtChannel) {
    _rtChannel.unsubscribe();
    _rtChannel = null;
  }
  _rtEventId = null;
}

function handleMatchEventChange(payload) {
  // Ignorer egne endringer (valgfritt, men unngår dobbel rendering)
  // payload.new.user_id === getUserId() → kan skippes

  if (payload.eventType === 'INSERT') {
    // Nytt mål/assist — legg til i matchGoals uten å reloade fra DB
    var existing = matchGoals.find(function(g) { return g.id === payload.new.id; });
    if (!existing) {
      matchGoals.push(payload.new);
      refreshMatchUI();
    }
  } else if (payload.eventType === 'DELETE') {
    // Mål slettet — fjern fra matchGoals
    matchGoals = matchGoals.filter(function(g) { return g.id !== payload.old.id; });
    refreshMatchUI();
  }
}

function handleEventUpdate(payload) {
  var newData = payload.new;
  // Oppdater event-data i local state
  if (viewEvent && viewEvent.id === newData.id) {
    if (newData.result_home !== undefined) viewEvent.result_home = newData.result_home;
    if (newData.result_away !== undefined) viewEvent.result_away = newData.result_away;
    if (newData.status !== undefined) viewEvent.status = newData.status;
    refreshMatchUI();
  }
}

function refreshMatchUI() {
  // Re-render kun mål/resultat-delen, ikke hele event-detail
  var goalsContainer = document.getElementById('snMatchGoals');
  var resultContainer = document.getElementById('snMatchResult');
  if (goalsContainer) renderMatchGoalsInto(goalsContainer);
  if (resultContainer) renderMatchResultInto(resultContainer);
}
```

### Hvor subscriptions starter/stoppes

| Hendelse | Aksjon |
|---|---|
| renderEventDetail() kalles for en kamp | startMatchSync(eventId) |
| Navigerer bort fra event-detail | stopMatchSync() |
| Bytter sesong/lag | stopMatchSync() |
| Tab-bytte bort fra Sesong | stopMatchSync() |

### Endringer i renderEventDetail

```javascript
// I renderEventDetail(), etter at kamp-UI er bygget:
if (ev.type === 'match' || ev.type === 'kamp') {
  startMatchSync(ev.id);
}
```

### Endringer i render() (navigering)

```javascript
// I render(), før switch(snView):
if (snView !== 'event-detail') {
  stopMatchSync();
}
```

---

## UI-INDIKATOR

Vis en liten puls/ikon som viser at live-synk er aktiv:

```
🟢 Live  (når subscription er aktiv)
⚪ —     (når ingen synk)
```

Plassering: i event-detail header, ved siden av kamptittel.

---

## PRIORITET 2: OPPMØTE-SYNK (fase 2)

Legg til `event_players` i subscription:

```javascript
.on('postgres_changes', {
  event: '*',
  schema: 'public',
  table: 'event_players',
  filter: 'event_id=eq.' + eventId
}, function(payload) {
  handleAttendanceChange(payload);
})
```

Ved endring: reload oppmøtelisten og re-render.

---

## PRIORITET 3: SPILLERADMIN + TRENINGSØKT (fase 3)

Separat channel for hele teamet (ikke per event):

```javascript
sb.channel('team-' + teamId)
  .on('postgres_changes', {
    event: '*', schema: 'public', table: 'players',
    filter: 'team_id=eq.' + teamId
  }, handlePlayerChange)
  .on('postgres_changes', {
    event: '*', schema: 'public', table: 'workouts',
    filter: 'team_id=eq.' + teamId
  }, handleWorkoutChange)
  .subscribe();
```

Denne starter ved app-init og kjører hele tiden.

---

## FILER SOM ENDRES

### Prioritet 1 (kampsynk)
| Fil | Endring | Linjer |
|---|---|---|
| season.js | startMatchSync, stopMatchSync, handleMatchEventChange, handleEventUpdate, refreshMatchUI + kall fra renderEventDetail og render | ~80-100 |
| style.css | Live-indikator styling (pulserende grønn prikk) | ~10 |

### Prioritet 2 (oppmøte)
| Fil | Endring | Linjer |
|---|---|---|
| season.js | handleAttendanceChange, oppdater oppmøte-UI | ~30-40 |

### Prioritet 3 (spillere + treningsøkt)
| Fil | Endring | Linjer |
|---|---|---|
| core.js | Team-level subscription, handlePlayerChange | ~40-50 |
| workout.js / sesong-workout.js | handleWorkoutChange | ~20-30 |

---

## SUPABASE DASHBOARD-SJEKKLISTE

Før deploy:
- [ ] Aktiver Realtime Replication på `match_events`
- [ ] Aktiver Realtime Replication på `events`
- [ ] Aktiver Realtime Replication på `event_players` (fase 2)
- [ ] Verifiser at RLS policies tillater SELECT for team_members (allerede OK)

---

## TESTING

1. Åpne appen i to nettleservinduer med to forskjellige brukere (Kim + Øyvind)
2. Begge åpner samme kamp
3. Kim legger til mål → Øyvind ser det innen 2 sek
4. Øyvind lagrer resultat → Kim ser det innen 2 sek
5. Test med mobilnett (3G/4G) for latency
6. Test at subscription ryddes opp ved navigering (ingen memory leaks)

---

## RISIKO

| Risiko | Sannsynlighet | Konsekvens | Tiltak |
|---|---|---|---|
| Supabase Realtime er ustabilt på dårlig nett | Middels | Forsinkede oppdateringer | Klienten reconnector automatisk. Fallback: manuell refresh fungerer som før |
| Dobbel rendering ved egen endring | Lav | Flimring i UI | Filtrer ut egne endringer via user_id |
| RLS blokkerer subscription | Lav | Ingen data | Allerede testet med team_members |
| Subscription-lekkasje (glemmer å stoppe) | Middels | Ytelsesproblemer | Defensiv stopMatchSync() i render() |

---

## ESTIMAT

| Del | Timer |
|---|---|
| Supabase Dashboard: aktiver Realtime | 0.5 |
| season.js: kampsynk (P1) | 3-4 |
| UI-indikator (live-prikk) | 0.5 |
| Testing med to brukere | 1-2 |
| **Totalt P1** | **5-7** |
| Oppmøte-synk (P2) | 2-3 |
| Spilleradmin + treningsøkt (P3) | 3-4 |

---

## VIKTIGE DESIGNBESLUTNINGER

1. **Filter per event, ikke per team.** Å lytte på alle match_events for hele teamet
   ville gi unødvendig trafikk. Vi filtrerer på event_id.

2. **Optimistisk UI beholdes.** Når treneren legger til et mål, vises det umiddelbart
   (som i dag). Realtime-meldingen fra den andre treneren legger til uten å fjerne.

3. **Ingen konfliktløsning.** Siste skriver vinner. For mål (INSERT) er dette uproblematisk.
   For resultat (UPDATE) kan det i teorien overskrive, men i praksis setter bare én
   trener resultatet.

4. **Subscription per view, ikke global.** Starter kun når man er inne i en kamp.
   Minimerer ressursbruk og forenkler lifecycle.
