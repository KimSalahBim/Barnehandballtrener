# DPIA-vurdering: barnehandballtrener.no

**Dato:** 1. mars 2026 (oppdatert 23. september 2026)
**Behandlingsansvarlig:** Holmvik Utvikling ENK, org.nr. 937 128 746
**Kontakt:** barnehandballtrener@gmail.com
**Versjon:** 1.2

---

## 1. Formål

Denne vurderingen dokumenterer hvorfor det ikke er nødvendig med full
personvernkonsekvensvurdering (DPIA) etter GDPR art. 35 for tjenesten
barnehandballtrener.no.

Datatilsynets veiledning (januar 2019) angir at DPIA er påkrevd når
behandlingen sannsynligvis vil medføre **høy risiko** for de registrertes
rettigheter og friheter, særlig ved bruk av ny teknologi, systematisk
overvåking, eller behandling i stor skala av særlige kategorier personopplysninger
eller opplysninger om barn.

---

## 2. Tjenestens art

barnehandballtrener.no er et digitalt treningsverktøy for frivillige trenere
i norsk håndball. Hovedmålgruppen er barnehåndball (6-12 år), men appen støtter
også aldersklasser til og med 16 år. Tjenesten genererer bytteplaner for kamper,
håndterer treningsgrupper og treningsøkter, og fører sesongstatistikk (oppmøte, spilletid).

---

## 3. Vurdering mot DPIA-kriteriene

### 3.1 Behandler vi barns personopplysninger?

**Ja**, men med vesentlige begrensninger:

- Av identifikatorer lagres kun **fornavn** (ikke etternavn, fødselsdato eller andre)
- Appen har aktiv fullnavns-deteksjon med advarsel dersom bruker prøver å skrive fullt navn
- 50-tegns grense på navnefelt
- Ingen bilder, helseopplysninger eller særlige kategorier etter art. 9

I tillegg til fornavnet lagrer appen trenerens egne vurderinger av spilleren:
ferdighetsnivå (`skill`), om spilleren er keeper, posisjonspreferanser, samt oppmøte
og beregnet spilletid. Dette er ikke særlige kategorier, men det er vurderinger av et
navngitt barn, og det er mer enn et fornavn. Opplysningene brukes til å fordele
spilletid og lage bytteplaner, og de vises aldri på den foresatt-vendte lagsiden
(filtreringen er hardkodet i `api/team-page.js`).

**Risiko:** Fornavn alene gir svært begrenset identifiserbarhet. I en lagliste
med 15 fornavn uten etternavn, klubbtilhørighet eller andre koblinger er
reidentifiseringsrisikoen lav. Vurderingene øker konsekvensen dersom data likevel
kommer på avveie, siden de sier noe om det enkelte barnet. Det er hovedgrunnen til
at tilgangskontrollen testes aktivt, se seksjon 5.

### 3.2 Behandler vi i stor skala?

**Nei.**

- Tjenesten er ikke lansert. Per 23. september 2026 er det ingen betalende brukere, og
  bare utviklers egne testlag og et lite antall trenere som prøver den ut
- Forventet omfang etter lansering (1. oktober 2026): noen titalls til noen hundre
  trenere, med anslagsvis 15 spillerfornavn per lag
- Ingen systematisk innsamling fra offentlige kilder
- Geografisk begrenset til norsk barne- og ungdomshåndball

Datatilsynets veiledning definerer ikke eksakt grense for "stor skala", men
behandlingen er klart under terskelen som gjelder for eksempel
kommunale helsetjenester eller skolesystemer.

### 3.3 Bruker vi ny teknologi?

**Nei.** Tjenesten bruker standard webteknologi (JavaScript, PostgreSQL, OAuth).
Bytteplanalgoritmene er deterministiske (greedy assignment, cyclic rotation) uten
maskinlæring eller automatisert profilering.

### 3.4 Systematisk overvåking?

**Nei.** Tjenesten overvåker ikke barns adferd. Oppmøteregistrering gjøres
manuelt av trener per treningsøkt/kamp og brukes kun til å beregne
spilletidsfordeling. Ingen automatisk sporing, geolokasjon eller biometrisk data.

### 3.5 Automatiserte beslutninger med rettsvirkning?

**Nei.** Bytteplaner er forslag som trener fritt kan justere. Ingen beslutninger
har rettsvirkning eller tilsvarende betydelig virkning for barna.

### 3.6 Kombinasjon av datasett?

**Nei.** Spillerdata kombineres ikke med eksterne kilder. Hvert lag er isolert
med Row Level Security i databasen. Isolasjonen er etterprøvd, ikke bare forutsatt:
ved sikkerhetstesten 22. september 2026 ble spørringer kjørt som databaserollene
`anon` (uinnlogget) og `authenticated` (innlogget bruker) for å bekrefte at data
fra andre brukeres lag faktisk ikke er lesbare. Se seksjon 5.

---

## 4. Risikoreduserende tiltak (allerede implementert)

