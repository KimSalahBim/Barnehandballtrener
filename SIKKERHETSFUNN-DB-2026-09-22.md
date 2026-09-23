# Sikkerhetsfunn i databasen – 22. og 23.09.2026

Gjennomgang av Supabase-prosjekt `fzwxcicpuaqzggpyjvkr` (eu-central-2) før lansering.
Alle funn er verifisert ved å kjøre spørringer som rollene `anon` og `authenticated`,
ikke ved lesing av policy-definisjoner alene.

Dokumentet er vedlegg til `DPIA-VURDERING-2026-03-01.md` seksjon 5.

## Status: rettet

To migrasjoner er kjørt mot produksjon:

- `lockdown_clubs_user_access_and_definer_rpcs` (22.09) for punkt 1 til 4
- `fix_team_members_selfjoin_and_client_writes` (23.09) for punkt 7 og 8

Etter rettingen viser Supabase security advisor null funn utenom «leaked password
protection» (se punkt 5).

---

## 1. `clubs` var åpen for alle, også uinnloggede (alvorlig)

Policyen het «Service role manages clubs», men var definert som
`FOR ALL TO public USING (true)`. `public` betyr alle roller, inkludert `anon`.
Kombinert med `GRANT ALL` til `anon` betydde det at hvem som helst med den offentlige
anon-nøkkelen (som ligger åpent i `env.js`, slik den skal) kunne lese, endre, opprette
og slette klubbrader via `/rest/v1/clubs`.

Verifisert: som `anon` ble en testrad både lest, oppdatert og slettet uten feil.

Eksponert data ville vært klubbnavn, invitasjonskoder, antall lisensplasser og
`paid_until`. Faktisk skade: ingen. Tabellen var tom (0 rader) på funntidspunktet.

**Rettet:** policyen erstattet med en som kun gjelder `service_role`, og alle
rettigheter trukket tilbake fra `anon` og `authenticated`. Klientkoden leser aldri
`clubs` direkte, bare `/api`-endepunktene med tjenestenøkkel.

## 2. Innlogget bruker kunne gi seg selv betalt tilgang (alvorlig)

To veier, begge verifisert:

- **`club_members`:** policyen `ALL USING (auth.uid() = user_id)` uten egen
  `WITH CHECK` betyr at USING-uttrykket også brukes som innsettingssjekk. En innlogget
  bruker kunne sette inn sin egen rad med hvilken som helst `club_id` og dermed få
  klubblisens uten betaling og uten å telle mot antall plasser.
  `api/subscription-status.js` (`getClubStatus`) gir tilgang basert på nettopp den raden.
- **`user_access`:** samme mønster. Brukeren kunne sette `trial_ends_at` til hvilken
  som helst dato. `checkTrialStatus` leser feltet med tjenestenøkkel og stoler på det,
  altså gratis tilgang på ubestemt tid.

**Rettet:** INSERT/UPDATE/DELETE trukket tilbake fra `anon` og `authenticated` på begge
tabeller. SELECT beholdt for `authenticated` (RLS begrenser fortsatt til egen rad).
Beholdt bevisst, siden det er ufarlig og reduserer risikoen for å bryte noe.

Kontrollert mot faktisk trafikk før innstrammingen: all trafikk mot
`/rest/v1/user_access` og `/rest/v1/club_members` i `edge_logs` kommer fra
`service_role` med user-agent `node`, altså API-rutene på Vercel. Ingen kall fra
nettleser med `authenticated`-rolle. Verifisert i etterkant at `join_club_safe`
fortsatt kjører gjennom hele løpet som `service_role`.

## 3. `get_user_id_by_email` kunne kalles uten innlogging (middels)

SECURITY DEFINER-funksjon med EXECUTE til `public`, `anon` og `authenticated`.
Verifisert som `anon`: en registrert e-postadresse returnerte bruker-UUID, en ukjent
adresse returnerte null.

Det gir to ting til hvem som helst: bekreftelse på om en e-postadresse har konto
(kontoenumerering), og den interne bruker-IDen. Begge er personopplysninger etter GDPR.
Vurdering av meldeplikt står i DPIA-en seksjon 5.3.

**Rettet:** EXECUTE trukket tilbake fra `public`, `anon` og `authenticated`.
Funksjonen brukes kun fra `api/invite-coach.js` med tjenestenøkkel.

## 4. `join_club_safe` og `rls_auto_enable` eksponert, manglende search_path (lav)

`join_club_safe(p_user_id, p_invite_code)` tar bruker-IDen som parameter i stedet for
å bruke `auth.uid()`. Den var kallbar av `anon`, så med en gyldig invitasjonskode kunne
hvem som helst melde en vilkårlig bruker inn i en klubb. API-laget gjør det riktig
(bruker `user.id` fra verifisert JWT), men RPC-en kunne nås direkte utenom API-et.

`rls_auto_enable()` er en event-trigger-funksjon og ville feilet ved direkte kall,
men hadde ingen grunn til å være eksponert.

To funksjoner manglet låst `search_path` (advisor: `function_search_path_mutable`).

**Rettet:** EXECUTE trukket tilbake fra `public`, `anon`, `authenticated` på alle tre.
`search_path` satt til `pg_catalog` og `pg_catalog, public`.

## 5. Gjenstår: lekkasjesjekk av passord

