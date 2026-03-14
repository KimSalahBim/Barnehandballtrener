# Design refresh: Retning B (Varm sport)

Branch: `design-refresh`
Besluttet: 13. mars 2026

---

## Designprinsipper

1. **Font-weight ned.** 400 er default. 500 for titler og spillernavn. 700 kun for logo/app-navn.
2. **Grønn primary.** #456C4B erstatter #2563EB overalt.
3. **Konsekvent radius.** 16px for kort, 12px for elementer inne i kort, 10px for små badges.
4. **Mykere borders.** 1px solid, ikke 2px. Farge: #d8e4da (grønntonet) i stedet for #E2E8F0 (blåtonet).
5. **Pill-badges for status.** Kamp = grønn pill, Trening = oransje pill, Keeper = gul pill.
6. **Zebra-striping.** Annenhver rad i lister har #f3f6f3 bakgrunn.
7. **Ingen hoppende hover.** Fjern translateY. Bruk opacity:0.95 eller bakgrunnsfarge-endring.
8. **Flat.** Fjern box-shadow fra kort. Bruk border i stedet.

---

## Fargetokens

### Primary (erstatter blå)
```
--primary:       #456C4B
--primary-light:  #5a8a60
--primary-dim:    rgba(69, 108, 75, 0.10)
--primary-glow:   rgba(69, 108, 75, 0.25)
```

### Bakgrunner
```
--bg:        #f3f6f3    (var #F1F5F9 — nå grønntonet)
--bg-card:   #FFFFFF    (uendret)
--bg-input:  #f3f6f3    (var #FFFFFF — nå subtil farge)
```

### Tekst (uendret, fungerer med grønn)
```
--text-900: #0F172A
--text-800: #1E293B
--text-700: #334155
--text-600: #475569
--text-500: #64748B
--text-400: #94A3B8
```

### Grønn-spesifikke (ny)
```
--green-text:    #153F30   (mørk grønn for headings)
--green-muted:   #6a8a6e   (grønn sekundærtekst)
--green-pill-bg: #e8f0e9   (pill-bakgrunn for kamp)
--green-pill-fg: #3a5a3f   (pill-tekst for kamp)
```

### Oransje (trening)
```
--orange-pill-bg: #fef3e6
--orange-pill-fg: #8a5a1a
```

### Border (grønntonet)
```
--border:       #d8e4da    (var #E2E8F0)
--border-light: #edf1ed    (divider-linjer)
```

### Radius (sanert til 3 verdier)
```
--radius-sm:   10px    (badges, pills, små knapper)
--radius-md:   12px    (input, elementer i kort)
--radius-lg:   16px    (kort, modaler, containere)
--radius-full: 999px   (runde pills)
```

---

## Font-weight regler

| Element | Før | Etter |
|---------|-----|-------|
| App-tittel (logo) | 800 | 700 |
| Seksjons-headings (h2) | 700 | 500 |
| Spillernavn i lister | 700 | 500 |
| Knappetekst | 700 | 500 |
| Labels (form) | 600 | 500 |
| Posisjons-pills (F/M/A/K) | 700 | 500 |
| Stat-verdier (tall) | 700 | 500 |
| Brødtekst | 400 | 400 (uendret) |
| Sekundærtekst | 500 | 400 |
| Bunnmeny aktiv | 700 | 500 |
| Bunnmeny inaktiv | 600 | 400 |

---

## Komponent-spesifikasjoner

### Spillerrad (retning B)
- Høyde: ~48px (10px padding topp/bunn + 28px innhold)
- Avatar: 36px, border-radius 12px, initialer med font-weight 500
- Navn: 14px, font-weight 500, farge #153F30
- Posisjonspills: 10px, font-weight 500, padding 3px 8px, border-radius 6px
  - F (forsvar): bg #e8f0e9, fg #3a5a3f
  - M (midtbane): bg #e0eaff, fg #2a4a8a
  - A (angrep): bg #fce8ec, fg #8a2a3a
  - K (keeper): bg #fef3c7, fg #7a5a0a
- Zebra: annenhver rad bg #f3f6f3
- Ingen border mellom rader, zebra-farge er nok

### Hendelseskort (sesong)
- border-radius: 16px
- border: 1px solid #d8e4da
- padding: 16px
- Ikon-sirkel: 36px, border-radius 12px
  - Kamp: bg #e8f0e9, ikon #456C4B
  - Trening: bg #fef3e6, ikon #E88B2C
- Type-pill høyrejustert: font-size 11px, padding 3px 10px, border-radius 20px
- Fremtidige hendelser med opacity 0.55

