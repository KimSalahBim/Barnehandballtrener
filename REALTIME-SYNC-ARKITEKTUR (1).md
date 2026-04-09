# Trener-synk med Supabase Realtime — Arkitektur

**Dato:** 12. mars 2026 (design), 15. mars 2026 (implementert og deployet)
**Status:** ✅ IMPLEMENTERT OG DEPLOYET I MAIN
**Fil:** season.js (alle funksjoner integrert i IIFE)

---

## OVERSIKT

Supabase Realtime subscriptions gir live-synk mellom trenere som deler lag.
Når Øyvind registrerer mål, ser Kim det innen 1-2 sekunder uten refresh.

Alt under er implementert og deployet. Koden er i season.js.

---

## HVA SOM ER DEPLOYET

### Variabler (toppen av season.js IIFE)
```
_rtChannel        — aktiv Supabase Realtime channel (per event)
_rtEventId        — event-ID vi lytter på
_rtSeasonChannel  — sesong-level channel (5 subscriptions)
_rtAttendanceTimer — debounce for oppmøte-reload
```

### Funksjoner i season.js
```
startMatchSync(eventId)      — starter per-event channel med 3 subscriptions
stopMatchSync()              — rydder opp channel + timer
handleMatchEventChange(p)    — INSERT/DELETE mål i matchGoals array
handleAttendanceChange(p)    — debounced reload av oppmøteliste
handleEventUpdate(p)         — oppdaterer resultat/status i viewEvent
startSeasonSync(seasonId)    — sesong-level channel med 5 tabeller
stopSeasonSync()             — rydder opp sesong-channel
```

### Subscriptions

**Per-event channel** (startes i renderEventDetail for delte lag):
| Tabell | Hendelser | Handler |
|---|---|---|
| match_events | INSERT, DELETE | handleMatchEventChange |
| events | UPDATE | handleEventUpdate |
| event_players | * | handleAttendanceChange |

**Per-sesong channel** (startes i openSeason for delte lag):
| Tabell | Hendelser | Filter |
|---|---|---|
| events | * | season_id=eq.X |
| event_players | * | season_id=eq.X |
| match_events | * | (via events join) |
| season_players | * | season_id=eq.X |
| training_series | * | season_id=eq.X |

### Lifecycle
| Hendelse | Aksjon |
|---|---|
| openSeason() for delt lag | startSeasonSync(seasonId) |
| renderEventDetail() for kamp/trening | startMatchSync(eventId) |
| Navigerer bort fra event-detail | stopMatchSync() |
| Bytter sesong/lag | stopMatchSync() + stopSeasonSync() |
| Tab-bytte bort fra Sesong | stopMatchSync() + stopSeasonSync() |

### Guard: Kun delte lag
```javascript
if (isSharedTeam()) {
  startMatchSync(ev.id);
}
```
Solo-lag får ikke Realtime (unødvendig, bare én bruker).

---

## SUPABASE-KONFIGURASJON (allerede gjort)

8 tabeller har Realtime Replication aktivert + REPLICA IDENTITY FULL:
events, event_players, match_events, players, season_players, seasons, training_series, workouts

Verifisert via: `SELECT tablename FROM pg_publication_tables WHERE pubname = 'supabase_realtime'`

---

## DESIGNBESLUTNINGER (beholdt fra design-fasen)

1. **Filter per event, ikke per team.** Per-event channel filtrerer på event_id.
2. **Optimistisk UI.** Egen endring vises umiddelbart, Realtime legger til den andres.
3. **Ingen konfliktløsning.** Siste skriver vinner. Akseptabelt for barnehåndball.
4. **Subscription per view.** Starter kun når man er inne i en hendelse. Minimerer ressursbruk.
5. **Debounce på oppmøte.** handleAttendanceChange bruker _rtAttendanceTimer for å unngå rapid-fire reloads.

---

## GJENSTÅR (ikke-kritisk)

- UI-indikator (pulserende grønn prikk) for å vise at live-synk er aktiv — ikke implementert, lav prioritet
- Prioritet 3 (spilleradmin + treningsøkt team-level channel i core.js) — ikke implementert, lav prioritet