| Tiltak | Beskrivelse |
|---|---|
| Dataminimering | Kun fornavn, aktiv fullnavnsdeteksjon med UI-advarsel |
| Tilgangskontroll | Google OAuth, Row Level Security per bruker, per lag |
| Sikkerhetstesting | Verifisering av RLS og API-rettigheter ved å kjøre spørringer som rollene `anon` og `authenticated`, samt Supabase security advisor. Gjennomføres før lansering og deretter årlig, jf. seksjon 5 |
| Kryptering | HTTPS med HSTS (2 år, preload), Supabase-kryptering at rest |
| Lagdeling | Eiermodell med eksplisitt invitasjon, editor-rolle uten admin-tilgang |
| Rett til sletting | Fullstendig kontosletting inkl. alle tabeller, Stripe-anonymisering |
| Dataportabilitet | JSON-eksport av all brukerdata |
| Informasjonsplikt | Detaljert personvernerklæring (privacy.html) |
| Tredjeparter | Supabase (eu-central-2, Zürich i Sveits), Stripe (SCCs), Vercel (SCCs), Umami (EU) |
| Statistikk-gate | Sesongstatistikk krever at treneren bekrefter NHFs retningslinjer om lik spilletid |
| Medansvar | Trener informeres eksplisitt om ansvar for spillerdata (Art. 26) |
| Foresatte | Trener oppfordres til å informere foresatte om verktøybruk |

---

## 5. Sikkerhetstesting og avviksvurdering

### 5.1 Rutine

GDPR art. 32 nr. 1 bokstav d krever en prosess for regelmessig testing, analysering
og vurdering av hvor effektive sikkerhetstiltakene er. Rutinen for denne tjenesten er:

1. Supabase security advisor og performance advisor kjøres og gjennomgås
2. Tilgangskontrollen testes aktivt ved å kjøre spørringer som databaserollene
   `anon` og `authenticated` mot hver tabell som inneholder personopplysninger.
   Det er ikke tilstrekkelig å konstatere at Row Level Security er påskrudd,
   fordi en policy kan være skrevet for vid
3. Alle API-endepunkter kontrolleres for at de verifiserer brukerens token og
   bruker bruker-ID fra tokenet, ikke fra forespørselens innhold
4. Faktisk trafikk mot databasen gjennomgås i `edge_logs`, slik at rettigheter
   kan strammes inn uten å bryte noe som er i bruk
5. Funn, rettinger og etterkontroll loggføres

Testen gjennomføres før lansering og deretter minst årlig, sammen med den årlige
gjennomgangen av denne vurderingen, samt ved vesentlige endringer i databasemodellen.

### 5.2 Gjennomført test 22. og 23. september 2026

Første gjennomføring 22. september avdekket fire forhold i databasens rettighetsoppsett.
En utvidet gjennomgang 23. september, som også omfattet søsterapplikasjonen
Barnefotballtrener.no, avdekket ytterligere to forhold i dette prosjektet. Alle er
rettet i migrasjonene `lockdown_clubs_user_access_and_definer_rpcs` og
`fix_team_members_selfjoin_and_client_writes`, og etterkontroll bekreftet at
angrepsveiene nå avvises, samtidig som tjenestens egne API-kall fortsatt virker.

| Funn | Hva det innebar | Retting |
|---|---|---|
| Tabellen `clubs` hadde en policy som ga alle roller, også uinnloggede, full lese- og skrivetilgang | Klubbnavn, invitasjonskoder og lisensopplysninger kunne leses og endres med den offentlige anon-nøkkelen. Tabellen var tom på funntidspunktet | Policy begrenset til `service_role`, rettigheter trukket tilbake fra `anon` og `authenticated` |
| Innlogget bruker kunne skrive egne rader i `club_members` og `user_access` | Mulighet for å gi seg selv betalt tilgang uten betaling | Skriverettigheter trukket tilbake fra klientrollene, all skriving skjer via API med tjenestenøkkel |
| Funksjonen `get_user_id_by_email` kunne kalles uten innlogging | Kunne bekrefte om en e-postadresse hadde konto, og returnerte brukerens interne ID | Kjørerettighet trukket tilbake fra alle roller utenom `service_role` |
| To databasefunksjoner manglet låst `search_path`, og to funksjoner var unødvendig eksponert | Teknisk herding, ingen kjent utnyttelse | `search_path` låst, kjørerettigheter innsnevret |
| En innlogget bruker kunne melde seg selv inn i et hvilket som helst lag via `team_members` | Ingen datatilgang i dag, fordi ingen annen policy stoler på tabellen. Ville blitt full lesetilgang til andres lag så snart deling av lag skrus på | Policyen delt opp per kommando, innsetting krever at brukeren eier laget |
| Klienten kunne endre alle kolonner i sin egen `team_members`-rad | Samme svakhet ga privilegieeskalering i fotball-appen | UPDATE begrenset til kolonnen `status`, pluss trigger som avviser flytting av raden |
| Standardrettigheter ga `anon` full skrivetilgang på alle nye tabeller | Systemisk: hver ny tabell startet åpen, og bare en korrekt policy sto imellom | Skriverettigheter trukket tilbake fra `anon`, og standardrettighetene endret for nye tabeller |

