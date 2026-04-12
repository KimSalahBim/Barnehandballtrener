// exercises-data.js — Øvelsesbanken (ren data, ingen logikk)
// Brukes av workout.js, sesong-workout.js via window.EXERCISES_DATA

window.EXERCISES_DATA = [
    // ── DRIKKEPAUSE (alltid øverst, ingen info) ──
    { key: 'drink', label: 'Drikkepause', defaultMin: 2, category: 'special',
      nffCategory: 'pause', themes: [], nffPhases: [], learningGoals: [],
      intensity: 'none', hasOpposition: false },

    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    // 🏃 OPPVARMING
    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    {
      key: 'tag', label: 'Lek / Sisten', defaultMin: 8, category: 'oppvarming',
      ages: ['6-7','8-9','10-12','13-16'], players: '6-20',
      equipment: 'Kjegler til avgrensning, vester til fangere',
      nffCategory: 'sjef_over_ballen', themes: ['leik_stafett', 'dribling_bevegelse'], nffPhases: ['noytral'],
      learningGoals: ['Retningsforandringer i fart', 'Lese rommet og reagere raskt'],
      intensity: 'high', hasOpposition: false,
      playerCount: { min: 6, max: 20 }, equipmentTags: ['kjegler', 'vester'],
      description: 'Klassisk sistenlek som oppvarming. Alle i bevegelse fra start. Barna kjenner reglene, så organisering tar minimalt tid. Perfekt for å få opp puls og engasjement.',
      setup: 'Avgrens et område på ca. 20x20 meter med kjegler. Gi 1-2 spillere vester — de er fangere.',
      steps: [
        'Fangerne (med vest) jakter de andre spillerne.',
        'Den som blir tatt, fryser på stedet med beina fra hverandre.',
        'Frie spillere kan redde frosne ved å krype mellom beina deres.',
        'Bytt fangere hvert 2. minutt.'
      ],
      coaching: [
        'Oppmuntre til retningsforandringer og finter',
        'Ros de som redder lagkamerater',
        'Gjør området mindre for mer intensitet'
      ],
      variations: [
        'Frostsisten: frosne spillere fryser med armene ut — fri dem ved å gå under armen',
        'Haletag: alle har et bånd i buksen — ta andres bånd uten å miste ditt eget'
      ],
      diagram: { width:220, height:160, field:'small', elements:[
        {type:'cone',x:20,y:20},{type:'cone',x:200,y:20},
        {type:'cone',x:20,y:140},{type:'cone',x:200,y:140},
        {type:'player',x:110,y:80,team:'b',label:'1'},
        {type:'player',x:93,y:80,team:'b',label:'2'},
        {type:'player',x:60,y:50,team:'a',label:''},
        {type:'player',x:155,y:110,team:'a',label:''},
        {type:'player',x:170,y:45,team:'a',label:''},
        {type:'arrow',from:[110,80],to:[80,58],style:'run'},
        {type:'arrow',from:[60,50],to:[38,70],style:'run'}
      ]}
    },

    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    // ⚽ TEKNIKK
    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    {
      key: 'pass_pair', label: 'Pasning parvis', defaultMin: 10, category: 'teknikk',
      ages: ['6-7','8-9','10-12','13-16'], players: '4-20',
      equipment: '1 ball per par, kjegler som markering',
      nffCategory: 'sjef_over_ballen', themes: ['kast_teknikk', 'mottak_pasning'], nffPhases: ['angrep_fremover'],
      learningGoals: ['Strak arm og sving fra skulderen', 'Motta med begge hender foran kroppen', 'Øyekontakt med mottaker før kast'],
      suggestedGroupSize: 2, intensity: 'low', hasOpposition: false,
      playerCount: { min: 4, max: 20 }, equipmentTags: ['ball', 'kjegler'],
      description: 'Grunnøvelsen i kasttrening. To og to spillere kaster ballen til hverandre. Fokus på riktig kastteknikk og trygt mottak — den viktigste byggeklossen i håndball.',
      setup: 'Spillerne stiller seg parvis med 4-8 meters avstand (kortere for de yngste). Hvert par har én ball.',
      steps: [
        'Spiller A kaster til B med overarmskast — strak arm, sving fra skulder.',
        'B tar imot med begge hender foran kroppen og demper ballen.',
        'B kaster tilbake til A.',
        'Etter 2 min: øk avstand gradvis. Etter 4 min: prøv med ikke-dominante hånd.'
      ],
      coaching: [
        'Trykk ballen fremover med fingrene i siste øyeblikk',
        'Motta med myke hender — ikke stiv',
        'Øyekontakt FØR du kaster',
        'Stå i klar stilling: ett steg foran med motsatt fot av kastehånden'
      ],
      variations: [
        'Kast i bevegelse: begge løper parallelt og kaster til hverandre',
        'Legg til en vending etter mottak før neste kast'
      ],
      diagram: { width:220, height:110, field:'none', elements:[
        {type:'player',x:40,y:55,team:'a',label:''},{type:'ball',x:48,y:51},
        {type:'player',x:180,y:55,team:'b',label:''},
        {type:'arrow',from:[52,53],to:[170,55],style:'pass'},
        {type:'player',x:40,y:88,team:'a',label:''},
        {type:'player',x:180,y:88,team:'b',label:''},{type:'ball',x:188,y:84},
        {type:'arrow',from:[176,86],to:[52,88],style:'pass'}
      ]}
    },
    {
      key: 'pass_move', label: 'Kast og bevegelse', defaultMin: 10, category: 'teknikk',
      ages: ['8-9','10-12','13-16'], players: '6-12',
      equipment: '2-3 baller, kjegler',
      nffCategory: 'sjef_over_ballen', themes: ['mottak_pasning', 'samarbeidsspill'], nffPhases: ['angrep_fremover'],
      learningGoals: ['Beveg deg etter kast — ikke stå stille', 'Se deg rundt FØR ballen kommer', 'Mottak i bevegelse: løp mot ballen'],
      intensity: 'medium', hasOpposition: false,
      playerCount: { min: 6, max: 12 }, equipmentTags: ['ball', 'kjegler'],
      description: 'Etter å ha kastet, beveger spilleren seg til ny posisjon. Trener det viktigste prinsippet i lagspill: kast og flytt deg! Gjør laget vanskeligere å forsvare.',
      setup: 'Sett opp en trekant med kjegler (8-10m mellom). Spillere fordelt på hjørnene, ball starter hos én.',
      steps: [
        'A kaster til B og løper mot Bs posisjon.',
        'B tar imot, kaster til C, og løper mot Cs posisjon.',
        'C tar imot, kaster til neste, og følger ballen.',
        'Hold flyten gående — ballen og spillerne sirkulerer hele tiden.'
      ],
      coaching: [
        'Flytt deg MED EN GANG etter kast',
        'Mottaker: løp mot ballen, ikke vent på den',
        'Kast med fart og presisjon — ikke bare sleng',
        'Se deg rundt FØR ballen kommer til deg'
      ],
      variations: [
        'To baller i omløp samtidig for mer intensitet',
        'Firkant i stedet for trekant med 4 spillere'
      ],
      diagram: { width:220, height:160, field:'none', elements:[
        {type:'player',x:50,y:80,team:'a',label:'1'},{type:'ball',x:58,y:76},
        {type:'player',x:110,y:35,team:'a',label:'2'},
        {type:'player',x:170,y:80,team:'a',label:'3'},
        {type:'player',x:110,y:125,team:'a',label:'4'},
        {type:'arrow',from:[58,78],to:[100,42],style:'pass'},
        {type:'arrow',from:[50,80],to:[100,118],style:'run'},
        {type:'arrow',from:[110,42],to:[165,78],style:'pass'}
      ]}
    },
    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    // 🎯 AVSLUTNING
    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    {
      key: 'shot', label: 'Skudd på mål', defaultMin: 12, category: 'avslutning',
      ages: ['6-7','8-9','10-12','13-16'], players: '4-14',
      equipment: 'Mål (stort eller småmål), baller, kjegler',
      nffCategory: 'scoringstrening', themes: ['kast_teknikk'], nffPhases: ['angrep_avslutning'],
      learningGoals: ['Plassering foran kraft: sikte i hjørnene', 'Stemfot peker mot mål — sats og kast', 'Følg opp kastet, vær klar for retur'],
      intensity: 'medium', hasOpposition: false,
      playerCount: { min: 4, max: 14 }, equipmentTags: ['maal', 'ball', 'kjegler'],
      description: 'Avslutninger fra ulike posisjoner. Fokus på plassering framfor kraft. Alle barn elsker å skyte på mål — la dem gjøre det mye!',
      setup: 'Mål med keeper (eller åpent med kjegler). Spillere i kø ca. 12-16m fra mål. Baller klare på rekke.',
      steps: [
        'Spilleren mottar ball og løper mot mål fra sentralt.',
        'Avslutt på mål fra ca. 10-12 meter.',
        'Neste runde: skudd fra venstre side.',
        'Tredje runde: skudd fra høyre side.',
        'Fjerde runde: mottar pasning fra siden og avslutter direkte.'
      ],
      coaching: [
        'Plassering slår kraft — sikte i hjørnene',
        'Stemfot peker mot mål — sats og kast',
        'Høy arm, piskebevegelse fra skulder',
        'Følg opp kastet — vær klar for retur!'
      ],
      variations: [
        'Konkurranse: hvem scorer flest av 5 forsøk?',
        'Legg til en forsvarer som presser bakfra'
      ],
      diagram: { width:240, height:200, field:'handball_half', elements:[
        {type:'player',x:55,y:100,team:'a',label:'VK'},
        {type:'player',x:120,y:85,team:'a',label:'MB'},
        {type:'player',x:185,y:100,team:'a',label:'HK'},
        {type:'keeper',x:120,y:175},
        {type:'arrow',from:[55,100],to:[100,185],style:'shot'},
        {type:'arrow',from:[120,85],to:[120,183],style:'shot'},
        {type:'arrow',from:[185,100],to:[140,185],style:'shot'}
      ]}
    },
    {
      key: 'shot_race', label: 'Skuddstafett', defaultMin: 10, category: 'avslutning',
      ages: ['6-7','8-9','10-12','13-16'], players: '6-16',
      equipment: 'Mål, baller, kjegler',
      nffCategory: 'scoringstrening', themes: ['kast_teknikk', 'leik_stafett'], nffPhases: ['angrep_avslutning'],
      learningGoals: ['Fart OG kontroll gjennom kjeglene', 'Ro deg ned foran mål: presisjon over panikkskudd'],
      intensity: 'high', hasOpposition: false,
      playerCount: { min: 6, max: 16 }, equipmentTags: ['maal', 'ball', 'kjegler'],
      description: 'To lag i stafett. Før ball gjennom kjegler og avslutt på mål. Kombinerer avslutning med fart og konkurranse — garantert engasjement!',
      setup: 'To parallelle kjegleløyper mot ett mål. Spillerne delt i to lag i kø bak startlinjen.',
      steps: [
        'Første spiller i hvert lag fører ball gjennom kjeglene.',
        'Avslutt med skudd på mål.',
        'Løp tilbake og gi high five til neste i køen.',
        'Laget som scorer flest mål totalt vinner!'
      ],
      coaching: [
        'Fart OG kontroll gjennom kjeglene',
        'Ro deg ned foran mål — presisjon over panikkskudd',
        'Hei på lagkameratene!'
      ],
      variations: [
        'Legg til en vending eller passningsvegg før avslutning',
        'Keeper i mål for ekstra utfordring'
      ],
      diagram: { width:240, height:200, field:'handball_half', elements:[
        {type:'cone',x:60,y:150},{type:'cone',x:60,y:120},{type:'cone',x:60,y:90},
        {type:'cone',x:180,y:150},{type:'cone',x:180,y:120},{type:'cone',x:180,y:90},
        {type:'player',x:60,y:170,team:'a',label:''},{type:'ball',x:68,y:166},
        {type:'player',x:180,y:170,team:'b',label:''},
        {type:'keeper',x:120,y:175},
        {type:'arrow',from:[60,148],to:[95,183],style:'shot'},
        {type:'arrow',from:[180,148],to:[145,183],style:'shot'}
      ]}
    },

    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    // ⚔️ SPILL MED MOTSTAND
    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    {
      key: '1v1', label: '1 mot 1', defaultMin: 10, category: 'spill_m_motstand',
      ages: ['6-7','8-9','10-12','13-16'], players: '4-16',
      equipment: 'Småmål eller kjegler, baller, vester',
      nffCategory: 'spille_med_og_mot', themes: ['1v1_duell', 'forsvarsspill'], nffPhases: ['angrep_avslutning', 'forsvar_vinne_ball'],
      learningGoals: ['Angriper: tøff mot forsvarer, bruk finter og fart', 'Forsvarer: tving angriperen dit DU vil, stå på tå', 'Aldri gi opp, kjemp om ballen!'],
      suggestedGroupSize: 2, intensity: 'high', hasOpposition: true,
      playerCount: { min: 4, max: 16 }, equipmentTags: ['smaamaal', 'kjegler', 'ball', 'vester'],
      description: 'Ren duelltrening på liten bane med småmål. Én angriper mot én forsvarer. Bygger ferdighet i å ta på seg en spiller og å forsvare.',
      setup: 'Liten bane 8x12m med kjeglemål i hver ende. Par stiller opp ved hver sin baselinje.',
      steps: [
        'Trener spiller ball inn i banen.',
        'Begge løper etter ballen — den som når først er angriper.',
        'Spill 1 mot 1 til mål scores eller ballen går ut.',
        'Ny ball fra trener, nye spillere.'
      ],
      coaching: [
        'Angriper: tøff mot forsvareren, bruk finter',
        'Forsvarer: tving angriperen dit DU vil, stå på tå',
        'Lav tyngdepunkt for rask retningsendring',
        'Aldri gi opp!'
      ],
      variations: [
        'Angriper har 2 mål å velge mellom (må lese forsvareren)',
        '3-sekunders tidskrav for raskere avgjørelser'
      ],
      diagram: { width:220, height:160, field:'small', elements:[
        {type:'cone',x:110,y:25},{type:'cone',x:110,y:135},
        {type:'zone_line',x1:110,y1:25,x2:110,y2:135},
        {type:'player',x:55,y:80,team:'a',label:'A'},{type:'ball',x:63,y:76},
        {type:'player',x:155,y:80,team:'b',label:'F'},
        {type:'arrow',from:[63,78],to:[130,80],style:'run'},
        {type:'arrow',from:[155,80],to:[125,80],style:'run'}
      ]}
    },
    {
      key: '2v1', label: '2 mot 1', defaultMin: 10, category: 'spill_m_motstand',
      ages: ['8-9','10-12','13-16'], players: '6-12',
      equipment: 'Småmål eller kjegler, baller',
      nffCategory: 'spille_med_og_mot', themes: ['samarbeidsspill', 'kontring_retur'], nffPhases: ['angrep_avslutning'],
      learningGoals: ['Angriper med ball: trekk forsvarer FØR pasning', 'Angriper uten ball: hold avstand og vinkel, vær spillbar', 'Timing: spill pasning i riktig øyeblikk'],
      suggestedGroupSize: 3, intensity: 'high', hasOpposition: true,
      playerCount: { min: 6, max: 12 }, equipmentTags: ['smaamaal', 'kjegler', 'ball'],
      description: 'To angripere mot én forsvarer. Trener den viktigste beslutningen i håndball: når skal jeg drible, og når skal jeg kaste?',
      setup: 'Bane 10x15m. Mål i ene enden. Forsvareren fra midten, angriperne fra andre enden.',
      steps: [
        'Angriperparet starter med ball fra baselinjen.',
        'Forsvareren starter fra midtlinjen og løper mot angriperne.',
        'Angriperne samarbeider for å passere forsvareren og score.',
        'Bytt roller: forsvareren går inn i angriperpar.'
      ],
      coaching: [
        'Angriper med ball: dra forsvareren mot deg FØR du passer',
        'Angriper uten ball: hold avstand og vinkel, vær spillbar',
        'Forsvarer: tving ballfører til én side, steng pasningslinjen',
        'Timing er alt — pass i riktig øyeblikk!'
      ],
      variations: [
        '3v2 for mer kompleksitet',
        'To mål: angriperne velger hvilket mål de angriper'
      ],
      diagram: { width:240, height:200, field:'handball_half', elements:[
        {type:'player',x:80,y:68,team:'a',label:'1'},{type:'ball',x:88,y:64},
        {type:'player',x:165,y:68,team:'a',label:'2'},
        {type:'player',x:120,y:118,team:'b',label:'F'},
        {type:'keeper',x:120,y:175},
        {type:'arrow',from:[80,68],to:[118,115],style:'run'},
        {type:'arrow',from:[80,68],to:[162,73],style:'pass'},
        {type:'arrow',from:[162,73],to:[135,183],style:'shot'}
      ]}
    },
    {
      key: 'kontring',
      label: 'Kontring to og to',
      defaultMin: 12,
      category: 'avslutning',
      ages: ['8-9','10-12','13-16'],
      players: '6-16',
      equipment: 'Håndball, to mål',
      nffCategory: 'scoringstrening',
      themes: ['kontring_retur', 'samarbeidsspill'],
      nffPhases: ['angrep_fremover'],
      learningGoals: ['Reagere raskt og løpe fremover i kontra', 'Utnytte overtall i 2:1', '2:1 — se hvem som er fri og avgjør raskt'],
      intensity: 'high',
      hasOpposition: true,
      playerCount: { min: 6, max: 16 },
      equipmentTags: ['ball', 'maal'],
      description: 'Kontring to og to og 2:1+1. Direkte fra NHFs Håndballskole økt 1. Kan kjøres mot begge mål for å unngå kø.',
      setup: 'Start på 6m-linjen. To og to om en ball. Kan kjøres mot begge mål samtidig.',
      steps: [
        'To spillere løper fremover i kontring — uten forsvarer.',
        'Kombiner: pasning og avslutning.',
        'Øk: én forsvarsspiller på midtlinjen som henger etter.',
        '2:1+1: én forsvarsspiller møter angriperne, én til løper etter fra start.'
      ],
      coaching: [
        'Løp i fart fremover — ikke avvent',
        'Hvem er fri? Spilleren UTEN ball bestemmer: er det trygt å kaste?',
        'Avslutt raskt — ikke bygg opp i kontring'
      ],
      variations: [
        'Start fra begge sider av banen — to kontringer i gang samtidig',
        '3:2: tre angripere mot to forsvarere'
      ],
      diagram: { width:240, height:200, field:'handball_half', elements:[
        {type:'player',x:80,y:60,team:'a',label:'1'},{type:'ball',x:88,y:56},
        {type:'player',x:165,y:60,team:'a',label:'2'},
        {type:'player',x:120,y:115,team:'b',label:'F'},
        {type:'keeper',x:120,y:175},
        {type:'arrow',from:[80,60],to:[165,65],style:'pass'},
        {type:'arrow',from:[80,60],to:[100,108],style:'run'},
        {type:'arrow',from:[165,65],to:[138,183],style:'shot'}
      ]}
    },
    {
      key: '3v2', label: '3 mot 2', defaultMin: 12, category: 'spill_m_motstand',
      ages: ['8-9','10-12','13-16'], players: '8-15',
      equipment: 'Mål, baller, vester',
      nffCategory: 'spille_med_og_mot', themes: ['samarbeidsspill', 'linjespill'], nffPhases: ['angrep_avslutning'],
      learningGoals: ['Trekantformasjon: bred, ikke i linje', 'Spiller med ball: trekk forsvarer, spill videre', 'Avslutt! Ikke overspill, ta sjansen når du har den'],
      suggestedGroupSize: 5, intensity: 'high', hasOpposition: true,
      playerCount: { min: 8, max: 15 }, equipmentTags: ['maal', 'ball', 'vester'],
      description: 'Tre angripere mot to forsvarere. Trener trekantspill, støtteløp og pasning i rom. Kampnært og utviklende.',
      setup: 'Bane 15x20m med mål. Forsvarerne fra midten, angriperne fra baselinjen.',
      steps: [
        'Tre angripere starter med ball fra baselinjen.',
        'To forsvarere møter fra midtlinjen.',
        'Angriperne samarbeider for å skape rom og score.',
        'Avslutt innen 10 sekunder — skaper tempo.'
      ],
      coaching: [
        'Trekantformasjon: bred, ikke i linje',
        'Spiller med ball: trekk en forsvarer, spill videre',
        'Spillere uten ball: støtteløp og diagonale bevegelser',
        'Avslutt! Ikke overspill — ta sjansen når du har den'
      ],
      variations: [
        'Forsvarerne konter på kjeglemål ved ballvinning',
        'Legg til keeper for mer realisme'
      ],
      diagram: { width:240, height:200, field:'handball_half', elements:[
        {type:'player',x:58,y:75,team:'a',label:'VB'},{type:'ball',x:66,y:71},
        {type:'player',x:120,y:65,team:'a',label:'MB'},
        {type:'player',x:182,y:75,team:'a',label:'HB'},
        {type:'player',x:120,y:138,team:'a',label:'L'},
        {type:'player',x:88,y:120,team:'b',label:'F'},
        {type:'player',x:152,y:120,team:'b',label:'F'},
        {type:'keeper',x:120,y:175},
        {type:'arrow',from:[58,75],to:[118,133],style:'pass'},
        {type:'arrow',from:[120,138],to:[115,183],style:'shot'}
      ]}
    },

    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    // 🏟️ SMÅLAGSSPILL
    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    {
      key: 'ssg', label: 'Smålagsspill', defaultMin: 18, category: 'smalagsspill',
      ages: ['6-7','8-9','10-12','13-16'], players: '6-16',
      equipment: 'Mål (2 stk), vester, baller, kjegler til bane',
      nffCategory: 'smalagsspill', themes: ['leik_stafett', 'samarbeidsspill'], nffPhases: ['angrep_fremover', 'angrep_avslutning', 'forsvar_vinne_ball', 'forsvar_hindre_maal'],
      learningGoals: ['Spre dere! Ikke alle rundt ballen', 'Snakk sammen: rop på ballen, gi beskjed', 'Etter ballvinning: se framover først'],
      intensity: 'high', hasOpposition: true,
      playerCount: { min: 6, max: 16 }, equipmentTags: ['maal', 'vester', 'ball', 'kjegler'],
      description: 'Kjerneøvelsen i barnehåndball. Minimum 50% av økten bør være smålagsspill. 3v3, 4v4 eller 5v5 på tilpasset bane gir mest mulig ballkontakt i kamplike situasjoner.',
      setup: 'Tilpass banestørrelse (3v3: 20x25m, 5v5: 30x40m). To mål, vester for lagdeling.',
      steps: [
        'Del inn i to lag med vester.',
        'Vanlige regler, innkast ved sidelinje.',
        'Spill perioder på 4-6 minutter, kort pause, nye lag.',
        'Trener kan stoppe kort for å veilede, men la spillet flyte!'
      ],
      coaching: [
        'Spre dere! Ikke alle rundt ballen',
        'Snakk sammen — rop på ballen, gi beskjed',
        'Etter ballvinning: se framover først!',
        'La barna prøve og feile — ros innsats, ikke bare mål'
      ],
      variations: [
        'Jokere: 1-2 spillere alltid med angripende lag',
        'Flere mål for mer rom og gøy'
      ],
      diagram: { width:240, height:160, field:'small', elements:[
        {type:'cone',x:15,y:15},{type:'cone',x:225,y:15},
        {type:'cone',x:15,y:145},{type:'cone',x:225,y:145},
        {type:'goal',x:8,y:62,w:12,h:36,vertical:true},
        {type:'goal',x:220,y:62,w:12,h:36,vertical:true},
        {type:'player',x:65,y:55,team:'a',label:''},
        {type:'player',x:65,y:105,team:'a',label:''},
        {type:'player',x:170,y:55,team:'b',label:''},
        {type:'player',x:170,y:105,team:'b',label:''},
        {type:'player',x:38,y:80,team:'a',label:'K'},
        {type:'player',x:202,y:80,team:'b',label:'K'},
        {type:'ball',x:120,y:80},
        {type:'arrow',from:[65,55],to:[118,78],style:'run'}
      ]}
    },
    {
      key: 'possession', label: 'Ballbesittelse', defaultMin: 12, category: 'smalagsspill',
      ages: ['8-9','10-12','13-16'], players: '7-15',
      equipment: 'Vester, baller, kjegler til bane',
      nffCategory: 'smalagsspill', themes: ['samarbeidsspill', 'mottak_pasning', 'forsvarsspill'], nffPhases: ['angrep_fremover', 'forsvar_vinne_ball'],
      learningGoals: ['Gjør deg spillbar: avstand og vinkel til ballfører', 'Se opp før du får ballen: orienter deg', 'Forsvar: press sammen, steng midten'],
      intensity: 'high', hasOpposition: true,
      playerCount: { min: 7, max: 15 }, equipmentTags: ['vester', 'ball', 'kjegler'],
      description: 'Hold ballen i laget med overtall (f.eks. 4v2 med jokere). Trener pasningsspill under press, orientering og bevegelse for å bli spillbar.',
      setup: 'Avgrens et område (12x12 til 20x20m). Del inn i to lag pluss 1-2 jokere som alltid er med ballførende lag.',
      steps: [
        'Laget med ball holder den så lenge som mulig.',
        'Jokerne spiller med det ballførende laget (overtall).',
        'Forsvarerne vinner ball = bytt!',
        'Tell pasninger i strekk — hvem klarer 10?'
      ],
      coaching: [
        'Gjør deg spillbar: avstand og vinkel til ballfører',
        'Jokere: beveg deg, ikke stå stille!',
        'Se opp før du får ballen — orienter deg',
        'Forsvar: press sammen, steng midten'
      ],
      variations: [
        'Uten jokere for lik kamp',
        'Score ved å spille ballen fra side til side'
      ],
      diagram: { width:220, height:160, field:'small', elements:[
        {type:'cone',x:20,y:20},{type:'cone',x:200,y:20},
        {type:'cone',x:20,y:140},{type:'cone',x:200,y:140},
        {type:'player',x:110,y:22,team:'a',label:''},
        {type:'player',x:188,y:70,team:'a',label:''},
        {type:'player',x:188,y:110,team:'a',label:''},
        {type:'player',x:110,y:148,team:'a',label:''},
        {type:'player',x:32,y:80,team:'a',label:''},{type:'ball',x:40,y:76},
        {type:'player',x:98,y:80,team:'b',label:'F'},
        {type:'player',x:128,y:80,team:'b',label:'F'},
        {type:'arrow',from:[32,80],to:[108,28],style:'pass'},
        {type:'arrow',from:[98,80],to:[108,38],style:'run'}
      ]}
    },
    {
      key: 'game_activity', label: 'Fri spillaktivitet', defaultMin: 18, category: 'smalagsspill',
      ages: ['6-7','8-9','10-12','13-16'], players: '6-20',
      equipment: 'Mål, baller, vester',
      nffCategory: 'smalagsspill', themes: ['leik_stafett', 'samarbeidsspill'], nffPhases: ['angrep_fremover', 'angrep_avslutning', 'forsvar_vinne_ball', 'forsvar_hindre_maal'],
      learningGoals: ['La barna løse problemene selv', 'Ros samarbeid og innsats, ikke bare scoring'],
      intensity: 'high', hasOpposition: true,
      playerCount: { min: 6, max: 20 }, equipmentTags: ['maal', 'ball', 'vester'],
      description: 'Ustrukturert spill der barna styrer selv. Treneren observerer og heier, men griper minimalt inn. Gir eierskap, kreativitet og ren håndballglede.',
      setup: 'Tilpasset bane med mål. Del inn i lag (kan være ujevne). Minimalt med regler.',
      steps: [
        'Del inn i lag. Forklar: "Nå er det match!".',
        'Spillerne styrer selv — innkast, mål, igangsettinger.',
        'Treneren observerer og heier, griper minimalt inn.',
        'Bytt lag halvveis for variasjon.'
      ],
      coaching: [
        'Tren deg i å holde igjen — la barna løse problemene selv',
        'Ros samarbeid og innsats, ikke bare scoring',
        'Gå gjerne inn som spiller selv om det trengs',
        'Sørg for at alle er involvert'
      ],
      variations: [
        'Alle må touche ballen før scoring teller',
        'Spill uten keeper for mer scoring'
      ],
      diagram: { width:240, height:200, field:'handball_half', elements:[
        {type:'player',x:65,y:80,team:'a',label:''},
        {type:'player',x:120,y:65,team:'a',label:''},{type:'ball',x:128,y:61},
        {type:'player',x:175,y:80,team:'a',label:''},
        {type:'player',x:88,y:125,team:'b',label:''},
        {type:'player',x:152,y:125,team:'b',label:''},
        {type:'keeper',x:120,y:175},
        {type:'arrow',from:[120,65],to:[68,80],style:'pass'},
        {type:'arrow',from:[65,80],to:[95,183],style:'shot'}
      ]}
    },

    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    // 🧤 KEEPER
    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    {
      key: 'keeper', label: 'Keepertrening', defaultMin: 12, category: 'keeper',
      ages: ['8-9','10-12','13-16'], players: '1-4',
      equipment: 'Mål, baller, keeperhansker',
      nffCategory: 'sjef_over_ballen', themes: ['keeper'], nffPhases: ['forsvar_hindre_maal'],
      learningGoals: ['Grunnstilling: føtter i skulderbredde, lett på tå', 'Grep: tomler danner W, fingre spredt', 'Fall til siden, ikke bakover'],
      intensity: 'medium', hasOpposition: false,
      playerCount: { min: 1, max: 4 }, equipmentTags: ['maal', 'ball', 'keeperhansker'],
      description: 'Grunnleggende keeperøvelser parallelt med resten av laget. Fokus på grunnstilling, grep, enkel skuddstopp og utkast. Alle bør prøve keeperrollen.',
      setup: 'Keeper i mål. Trener eller medspiller skyter fra 8-12 meter. Start med rolige skudd, øk gradvis.',
      steps: [
        'Grunnstilling: føttene i skulderbredde, lett på tå, hendene foran.',
        'Trener ruller ball langs bakken — keeper går ned og griper.',
        'Trener kaster ball i brysthøyde — keeper fanger med "W-grep".',
        'Avslutning: spillere skyter lette skudd, keeper stopper og kaster ut.'
      ],
      coaching: [
        'Kropp bak ballen — sikre med hele kroppen',
        'Grep: tomler danner W, fingre spredt',
        'Fall til siden, ikke bakover',
        'Utkast: underarmskast for presisjon, overkast for lengde'
      ],
      variations: [
        'Keeperlek: keeper vs keeper med kast over en snor',
        '1v1 mot keeper: spillere angriper, keeper leser situasjonen'
      ],
      diagram: { width:240, height:200, field:'handball_half', elements:[
        {type:'player',x:65,y:88,team:'a',label:'1'},
        {type:'player',x:175,y:88,team:'a',label:'2'},
        {type:'player',x:48,y:110,team:'a',label:'3'},
        {type:'player',x:192,y:110,team:'a',label:'4'},
        {type:'keeper',x:120,y:172},
        {type:'arrow',from:[65,88],to:[105,183],style:'shot'},
        {type:'arrow',from:[175,88],to:[135,183],style:'shot'},
        {type:'arrow',from:[48,110],to:[100,183],style:'shot'}
      ]}
    },

    // ═══════════════════════════════
    // 🆕 TIER 1: NYE ØVELSER (egenprodusert innhold)
    // ═══════════════════════════════

    // --- Ballsisten (leik med ball, 6-7 fokus) ---
    {
      key: 'ball_tag', label: 'Ballsisten (fri)', defaultMin: 8, category: 'oppvarming',
      ages: ['6-7', '8-9'], players: '6-20',
      equipment: '1 ball per spiller, kjegler til bane',
      nffCategory: 'sjef_over_ballen', themes: ['dribling_bevegelse', 'leik_stafett'], nffPhases: ['noytral'],
      learningGoals: ['Hold ballen i hånden under press', 'Retningsforandring for å unngå fangere', 'Bruk kroppen til å skjerme ballen'],
      intensity: 'high', hasOpposition: false,
      playerCount: { min: 6, max: 20 }, equipmentTags: ['ball', 'kjegler'],
      description: 'Sistenlek der alle har egen ball. Fangeren løper med ball i hånden samtidig som den prøver å ta de andre. Kombinerer ballkontroll med bevegelse og romforståelse.',
      setup: 'Avgrens et område (15x15 til 20x20m). Alle spillere har egen ball. Velg 1-2 fangere (vester).',
      steps: [
        'Alle løper med ball i hånden innenfor området.',
        'Fangerne (med vest) prøver å ta de andre ved å berøre dem.',
        'Blir du tatt, stopp og stuss ballen 5 ganger på stedet. Så er du fri igjen.',
        'Bytt fangere hvert 2. minutt.'
      ],
      coaching: [
        'Hold ballen trygt i hånden — ikke slipp den',
        'Løft blikket! Se hvor fangerne er',
        'Bruk retningsforandring for å stikke unna',
        'Fangere: ikke bare jag — avskjær!'
      ],
      variations: [
        'Tatt = bli fanger selv (siste spiller igjen vinner)',
        'Fangere uten ball — tar de andre ved å berøre dem med hånden'
      ],
      diagram: { width:220, height:160, field:'small', elements:[
        {type:'cone',x:20,y:20},{type:'cone',x:200,y:20},
        {type:'cone',x:20,y:140},{type:'cone',x:200,y:140},
        {type:'player',x:60,y:50,team:'b',label:'S'},
        {type:'player',x:155,y:100,team:'b',label:'S'},
        {type:'player',x:90,y:110,team:'a',label:''},{type:'ball',x:98,y:106},
        {type:'player',x:140,y:40,team:'a',label:''},
        {type:'player',x:50,y:90,team:'a',label:''},
        {type:'arrow',from:[90,110],to:[52,90],style:'run'},
        {type:'arrow',from:[155,100],to:[130,70],style:'run'}
      ]}
    },

    // --- Press på ballfører (forsvarsspill) ---
    {
      key: 'defend_press', label: 'Press på ballfører', defaultMin: 12, category: 'spill_m_motstand',
      ages: ['8-9', '10-12', '13-16'], players: '6-16',
      equipment: 'Kjegler, vester, baller, småmål eller store mål',
      nffCategory: 'spille_med_og_mot', themes: ['forsvarsspill', '1v1_duell'], nffPhases: ['forsvar_vinne_ball'],
      learningGoals: ['Komme tett i press med riktig fart og kroppsstilling', 'Tving ballfører til én side', 'Stå mellom ballfører og mål'],
      suggestedGroupSize: 2, intensity: 'high', hasOpposition: true,
      playerCount: { min: 6, max: 16 }, equipmentTags: ['kjegler', 'vester', 'ball', 'smaamaal'],
      description: 'Dedikert forsvarsøvelse der forsvareren øver på å presse ballfører kontrollert. Fokus på posisjonering, fart inn i press, og å tvinge ballfører dit forsvareren vil.',
      setup: 'Bane 12x18m med mål i én ende. Angripere starter ved midten, forsvarere fra siden.',
      steps: [
        'Angriper mottar ball fra trener og fører mot mål.',
        'Forsvarer starter fra siden og løper i posisjon mellom angriper og mål.',
        'Forsvarer presser kontrollert: tving til side, ikke stup inn.',
        'Angriper prøver å score. Forsvarer prøver å vinne ball eller tvinge skudd utenfra.',
        'Bytt roller etter 3 forsøk.'
      ],
      coaching: [
        'Forsvarer: stå på tå, sidelengs, lav tyngdepunkt',
        'Ikke stup inn! Vent på angriperens feil',
        'Tving angriperen mot sidelinja, vekk fra mål',
        'Angriper: bruk finter og fart for å komme forbi'
      ],
      variations: [
        '2v1: legg til en medangriper for å øve samarbeid i forsvar',
        'Gi forsvareren poeng for å tvinge skudd fra utenfor 9m-linjen'
      ],
      diagram: { width:240, height:160, field:'small', elements:[
        {type:'cone',x:15,y:15},{type:'cone',x:225,y:15},
        {type:'cone',x:15,y:145},{type:'cone',x:225,y:145},
        {type:'player',x:65,y:50,team:'a',label:''},{type:'ball',x:73,y:46},
        {type:'player',x:65,y:110,team:'a',label:''},
        {type:'player',x:110,y:80,team:'a',label:''},
        {type:'player',x:150,y:50,team:'b',label:'F'},
        {type:'player',x:150,y:110,team:'b',label:'F'},
        {type:'player',x:175,y:80,team:'b',label:'F'},
        {type:'arrow',from:[65,50],to:[65,100],style:'pass'},
        {type:'arrow',from:[150,50],to:[120,78],style:'run'}
      ]}
    },

    // --- Smålagsspill med betingelser ---
    {
      key: 'ssg_theme', label: 'Spill med betingelser', defaultMin: 18, category: 'smalagsspill',
      ages: ['8-9', '10-12', '13-16'], players: '8-16',
      equipment: 'Vester, baller, mål (store eller småmål), kjegler',
      nffCategory: 'smalagsspill', themes: ['samarbeidsspill', 'forsvarsspill', 'kontring_retur'], nffPhases: ['angrep_fremover', 'forsvar_vinne_ball'],
      learningGoals: ['Tilpass spillet til betingelsen', 'Samarbeid for å oppfylle kravet', 'Les spillet og finn løsninger'],
      intensity: 'high', hasOpposition: true,
      playerCount: { min: 8, max: 16 }, equipmentTags: ['vester', 'ball', 'maal', 'kjegler'],
      description: 'Vanlig smålagsspill med én betingelse som forsterker øktens tema. Betingelsen styrer hva spillerne må gjøre for å score, og gir treneren kontroll over læringsfokuset.',
      setup: 'Tilpass bane til antall (4v4: 25x35m, 5v5: 30x45m). To mål. Del i to lag med vester.',
      steps: [
        'Velg én betingelse og forklar den tydelig før start. Eksempler: alle på angripende lag over midtlinjen, mål teller dobbelt etter kombinasjon, eller maks 3 berøringer på siste spiller.',
        'Spill vanlig kamp med betingelsen aktiv. La spillet flyte — stopp maks 1-2 ganger kort for å forsterke temaet.',
        'Bytt betingelse halvveis for variasjon, eller fjern den og se om atferden sitter.',
        'Avslutt med fri tid uten betingelse: spill bare for gleden av det.'
      ],
      coaching: [
        'Forklar betingelsen tydelig FØR start',
        'La spillet gå — stopp kun kort for å forsterke tema',
        'Ros lagspill og løsninger, ikke bare mål',
        'Tilpass betingelsen hvis den er for lett eller vanskelig'
      ],
      variations: [
        'Jokere: 1-2 spillere alltid med angripende lag (overtall)',
        'Tidsbetingelse: scoringen teller bare i første 3 min av hver periode'
      ],
      diagram: { width:240, height:200, field:'handball_half', elements:[
        {type:'player',x:70,y:82,team:'a',label:'B'},{type:'ball',x:78,y:78},
        {type:'player',x:120,y:138,team:'a',label:'L'},
        {type:'player',x:85,y:122,team:'b',label:'F'},
        {type:'player',x:155,y:122,team:'b',label:'F'},
        {type:'keeper',x:120,y:175},
        {type:'arrow',from:[70,82],to:[118,133],style:'pass'},
        {type:'arrow',from:[120,138],to:[115,183],style:'shot'}
      ]}
    },

    // --- Omstillingsspill ---
    {
      key: 'transition', label: 'Omstillingsspill', defaultMin: 15, category: 'smalagsspill',
      ages: ['10-12', '13-16'], players: '8-16',
      equipment: 'Vester (3 farger), baller, 2 mål, kjegler',
      nffCategory: 'smalagsspill', themes: ['kontring_retur', 'forsvarsspill'], nffPhases: ['angrep_fremover', 'angrep_avslutning', 'forsvar_vinne_ball'],
      learningGoals: ['Ved balltap: raskt tilbake, flest mulig på rett side av ball', 'Ved ballvinning: se fremover umiddelbart', 'Første forsvarer presser, resten organiserer'],
      intensity: 'high', hasOpposition: true,
      playerCount: { min: 8, max: 16 }, equipmentTags: ['vester', 'ball', 'maal', 'kjegler'],
      description: 'Tre lag roterer: ett angriper, ett forsvarer, ett venter. Ved scoring eller ballvinning bytter lagene roller. Trener konstant omstilling mellom angrep og forsvar.',
      setup: 'Bane 25x35m med mål i begge ender. Tre lag à 3-5 spillere. Lag A angriper mot Lag B. Lag C venter bak ene målet.',
      steps: [
        'Lag A angriper mot Lag B sitt mål.',
        'Scorer Lag A: Lag B ut, Lag C inn som nytt forsvarslag. Lag A snur og angriper andre veien.',
        'Vinner Lag B ballen: Lag B angriper umiddelbart mot Lag C sitt mål. Lag A ut, Lag C forsvarer.',
        'Laget som er ute venter maks 30 sek, deretter byttes det uansett.',
        'Poengsystem: 1 poeng per mål, 1 ekstrapoeng for scoring innen 8 sekunder etter ballvinning.'
      ],
      coaching: [
        'OMSTILLING er nøkkelen: hodet opp i det ballen bytter lag!',
        'Forsvarende lag: raskt tilbake mellom ball og mål',
        'Angripende lag: se fremover FØR du tar kontroll',
        'Ros rask omstilling, ikke bare mål'
      ],
      variations: [
        'Uten 3. lag: etter scoring starter motstanderlaget med ball fra keeper',
        'Krav om maks 10 sek fra ballvinning til avslutning'
      ],
      diagram: { width:240, height:160, field:'small', elements:[
        {type:'cone',x:15,y:15},{type:'cone',x:225,y:15},
        {type:'cone',x:15,y:145},{type:'cone',x:225,y:145},
        {type:'zone_line',x1:120,y1:15,x2:120,y2:145},
        {type:'player',x:75,y:60,team:'b',label:''},
        {type:'player',x:100,y:90,team:'b',label:''},{type:'ball',x:108,y:86},
        {type:'player',x:160,y:55,team:'a',label:''},
        {type:'player',x:165,y:100,team:'a',label:''},
        {type:'arrow',from:[100,90],to:[158,58],style:'pass'},
        {type:'arrow',from:[75,60],to:[55,100],style:'run'},
        {type:'arrow',from:[160,55],to:[200,55],style:'run'}
      ]}
    },

    // --- Veggspill / gi-og-gå ---
    {
      key: 'wall_pass', label: 'Veggspill', defaultMin: 12, category: 'spill_m_motstand',
      ages: ['8-9', '10-12', '13-16'], players: '6-14',
      equipment: 'Kjegler, baller, småmål eller store mål',
      nffCategory: 'spille_med_og_mot', themes: ['samarbeidsspill', 'finter', 'linjespill'], nffPhases: ['angrep_fremover', 'angrep_avslutning'],
      learningGoals: ['Spill pasning og løp forbi forsvarer i samme bevegelse', 'Medspiller: rask returpasning i rom bak forsvarer', 'Timing mellom pasning og løp er avgjørende'],
      suggestedGroupSize: 3, intensity: 'medium', hasOpposition: true,
      playerCount: { min: 6, max: 14 }, equipmentTags: ['kjegler', 'ball', 'smaamaal'],
      description: 'Øver på gi-og-gå: spill pasning til medspiller, løp forbi forsvareren, motta returen i rom. Den mest effektive kombinasjonen for å bryte gjennom forsvar.',
      setup: 'Bane 15x20m med mål i ene enden. Tre køer: angripere sentralt, veggspillere på siden, forsvarere ved mål.',
      steps: [
        'Angriper fører ball mot forsvarer.',
        'Angriper spiller veggpasning til medspiller på siden.',
        'Angriper løper forbi forsvarer (gi-og-gå).',
        'Medspiller spiller ballen tilbake i rommet bak forsvareren.',
        'Angriper avslutter på mål. Bytt roller.'
      ],
      coaching: [
        'Pasning FØRST, løp umiddelbart etterpå',
        'Medspiller: spill ballen i rommet, ikke i beina',
        'Trekk forsvareren mot deg FØR du spiller vegg',
        'Fart etter pasningen — ikke stopp og se!'
      ],
      variations: [
        'Dobbelt veggspill: to pasninger før avslutning',
        'Legg til aktiv forsvarer som prøver å stoppe kombinasjonen'
      ],
      diagram: { width:240, height:200, field:'handball_half', elements:[
        {type:'player',x:85,y:90,team:'a',label:'B'},{type:'ball',x:93,y:86},
        {type:'player',x:50,y:90,team:'a',label:'K'},
        {type:'player',x:100,y:115,team:'b',label:'F'},
        {type:'keeper',x:120,y:175},
        {type:'arrow',from:[85,90],to:[54,90],style:'pass'},
        {type:'arrow',from:[85,90],to:[118,138],style:'run'},
        {type:'arrow',from:[54,90],to:[113,133],style:'pass'},
        {type:'arrow',from:[118,138],to:[113,183],style:'shot'}
      ]}
    },

    // --- Avslutning med medspiller ---
    {
      key: 'finish_assist', label: 'Avslutning med medspiller', defaultMin: 12, category: 'avslutning',
      ages: ['8-9', '10-12', '13-16'], players: '6-14',
      equipment: 'Mål med keeper, baller, kjegler',
      nffCategory: 'scoringstrening', themes: ['kast_teknikk', 'samarbeidsspill', 'finter'], nffPhases: ['angrep_avslutning'],
      learningGoals: ['Tverrpasning eller tilbakelegg til medspiller i skuddposisjon', 'Avslutt på direkten eller med færrest mulig touch', 'Beveg deg inn i scoringsposisjon med riktig timing'],
      suggestedGroupSize: 2, intensity: 'high', hasOpposition: false,
      playerCount: { min: 6, max: 14 }, equipmentTags: ['maal', 'ball', 'kjegler'],
      description: 'Avslutningsøvelse der to spillere samarbeider om å score. Øver på tverrballer, tilbakelegg og direkte avslutning — mer realistisk enn å skyte alene.',
      setup: 'Spillere i par. Kø sentralt og på høyre/venstre side, 20m fra mål. Keeper i mål.',
      steps: [
        'Spiller A fører ball langs siden mot mållinja.',
        'Spiller B løper inn i boksen fra sentralt.',
        'A slår tverrball eller tilbakelegg til B.',
        'B avslutter på mål — helst på direkten.',
        'Bytt sider og roller. Varier mellom høyre og venstre.'
      ],
      coaching: [
        'Kantspiller: løft blikket, finn medspillerens løp',
        'Avslutter: timing! Ikke stå stille — løp inn i ballen',
        'Avslutt raskt, keeper skal ikke rekke å flytte seg',
        'Plassering i det ledige hjørnet, ikke rett på keeper'
      ],
      variations: [
        'Legg til en forsvarer som prøver å blokkere tverrballen',
        'Varier: tilbakelegg fra mållinja, tverrpass fra 9m, gjennombrudd sentralt'
      ],
      diagram: { width:240, height:200, field:'handball_half', elements:[
        {type:'player',x:80,y:88,team:'a',label:'B'},{type:'ball',x:88,y:84},
        {type:'player',x:50,y:75,team:'a',label:'K'},
        {type:'player',x:120,y:138,team:'a',label:'L'},
        {type:'player',x:95,y:118,team:'b',label:'F'},
        {type:'keeper',x:120,y:175},
        {type:'arrow',from:[80,88],to:[52,80],style:'pass'},
        {type:'arrow',from:[50,75],to:[50,145],style:'run'},
        {type:'arrow',from:[50,145],to:[100,183],style:'shot'}
      ]}
    },

    // --- Keeperduell ---
    {
      key: 'keeper_play', label: 'Keeperduell', defaultMin: 10, category: 'keeper',
      ages: ['8-9', '10-12'], players: '4-10',
      equipment: '2 småmål (eller store mål), baller',
      nffCategory: 'sjef_over_ballen', themes: ['keeper', 'samarbeidsspill'], nffPhases: ['forsvar_hindre_maal'],
      learningGoals: ['Grunnstilling og forflytning i målet', 'Grep og skyv ved lave og høye skudd', 'Rask reaksjon og igangsetting etter redning'],
      suggestedGroupSize: 2, intensity: 'medium', hasOpposition: false,
      playerCount: { min: 4, max: 10 }, equipmentTags: ['smaamaal', 'maal', 'ball'],
      description: 'To keepere mot hverandre i hver sitt mål på kort avstand. Trener reaksjon, grep, plassering og utspark. Morsomt og intenst — alle får mange repetisjoner.',
      setup: 'To mål (småmål eller store) 8-12m fra hverandre. Én keeper i hvert mål. Ekstra baller bak målene.',
      steps: [
        'Keeper A kaster ballen mot Keeper Bs mål.',
        'Keeper B forsøker å redde og angriper umiddelbart tilbake.',
        'Spill fram og tilbake i perioder på 2 minutter.',
        'Tell poeng: mål = 1 poeng, redning + kontroll = 1 poeng til forsvarer.',
        'Roter keepere slik at alle prøver seg.'
      ],
      coaching: [
        'Grunnstilling: lav, vekt fremover, på tå',
        'Grep: hendene bak ballen, fingre spredt (W-grep)',
        'Etter redning: kontroll først, så kast/spark raskt',
        'Plassering: stå sentralt, følg ballens posisjon'
      ],
      variations: [
        'Spillere på sidene skyter i stedet for keeperne',
        'Større avstand (15m) for å øve utspark'
      ],
      diagram: { width:240, height:160, field:'none', elements:[
        {type:'zone_line',x1:120,y1:15,x2:120,y2:145},
        {type:'keeper',x:45,y:80},
        {type:'keeper',x:195,y:80},
        {type:'ball',x:120,y:80},
        {type:'arrow',from:[55,78],to:[112,78],style:'shot'},
        {type:'arrow',from:[185,82],to:[133,82],style:'pass'}
      ]}
    },

    {
      key: 'ball_sisten',
      label: 'Ballsisten',
      defaultMin: 10,
      category: 'oppvarming',
      ages: ['6-7','8-9','10-12'],
      players: '6-16',
      equipment: '1 ball per 4 spillere, kjegler til avgrensning',
      nffCategory: 'sjef_over_ballen',
      themes: ['leik_stafett', 'mottak_pasning'],
      nffPhases: ['noytral'],
      learningGoals: ['Kontrollere ball under press', 'Reagere raskt', 'Samarbeide med lagkamerater'],
      intensity: 'high',
      hasOpposition: true,
      playerCount: { min: 6, max: 16 },
      equipmentTags: ['ball', 'kjegler'],
      description: 'Fire spillere om én ball innenfor et avgrenset område. Den som har sisten kan ikke ta den som holder ball. Spillerne er trygge med ballen — men må spille videre innen 3 sekunder! Stuss er ikke tillatt.',
      setup: 'Avgrens et område på ca. 10x10 meter. 4 spillere deles i én med sisten og tre med ball imellom seg.',
      steps: [
        'Den som har sisten jakter de uten ball.',
        'Spillerne som har ballen er trygge — men kan IKKE stå og vente: spill innen 3 sekunder.',
        'Den som blir tatt, tar over sisten.',
        'Øk antall baller ved stor gruppe (5-6 spillere = 2 baller).'
      ],
      coaching: [
        'Kommuniser med lagkameratene: "kom hit!", "til meg!"',
        'Se hele feltet — hvem er fri FØR du mottar ballen?',
        'Spill raskt — ikke hold ballen for lenge'
      ],
      variations: [
        'Kun stuss (ingen holdning av ballen)',
        'Kun venstre hånd',
        'Streksisten: bare lov å trå på strekene'
      ],
      diagram: { width:220, height:160, field:'small', elements:[
        {type:'cone',x:20,y:20},{type:'cone',x:200,y:20},
        {type:'cone',x:20,y:140},{type:'cone',x:200,y:140},
        {type:'player',x:60,y:50,team:'b',label:'S'},
        {type:'player',x:155,y:100,team:'b',label:'S'},
        {type:'player',x:90,y:110,team:'a',label:''},{type:'ball',x:98,y:106},
        {type:'player',x:140,y:40,team:'a',label:''},
        {type:'player',x:50,y:90,team:'a',label:''},
        {type:'arrow',from:[90,110],to:[52,90],style:'pass'},
        {type:'arrow',from:[155,100],to:[130,70],style:'run'}
      ]}
    },
    {
      key: 'kongen_haugen',
      label: 'Kongen på haugen',
      defaultMin: 12,
      category: 'oppvarming',
      ages: ['6-7','8-9','10-12'],
      players: '6-16',
      equipment: 'Håndball, kjegler',
      nffCategory: 'smalagsspill',
      themes: ['leik_stafett', 'mottak_pasning', 'samarbeidsspill'],
      nffPhases: ['noytral'],
      learningGoals: ['Pasning til fri spiller', 'Orientering i rom', 'Score ved å nå "kongen"'],
      intensity: 'high',
      hasOpposition: true,
      playerCount: { min: 6, max: 16 },
      equipmentTags: ['ball', 'kjegler'],
      description: 'Del i 2 lag. Man scorer ved å gi pasning til lagets "konge" som står i et avgrenset område. Bytter konge ved mål. Anbefalt av NHF Region Sør som oppvarmingslek for 6-9 år.',
      setup: 'Marker to kongesoner (2x2m) ved hvert ende av feltet. Del i to lag. Én spiller fra hvert lag er kongen.',
      steps: [
        'Laget scorer ved å gi pasning til sin konge i kongesonen.',
        'Motstanderne prøver å hindre dette ved å snappe ball eller blokkere.',
        'Den som scoret bytter plass med kongen.',
        'Kan ha minimum 3 pasninger FØR man kan skåre.'
      ],
      coaching: [
        'Se etter når kongen er fri',
        'Beveg deg — gjør deg spillbar for lagkameratene',
        'Forsvarerne: mark kongen eller mark ballfører?'
      ],
      variations: [
        'To konger per lag: begge må motta for å score',
        'Kongen kan forlate sonen etter mottak'
      ],
      diagram: { width:240, height:160, field:'small', elements:[
        {type:'cone',x:15,y:15},{type:'cone',x:225,y:15},
        {type:'cone',x:15,y:145},{type:'cone',x:225,y:145},
        {type:'cone',x:100,y:25},{type:'cone',x:140,y:25},
        {type:'player',x:120,y:30,team:'a',label:'K'},
        {type:'cone',x:100,y:130},{type:'cone',x:140,y:130},
        {type:'player',x:120,y:135,team:'b',label:'K'},
        {type:'player',x:70,y:80,team:'a',label:''},{type:'ball',x:78,y:76},
        {type:'player',x:100,y:110,team:'a',label:''},
        {type:'player',x:155,y:65,team:'b',label:''},
        {type:'player',x:170,y:100,team:'b',label:''},
        {type:'arrow',from:[70,80],to:[118,38],style:'pass'}
      ]}
    },
    {
      key: 'kastlek_halvdeler',
      label: 'Kastlek på to halvdeler',
      defaultMin: 8,
      category: 'oppvarming',
      ages: ['6-7','8-9'],
      players: '8-20',
      equipment: 'Håndball (mange baller, gjerne 1 per spiller)',
      nffCategory: 'sjef_over_ballen',
      themes: ['leik_stafett', 'kast_teknikk'],
      nffPhases: ['noytral'],
      learningGoals: ['Kaste med kraft og presisjon', 'Reagere raskt', 'Ha det gøy med kast'],
      intensity: 'high',
      hasOpposition: false,
      playerCount: { min: 8, max: 20 },
      equipmentTags: ['ball'],
      description: 'Del banen i to. Lagene kaster ballene over på motstanders side. Laget med færrest baller når signalet går vinner. Direkte fra NHFs øktplaner for 6-9 år.',
      setup: 'Del hallen i to med midtlinjen. Likt antall baller på begge sider.',
      steps: [
        'På signal kaster spillerne ball over på motstanders halvdel.',
        'Plukk opp baller på din side og kast dem over.',
        'Etter 1-2 minutter: signal stopp. Tell baller på hver side.',
        'Færrest baller på sin side vinner.'
      ],
      coaching: [
        'Kast med høy arm, ikke underhånd',
        'Spre kastene — ikke kast der det er mange baller allerede',
        'Lag strategi: er det lurt å samle baller eller kaste raskt?'
      ],
      variations: [
        'Kun lov å kaste fra bak en linje 5m fra midten',
        'Baller utenfor banen gir poeng til motstanderne'
      ],
      diagram: { width:220, height:140, field:'small', elements:[
        {type:'zone_line',x1:110,y1:8,x2:110,y2:132},
        {type:'player',x:40,y:50,team:'a',label:''},{type:'ball',x:48,y:46},
        {type:'player',x:40,y:90,team:'a',label:''},{type:'ball',x:48,y:86},
        {type:'player',x:175,y:50,team:'b',label:''},
        {type:'player',x:175,y:90,team:'b',label:''},
        {type:'arrow',from:[40,50],to:[150,60],style:'pass'},
        {type:'arrow',from:[175,90],to:[65,80],style:'pass'}
      ]}
    },
    {
      key: 'ball_luften',
      label: 'Kast ballen opp i luften',
      defaultMin: 8,
      category: 'oppvarming',
      ages: ['6-7','8-9'],
      players: '4-20',
      equipment: '1 håndball per spiller',
      nffCategory: 'sjef_over_ballen',
      themes: ['kast_teknikk', 'leik_stafett'],
      nffPhases: ['noytral'],
      learningGoals: ['Ballfølelse og bli venn med ballen', 'Øye-hånd-koordinasjon', 'Gripe ballen sikkert'],
      intensity: 'low',
      hasOpposition: false,
      playerCount: { min: 4, max: 20 },
      equipmentTags: ['ball'],
      description: 'Alle har sin ball og kaster den opp i luften med stadig vanskeligere oppgaver. Direkte fra NHFs Kast ballen-program for 1.-3. klasse.',
      setup: 'Alle spillere med én ball. Fritt rundt i salen.',
      steps: [
        'Kast ballen opp — la den stusse én gang i gulvet, fang den.',
        'Kast opp — ta imot FØR den stusser.',
        'Kast opp — klapp i hendene én gang før mottak. Klarer du to? Tre?',
        'Sett deg på knærne, kast opp og ta imot knestående.'
      ],
      coaching: [
        'Trener er med og gjør øvelsene — vis, ikke bare instruer',
        'Ros alle forsøk — dette er lek, ikke prestasjon',
        'Gi nye utfordringer til de som mestrer raskt'
      ],
      variations: [
        'Kast opp, sett deg på rompa og reis deg — ta imot stående',
        'Stuss ballen med annenhver hånd: høyre, venstre, høyre'
      ],
      diagram: { width:200, height:160, field:'none', elements:[
        {type:'player',x:60,y:120,team:'a',label:''},
        {type:'ball',x:60,y:45},
        {type:'arrow',from:[60,120],to:[60,58],style:'pass'},
        {type:'player',x:140,y:120,team:'a',label:''},
        {type:'ball',x:140,y:45},
        {type:'arrow',from:[140,120],to:[140,58],style:'pass'}
      ]}
    },
    {
      key: 'kast_vegg',
      label: 'Kast mot vegg',
      defaultMin: 10,
      category: 'teknikk',
      ages: ['6-7','8-9'],
      players: '4-16',
      equipment: '1 håndball per 2-4 spillere, vegg',
      nffCategory: 'sjef_over_ballen',
      themes: ['kast_teknikk', 'mottak_pasning'],
      nffPhases: ['angrep_fremover'],
      learningGoals: ['Kast med høy arm mot vegg', 'Ta imot ballen etter stuss', 'Kombinere kast og bevegelse'],
      intensity: 'medium',
      hasOpposition: false,
      playerCount: { min: 4, max: 16 },
      equipmentTags: ['ball'],
      description: 'Kast mot vegg i grupper av 2-4. Fra NHFs Kast ballen-program. God øvelse for kastteknikk og mottak.',
      setup: 'Fire spillere på rekke foran en vegg. Ca. 3-5 meter fra veggen.',
      steps: [
        'Nr. 1 kaster ballen i veggen og løper bak i køen.',
        'Nr. 2 tar imot og kaster i veggen og løper bak.',
        'Varier: to-håndskast over hodet, en-håndskast.',
        '"Egget": Nr. 1 kaster i veggen, hopper over ballen når den stusser tilbake, nr. 2 tar imot.'
      ],
      coaching: [
        'Høy arm! Kast ovenfra — ikke underhånd',
        'Ta imot med begge hender foran kroppen',
        '"Egget" er morsomt — la barna prøve mange ganger'
      ],
      variations: [
        'Konkurranse: den som ikke greier å ta imot får en prikk (GRIS)',
        'Kast med stusspasning via gulvet til veggen'
      ],
      diagram: { width:220, height:150, field:'none', elements:[
        {type:'zone_line',x1:205,y1:15,x2:205,y2:135},
        {type:'player',x:50,y:120,team:'a',label:'1'},
        {type:'player',x:90,y:120,team:'a',label:'2'},
        {type:'player',x:130,y:120,team:'a',label:'3'},
        {type:'player',x:170,y:120,team:'a',label:'4'},
        {type:'ball',x:58,y:116},
        {type:'arrow',from:[50,120],to:[205,55],style:'pass'},
        {type:'arrow',from:[205,55],to:[90,112],style:'pass'}
      ]}
    },
    {
      key: 'kanonball',
      label: 'Dansk kanonball',
      defaultMin: 10,
      category: 'smalagsspill',
      ages: ['6-7','8-9'],
      players: '8-20',
      equipment: '3-4 håndball, kjegler til avgrensning',
      nffCategory: 'smalagsspill',
      themes: ['leik_stafett', 'kast_teknikk'],
      nffPhases: ['noytral'],
      learningGoals: ['Kaste presist på bevegelig mål', 'Reagere og unngå ballen', 'Ha det gøy med kast'],
      intensity: 'high',
      hasOpposition: true,
      playerCount: { min: 8, max: 20 },
      equipmentTags: ['ball', 'kjegler'],
      description: 'Alle mot alle — kast på hverandre og prøv å overleve. Fra NHFs Kast ballen-program. Garantert moro og høy aktivitet.',
      setup: 'Avgrens et felt. Alle inne. 3-4 baller i spill.',
      steps: [
        'Alle spiller mot alle: kast ballen og prøv å treffe noen.',
        'Den som blir truffet går langs siden av banen.',
        'Kan bli reddet: den som traff deg blir selv truffet og ut.',
        'Variant: når 3 sitter på benken, er den første inne igjen.'
      ],
      coaching: [
        'Ikke lov å treffe hodet — si det tydelig',
        'Tar du imot ballen direkte: den som kastet er ut',
        'Varianten med 3 på benk er best — ingen sitter lenge ute'
      ],
      variations: [
        'To lag: lag A kaster på lag B',
        'Kun underarmskast for lavere intensitet'
      ],
      diagram: { width:220, height:160, field:'small', elements:[
        {type:'cone',x:20,y:20},{type:'cone',x:200,y:20},
        {type:'cone',x:20,y:140},{type:'cone',x:200,y:140},
        {type:'player',x:55,y:50,team:'a',label:''},{type:'ball',x:63,y:46},
        {type:'player',x:155,y:45,team:'a',label:''},
        {type:'player',x:85,y:105,team:'b',label:''},
        {type:'player',x:160,y:110,team:'b',label:''},
        {type:'player',x:110,y:65,team:'a',label:''},
        {type:'arrow',from:[55,50],to:[82,100],style:'shot'},
        {type:'arrow',from:[110,65],to:[157,105],style:'shot'}
      ]}
    },

    // --- Stafett med ball ---
    {
      key: 'relay_ball', label: 'Stafett med ball', defaultMin: 8, category: 'oppvarming',
      ages: ['6-7', '8-9'], players: '6-20',
      equipment: 'Baller, kjegler',
      nffCategory: 'sjef_over_ballen', themes: ['leik_stafett', 'kast_teknikk', 'dribling_bevegelse'], nffPhases: ['noytral'],
      learningGoals: ['Før ballen i fart uten å miste kontroll', 'Vend med ball rundt kjegle', 'Legg til fart gradvis — kontroll først'],
      intensity: 'high', hasOpposition: false,
      playerCount: { min: 6, max: 20 }, equipmentTags: ['ball', 'kjegler'],
      description: 'Stafett med dribling og kast. Engasjerende oppvarming som kombinerer bevegelse med kast og mottak.',
      setup: 'To eller flere lag i kø bak en startlinje. Kjegleløype 10-15m foran (rett linje, slalåm, eller sirkelbane).',
      steps: [
        'Drible til kjegle med høyre hånd og tilbake.',
        'Kast ballen til neste på laget og sett deg bakerst.',
        'Første lag ferdig vinner.',
        'Variant: drible med venstre hånd, eller hopp over kjegle underveis.'
      ],
      coaching: [
        'Kast med strakt arm mot lagkamerat',
        'Ta imot med begge hender, ta grep raskt',
        'Gjør lagene jevne'
      ],
      variations: [
        'Dribling med svak hånd',
        'Krabbestafett: på alle fire med ballen mellom beina',
        'Pasnings-stafett: kun kast, ingen dribling'
      ],
      diagram: { width:220, height:150, field:'small', elements:[
        {type:'cone',x:110,y:20},{type:'cone',x:110,y:130},
        {type:'player',x:30,y:40,team:'a',label:'1'},{type:'ball',x:38,y:36},
        {type:'player',x:30,y:75,team:'a',label:'2'},
        {type:'player',x:30,y:110,team:'a',label:'3'},
        {type:'player',x:190,y:40,team:'b',label:'1'},
        {type:'player',x:190,y:75,team:'b',label:'2'},
        {type:'arrow',from:[30,40],to:[108,22],style:'run'},
        {type:'arrow',from:[108,22],to:[30,65],style:'pass'}
      ]}
    },

    // ── EGENDEFINERT (alltid nederst) ──
    { key: 'custom', label: 'Skriv inn selv', defaultMin: 10, isCustom: true, category: 'special',
      nffCategory: 'sjef_over_ballen', themes: [], nffPhases: [], learningGoals: [],
      intensity: 'medium', hasOpposition: false }
];