### Bunnmeny
- Aktiv: solid grønn sirkel (28px, bg #456C4B, ikon hvit)
- Inaktiv: ingen bakgrunn, ikon #8a9a8e, tekst 9px weight 400
- Aktiv tekst: #456C4B, weight 500

### Knapper
- Primary: bg #456C4B, color white, radius 12px, weight 500, padding 10px 18px
- Secondary: bg white, border 1px #d8e4da, color #153F30, weight 500
- Hover: ingen translateY, bruk filter:brightness(0.95) på primary, bg #f3f6f3 på secondary

### Settings-card
- bg: white
- border: 1px solid #d8e4da
- border-radius: 16px
- padding: 16px (desktop), 14px (mobil) — NB: økt fra dagens 10px
- box-shadow: none (fjernet)
- margin-bottom: 10px

### Tab-header
- bg: white
- border: 1px solid #d8e4da
- border-radius: 16px
- padding: 16px (desktop), 14px (mobil)
- h2: 16px weight 500 color #153F30
- description: 13px weight 400 color #6a8a6e

---

## Hardcodede blåfarger som MÅ endres i JS

22 steder totalt. Søk-og-erstatt:

| Fil | Søk | Erstatt | Kontekst |
|-----|-----|---------|----------|
| kampdag.js:808 | `'#2563eb'` | `'#456C4B'` | Midtbane fargekode |
| kampdag.js:2764 | `#0b5bd3` | `#456C4B` | PDF header gradient |
| kampdag.js:2764 | `#19b0ff` | `#5a8a60` | PDF header gradient slutt |
| kampdag.js:2863 | `#0b5bd3` | `#456C4B` | PDF print-knapp |
| season.js:175 | `'#3b82f6'` | `'#456C4B'` | Sub-team farge 1 |
| season.js:3622 | `'#3b82f6'` | `'#456C4B'` | Spilloppbygging farge |
| season.js:3738 | `#3b82f6` | `#456C4B` | Stats bar-farge |
| season.js:4226 | `#2563eb` | `#456C4B` | Assist-ikon farge |
| season.js:6733 | `#2563eb` | `#456C4B` | Assist-ikon farge |
| sesong-kampdag.js:714 | `'#2563eb'` | `'#456C4B'` | Midtbane fargekode |
| sesong-kampdag.js:2674 | `#0b5bd3` | `#456C4B` | PDF header |
| sesong-kampdag.js:2773 | `#0b5bd3` | `#456C4B` | PDF print-knapp |
| sesong-kampdag.js:3037 | `#3b82f6` | `#456C4B` | Timer border |
| sesong-workout.js:1378 | `#0b5bd3` | `#456C4B` | PDF header |
| sesong-workout.js:1387 | `#0b5bd3` | `#456C4B` | PDF knapper |
| workout.js:3448 | `#0b5bd3` | `#456C4B` | Brand-variabel |
| workout.js:3733 | `#2563eb` | `#456C4B` | Del økt-ikon |
| workout.js:3761 | `#2563eb` | `#456C4B` | Import økt-ikon |
| core.js:335 | `'#1976d2'` | `'#456C4B'` | Default team-farge |
| core.js:573 | `'#1976d2'` | `'#456C4B'` | Nytt lag farge |
| onboarding.js:247 | `'#2563eb'` | `'#456C4B'` | Farge-palette |
| cup.js:882 | `'#3b82f6'` | `'#456C4B'` | Cup-farge |

---

## Implementeringsrekkefølge

### Fase 1: CSS-filer (null funksjonell risiko)
1. style.css — primary, border, radius, font-weight, shadows, hover
2. season.css — primary-refs, font-weight
3. kampdag.css — font-weight
4. style-workout-nff.css — font-weight
5. competitions.css — primary, font-weight
6. cup.css — font-weight
7. onboarding.css — font-weight

### Fase 2: JS blåfarger (lav risiko, 22 søk-erstatt)
8. core.js (2 steder)
9. onboarding.js (1 sted)
10. cup.js (1 sted)
11. workout.js (4 steder)
12. sesong-workout.js (2 steder)
13. kampdag.js (3 steder)
14. sesong-kampdag.js (4 steder)
15. season.js (5 steder)

### Fase 3: JS font-weight (middels risiko, fil for fil)
16. core.js — 10 inline weights
17. season.js — 10 inline weights
18. kampdag.js — 18 inline weights
19. sesong-kampdag.js — 29 inline weights
20. workout.js — 23 inline weights
21. sesong-workout.js — 28 inline weights

Etter hver fil: `node --check fil.js` + browser-test.

### Fase 4: JS padding/spacing (høyest risiko)
Vurderes etter fase 1-3 er stabil.

---

## Verifikasjon

Etter hver fase, test på:
- Chrome desktop
- Safari iOS (iPhone)
- Chrome Android

Spesielt se etter:
- Knappefarge (skal være grønn overalt)
- PDF-eksport (skal ha grønn header, ikke blå)
- Bunnmeny aktiv-farge
- Stat-tall (skal bruke --primary, altså grønn)
- Input focus-ring (skal være grønn)