Full teknisk dokumentasjon: `SIKKERHETSFUNN-DB-2026-09-22.md`.

Gjennomgangen 23. september avdekket alvorligere forhold i søsterapplikasjonen
Barnefotballtrener.no, som er i drift. De er dokumentert i det repoet og berører ikke
databasen for denne tjenesten.

To forhold gjenstår og er ikke databaseinnstillinger:

- Supabase Auth sin kontroll av nye passord mot kjente lekkasjer (HaveIBeenPwned)
  er slått av og bør slås på før lansering
- Loggene i Supabase har 24 timers oppbevaring på gjeldende abonnement. Det er for
  kort til å etterforske et avvik som oppdages senere enn ett døgn etter at det
  skjedde, jf. 5.3. Bør vurderes før lansering

### 5.3 Vurdering av meldeplikt

Det tredje funnet gjorde det mulig for utenforstående å få bekreftet om en e-postadresse
var registrert, og å få utlevert brukerens interne ID. Begge deler er personopplysninger.

Omfanget av hva som kunne vært eksponert:

- Databasen inneholdt 7 kontoer per 23. september 2026. Flere av dem tilhører eksterne
  testbrukere, ikke bare utvikler selv. Alle er voksne trenere
- Funksjonen kunne bare bekrefte om en oppgitt e-postadresse hadde konto, og returnere
  brukerens interne ID. Den ga ikke tilgang til navn, lagdata eller noen opplysninger om barn
- De to øvrige alvorlige funnene ga mulighet til å skaffe seg betalt tilgang uten
  betaling, men ga ikke lesetilgang til andre brukeres lag eller spillere. Den
  isolasjonen ligger i egne policyer som ble testet og holdt

Vurderingen er at dette **ikke** utgjør et brudd på personopplysningssikkerheten etter
GDPR art. 4 nr. 12, og at meldeplikten etter art. 33 derfor ikke er utløst. Begrunnelse:

- Bestemmelsen omfatter faktisk uautorisert tilgang, endring eller utlevering, ikke
  muligheten for det. Det er ingen holdepunkter for at funksjonen ble kalt av utenforstående
- Konsekvensen for den enkelte ville uansett vært svært lav: bekreftelse på at en
  e-postadresse er registrert hos tjenesten, og en intern ID uten verdi utenfor systemet
- Ingen opplysninger om barn var tilgjengelige gjennom noen av funnene
- Sårbarheten ble lukket samme dag den ble oppdaget

Forbehold som hører med: loggene rekker bare 24 timer tilbake, så det er ikke mulig å
dokumentere fravær av uautoriserte kall for hele perioden sårbarheten fantes. Vurderingen
bygger derfor på fravær av holdepunkter, ikke på et fullstendig loggbevis. Det er en av
grunnene til at lengre loggoppbevaring er ført opp som et gjenstående punkt i 5.2.

Vurderingen loggføres her i tråd med dokumentasjonsplikten i art. 33 nr. 5, og fordi
tilsvarende funn etter lansering vil utløse 72-timersfristen i art. 33 nr. 1. Da må
vurderingen gjøres raskt og etter et kjent mønster.

---

## 6. Konklusjon

Behandlingen tilfredsstiller **ikke** kriteriene for obligatorisk DPIA:

1. Personopplysningene er minimale (kun fornavn på barn)
2. Behandlingen er ikke i stor skala
3. Ingen ny eller eksperimentell teknologi
4. Ingen systematisk overvåking
5. Ingen automatiserte beslutninger med betydelig virkning

De tekniske og organisatoriske tiltakene i seksjon 4, sammen med testrutinen i
seksjon 5, reduserer restrisikoen til et nivå som ikke krever ytterligere
konsekvensvurdering.

**Denne vurderingen bør gjennomgås årlig**, neste gang innen 1. september 2027, eller
ved vesentlige endringer i tjenestens funksjonalitet, omfang eller brukerbase. Ved
vesentlig vekst i antall brukere skal punkt 3.2 vurderes på nytt.

---

## 7. Endringslogg

| Dato | Versjon | Endring |
|---|---|---|
| 2026-03-01 | 1.0 | Førstegangs vurdering |
| 2026-09-22 | 1.1 | Organisasjonsnummer lagt inn. Omfang rettet: tjenesten er ikke lansert ennå. Aldersspenn rettet til 6-16 år. Datalagring presisert til Supabase eu-central-2 (Zürich, Sveits). Feilskrevet «NFF» rettet til NHF |
| 2026-09-23 | 1.2 | Ny seksjon 5 om sikkerhetstesting og avviksvurdering, jf. art. 32 nr. 1 bokstav d. Påstanden om lagisolasjon i 3.6 endret til å vise til gjennomført test. «Sikkerhetstesting» lagt inn i tiltakstabellen. Funnene 22. og 23. september 2026 og vurderingen av meldeplikt etter art. 33 dokumentert. Punkt 3.1 utvidet: appen lagrer også trenerens vurderinger av spilleren, ikke bare fornavn. Konklusjon og endringslogg renummerert til 6 og 7 |