Supabase Auth kan sjekke nye passord mot HaveIBeenPwned. Den er av. Dette er en bryter
i dashbordet (Authentication → Sign In / Providers → Password), ikke noe som kan settes
via SQL. Kilde: https://supabase.com/docs/guides/auth/password-security

## 6. Gjenstår: loggoppbevaring på 24 timer

Loggene (`edge_logs`, `postgres_logs`, `auth_logs`) rekker bare ett døgn tilbake på
gjeldende abonnement. Det holder ikke til å etterforske et avvik som oppdages senere
enn et døgn etter at det skjedde, og gjør at fravær av uautorisert tilgang ikke kan
dokumenteres historisk. Relevant for dokumentasjonsplikten i GDPR art. 33 nr. 5.
Bør vurderes før lansering.

## 7. En bruker kunne melde seg selv inn i et hvilket som helst lag (middels, latent)

Funnet 23.09 under en full gjennomgang av begge prosjektene.

`team_members` hadde én policy, `FOR ALL USING (auth.uid() = user_id OR auth.uid() =
owner_id)`, uten egen `WITH CHECK`. Da brukes USING-uttrykket også som innsettingssjekk,
og en innlogget bruker kunne sette inn en rad med seg selv som `user_id` og en vilkårlig
`team_id`. Verifisert: innsettingen gikk gjennom uten feil.

I dag gir det ingen datatilgang, fordi ingen annen policy i håndball-prosjektet stoler
på `team_members`. Men appen er bygget for delte lag: `core.js` `loadTeams()` henter
aktive medlemskap og slår opp lagene. Den delen virker ikke i dag, nettopp fordi
`teams`-policyen bare tillater `auth.uid() = user_id`. I det øyeblikket den policyen
åpnes for deling, blir dette hullet til full lesetilgang til andres lag og spillere.

**Rettet:** den brede policyen er erstattet med fire policyer, én per kommando.
INSERT krever nå at brukeren eier laget:
`auth.uid() = user_id and exists (select 1 from teams t where t.id = team_id and t.user_id = auth.uid())`.
Invitasjoner opprettes av `api/invite-coach.js` med tjenestenøkkel og går utenom RLS.
Etterkontroll: forsøk på å melde seg inn i et fremmed lag avvises, mens
«opprett lag og egen owner-rad» fortsatt virker.

## 8. Klienten kunne endre hvilken som helst kolonne i team_members (middels)

Samme tabell. Klienten trenger bare å sette `status='active'` når en trener aksepterer
en invitasjon (`core.js` linje 3374), men hadde UPDATE på hele raden.

**Rettet:** `UPDATE` trukket tilbake, erstattet med kolonnerettigheten
`grant update (status) on team_members to authenticated`, pluss en BEFORE UPDATE-trigger
`tm_block_row_move` som avviser endring av `team_id`, `user_id`, `owner_id` og `role`
når kallet kommer fra `anon` eller `authenticated`. Tjenestenøkkelen er ikke berørt.

Dette var den samme svakheten som ga privilegieeskalering i fotball-prosjektet, der
`team_members` faktisk brukes av de andre policyene. Se `SIKKERHETSFUNN-DB-2026-09-23.md`
i Barnefotballtrener-repoet.

## 9. Systemisk: nye tabeller starter åpne

Supabase sine standardrettigheter (`pg_default_acl`) gir `anon` og `authenticated`
full lese- og skrivetilgang på alle nye tabeller i `public`. Det er derfor funn 1 og 7
i det hele tatt var mulige: den eneste beskyttelsen som gjensto var at policyen måtte
være riktig skrevet.

**Rettet:** skriverettigheter trukket tilbake fra `anon` på alle eksisterende tabeller,
og `alter default privileges ... revoke insert, update, delete, truncate on tables from anon`
for nye. `anon` beholder SELECT, som RLS uansett stopper, og som keepalive-jobben bruker.
Prosjektet har fra før event-triggeren `ensure_rls`, som slår på RLS automatisk på nye
tabeller. Den er beholdt.

---

## Det som var riktig fra før

- RLS er på for alle 16 tabellene i `public`, med policy på hver.
- Alle øvrige tabeller er korrekt låst til `auth.uid() = user_id`. Verifisert ved at
  `teams` har rader, mens samme spørring som `anon` returnerer null.
- Tilgang til en klubb gir bare opphevet betalingssperre, ikke lesetilgang til andre
  brukeres lag eller spillere. `getClubStatus` returnerer kun tilgangsstatus.
- Alle 11 `/api`-endepunkter verifiserer JWT med `supabase.auth.getUser(token)`.
  `webhook.js` bruker Stripe-signatur i stedet, som er riktig.
- `join-club.js` sender `user.id` fra verifisert token, aldri en verdi fra request body.
- `anon` og `authenticated` har ikke CREATE i skjemaet `public`.

## Lavere prioritet (ytelse, ikke sikkerhet)

Fra Supabase performance advisor:

- 15 RLS-policyer kaller `auth.uid()` per rad i stedet for `(select auth.uid())`.
  Merkes først ved større datamengder.
- 13 fremmednøkler uten dekkende indeks.
- Ingen rate-limiting på `/api/join-club`. Lav risiko nå, men invitasjonskoder kan
  i prinsippet brute-forces.

Kilder:

- Supabase database linter: https://supabase.com/docs/guides/database/database-linter
- RLS-ytelse: https://supabase.com/docs/guides/database/postgres/row-level-security#call-functions-with-select
