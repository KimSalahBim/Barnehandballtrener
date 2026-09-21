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
      equipment: 'Kjegler til avgrensning, vester til fangere, 1 ball per spiller',
      nffCategory: 'sjef_over_ballen', themes: ['leik_stafett', 'dribling_bevegelse'], nffPhases: ['noytral'],
      learningGoals: ['Retningsforandringer i fart', 'Lese rommet og reagere raskt'],
      intensity: 'high', hasOpposition: false,
      playerCount: { min: 6, max: 20 }, equipmentTags: ['kjegler', 'vester', 'ball'],
      description: 'Klassisk sistenlek som oppvarming, med ball. Alle i bevegelse fra start. Barna kjenner reglene, så organisering tar minimalt tid. Perfekt for å få opp puls og engasjement.',
      setup: 'Avgrens et område på ca. 20x20 meter med kjegler. Gi 1-2 spillere vester: de er fangere.',
      steps: [
        'Fangerne (med vest) jakter de andre, som dribler hver sin ball. De yngste kan bære ballen i hendene.',
        'Den som blir tatt, fryser på stedet med ballen over hodet og beina fra hverandre.',
        'Frie spillere kan redde frosne ved å krype mellom beina deres.',
        'Bytt fangere hvert 2. minutt.'
      ],
      coaching: [
        'Oppmuntre til retningsforandringer og finter',
        'Ros de som redder lagkamerater',
        'Gjør området mindre for mer intensitet'
      ],
      variations: [
        'Frostsisten: frosne spillere står med armene ut og blir fri når noen går under armen',
        'Haletag: alle har et bånd i buksen. Ta andres bånd uten å miste ditt eget'
      ],
      diagram: { width:220, height:160, field:'small', elements:[
        {type:'cone',x:20,y:20},
        {type:'cone',x:200,y:20},
        {type:'cone',x:20,y:140},
        {type:'cone',x:200,y:140},
        {type:'player',x:80,y:85,team:'b',label:'F'},
        {type:'player',x:160,y:112,team:'b',label:'F'},
        {type:'player',x:55,y:50,team:'a',label:''},
        {type:'ball',x:63,y:46},
        {type:'player',x:130,y:45,team:'a',label:''},
        {type:'ball',x:138,y:41},
        {type:'player',x:180,y:70,team:'a',label:''},
        {type:'ball',x:188,y:66},
        {type:'player',x:105,y:125,team:'a',label:''},
        {type:'ball',x:113,y:121},
        {type:'player',x:40,y:110,team:'a',label:''},
        {type:'ball',x:48,y:106},
        {type:'arrow',from:[80,85],to:[62,60],style:'run'},
        {type:'arrow',from:[55,50],to:[35,32],style:'run'}
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
      learningGoals: ['Albuen høyt, piskekast fra skulderen', 'Motta med begge hender foran kroppen', 'Øyekontakt med mottaker før kast'],
      suggestedGroupSize: 2, intensity: 'low', hasOpposition: false,
      playerCount: { min: 4, max: 20 }, equipmentTags: ['ball', 'kjegler'],
      description: 'Grunnøvelsen i kasttrening. To og to spillere kaster ballen til hverandre. Fokus på riktig kastteknikk og trygt mottak: den viktigste byggeklossen i håndball.',
      setup: 'Spillerne stiller seg parvis med 4-8 meters avstand (kortere for de yngste). Hvert par har én ball.',
      steps: [
        'Spiller A kaster til B med overarmskast: albuen høyt, piskebevegelse fra skulderen.',
        'B tar imot med begge hender foran kroppen og demper ballen.',
        'B kaster tilbake til A.',
        'Etter 2 min: øk avstand gradvis. Etter 4 min: prøv med ikke-dominante hånd.'
      ],
      coaching: [
        'Trykk ballen fremover med fingrene i siste øyeblikk',
        'Motta med myke hender: ikke stiv',
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
      learningGoals: ['Beveg deg etter kast: ikke stå stille', 'Se deg rundt FØR ballen kommer', 'Mottak i bevegelse: løp mot ballen'],
      intensity: 'medium', hasOpposition: false,
      playerCount: { min: 6, max: 12 }, equipmentTags: ['ball', 'kjegler'],
      description: 'Etter å ha kastet, beveger spilleren seg til ny posisjon. Trener det viktigste prinsippet i lagspill: kast og flytt deg! Gjør laget vanskeligere å forsvare.',
      setup: 'Sett opp en trekant med kjegler (8-10m mellom). Spillere fordelt på hjørnene, ball starter hos én.',
      steps: [
        'A kaster til B og løper mot Bs posisjon.',
        'B tar imot, kaster til C, og løper mot Cs posisjon.',
        'C tar imot, kaster til neste, og følger ballen.',
        'Hold flyten gående: ballen og spillerne sirkulerer hele tiden.'
      ],
      coaching: [
        'Flytt deg MED EN GANG etter kast',
        'Mottaker: løp mot ballen, ikke vent på den',
        'Kast med fart og presisjon: ikke bare sleng',
        'Se deg rundt FØR ballen kommer til deg'
      ],
      variations: [
        'To baller i omløp samtidig for mer intensitet',
        'Firkant i stedet for trekant med 4 spillere'
      ],
      diagram: { width:220, height:160, field:'none', elements:[
        {type:'player',x:50,y:120,team:'a',label:'1'},
        {type:'ball',x:58,y:116},
        {type:'player',x:110,y:35,team:'a',label:'2'},
        {type:'player',x:170,y:120,team:'a',label:'3'},
        {type:'arrow',from:[60,113],to:[103,44],style:'pass'},
        {type:'arrow',from:[44,109],to:[94,40],style:'run'},
        {type:'arrow',from:[119,42],to:[163,112],style:'pass'}
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
      learningGoals: ['Plassering foran kraft: sikte i hjørnene', 'Stemfot peker mot mål: sats og kast', 'Følg opp kastet, vær klar for retur'],
      intensity: 'medium', hasOpposition: false,
      playerCount: { min: 4, max: 14 }, equipmentTags: ['maal', 'ball', 'kjegler'],
      description: 'Avslutninger fra ulike posisjoner. Fokus på plassering framfor kraft. Alle barn elsker å skyte på mål: la dem gjøre det mye!',
      setup: 'Mål med keeper (eller åpent). Skuddavstand etter alder: 6-7 år 5-6 m, 8-9 år 7-8 m, fra 10 år 9 m. Bruk to mål eller to køer, så ventetiden blir kort. Baller klare på rekke.',
      steps: [
        'Spilleren mottar ball og løper mot mål fra sentralt.',
        'Avslutt på mål fra avstanden som passer alderen.',
        'Neste runde: skudd fra venstre side.',
        'Tredje runde: skudd fra høyre side.',
        'Fjerde runde: mottar pasning fra siden og avslutter direkte.'
      ],
      coaching: [
        'Plassering slår kraft: sikte i hjørnene',
        'Stemfot peker mot mål: sats og kast',
        'Høy arm, piskebevegelse fra skulder',
        'Følg opp kastet: vær klar for retur!'
      ],
      variations: [
        'Konkurranse: hvem scorer flest av 5 forsøk?',
        'Legg til en forsvarer som presser bakfra'
      ],
      diagram: { width:240, height:200, field:'handball_half', elements:[
        {type:'player',x:55,y:100,team:'a',label:'VB'},
        {type:'player',x:120,y:85,team:'a',label:'MB'},
        {type:'player',x:185,y:100,team:'a',label:'HB'},
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
      description: 'To lag i stafett. Drible gjennom kjegler og avslutt på mål. Kombinerer avslutning med fart og konkurranse: garantert engasjement!',
      setup: 'To parallelle kjegleløyper mot ett mål. Spillerne delt i to lag i kø bak startlinjen.',
      steps: [
        'Første spiller i hvert lag dribler gjennom kjeglene.',
        'Avslutt med skudd på mål.',
        'Løp tilbake og gi high five til neste i køen.',
        'Laget som scorer flest mål totalt vinner!'
      ],
      coaching: [
        'Fart OG kontroll gjennom kjeglene',
        'Ro deg ned foran mål: presisjon over panikkskudd',
        'Hei på lagkameratene!',
        'Maks 3-4 per lag, da blir køen kort'
      ],
      variations: [
        'Legg til en vending eller et veggspill før avslutning',
        'Keeper i mål for ekstra utfordring'
      ],
      diagram: { width:240, height:200, field:'handball_half', elements:[
        {type:'player',x:60,y:25,team:'a',label:''},
        {type:'ball',x:68,y:21},
        {type:'cone',x:60,y:45},
        {type:'cone',x:60,y:60},
        {type:'cone',x:60,y:75},
        {type:'player',x:180,y:25,team:'b',label:''},
        {type:'ball',x:188,y:21},
        {type:'cone',x:180,y:45},
        {type:'cone',x:180,y:60},
        {type:'cone',x:180,y:75},
        {type:'keeper',x:120,y:175},
        {type:'arrow',from:[60,31],to:[62,84],style:'run'},
        {type:'arrow',from:[66,92],to:[105,185],style:'shot'},
        {type:'arrow',from:[180,31],to:[178,84],style:'run'},
        {type:'arrow',from:[174,92],to:[135,185],style:'shot'}
      ]}
    },

    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    // ⚔️ SPILL MED MOTSTAND
    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    {
      key: '1v1', label: '1 mot 1', defaultMin: 10, category: 'spill_m_motstand',
      ages: ['6-7','8-9','10-12','13-16'], players: '4-16',
      equipment: 'Kjegler til korridorer, baller, mål med keeper fra 10 år',
      nffCategory: 'spille_med_og_mot', themes: ['1v1_duell', 'forsvarsspill'], nffPhases: ['angrep_avslutning', 'forsvar_vinne_ball'],
      learningGoals: ['Angriper: gå rett på forsvareren, bruk finte og fart', 'Forsvarer: møt forfra og steng veien mot mål', 'Duell begge veier: begge vil vinne'],
      suggestedGroupSize: 2, intensity: 'high', hasOpposition: true,
      playerCount: { min: 4, max: 16 }, equipmentTags: ['kjegler', 'ball', 'maal'],
      description: 'Duellspill én mot én: angriperen prøver å komme forbi, forsvareren prøver å stoppe lovlig forfra og vinne ballen. Korte korridorer gir mange dueller og lite kø.',
      setup: 'Korridorer ca. 5 m brede og 10 m lange. Angriper med ball i den ene enden, forsvarer midt i korridoren. 6-9 år: poeng for å løpe over sluttlinjen med ballen. Fra 10 år: avslutt med skudd på mål med keeper.',
      steps: [
        'Angriperen går rett på forsvareren med ballen.',
        'Forsvareren møter forfra, står mellom angriper og mål og prøver å stoppe eller snappe ballen.',
        'Poeng til angriperen for å komme over linjen (eller score), poeng til forsvareren for å vinne ballen.',
        'Bytt roller etter hvert forsøk.'
      ],
      coaching: [
        'Angriper: gå rett på, finten kommer når forsvareren er nær',
        'Forsvarer: bøyde knær, på tå, møt forfra: aldri fra siden eller bakfra',
        'Lavt tyngdepunkt for rask retningsendring',
        'Ingen holding, dytting eller slag på armen'
      ],
      variations: [
        'Angriperen har to sluttlinjer å velge mellom og må lese forsvareren',
        '3-sekunders tidskrav for raskere avgjørelser'
      ],
      diagram: { width:220, height:160, field:'small', elements:[
        {type:'zone_line',x1:15,y1:50,x2:205,y2:50},
        {type:'zone_line',x1:15,y1:110,x2:205,y2:110},
        {type:'cone',x:205,y:50},
        {type:'cone',x:205,y:110},
        {type:'zone_line',x1:205,y1:50,x2:205,y2:110},
        {type:'player',x:35,y:80,team:'a',label:'A'},
        {type:'ball',x:43,y:76},
        {type:'player',x:120,y:80,team:'b',label:'F'},
        {type:'arrow',from:[47,80],to:[100,66],style:'run'},
        {type:'arrow',from:[100,66],to:[192,70],style:'run'},
        {type:'arrow',from:[120,80],to:[110,70],style:'run'}
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
      description: 'To angripere mot én forsvarer. Trener den viktigste beslutningen i håndball: når skal jeg gå selv, og når skal jeg spille videre?',
      setup: 'Halvbane eller bane 10x15 m med mål og keeper. Angriperparet starter ved midtlinjen, forsvareren ved 9 m.',
      steps: [
        'Angriperparet starter med ball fra midtlinjen.',
        'Forsvareren starter ved 9 m og går ut mot angriperne.',
        'Angriperne samarbeider for å passere forsvareren og score.',
        'Bytt roller: forsvareren går inn i angriperpar.'
      ],
      coaching: [
        'Angriper med ball: trekk forsvareren mot deg FØR du spiller',
        'Angriper uten ball: hold avstand og vinkel, vær spillbar',
        'Forsvarer: tving ballfører til én side, steng pasningslinjen',
        'Timing er alt: spill i riktig øyeblikk!'
      ],
      variations: [
        '3 mot 2 for mer utfordring',
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
      learningGoals: ['Reagere raskt og løpe fremover i kontra', 'Utnytte overtall i 2:1', '2 mot 1: se hvem som er fri og avgjør raskt'],
      intensity: 'high',
      hasOpposition: true,
      playerCount: { min: 6, max: 16 },
      equipmentTags: ['ball', 'maal'],
      description: 'Kontring to og to og 2:1+1. Direkte fra NHFs Håndballskole økt 1. Kan kjøres mot begge mål for å unngå kø.',
      setup: 'Start på 6m-linjen. To og to om en ball. Kan kjøres mot begge mål samtidig.',
      steps: [
        'To spillere løper fremover i kontring: uten forsvarer.',
        'Kombiner: pasning og avslutning.',
        'Øk: én forsvarsspiller på midtlinjen som henger etter.',
        '2:1+1: én forsvarsspiller møter angriperne, én til løper etter fra start.'
      ],
      coaching: [
        'Løp i fart fremover: ikke avvent',
        'Hvem er fri? Spilleren UTEN ball bestemmer: er det trygt å kaste?',
        'Avslutt raskt: ikke bygg opp i kontring'
      ],
      variations: [
        'Start fra begge sider av banen: to kontringer i gang samtidig',
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
      description: 'Tre angripere mot to forsvarere. Trener trekantspill, bredde og pasning i rom. Kampnært og utviklende.',
      setup: 'Halvbane med mål og keeper. Angriperne starter ved midtlinjen, forsvarerne venter mellom 6 og 9 m.',
      steps: [
        'Tre angripere starter med ball fra midtlinjen.',
        'To forsvarere venter mellom 6 og 9 m.',
        'Angriperne samarbeider for å skape rom og score.',
        'Avslutt innen 10 sekunder: skaper tempo.'
      ],
      coaching: [
        'Trekantformasjon: bred, ikke i linje',
        'Spiller med ball: trekk en forsvarer, spill videre',
        'Spillere uten ball: hold bredden og kom i fart mot mål',
        'Avslutt! Ikke overspill: ta sjansen når du har den'
      ],
      variations: [
        'Forsvarerne kontrer til midtlinjen ved ballvinning',
        'Én av angriperne er linjespiller (se 3 mot 2 med linje)'
      ],
      diagram: { width:240, height:200, field:'handball_half', elements:[
        {type:'player',x:55,y:70,team:'a',label:'VB'},
        {type:'ball',x:63,y:66},
        {type:'player',x:120,y:58,team:'a',label:'MB'},
        {type:'player',x:185,y:70,team:'a',label:'HB'},
        {type:'player',x:95,y:112,team:'b',label:'F'},
        {type:'player',x:145,y:112,team:'b',label:'F'},
        {type:'keeper',x:120,y:175},
        {type:'arrow',from:[63,68],to:[109,60],style:'pass'},
        {type:'arrow',from:[120,64],to:[120,96],style:'run'},
        {type:'arrow',from:[123,97],to:[175,78],style:'pass'},
        {type:'arrow',from:[182,80],to:[140,185],style:'shot'}
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
      description: 'Kjerneøvelsen i barnehåndball. Rundt halvparten av økta bør være smålagsspill. 3v3, 4v4 eller 5v5 på tilpasset bane gir mest mulig ballkontakt i kamplike situasjoner.',
      setup: 'Tilpass banestørrelse (3v3: 20x25m, 5v5: 30x40m). To mål, vester for lagdeling.',
      steps: [
        'Del inn i to lag med vester.',
        'Vanlige regler, innkast ved sidelinje.',
        'Spill perioder på 4-6 minutter, kort pause, nye lag.',
        'Trener kan stoppe kort for å veilede, men la spillet flyte!'
      ],
      coaching: [
        'Spre dere! Ikke alle rundt ballen',
        'Snakk sammen: rop på ballen, gi beskjed',
        'Etter ballvinning: se framover først!',
        'La barna prøve og feile: ros innsats, ikke bare mål'
      ],
      variations: [
        'Jokere: 1-2 spillere alltid med angripende lag',
        'Flere mål for mer rom og gøy'
      ],
      diagram: { width:240, height:160, field:'small', elements:[
        {type:'cone',x:15,y:15},
        {type:'cone',x:225,y:15},
        {type:'cone',x:15,y:145},
        {type:'cone',x:225,y:145},
        {type:'goal',x:8,y:62,w:12,h:36,vertical:true},
        {type:'goal',x:220,y:62,w:12,h:36,vertical:true},
        {type:'keeper',x:32,y:80},
        {type:'keeper',x:208,y:80},
        {type:'player',x:65,y:55,team:'a',label:''},
        {type:'player',x:65,y:105,team:'a',label:''},
        {type:'player',x:170,y:55,team:'b',label:''},
        {type:'player',x:170,y:105,team:'b',label:''},
        {type:'ball',x:120,y:80},
        {type:'arrow',from:[65,55],to:[118,78],style:'run'}
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
        'Spillerne styrer selv: innkast, mål, igangsettinger.',
        'Treneren observerer og heier, griper minimalt inn.',
        'Bytt lag halvveis for variasjon.'
      ],
      coaching: [
        'Tren deg i å holde igjen: la barna løse problemene selv',
        'Ros samarbeid og innsats, ikke bare scoring',
        'Gå gjerne inn som spiller selv om det trengs',
        'Sørg for at alle er involvert'
      ],
      variations: [
        'Alle må ha rørt ballen før mål teller',
        'Spill uten keeper for mer scoring'
      ],
      diagram: { width:240, height:200, field:'handball_half', elements:[
        {type:'player',x:65,y:80,team:'a',label:''},
        {type:'player',x:120,y:65,team:'a',label:''},{type:'ball',x:128,y:61},
        {type:'player',x:175,y:80,team:'a',label:''},
        {type:'player',x:95,y:122,team:'b',label:''},
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
      ages: ['6-7','8-9','10-12','13-16'], players: '1-4',
      equipment: 'Mål, baller, gjerne myke baller for de yngste',
      nffCategory: 'sjef_over_ballen', themes: ['keeper'], nffPhases: ['forsvar_hindre_maal'],
      learningGoals: ['Grunnstilling: føtter i skulderbredde, lett på tå', 'Gå mot ballen med hendene fram', 'Stopp ballen med hender, armer eller bein'],
      intensity: 'medium', hasOpposition: false,
      playerCount: { min: 1, max: 4 }, equipmentTags: ['maal', 'ball'],
      description: 'Grunnleggende keeperøvelser parallelt med resten av laget. Fokus på grunnstilling, grep, enkel skuddstopp og utkast. Alle bør prøve keeperrollen.',
      setup: 'Keeper i mål. Trener eller medspiller skyter fra 8-12 meter (6-7 år: 4-6 m og myke baller). Start med rolige skudd, øk gradvis.',
      steps: [
        'Grunnstilling: føttene i skulderbredde, lett på tå, hendene foran.',
        'Trener ruller ball langs bakken: keeper går ned og griper.',
        'Trener kaster ball i brysthøyde. Keeper tar imot med begge hender eller slår ballen ut til siden.',
        'Avslutning: spillere skyter lette skudd, keeper stopper og kaster ut.'
      ],
      coaching: [
        'Kropp bak ballen: sikre med hele kroppen',
        'Hendene fram og opp, gå mot ballen: ikke vent på den',
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
        'Forsvarer: stå på tå, sidelengs, lavt tyngdepunkt',
        'Ikke stup inn! Vent på angriperens feil',
        'Tving angriperen mot sidelinja, vekk fra mål',
        'Angriper: bruk finter og fart for å komme forbi'
      ],
      variations: [
        '2v1: legg til en medangriper for å øve samarbeid i forsvar',
        'Gi forsvareren poeng for å tvinge skudd fra utenfor 9m-linjen'
      ],
      diagram: { width:240, height:200, field:'handball_half', elements:[
        {type:'player',x:30,y:40,team:'neutral',label:'T'},
        {type:'ball',x:38,y:36},
        {type:'player',x:110,y:50,team:'a',label:'A'},
        {type:'player',x:205,y:95,team:'b',label:'F'},
        {type:'keeper',x:120,y:175},
        {type:'arrow',from:[38,42],to:[99,50],style:'pass'},
        {type:'arrow',from:[110,56],to:[116,92],style:'run'},
        {type:'arrow',from:[196,97],to:[136,100],style:'run'}
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
        'Velg én betingelse og forklar den tydelig før start. Eksempler: alle på angripende lag over midtlinjen, mål teller dobbelt etter kombinasjon, eller maks 3 sekunder med ballen per spiller.',
        'Spill vanlig kamp med betingelsen aktiv. La spillet flyte: stopp maks 1-2 ganger kort for å forsterke temaet.',
        'Bytt betingelse halvveis for variasjon, eller fjern den og se om atferden sitter.',
        'Avslutt med fri tid uten betingelse: spill bare for gleden av det.'
      ],
      coaching: [
        'Forklar betingelsen tydelig FØR start',
        'La spillet gå: stopp kun kort for å forsterke tema',
        'Ros lagspill og løsninger, ikke bare mål',
        'Tilpass betingelsen hvis den er for lett eller vanskelig'
      ],
      variations: [
        'Jokere: 1-2 spillere alltid med angripende lag (overtall)',
        'Tidsbetingelse: scoringen teller bare i første 3 min av hver periode'
      ],
      diagram: { width:240, height:160, field:'small', elements:[
        {type:'goal',x:8,y:62,w:12,h:36,vertical:true},
        {type:'goal',x:220,y:62,w:12,h:36,vertical:true},
        {type:'keeper',x:30,y:80},
        {type:'keeper',x:210,y:80},
        {type:'player',x:80,y:50,team:'a',label:''},
        {type:'ball',x:88,y:46},
        {type:'player',x:100,y:112,team:'a',label:''},
        {type:'player',x:150,y:72,team:'a',label:''},
        {type:'player',x:130,y:45,team:'b',label:''},
        {type:'player',x:145,y:108,team:'b',label:''},
        {type:'player',x:185,y:85,team:'b',label:''},
        {type:'arrow',from:[88,48],to:[142,70],style:'pass'},
        {type:'arrow',from:[100,112],to:[168,122],style:'run'}
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
        {type:'goal',x:8,y:62,w:12,h:36,vertical:true},
        {type:'goal',x:220,y:62,w:12,h:36,vertical:true},
        {type:'keeper',x:30,y:80},
        {type:'keeper',x:210,y:80},
        {type:'player',x:120,y:55,team:'a',label:''},
        {type:'ball',x:128,y:51},
        {type:'player',x:140,y:112,team:'a',label:''},
        {type:'player',x:175,y:62,team:'b',label:''},
        {type:'player',x:185,y:128,team:'b',label:''},
        {type:'player',x:30,y:22,team:'neutral',label:'C'},
        {type:'player',x:54,y:22,team:'neutral',label:'C'},
        {type:'arrow',from:[128,57],to:[137,102],style:'pass'},
        {type:'arrow',from:[150,110],to:[212,88],style:'shot'},
        {type:'arrow',from:[54,28],to:[85,50],style:'run'}
      ]}
    },

    // --- Veggspill / gi-og-gå ---
    {
      key: 'wall_pass', label: 'Veggspill', defaultMin: 12, category: 'spill_m_motstand',
      ages: ['8-9', '10-12', '13-16'], players: '6-14',
      equipment: 'Kjegler, baller, småmål eller store mål',
      nffCategory: 'spille_med_og_mot', themes: ['samarbeidsspill', 'linjespill'], nffPhases: ['angrep_fremover', 'angrep_avslutning'],
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
        'Medspiller: spill ballen i rommet foran løperen, ikke på kroppen',
        'Trekk forsvareren mot deg FØR du spiller vegg',
        'Fart etter pasningen: ikke stopp og se!'
      ],
      variations: [
        'Dobbelt veggspill: to pasninger før avslutning',
        'Legg til aktiv forsvarer som prøver å stoppe kombinasjonen'
      ],
      diagram: { width:240, height:200, field:'handball_half', elements:[
        {type:'player',x:125,y:58,team:'a',label:'B'},{type:'ball',x:133,y:54},
        {type:'player',x:50,y:95,team:'a',label:'V'},
        {type:'player',x:100,y:92,team:'b',label:'F'},
        {type:'keeper',x:120,y:175},
        {type:'arrow',from:[118,62],to:[60,90],style:'pass'},
        {type:'arrow',from:[132,64],to:[145,110],style:'run'},
        {type:'arrow',from:[60,100],to:[136,115],style:'pass'},
        {type:'arrow',from:[145,120],to:[130,185],style:'shot'}
      ]}
    },

    // --- Keeperduell ---
    {
      key: 'keeper_play', label: 'Keeperduell', defaultMin: 10, category: 'keeper',
      ages: ['8-9', '10-12'], players: '4-10',
      equipment: '2 småmål (eller store mål), baller',
      nffCategory: 'sjef_over_ballen', themes: ['keeper'], nffPhases: ['forsvar_hindre_maal'],
      learningGoals: ['Grunnstilling og forflytning i målet', 'Stoppe lave og høye skudd', 'Rask reaksjon og igangsetting etter redning'],
      suggestedGroupSize: 2, intensity: 'medium', hasOpposition: true,
      playerCount: { min: 4, max: 10 }, equipmentTags: ['smaamaal', 'maal', 'ball'],
      description: 'To keepere mot hverandre i hver sitt mål på kort avstand. Trener reaksjon, plassering og raskt utkast. Morsomt og intenst: alle får mange repetisjoner.',
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
        'Stopp ballen med hender, armer eller bein: det viktigste er at den ikke går inn',
        'Etter redning: kontroll først, så raskt utkast til medspiller',
        'Plassering: stå sentralt, følg ballens posisjon'
      ],
      variations: [
        'Spillere på sidene skyter i stedet for keeperne',
        'Større avstand (15m) for å øve lange utkast'
      ],
      diagram: { width:240, height:160, field:'none', elements:[
        {type:'goal',x:15,y:55,w:10,h:50,vertical:true},
        {type:'goal',x:215,y:55,w:10,h:50,vertical:true},
        {type:'zone_line',x1:120,y1:15,x2:120,y2:145},
        {type:'keeper',x:40,y:80},
        {type:'keeper',x:200,y:80},
        {type:'ball',x:120,y:80},
        {type:'arrow',from:[52,78],to:[112,78],style:'shot'},
        {type:'arrow',from:[188,82],to:[130,82],style:'pass'}
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
      description: 'Fire spillere om én ball innenfor et avgrenset område. Den som har sisten kan ikke ta den som holder ball. Spillerne er trygge med ballen, men må spille videre innen 3 sekunder! Stuss er ikke tillatt.',
      setup: 'Avgrens et område på ca. 10x10 meter. 4 spillere deles i én med sisten og tre med ball imellom seg.',
      steps: [
        'Den som har sisten jakter de uten ball.',
        'Spillerne som har ballen er trygge, men kan IKKE stå og vente. Spill innen 3 sekunder.',
        'Den som blir tatt, tar over sisten.',
        'Øk antall baller ved stor gruppe (5-6 spillere = 2 baller).'
      ],
      coaching: [
        'Kommuniser med lagkameratene: "kom hit!", "til meg!"',
        'Se hele feltet: hvem er fri FØR du mottar ballen?',
        'Spill raskt: ikke hold ballen for lenge'
      ],
      variations: [
        'Kun stuss (ingen holdning av ballen)',
        'Bare svak hånd',
        'Streksisten: bare lov å trå på strekene'
      ],
      diagram: { width:220, height:160, field:'small', elements:[
        {type:'cone',x:20,y:20},
        {type:'cone',x:200,y:20},
        {type:'cone',x:20,y:140},
        {type:'cone',x:200,y:140},
        {type:'player',x:60,y:50,team:'b',label:'S'},
        {type:'player',x:90,y:110,team:'a',label:''},
        {type:'ball',x:98,y:106},
        {type:'player',x:140,y:40,team:'a',label:''},
        {type:'player',x:50,y:92,team:'a',label:''},
        {type:'arrow',from:[90,110],to:[54,94],style:'pass'},
        {type:'arrow',from:[68,48],to:[128,42],style:'run'}
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
      setup: 'Marker to kongesoner (2x2 m), én i hver ende av feltet. Del i to lag. Én spiller fra hvert lag er kongen.',
      steps: [
        'Laget scorer ved å gi pasning til sin konge i kongesonen.',
        'Motstanderne prøver å hindre dette ved å snappe ball eller blokkere.',
        'Den som scoret bytter plass med kongen.',
        'Kan ha minimum 3 pasninger FØR man kan skåre.'
      ],
      coaching: [
        'Se etter når kongen er fri',
        'Beveg deg: gjør deg spillbar for lagkameratene',
        'Forsvarerne: dekke kongen eller gå på ballføreren?'
      ],
      variations: [
        'To konger per lag: begge må motta for å score',
        'Kongen kan forlate sonen etter mottak'
      ],
      diagram: { width:240, height:160, field:'small', elements:[
        {type:'cone',x:15,y:15},
        {type:'cone',x:225,y:15},
        {type:'cone',x:15,y:145},
        {type:'cone',x:225,y:145},
        {type:'cone',x:100,y:25},
        {type:'cone',x:140,y:25},
        {type:'player',x:120,y:30,team:'a',label:'Ko'},
        {type:'cone',x:100,y:130},
        {type:'cone',x:140,y:130},
        {type:'player',x:120,y:135,team:'b',label:'Ko'},
        {type:'player',x:70,y:80,team:'a',label:''},
        {type:'ball',x:78,y:76},
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
      hasOpposition: true,
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
        'Spre kastene: ikke kast der det er mange baller allerede',
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
        'Kast ballen opp: la den stusse én gang i gulvet, fang den.',
        'Kast opp: ta imot FØR den stusser.',
        'Kast opp: klapp i hendene én gang før mottak. Klarer du to? Tre?',
        'Sett deg på knærne, kast opp og ta imot knestående.'
      ],
      coaching: [
        'Trener er med og gjør øvelsene: vis, ikke bare instruer',
        'Ros alle forsøk: dette er lek, ikke prestasjon',
        'Gi nye utfordringer til de som mestrer raskt'
      ],
      variations: [
        'Kast opp, sett deg på rompa og reis deg: ta imot stående',
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
        'Høy arm! Kast ovenfra: ikke underhånd',
        'Ta imot med begge hender foran kroppen',
        '"Egget" er morsomt: la barna prøve mange ganger'
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
      description: 'Alle mot alle: kast på hverandre og prøv å overleve. Fra NHFs Kast ballen-program. Garantert moro og høy aktivitet.',
      setup: 'Avgrens et felt. Alle inne. 3-4 baller i spill.',
      steps: [
        'Alle spiller mot alle: kast ballen og prøv å treffe noen.',
        'Den som blir truffet går langs siden av banen.',
        'Kan bli reddet: den som traff deg blir selv truffet og ut.',
        'Variant: når 3 sitter på benken, er den første inne igjen.'
      ],
      coaching: [
        'Ikke lov å treffe hodet: si det tydelig',
        'Tar du imot ballen direkte: den som kastet er ut',
        'Varianten med 3 på benk er best: ingen sitter lenge ute'
      ],
      variations: [
        'To lag: lag A kaster på lag B',
        'Kun underarmskast for lavere intensitet'
      ],
      diagram: { width:220, height:160, field:'small', elements:[
        {type:'cone',x:20,y:20},
        {type:'cone',x:200,y:20},
        {type:'cone',x:20,y:140},
        {type:'cone',x:200,y:140},
        {type:'player',x:55,y:50,team:'a',label:''},
        {type:'ball',x:63,y:46},
        {type:'player',x:155,y:45,team:'a',label:''},
        {type:'player',x:85,y:105,team:'a',label:''},
        {type:'player',x:160,y:110,team:'a',label:''},
        {type:'player',x:110,y:65,team:'a',label:''},
        {type:'ball',x:118,y:61},
        {type:'player',x:45,y:120,team:'a',label:''},
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
      learningGoals: ['Før ballen i fart uten å miste kontroll', 'Vend med ball rundt kjegle', 'Legg til fart gradvis: kontroll først'],
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
        'Kast med albuen høyt mot lagkameraten',
        'Ta imot med begge hender, ta grep raskt',
        'Gjør lagene jevne og små: maks 3-4 per lag, da blir køen kort'
      ],
      variations: [
        'Dribling med svak hånd',
        'Krabbestafett: på alle fire med ballen mellom beina',
        'Pasnings-stafett: kun kast, ingen dribling'
      ],
      diagram: { width:220, height:160, field:'small', elements:[
        {type:'cone',x:150,y:40},
        {type:'cone',x:150,y:115},
        {type:'player',x:28,y:40,team:'a',label:'1'},
        {type:'ball',x:36,y:36},
        {type:'player',x:28,y:62,team:'a',label:'2'},
        {type:'player',x:28,y:115,team:'b',label:'1'},
        {type:'ball',x:36,y:111},
        {type:'player',x:28,y:137,team:'b',label:'2'},
        {type:'arrow',from:[40,36],to:[142,36],style:'run'},
        {type:'arrow',from:[142,46],to:[42,46],style:'run'},
        {type:'arrow',from:[40,111],to:[142,111],style:'run'},
        {type:'arrow',from:[142,121],to:[42,121],style:'run'}
      ]}
    },

    // --- Dribling med ball ---
    {
      key: 'dribbling',
      label: 'Dribling',
      defaultMin: 10,
      category: 'teknikk',
      ages: ['6-7','8-9','10-12','13-16'],
      players: '4-20',
      equipment: '1 ball per spiller, kjegler',
      nffCategory: 'sjef_over_ballen',
      themes: ['dribling_bevegelse', 'finter'],
      nffPhases: ['angrep_fremover'],
      learningGoals: ['Stusse ballen uten å se ned', 'Bytte hånd og retning uten å miste kontroll', 'Drible i fart med hodet opp'],
      intensity: 'medium',
      hasOpposition: false,
      playerCount: { min: 4, max: 20 },
      equipmentTags: ['ball', 'kjegler'],
      description: 'Grunnleggende driblingsteknikk. Alle har egen ball og øver på å stusse kontrollert i bevegelse. Essensielt for å frigjøre seg fra press og skape rom i angrep.',
      setup: 'Alle spillere har én ball. Avgrens et område (15x15m) eller sett opp kjegleløyper i parallelle baner.',
      steps: [
        'Stusse på stedet med dominante hånd: ballen til hoftelengde, trykk med fingertupper.',
        'Stusse i sakte gang fremover. Blikket opp, ikke ned på ballen.',
        'Øk tempo: stusse i løp gjennom kjegleløype.',
        'Bytt hånd mellom kjeglene. Avslutt med fri dribling i området: bytt retning på signal.'
      ],
      coaching: [
        'Trykk med fingertupper, ikke flat hånd',
        'Blikket opp: se mot mål, ikke på ballen',
        'Drible på siden av kroppen, ikke foran beina',
        'Lav og kontrollert: høy dribel er lettere å snappe'
      ],
      variations: [
        'Øyhopping: drible mellom kjegler mens 2 fangere prøver å snappe ballen',
        'Bytt hånd for hvert stuss: venstrehåndsrunde'
      ],
      diagram: { width:220, height:160, field:'small', elements:[
        {type:'cone',x:40,y:30},{type:'cone',x:40,y:70},{type:'cone',x:40,y:110},
        {type:'cone',x:110,y:30},{type:'cone',x:110,y:70},{type:'cone',x:110,y:110},
        {type:'player',x:40,y:145,team:'a',label:''},{type:'ball',x:40,y:130},
        {type:'player',x:110,y:145,team:'b',label:''},{type:'ball',x:110,y:130},
        {type:'arrow',from:[40,143],to:[40,118],style:'run'},
        {type:'arrow',from:[110,143],to:[110,118],style:'run'}
      ]}
    },

    // --- Pasning i bevegelse ---
    {
      key: 'pass_run',
      label: 'Pasning i bevegelse',
      defaultMin: 10,
      category: 'teknikk',
      ages: ['6-7','8-9','10-12','13-16'],
      players: '6-20',
      equipment: '1 ball per par, kjegler',
      nffCategory: 'sjef_over_ballen',
      themes: ['kast_teknikk', 'mottak_pasning'],
      nffPhases: ['angrep_fremover'],
      learningGoals: ['Kaste presist til løpende medspiller', 'Motta ballen i full fart uten å stoppe', 'Holde jevn avstand og tempo side om side'],
      suggestedGroupSize: 2,
      intensity: 'medium',
      hasOpposition: false,
      playerCount: { min: 6, max: 20 },
      equipmentTags: ['ball', 'kjegler'],
      description: 'Den klassiske håndball-oppvarmingen. To og to løper side om side og kaster til hverandre mens begge er i bevegelse. Trener kast i fart, mottak i løp og timing.',
      setup: 'Del i par. Parene stiller seg opp to og to side om side med 3-4 meters avstand. Alle par løper samtidig fra en ende til den andre og tilbake.',
      steps: [
        'Løp side om side med 3-4 meters mellomrom. Kast kontinuerlig til hverandre.',
        'Mottaker løper mot ballen: ikke vent på at den skal komme til deg.',
        'Etter 2 lengder: øk avstand til 5-6 meter.',
        'Etter 4 lengder: stusspasning, der ballen stusser i gulvet halvveis mellom dere.'
      ],
      coaching: [
        'Kast foran medspilleren, ikke på dem: led løpet',
        'Løp mot ballen, ta imot i bevegelse',
        'Hold jevnt tempo: ikke sprint og vent',
        'Kommuniser med stemmen: "her!", "til meg!"',
        'Maks tre steg med ballen: kast før fjerde steg'
      ],
      variations: [
        'Tre og tre: midtperson mottar og sender videre, roterer',
        'Kun svak hånd på retur-lengden'
      ],
      diagram: { width:220, height:160, field:'none', elements:[
        {type:'player',x:30,y:55,team:'a',label:'1'},{type:'ball',x:38,y:51},
        {type:'player',x:30,y:105,team:'b',label:'2'},
        {type:'arrow',from:[30,55],to:[190,55],style:'run'},
        {type:'arrow',from:[30,105],to:[190,105],style:'run'},
        {type:'arrow',from:[42,53],to:[178,103],style:'pass'},
        {type:'player',x:190,y:55,team:'a',label:''},
        {type:'player',x:190,y:105,team:'b',label:''}
      ]}
    },

    // --- Forsvarsstilling og sideforflytning ---
    {
      key: 'defensive_movement',
      label: 'Forsvarsstilling',
      defaultMin: 10,
      category: 'spill_m_motstand',
      ages: ['8-9','10-12','13-16'],
      players: '4-16',
      equipment: 'Kjegler, vester',
      nffCategory: 'spille_med_og_mot',
      themes: ['forsvarsspill', '1v1_duell'],
      nffPhases: ['forsvar_vinne_ball'],
      learningGoals: ['Sidelengs forflytning uten å krysse beina', 'Lav beredskapsstilling: bøyde knær, vekt fremover', 'Stå mellom angriper og mål til enhver tid'],
      suggestedGroupSize: 2,
      intensity: 'medium',
      hasOpposition: true,
      playerCount: { min: 4, max: 16 },
      equipmentTags: ['kjegler', 'vester'],
      description: 'Dedikert øvelse for forsvarsstilling og sidelengs forflytning. Den viktigste individuelle forsvarsferdigheten: spillere som ikke kan flytte seg sidelengs uten å krysse beina vil alltid tape 1 mot 1.',
      setup: 'Marker en linje med kjegler langs 6m-sonen. Forsvarere stiller seg på linja. Angripere foran med ball.',
      steps: [
        'Grunnstilling: fyll ut bredde, bøyde knær, vekt fremover på tærne, armer ute til sidene.',
        'Trener peker: forsvarerne forflytter seg sidelengs med sidesteg (aldri kryss beina).',
        'Angriper beveger seg sakte med ball: forsvarer følger og holder positur.',
        'Øk: angriper akselererer og forsøker å bryte gjennom. Forsvarer holder stillingen.'
      ],
      coaching: [
        'Aldri kryss beina: sidesteg!',
        'Bøy knærne: ikke stå strak',
        'Armer ut og opp: sperr pasningslinjene',
        'Øyne på angriperens hofter, ikke ballen eller beina'
      ],
      variations: [
        'Speil: forsvarer spiller speil mot angriper langs linja uten ball, bare fotarbeid',
        'Legg til passiv angriper som kan avslutte etter 5 sek: tving ekte forsvarsvalg'
      ],
      diagram: { width:240, height:200, field:'handball_half', elements:[
        {type:'player',x:70,y:138,team:'b',label:'F'},
        {type:'player',x:120,y:116,team:'b',label:'F'},
        {type:'player',x:170,y:138,team:'b',label:'F'},
        {type:'player',x:70,y:100,team:'a',label:''},
        {type:'ball',x:78,y:96},
        {type:'player',x:120,y:80,team:'a',label:''},
        {type:'player',x:170,y:100,team:'a',label:''},
        {type:'keeper',x:120,y:175},
        {type:'arrow',from:[78,100],to:[106,90],style:'run'},
        {type:'arrow',from:[76,134],to:[100,123],style:'run'}
      ]}
    },

    // --- Hoppskudd ---
    {
      key: 'jump_shot',
      label: 'Hoppskudd',
      defaultMin: 12,
      category: 'avslutning',
      ages: ['10-12','13-16'],
      players: '4-14',
      equipment: 'Mål med keeper, baller, kjegler',
      nffCategory: 'scoringstrening',
      themes: ['kast_teknikk'],
      nffPhases: ['angrep_avslutning'],
      learningGoals: ['Sats med ett ben, ta av fra riktig fot', 'Kast i toppunktet av hoppet: ikke på vei ned', 'Heng i luften: ikke slipp skulderen for tidlig'],
      intensity: 'high',
      hasOpposition: false,
      playerCount: { min: 4, max: 14 },
      equipmentTags: ['maal', 'ball', 'kjegler'],
      description: 'Hoppskuddet er det viktigste avslutningsvåpenet i håndball. Trener sats, flyvefase og kast i toppunktet. Introduseres gradvis fra 10-12 år med fokus på teknikk fremfor kraft.',
      setup: 'Spillere i to eller tre køer ved 9-meteren, så ventetiden blir kort. Keeper i mål. Baller klare. Start med sakte innløp: ikke full fart til teknikken sitter.',
      steps: [
        'Løp mot mål i moderat fart. Sats med ett ben (venstrehendt: høyre ben, høyrehendt: venstre ben).',
        'I luften: trekk kastearmen opp og bak, løft albuen høyt.',
        'Kast i toppunktet: arm og skulder svinges fremover, trykk med fingertupper.',
        'Varier: hoppskudd fra venstre, midt og høyre (bakspillerposisjonene).'
      ],
      coaching: [
        'Sats med ett ben: ikke ta av med to',
        'Kast i toppunktet, ikke på vei ned',
        'Løft albuen: ikke kast fra siden',
        'Start rolig: teknikk først, kraft kommer med trening'
      ],
      variations: [
        'Med pasning: spilleren løper, mottar pasning, satser og skyter',
        'Legg til passiv forsvarer som hever armene: tving spilleren til å kaste over'
      ],
      diagram: { width:240, height:200, field:'handball_half', elements:[
        {type:'cone',x:70,y:118},{type:'cone',x:120,y:105},{type:'cone',x:170,y:118},
        {type:'player',x:70,y:90,team:'a',label:'VB'},
        {type:'player',x:120,y:78,team:'a',label:'MB'},
        {type:'player',x:170,y:90,team:'a',label:'HB'},
        {type:'keeper',x:120,y:175},
        {type:'arrow',from:[70,88],to:[70,120],style:'run'},
        {type:'arrow',from:[70,118],to:[100,183],style:'shot'},
        {type:'arrow',from:[120,76],to:[120,183],style:'shot'},
        {type:'arrow',from:[170,88],to:[140,183],style:'shot'}
      ]}
    },

    // --- Aktivitetsløype ---
    {
      key: 'activity_course',
      label: 'Aktivitetsløype',
      defaultMin: 10,
      category: 'avslutning',
      ages: ['6-7','8-9'],
      players: '4-16',
      equipment: 'Kjegler, matter, baller, mål',
      nffCategory: 'scoringstrening',
      themes: ['kast_teknikk', 'dribling_bevegelse', 'leik_stafett'],
      nffPhases: ['angrep_avslutning'],
      learningGoals: ['Mestre ulike bevegelser i serie', 'Avslutte på mål etter aktivitet', 'Ha det gøy med varierte utfordringer'],
      intensity: 'high',
      hasOpposition: false,
      playerCount: { min: 4, max: 16 },
      equipmentTags: ['kjegler', 'ball', 'maal'],
      description: 'Spillerne beveger seg gjennom en serie av hindre og avslutter med skudd på mål. Fast element i NHFs øktplaner for 6-9 år. Høy aktivitet, mange repetisjoner og garantert engasjement.',
      setup: 'Sett opp 3-5 stasjoner i rekke: kjegleslalåm, balansebom (benk), hopp over matter, drible-sone. Avslutt med skudd på mål. Del i 2-3 parallelle løyper.',
      steps: [
        'Spiller 1 starter: slalåm gjennom kjegler med ball.',
        'Hopp over liggende matter (eller gå over benk sidelengs).',
        'Drible frem til skuddlinja.',
        'Avslutt på mål: løp tilbake og gi høyfive til neste.'
      ],
      coaching: [
        'Fart OG kontroll: ikke stress og mist ballen',
        'Alle hindre skal gjennomføres: ikke kutt hjørner',
        'Ros forsøk og innsats, ikke bare mål',
        'Varier hindretyper: kreativitet gir glede'
      ],
      variations: [
        'Stafett: to lag konkurrerer om hvem som scorer flest på tid',
        'Bytt ut ett hinder hver runde for variasjon'
      ],
      diagram: { width:240, height:200, field:'handball_half', elements:[
        {type:'cone',x:40,y:35},
        {type:'cone',x:62,y:50},
        {type:'cone',x:40,y:65},
        {type:'cone',x:62,y:80},
        {type:'cone',x:100,y:40},
        {type:'cone',x:115,y:40},
        {type:'cone',x:130,y:40},
        {type:'player',x:30,y:20,team:'a',label:''},
        {type:'ball',x:38,y:16},
        {type:'keeper',x:120,y:175},
        {type:'arrow',from:[34,28],to:[52,84],style:'run'},
        {type:'arrow',from:[62,90],to:[150,92],style:'run'},
        {type:'arrow',from:[150,98],to:[128,186],style:'shot'}
      ]}
    },

    // --- Lenkesisten ---
    {
      key: 'chain_tag',
      label: 'Lenkesisten',
      defaultMin: 8,
      category: 'oppvarming',
      ages: ['6-7','8-9','10-12'],
      players: '8-20',
      equipment: 'Håndball (én per spiller), kjegler til avgrensning',
      nffCategory: 'sjef_over_ballen',
      themes: ['dribling_bevegelse', 'leik_stafett'],
      nffPhases: ['noytral'],
      learningGoals: ['Drible med kontroll under press', 'Reagere raskt og skifte retning', 'Samarbeide i lenken for å fange'],
      intensity: 'high',
      hasOpposition: false,
      playerCount: { min: 8, max: 20 },
      equipmentTags: ['ball', 'kjegler'],
      description: 'Klassisk NHF-oppvarmingslek. Alle starter med å drible. Den som fanges legger fra seg ballen og tar hånden til fangeren: lenken vokser. Siste frie spiller vinner. Kombinerer dribling med sisten og lagarbeid.',
      setup: 'Avgrens et område (ca. 20x20m). Alle spillere starter med håndball og dribler fritt. Én starter som fanger uten ball.',
      steps: [
        'Alle dribler innenfor området. Én spiller er fanger: uten ball.',
        'Fangeren prøver å ta en spiller ved å berøre dem.',
        'Den som tas: legg fra seg ballen og ta hånden til fangeren. Nå er dere to i lenken.',
        'Lenken vokser for hvert fang. Siste frie spiller vinner!'
      ],
      coaching: [
        'Lenken må holde hverandre i hånden hele tiden',
        'Frie spillere: drible med hodet opp, se lenken og unngå hjørner',
        'Lenken: spre dere ut for å stenge av området',
        'Bytt hvem som starter som fanger'
      ],
      variations: [
        'Uten ball: ren lenkesisten for de yngste (6-7 år)',
        'To startende fangere for raskere spill med stor gruppe'
      ],
      diagram: { width:220, height:160, field:'small', elements:[
        {type:'cone',x:20,y:20},
        {type:'cone',x:200,y:20},
        {type:'cone',x:20,y:140},
        {type:'cone',x:200,y:140},
        {type:'player',x:80,y:80,team:'b',label:'F'},
        {type:'player',x:102,y:80,team:'b',label:'F'},
        {type:'player',x:55,y:50,team:'a',label:''},
        {type:'ball',x:63,y:46},
        {type:'player',x:160,y:45,team:'a',label:''},
        {type:'ball',x:168,y:41},
        {type:'player',x:170,y:110,team:'a',label:''},
        {type:'ball',x:178,y:106},
        {type:'player',x:60,y:125,team:'a',label:''},
        {type:'ball',x:68,y:121},
        {type:'arrow',from:[80,80],to:[60,58],style:'run'},
        {type:'arrow',from:[55,50],to:[35,70],style:'run'}
      ]}
    },

    // ═══════════════════════════════
    // 🆕 NHF-UTVIDELSE (utviklingstrappa, handball.no øktplaner, Region Øst/Sør)
    // ═══════════════════════════════

    // --- OPPVARMING: Kjeglelek ---
    {
      key: 'kjeglelek',
      label: 'Kjeglelek',
      defaultMin: 8,
      category: 'oppvarming',
      ages: ['6-7','8-9','10-12'],
      players: '8-20',
      equipment: '20-30 kjegler, 1 ball per spiller, vester',
      nffCategory: 'sjef_over_ballen',
      themes: ['leik_stafett'],
      nffPhases: ['noytral'],
      learningGoals: ['Drible med hodet opp for å se kjeglene', 'Raske retningsforandringer med ball', 'Samarbeide som lag'],
      intensity: 'high',
      hasOpposition: false,
      playerCount: { min: 8, max: 20 },
      equipmentTags: ['kjegler', 'ball', 'vester'],
      description: 'Kjeglevelt med ball. To lag, ett velter kjegler og ett reiser dem opp igjen, alle mens de dribler. Alle er i aktivitet hele tiden, ingen kø og ingen som sitter ute.',
      setup: 'Spre 20-30 kjegler i et område på ca. 20x20 m, halvparten stående og halvparten veltet. Del i to lag med vester. Alle har én ball.',
      steps: [
        'Lag Rød velter stående kjegler med hånden som ikke dribler. Lag Blå reiser veltede kjegler.',
        'Alle må drible hele tiden. Mister du ballen, henter du den før du rører en kjegle.',
        'Spill 60-90 sekunder. Stopp og tell: flest stående eller flest veltede kjegler?',
        'Bytt oppgave og spill ny runde.'
      ],
      coaching: [
        'Hodet opp: du ser ikke kjeglene hvis du ser på ballen',
        'Drible med den ene hånden, rør kjeglen med den andre',
        'Bytt hånd når du snur',
        'Kort pause mellom rundene, så de klarer å holde farten'
      ],
      variations: [
        'Uten dribling for de yngste: bær ballen i begge hender',
        'Bare svak hånd lov å drible',
        'Kjeglekrig: lagene kaster fra bak en linje for å treffe og velte motstanderens kjegler'
      ],
      diagram: { width:220, height:160, field:'small', elements:[
        {type:'cone',x:45,y:40},{type:'cone',x:95,y:30},{type:'cone',x:160,y:45},
        {type:'cone',x:60,y:100},{type:'cone',x:120,y:85},{type:'cone',x:175,y:115},
        {type:'cone',x:100,y:130},
        {type:'player',x:75,y:60,team:'a',label:''},{type:'ball',x:83,y:56},
        {type:'player',x:145,y:95,team:'b',label:''},{type:'ball',x:153,y:91},
        {type:'player',x:40,y:125,team:'a',label:''},{type:'ball',x:48,y:121},
        {type:'arrow',from:[75,60],to:[92,36],style:'run'},
        {type:'arrow',from:[145,95],to:[123,90],style:'run'}
      ]}
    },

    // --- OPPVARMING: Stussball ---
    {
      key: 'stussball',
      label: 'Stussball',
      defaultMin: 10,
      category: 'oppvarming',
      ages: ['6-7','8-9','10-12'],
      players: '8-16',
      equipment: '1-2 baller, vester, 2 matter eller kjegler til målsone',
      nffCategory: 'sjef_over_ballen',
      themes: ['leik_stafett', 'dribling_bevegelse'],
      nffPhases: ['noytral'],
      learningGoals: ['Stusspasning med riktig vinkel og kraft', 'Motta ball etter sprett', 'Bevege seg for å bli spillbar'],
      intensity: 'high',
      hasOpposition: true,
      playerCount: { min: 8, max: 16 },
      equipmentTags: ['ball', 'vester', 'kjegler'],
      description: 'Lagspill der alle pasninger må stusse i gulvet før de tas imot. Laget scorer ved å stusse ballen til en medspiller i målsonen. Øver ballsprett, stusspasning og å gjøre seg spillbar.',
      setup: 'Bane ca. 20x25 m med en målsone (matte eller kjegleboks 2x2 m) i hver ende. To lag med vester.',
      steps: [
        'Alle pasninger må stusse én gang i gulvet før mottak.',
        'Ballfører kan drible fritt, men ikke gå med ballen i hendene.',
        'Poeng: stuss ballen til en medspiller som står i målsonen.',
        'Forsvarerne kan snappe pasninger, men ikke ta ballen ut av hendene på noen.'
      ],
      coaching: [
        'Stuss ballen omtrent to tredeler av veien mot mottaker',
        'Mottaker: hendene klare foran kroppen, ta ballen på vei opp',
        'Finn rom der ingen forsvarer står mellom deg og ballen',
        'Snakk: rop navn når du er fri'
      ],
      variations: [
        'Maks 3 sprett per ballfører før pasning',
        'Bare svak hånd til dribling',
        'To baller i spill samtidig for mer aktivitet'
      ],
      diagram: { width:240, height:160, field:'small', elements:[
        {type:'cone',x:15,y:60},{type:'cone',x:15,y:100},
        {type:'cone',x:225,y:60},{type:'cone',x:225,y:100},
        {type:'player',x:22,y:80,team:'a',label:'M'},
        {type:'player',x:218,y:80,team:'b',label:'M'},
        {type:'player',x:150,y:60,team:'a',label:''},{type:'ball',x:158,y:56},
        {type:'player',x:95,y:105,team:'a',label:''},
        {type:'player',x:120,y:75,team:'b',label:''},
        {type:'player',x:70,y:55,team:'b',label:''},
        {type:'arrow',from:[150,60],to:[125,98],style:'pass'},
        {type:'arrow',from:[125,98],to:[100,103],style:'pass'},
        {type:'arrow',from:[95,105],to:[62,100],style:'pass'},
        {type:'arrow',from:[62,100],to:[32,84],style:'pass'}
      ]}
    },

    // --- OPPVARMING: Mattespill ---
    {
      key: 'mattespill',
      label: 'Mattespill',
      defaultMin: 10,
      category: 'oppvarming',
      ages: ['6-7','8-9'],
      players: '8-16',
      equipment: '2-4 tjukkasmatter eller turnmatter, 1 ball, vester',
      nffCategory: 'sjef_over_ballen',
      themes: ['leik_stafett'],
      nffPhases: ['noytral'],
      learningGoals: ['Kaste til medspiller som er fri', 'Ta imot med to hender', 'Løpe dit ballen kan komme'],
      intensity: 'high',
      hasOpposition: true,
      playerCount: { min: 8, max: 16 },
      equipmentTags: ['ball', 'vester'],
      description: 'Håndball uten mål: laget scorer ved å kaste til en medspiller som står på matta og tar imot. Enkle regler, mye kasting og mottak, og alle skjønner spillet fra første minutt.',
      setup: 'Legg én matte i hver ende av banen (eller to matter per lag for flere scoringsmuligheter). To lag med vester, én ball.',
      steps: [
        'Laget kaster ballen mellom seg og prøver å få den til en medspiller på motstanderens matte.',
        'Mål: medspiller tar imot ballen med begge beina på matta.',
        'Maks 3 steg med ball. Dribling er lov.',
        'Etter mål starter motstanderlaget med ball fra sin egen matte.'
      ],
      coaching: [
        'Løp til matta når laget har ballen, ikke vent der hele tiden',
        'Kast når medspilleren ser deg',
        'Forsvar: stå mellom ballen og matta',
        'Ingen får stå på matta i mer enn 3 sekunder om gangen'
      ],
      variations: [
        'Alle på laget må ha rørt ballen før mål teller',
        'Fire matter, én i hvert hjørne: scor på hvilken som helst',
        'Motstander får stå foran matta som «keeper», men ikke på den'
      ],
      diagram: { width:240, height:160, field:'small', elements:[
        {type:'goal',x:14,y:62,w:20,h:36,vertical:true},
        {type:'goal',x:206,y:62,w:20,h:36,vertical:true},
        {type:'player',x:216,y:80,team:'a',label:'M'},
        {type:'player',x:130,y:60,team:'a',label:''},{type:'ball',x:138,y:56},
        {type:'player',x:100,y:110,team:'a',label:''},
        {type:'player',x:160,y:95,team:'b',label:''},
        {type:'player',x:80,y:60,team:'b',label:''},
        {type:'arrow',from:[138,58],to:[206,78],style:'pass'},
        {type:'arrow',from:[100,110],to:[170,125],style:'run'}
      ]}
    },

    // --- FORSVAR: Forflytning ---
    {
      key: 'forflytning',
      label: 'Forflytning',
      defaultMin: 10,
      category: 'spill_m_motstand',
      ages: ['6-7','8-9','10-12','13-16'],
      players: '6-16',
      equipment: '1 ball per gruppe, kjegler',
      nffCategory: 'spille_med_og_mot',
      themes: ['forsvarsspill'],
      nffPhases: ['forsvar_hindre_maal'],
      learningGoals: ['Flytte seg i takt med ballen, ikke med spilleren', 'Gå ut mot ballfører og tilbake når ballen er spilt', 'Hele tiden mellom angriper og mål'],
      suggestedGroupSize: 5,
      intensity: 'medium',
      hasOpposition: true,
      playerCount: { min: 6, max: 16 },
      equipmentTags: ['ball', 'kjegler'],
      description: 'Forsvarerne flytter seg etter ballen: ut mot den som har ball, tilbake når ballen går videre. Grunnlaget for alt forsvarsspill i barnehåndball. Utfyller Forsvarsstilling, som øver selve stillingen og sidestegene.',
      setup: '3 angripere står i en bue ved 9-meteren, 2-3 forsvarere på 6-meteren. Angriperne kaster rolig mellom seg. Flere grupper kan jobbe samtidig med kjegler som 6-meter.',
      steps: [
        'Angriperne kaster ballen rolig langs buen.',
        'Forsvareren nærmest ballen går ut mot ballfører med armene opp.',
        'Når ballen spilles videre: rygg tilbake mot 6-meteren, neste forsvarer går ut.',
        'Øk tempoet gradvis. Bytt roller etter 1 minutt.'
      ],
      coaching: [
        'Se på ballen: det er ballen som bestemmer hvor du skal',
        'Ut med fart, men stopp med beina under deg',
        'Tilbake raskt: den som er ute, er sårbar',
        '6-7 år: gjør det som lek «Følg ballen», ikke som stillingsdrill'
      ],
      variations: [
        'Følg ballen (6-7 år): trener holder ballen opp i ulike retninger, alle flytter seg dit',
        'Angriperne får skyte hvis forsvareren ikke kommer ut i tide',
        'Legg til en linjespiller som forsvarerne må passe på'
      ],
      diagram: { width:240, height:200, field:'handball_half', elements:[
        {type:'player',x:60,y:92,team:'a',label:''},{type:'ball',x:68,y:88},
        {type:'player',x:120,y:78,team:'a',label:''},
        {type:'player',x:180,y:92,team:'a',label:''},
        {type:'player',x:72,y:112,team:'b',label:'F'},
        {type:'player',x:155,y:128,team:'b',label:'F'},
        {type:'keeper',x:120,y:175},
        {type:'arrow',from:[68,90],to:[112,80],style:'pass'},
        {type:'arrow',from:[74,116],to:[84,126],style:'run'},
        {type:'arrow',from:[155,128],to:[132,100],style:'run'}
      ]}
    },

    // --- FORSVAR: Snapp ---
    {
      key: 'snapp',
      label: 'Snapp',
      defaultMin: 10,
      category: 'spill_m_motstand',
      ages: ['6-7','8-9','10-12','13-16'],
      players: '6-16',
      equipment: '1 ball per gruppe på 3-5, kjegler',
      nffCategory: 'spille_med_og_mot',
      themes: ['forsvarsspill'],
      nffPhases: ['forsvar_vinne_ball'],
      learningGoals: ['Lese pasningen før den blir kastet', 'Gå inn i pasningslinjen med timing', 'Vinne ballen uten å slå på armen til motstanderen'],
      suggestedGroupSize: 4,
      intensity: 'high',
      hasOpposition: true,
      playerCount: { min: 6, max: 16 },
      equipmentTags: ['ball', 'kjegler'],
      description: 'Å snappe pasninger er den enkleste og mest lønnsomme måten å vinne ball på i barnehåndball. Øvelsen starter som «apekatt i midten» og bygges opp til snapp i fart. Alle får mange forsøk.',
      setup: 'Grupper på 3-4. To eller tre kastere i en trekant eller firkant (5-7 m), én snapper i midten.',
      steps: [
        'Kasterne spiller ballen mellom seg. Snapperen prøver å ta pasninger.',
        'Klarer snapperen å ta ballen, bytter snapperen plass med den som kastet.',
        'Kasterne får ikke flytte seg, men kan fintere før kast.',
        'Etter 3-4 minutter: snappe mot kastere som beveger seg.'
      ],
      coaching: [
        'Se på øynene og armen til kasteren, ikke bare på ballen',
        'Start tidlig: vent i skyggen og gå inn når ballen slippes',
        'Ta ballen med hendene i lufta, aldri slag på armen',
        'Etter snapp: se framover med en gang, det er kontra!'
      ],
      variations: [
        '2 snappere mot 4 kastere i en større firkant',
        'Snapp og kontra: vinner du ballen, fører du den over en kjeglelinje 10 m unna',
        '6-7 år: kasterne må kaste med stuss, da blir det lettere å snappe'
      ],
      diagram: { width:220, height:160, field:'none', elements:[
        {type:'player',x:40,y:40,team:'a',label:''},{type:'ball',x:48,y:36},
        {type:'player',x:180,y:40,team:'a',label:''},
        {type:'player',x:110,y:135,team:'a',label:''},
        {type:'player',x:110,y:62,team:'b',label:'S'},
        {type:'arrow',from:[50,40],to:[170,40],style:'pass'},
        {type:'arrow',from:[110,62],to:[115,45],style:'run'}
      ]}
    },

    // --- FORSVAR: Blokk ---
    {
      key: 'blokk',
      label: 'Blokk',
      defaultMin: 10,
      category: 'spill_m_motstand',
      ages: ['10-12','13-16'],
      players: '4-14',
      equipment: 'Myke baller eller lette håndballer (str. 0-1), mål, keeper',
      nffCategory: 'spille_med_og_mot',
      themes: ['forsvarsspill'],
      nffPhases: ['forsvar_hindre_maal'],
      learningGoals: ['Armene opp tidlig og tett sammen', 'Stå i skuddlinjen mellom kaster og mål', 'Samarbeid med keeper: blokker ett hjørne, keeper tar det andre'],
      suggestedGroupSize: 3,
      intensity: 'medium',
      hasOpposition: true,
      playerCount: { min: 4, max: 14 },
      equipmentTags: ['ball', 'maal'],
      description: 'Blokkering av skudd fra 9 meter. Forsvareren løfter armene i skuddlinjen og tar bort en del av målet, keeperen dekker resten. Introduseres med myke baller og rolige skudd.',
      setup: 'Kaster på 9 m, blokker mellom 6 og 9 m foran, keeper i mål. Kasteren skyter med 60-70 % kraft i starten. Myke baller eller str. 0-1.',
      steps: [
        'Blokkeren står i grunnstilling mellom kaster og mål.',
        'Kasteren gjør et stegskudd. Blokkeren løfter begge armene rett opp foran skuddarmen.',
        'Keeperen dekker hjørnet blokkeren ikke tar.',
        'Etter 5 skudd: bytt roller. Øk kraften først når blokken sitter.'
      ],
      coaching: [
        'Armene opp FØR skuddet går, ikke når ballen kommer',
        'Hendene tett sammen, fingrene spredt og stramme',
        'Stå i skuddlinjen: blikk på skuddarmen',
        'Ikke hopp inn i kasteren, og ikke snu deg bort'
      ],
      variations: [
        'Keeper roper «hjørne!» og blokker tar det andre',
        'Kasteren kan finte før skudd, blokker må vente',
        'Blokk i fart: forsvarer kommer ut fra 6 m og blokker'
      ],
      diagram: { width:240, height:200, field:'handball_half', elements:[
        {type:'player',x:120,y:66,team:'a',label:''},{type:'ball',x:128,y:62},
        {type:'player',x:120,y:104,team:'b',label:'B'},
        {type:'keeper',x:140,y:176},
        {type:'arrow',from:[123,72],to:[121,90],style:'shot'}
      ]}
    },

    // --- FORSVAR: Takle ---
    {
      key: 'takle',
      label: 'Takle',
      defaultMin: 10,
      category: 'spill_m_motstand',
      ages: ['10-12','13-16'],
      players: '4-16',
      equipment: 'Baller, kjegler',
      nffCategory: 'spille_med_og_mot',
      themes: ['forsvarsspill', '1v1_duell'],
      nffPhases: ['forsvar_vinne_ball'],
      learningGoals: ['Møte angriperen forfra, aldri bakfra eller fra siden', 'Én hånd på kastearmen, én på hofta', 'Stoppe angriperen uten å dytte, holde eller slå'],
      suggestedGroupSize: 2,
      intensity: 'medium',
      hasOpposition: true,
      playerCount: { min: 4, max: 16 },
      equipmentTags: ['ball', 'kjegler'],
      description: 'Lovlig kroppskontakt i forsvar: møte angriperen forfra og stoppe bevegelsen. Bygges opp fra rolig gange til gjennombrudd i fart. Tryggest når alle lærer riktig teknikk tidlig.',
      setup: 'Par med én ball. Angriper 4-5 m foran forsvarer. En kjeglelinje som «6-meter» bak forsvareren.',
      steps: [
        'Angriper går rolig mot forsvarer med ball. Forsvarer går ett steg fram og møter.',
        'Forsvarer: brystet mot angriperen, én hånd på kastearmen, andre hånd på hofta.',
        'Stopp bevegelsen og slipp. Angriper går tilbake, ny runde.',
        'Øk: angriper jogger og prøver å komme forbi. Forsvarer takler forfra.',
        'Bytt roller etter 5 repetisjoner.'
      ],
      coaching: [
        'Møt forfra: kommer du fra siden eller bakfra, er det frikast eller utvisning',
        'Bøyde knær og beina under deg når du møter',
        'Grip rundt kastearmen, ikke dra i trøya',
        'Slipp når angriperen er stoppet'
      ],
      variations: [
        'Takle og snapp: etter taklingen spiller angriperen til en medspiller, og forsvareren prøver å snappe pasningen',
        '1 mot 1 i korridor (4 m bred) mot 6-meteren med keeper',
        'Takle i par: to forsvarere hjelper hverandre mot én angriper'
      ],
      diagram: { width:240, height:200, field:'handball_half', elements:[
        {type:'player',x:90,y:75,team:'a',label:'A'},{type:'ball',x:98,y:71},
        {type:'player',x:95,y:112,team:'b',label:'F'},
        {type:'player',x:165,y:75,team:'a',label:'A'},
        {type:'player',x:160,y:112,team:'b',label:'F'},
        {type:'keeper',x:120,y:175},
        {type:'arrow',from:[90,77],to:[94,100],style:'run'},
        {type:'arrow',from:[95,112],to:[93,92],style:'run'},
        {type:'arrow',from:[165,77],to:[161,100],style:'run'}
      ]}
    },

    // --- ANGREP: Krysningsspill ---
    {
      key: 'krysning',
      label: 'Krysningsspill',
      defaultMin: 12,
      category: 'spill_m_motstand',
      ages: ['10-12','13-16'],
      players: '6-14',
      equipment: 'Baller, mål, keeper, kjegler',
      nffCategory: 'spille_med_og_mot',
      themes: ['samarbeidsspill', 'linjespill'],
      nffPhases: ['angrep_avslutning'],
      learningGoals: ['Ballfører løper skrått og trekker forsvareren med seg', 'Medspiller krysser bak og mottar i fart', 'Kort, sikker pasning i krysningspunktet'],
      suggestedGroupSize: 3,
      intensity: 'medium',
      hasOpposition: true,
      playerCount: { min: 6, max: 14 },
      equipmentTags: ['ball', 'maal', 'kjegler'],
      description: 'Klassisk samspillsvariant mellom to bakspillere. Ballfører løper skrått innover, medspiller krysser bak og får ballen i fart mot en ny luke. Bygges fra uten forsvar til 2 mot 2 med linje.',
      setup: 'To køer på 10-11 m, én på venstre back og én på midtback. Keeper i mål. Forsvarere på 6-7 m når dere legger til motstand.',
      steps: [
        'Venstre back fører ballen skrått innover mot midten.',
        'Midtback venter, starter når ballføreren passerer og krysser bak.',
        'Kort pasning i krysningspunktet. Mottaker går rett på mål og skyter.',
        'Legg til 1 passiv, deretter 2 aktive forsvarere.',
        'Med linje: linjespilleren sperrer for den som krysser.'
      ],
      coaching: [
        'Ballfører: truer mål, ikke bare løper på tvers',
        'Mottaker: vent, start sent og kom i fart',
        'Pasningen er kort, nesten en overlevering',
        'Les forsvareren: følger forsvareren ikke med, skyt selv'
      ],
      variations: [
        'Høyre side: midtback og høyre back krysser',
        'Falsk krysning: ballfører later som ballen spilles, men går selv',
        'Krysning med linjesperre i 3 mot 2'
      ],
      diagram: { width:240, height:200, field:'handball_half', elements:[
        {type:'player',x:55,y:62,team:'a',label:'VB'},{type:'ball',x:63,y:58},
        {type:'player',x:150,y:52,team:'a',label:'MB'},
        {type:'player',x:95,y:118,team:'b',label:'F'},
        {type:'player',x:150,y:118,team:'b',label:'F'},
        {type:'keeper',x:120,y:175},
        {type:'arrow',from:[62,67],to:[122,94],style:'run'},
        {type:'arrow',from:[144,58],to:[100,80],style:'run'},
        {type:'arrow',from:[118,92],to:[104,85],style:'pass'},
        {type:'arrow',from:[100,90],to:[128,185],style:'shot'}
      ]}
    },

    // --- ANGREP: Pådrag og viderespill ---
    {
      key: 'padrag',
      label: 'Pådrag og viderespill',
      defaultMin: 12,
      category: 'spill_m_motstand',
      ages: ['10-12','13-16'],
      players: '6-14',
      equipment: 'Baller, mål, keeper, vester',
      nffCategory: 'spille_med_og_mot',
      themes: ['samarbeidsspill'],
      nffPhases: ['angrep_avslutning'],
      learningGoals: ['Gå på luka mellom to forsvarere', 'Trekke to forsvarere og spille videre til den som er fri', 'Skyte selv når luka er åpen'],
      suggestedGroupSize: 4,
      intensity: 'high',
      hasOpposition: true,
      playerCount: { min: 6, max: 14 },
      equipmentTags: ['ball', 'maal', 'vester'],
      description: 'Pådrag betyr å gå mot mål i luka mellom forsvarerne slik at de må ta deg. Da blir en medspiller fri. Øvelsen går fra 2 mot 1 til 3 mot 2 og gir mange avgjørelser: skyte selv eller spille videre?',
      setup: '2-3 angripere på 9-10 m, 1-2 forsvarere på 6-7 m, keeper i mål. Køer på hver angrepsposisjon.',
      steps: [
        '2 mot 1: ballfører går på luka mellom forsvareren og medspilleren.',
        'Tar forsvareren ballføreren: spill videre. Hvis ikke: skyt selv.',
        '3 mot 2: midtback går på luka mellom de to forsvarerne og spiller videre til den som blir fri.',
        'Neste angriper går på i samme angrep: pådrag, pasning, pådrag.'
      ],
      coaching: [
        'Gå MOT mål, ikke på tvers: forsvareren må tro du skal skyte',
        'Ballen i skuddposisjon når du går på',
        'Mottaker: start i fart og vær klar før ballen kommer',
        'Riktig valg er viktigere enn mål: ros godt valg selv om skuddet går feil'
      ],
      variations: [
        'Maks 3 pasninger før avslutning',
        'Forsvarerne får lov å snappe',
        'Legg til linjespiller som blir fri når forsvaret trekkes ut'
      ],
      diagram: { width:240, height:200, field:'handball_half', elements:[
        {type:'player',x:70,y:75,team:'a',label:'VB'},
        {type:'player',x:120,y:65,team:'a',label:'MB'},{type:'ball',x:128,y:61},
        {type:'player',x:170,y:75,team:'a',label:'HB'},
        {type:'player',x:100,y:118,team:'b',label:'F'},
        {type:'player',x:145,y:118,team:'b',label:'F'},
        {type:'keeper',x:120,y:175},
        {type:'arrow',from:[120,67],to:[122,98],style:'run'},
        {type:'arrow',from:[122,98],to:[168,80],style:'pass'},
        {type:'arrow',from:[170,78],to:[140,183],style:'shot'}
      ]}
    },

    // --- SMÅSPILL: 2 mot 2 i sektorer ---
    {
      key: 'ssg_2v2_sektor',
      label: '2 mot 2 i sektorer',
      defaultMin: 15,
      category: 'smalagsspill',
      ages: ['8-9','10-12','13-16'],
      players: '8-16',
      equipment: 'Mål, keeper, baller, vester, kjegler til sektorer',
      nffCategory: 'smalagsspill',
      themes: ['samarbeidsspill', '1v1_duell'],
      nffPhases: ['angrep_avslutning', 'forsvar_hindre_maal'],
      learningGoals: ['Samarbeid to og to: gå på, spill videre, skyt', 'Utnytte bredden i sektoren', 'Forsvar: hjelpe hverandre uten å la noen stå fri'],
      suggestedGroupSize: 4,
      intensity: 'high',
      hasOpposition: true,
      playerCount: { min: 8, max: 16 },
      equipmentTags: ['maal', 'ball', 'vester', 'kjegler'],
      description: 'Halvbanen deles i tre sektorer: venstre (back og kant), midten (midtback og linje) og høyre. Det spilles 2 mot 2 i én sektor om gangen. Mange dueller og avgjørelser, og alle får ballen ofte.',
      setup: 'Del halvbanen i tre sektorer med kjegler. To angripere og to forsvarere per sektor. Keeper i mål. Resten i kø bak hver sektor.',
      steps: [
        'Sektor 1 starter: 2 mot 2 til avslutning eller ballvinning.',
        'Så sektor 2, så sektor 3. Keeperen får pust mellom angrepene.',
        'Angriperne blir forsvarere neste runde, forsvarerne går bakerst i køen.',
        'Tell mål per par for litt konkurranse.'
      ],
      coaching: [
        'Ballfører: gå på, tving forsvareren til å ta deg',
        'Uten ball: hold avstand, ikke løp inn i medspilleren',
        'Midtsektoren: linjespilleren sperrer for backen',
        'Forsvar: snakk sammen, «jeg tar ball!»'
      ],
      variations: [
        'Maks 5 sekunder per angrep',
        'Alle tre sektorer samtidig mot to mål (bruk tverrbane)',
        '8-9 år: uten linje, to bakspillere i midtsektoren'
      ],
      diagram: { width:240, height:200, field:'handball_half', elements:[
        {type:'zone_line',x1:85,y1:10,x2:85,y2:190},
        {type:'zone_line',x1:155,y1:10,x2:155,y2:190},
        {type:'player',x:50,y:78,team:'a',label:'B'},{type:'ball',x:58,y:74},
        {type:'player',x:22,y:122,team:'a',label:'VK'},
        {type:'player',x:68,y:112,team:'b',label:'F'},
        {type:'player',x:30,y:160,team:'b',label:'F'},
        {type:'player',x:120,y:70,team:'a',label:''},
        {type:'player',x:190,y:70,team:'a',label:''},
        {type:'keeper',x:120,y:175},
        {type:'arrow',from:[50,80],to:[50,100],style:'run'},
        {type:'arrow',from:[48,102],to:[30,118],style:'pass'},
        {type:'arrow',from:[26,130],to:[100,183],style:'shot'}
      ]}
    },

    // --- SMÅSPILL: 3 mot 2 med og uten linje ---
    {
      key: 'ssg_3v2_linje',
      label: '3 mot 2 med linje',
      defaultMin: 15,
      category: 'smalagsspill',
      ages: ['10-12','13-16'],
      players: '8-16',
      equipment: 'Mål, keeper, baller, vester',
      nffCategory: 'smalagsspill',
      themes: ['linjespill', 'samarbeidsspill'],
      nffPhases: ['angrep_avslutning', 'forsvar_hindre_maal'],
      learningGoals: ['Finne linjespilleren når forsvaret trekkes ut', 'Linjespiller: sperre og vende seg til ballen', 'Forsvar: kommunisere om hvem som tar linja'],
      suggestedGroupSize: 5,
      intensity: 'high',
      hasOpposition: true,
      playerCount: { min: 8, max: 16 },
      equipmentTags: ['maal', 'ball', 'vester'],
      description: '3 mot 2 der én av angriperne er linjespiller. Forsvarerne må velge mellom å gå ut mot bakspillerne og å passe på linja. Starter uten linje (3 bakspillere) og bygges til 2 backer pluss linje.',
      setup: '3 angripere og 2 forsvarere på halvbanen, keeper i mål. Køer på posisjonene. Nye grupper kommer inn etter hvert angrep.',
      steps: [
        'Runde 1, uten linje: tre bakspillere mot to forsvarere. Pådrag og viderespill.',
        'Runde 2, med linje: to backer og én linje. Linjespilleren sperrer og ruller ut.',
        'Backen går på, trekker en forsvarer og spiller linja eller den andre backen.',
        'Bytt: angriperne blir forsvarere, forsvarerne går i kø.'
      ],
      coaching: [
        'Linje: sperr med ryggen mot mål, hendene klare, vend deg mot ballen',
        'Back: se linja FØR du går på',
        'Stusspasning til linja er ofte tryggest',
        'Forsvar: «jeg har linja!» Den som ikke sier noe, tar ballfører'
      ],
      variations: [
        'Scoring fra linje teller dobbelt',
        'Forsvarerne kan kontre til midtlinjen ved ballvinning',
        '4 mot 3 med linje for 13-16 år'
      ],
      diagram: { width:240, height:200, field:'handball_half', elements:[
        {type:'player',x:80,y:75,team:'a',label:'VB'},{type:'ball',x:88,y:71},
        {type:'player',x:165,y:75,team:'a',label:'HB'},
        {type:'player',x:120,y:118,team:'a',label:'L'},
        {type:'player',x:92,y:116,team:'b',label:'F'},
        {type:'player',x:148,y:116,team:'b',label:'F'},
        {type:'keeper',x:120,y:175},
        {type:'arrow',from:[82,79],to:[96,94],style:'run'},
        {type:'arrow',from:[99,97],to:[113,111],style:'pass'},
        {type:'arrow',from:[120,122],to:[118,183],style:'shot'}
      ]}
    },

    // --- SKUDD: Stegskudd ---
    {
      key: 'step_shot',
      label: 'Stegskudd',
      defaultMin: 10,
      category: 'avslutning',
      ages: ['6-7','8-9','10-12','13-16'],
      players: '4-14',
      equipment: 'Mål, baller, kjegler (keeper valgfritt)',
      nffCategory: 'scoringstrening',
      themes: ['kast_teknikk'],
      nffPhases: ['angrep_avslutning'],
      learningGoals: ['Motsatt fot fram: høyrehendt setter venstre fot foran', 'Albuen høyt, kast over skulderen', 'Kast med hele kroppen: hofte og skulder roterer'],
      intensity: 'medium',
      hasOpposition: false,
      playerCount: { min: 4, max: 14 },
      equipmentTags: ['maal', 'ball', 'kjegler'],
      description: 'Skudd med beina i gulvet. Det første skuddet barn lærer og det mest brukte fra 9 meter i barnehåndball. Fokus på riktig fot, høy albue og kraft fra hele kroppen.',
      setup: 'To eller tre køer, én ball per spiller. Avstand: 6-7 år 4-6 m, 8-9 år 6-8 m, fra 10 år 8-9 m. En kjegle markerer hvor stemfoten skal settes. Del gjerne mål i soner med kjegler som «hjørner».',
      steps: [
        'Stå stille: stemfoten ved kjeglen, ballen høyt bak hodet, kast.',
        'Ett steg og kast: stemfot fram ved kjeglen.',
        'Tre steg: tilløp med ball og stemfot ved kjeglen.',
        'Mot keeper: sikt i hjørnene.'
      ],
      coaching: [
        'Motsatt fot av kastearmen står foran',
        'Albuen høyere enn skulderen',
        'Snu hofta og skulderen mot mål i kastet',
        'Sikt lavt: lave skudd er vanskeligst for keeper i barnehåndball'
      ],
      variations: [
        'Treff kjegler plassert i målet',
        'Mottak fra medspiller og stegskudd i ett',
        'Stegskudd med svak arm for å få samme bevegelse på begge sider'
      ],
      diagram: { width:240, height:200, field:'handball_half', elements:[
        {type:'cone',x:80,y:98},{type:'cone',x:160,y:98},
        {type:'player',x:80,y:72,team:'a',label:''},{type:'ball',x:88,y:68},
        {type:'player',x:160,y:72,team:'a',label:''},{type:'ball',x:168,y:68},
        {type:'keeper',x:120,y:175},
        {type:'arrow',from:[80,74],to:[80,92],style:'run'},
        {type:'arrow',from:[82,100],to:[105,183],style:'shot'},
        {type:'arrow',from:[158,100],to:[135,183],style:'shot'}
      ]}
    },

    // --- SKUDD: Kantskudd ---
    {
      key: 'wing_shot',
      label: 'Kantskudd',
      defaultMin: 12,
      category: 'avslutning',
      ages: ['10-12','13-16'],
      players: '4-14',
      equipment: 'Mål med keeper, baller, kjegler',
      nffCategory: 'scoringstrening',
      themes: ['kast_teknikk', 'linjespill'],
      nffPhases: ['angrep_avslutning'],
      learningGoals: ['Hoppe innover mot midten for å gjøre vinkelen større', 'Kaste før landing i sonen', 'Velge hjørne etter hva keeperen gjør'],
      intensity: 'medium',
      hasOpposition: false,
      playerCount: { min: 4, max: 14 },
      equipmentTags: ['maal', 'ball', 'kjegler'],
      description: 'Skudd fra kanten med liten vinkel. Kantspilleren hopper innover mot midten av målet og kaster i lufta. Lov å lande i sonen hvis ballen er sluppet før landing.',
      setup: 'Kø på hver kant. En backspiller eller trener spiller ballen ut til kanten. Kjegle ved 6-meteren viser hvor satsen skal være.',
      steps: [
        'Kanten starter langs sidelinjen, mottar pasning fra back.',
        'Løp innover, sats fra kjeglen og hopp mot midten av målet.',
        'Kast i lufta, før du lander.',
        'Neste kant starter når forrige skudd er gått. Bytt side etter 5 skudd.'
      ],
      coaching: [
        'Hopp innover, ikke rett fram: da blir vinkelen større',
        'Se keeperen: står keeperen i nærmeste hjørne, skyt langt',
        'Sats på motsatt fot av kastearmen (høyrehendt: venstre fot)',
        'Kast før landing, ellers blir det sonetråkk'
      ],
      variations: [
        'Kantskudd etter kontraløp fra midtlinjen',
        'Passiv forsvarer på kanten som kanten må løpe rundt',
        'Keeperen gir signal om hjørne som er åpent'
      ],
      diagram: { width:240, height:200, field:'handball_half', elements:[
        {type:'cone',x:48,y:160},
        {type:'player',x:20,y:120,team:'a',label:'VK'},
        {type:'player',x:80,y:70,team:'a',label:'VB'},{type:'ball',x:88,y:66},
        {type:'keeper',x:120,y:175},
        {type:'arrow',from:[82,72],to:[24,116],style:'pass'},
        {type:'arrow',from:[22,124],to:[45,155],style:'run'},
        {type:'arrow',from:[50,160],to:[110,185],style:'shot'}
      ]}
    },

    // --- SKUDD: Linjeskudd ---
    {
      key: 'line_shot',
      label: 'Linjeskudd',
      defaultMin: 12,
      category: 'avslutning',
      ages: ['10-12','13-16'],
      players: '4-12',
      equipment: 'Mål med keeper, baller, eventuelt matte i sonen',
      nffCategory: 'scoringstrening',
      themes: ['kast_teknikk', 'linjespill'],
      nffPhases: ['angrep_avslutning'],
      learningGoals: ['Ta imot med ryggen mot mål og vende seg riktig vei', 'Kort, raskt skudd fra 6 meter', 'Lande trygt i sonen'],
      intensity: 'medium',
      hasOpposition: false,
      playerCount: { min: 4, max: 12 },
      equipmentTags: ['maal', 'ball'],
      description: 'Linjespilleren tar imot ved 6-meteren med ryggen mot mål, vender seg og skyter. Øvelsen starter med vending og stegskudd og bygges opp mot fallskudd inn i sonen.',
      setup: 'Linjespiller på 6-meteren med ryggen mot mål. Bakspiller spiller ballen fra 9 m. Keeper i mål. Matte i sonen for 10-12 år som skal øve fall.',
      steps: [
        'Linjespiller tar imot pasningen med begge hender foran brystet.',
        'Vend deg mot mål med et steg ut til siden.',
        'Skyt raskt: stegskudd eller lite hopp inn i sonen.',
        'Etter hvert: fallskudd der du lander på hendene i sonen.'
      ],
      coaching: [
        'Sikre ballen FØR du vender',
        'Vend bort fra forsvareren, mot rommet',
        'Kort og raskt skudd: keeper er tett, plassering slår kraft',
        'Fallskudd: land på begge hender, ikke på albuene'
      ],
      variations: [
        'Passiv forsvarer bak linjespilleren',
        'Stusspasning fra back til linje',
        'Linjespiller sperrer først, ruller ut og mottar'
      ],
      diagram: { width:240, height:200, field:'handball_half', elements:[
        {type:'player',x:120,y:78,team:'a',label:'MB'},{type:'ball',x:128,y:74},
        {type:'player',x:110,y:118,team:'a',label:'L'},
        {type:'keeper',x:120,y:175},
        {type:'arrow',from:[122,80],to:[112,108],style:'pass'},
        {type:'arrow',from:[106,124],to:[95,136],style:'run'},
        {type:'arrow',from:[95,142],to:[106,183],style:'shot'}
      ]}
    },

    // --- KONTRA: Islandsk kontra ---
    {
      key: 'islandsk_kontra',
      label: 'Islandsk kontra',
      defaultMin: 12,
      category: 'avslutning',
      ages: ['10-12','13-16'],
      players: '8-16',
      equipment: 'To mål med keepere, mange baller',
      nffCategory: 'scoringstrening',
      themes: ['kontring_retur'],
      nffPhases: ['angrep_fremover', 'angrep_avslutning'],
      learningGoals: ['Sprint fremover med én gang', 'Ta imot lang pasning i fart', 'Keeper: rask, presis utkast'],
      intensity: 'high',
      hasOpposition: false,
      playerCount: { min: 8, max: 16 },
      equipmentTags: ['maal', 'ball'],
      description: 'Kontinuerlig kontraøvelse på hel bane. Spilleren skyter på det ene målet, keeperen der kaster langt til en ny løper som skyter på motsatt mål. Ballen og spillerne går i sløyfe og det blir aldri stopp.',
      setup: 'Keeper i begge mål. To køer ved midtlinjen, én på hver side. Baller hos keeperne.',
      steps: [
        'Keeper A kaster langt til første spiller i kø 1, som sprinter mot mål B.',
        'Spilleren skyter på mål B og stiller seg i kø 2.',
        'Keeper B tar ballen og kaster langt til første i kø 2, som sprinter mot mål A.',
        'Fortsett i sløyfe. Ny ball inn hvis en ball går tapt.'
      ],
      coaching: [
        'Start i det keeperen har ballen, ikke når den er kastet',
        'Se over skulderen og ta imot uten å stoppe',
        'Keeper: kast foran løperen, i fart',
        'Skyt i fart, ikke stopp opp og vent'
      ],
      variations: [
        'To og to løper sammen og spiller én pasning før skudd',
        'Forsvarer starter fra 6-meteren og løper hjem (2 mot 1)',
        'Skuddet må gå innen 5 sekunder etter mottak'
      ],
      diagram: { width:240, height:200, field:'small', elements:[
        {type:'goal',x:102,y:10,w:36,h:10},
        {type:'goal',x:102,y:180,w:36,h:10},
        {type:'keeper',x:120,y:26},
        {type:'keeper',x:120,y:174},
        {type:'zone_line',x1:8,y1:100,x2:232,y2:100},
        {type:'player',x:30,y:100,team:'a',label:'1'},
        {type:'player',x:210,y:100,team:'b',label:'2'},
        {type:'arrow',from:[120,30],to:[45,125],style:'pass'},
        {type:'arrow',from:[35,105],to:[80,150],style:'run'},
        {type:'arrow',from:[80,150],to:[112,178],style:'shot'}
      ]}
    },

    // --- KONTRA: Bølgen ---
    {
      key: 'bolgen',
      label: 'Bølgen',
      defaultMin: 12,
      category: 'avslutning',
      ages: ['10-12','13-16'],
      players: '9-18',
      equipment: 'To mål med keepere, baller, vester',
      nffCategory: 'scoringstrening',
      themes: ['kontring_retur'],
      nffPhases: ['angrep_fremover', 'forsvar_hindre_maal'],
      learningGoals: ['Omstille med én gang ballen skifter lag', 'Utnytte overtall i fart', 'Løpe hjem fort etter eget angrep'],
      intensity: 'high',
      hasOpposition: true,
      playerCount: { min: 9, max: 18 },
      equipmentTags: ['maal', 'ball', 'vester'],
      description: 'Bølge etter bølge med kontra på hel bane. 3 angripere mot 2. Når angrepet er ferdig, går forsvarerne pluss én ny spiller fra sidelinjen andre veien mot 2 nye forsvarere. Trener overtall, omstilling og løp hjem.',
      setup: 'Hel bane, keeper i begge mål. Grupper på 3 venter ved sidelinjen på midten. To forsvarere i hver ende.',
      steps: [
        '3 angripere mot 2 forsvarere på mål A.',
        'Etter skudd eller ballvinning: de 2 forsvarerne pluss én ny fra sidelinjen angriper mot mål B.',
        'I mål B venter 2 nye forsvarere. To av de tre som angrep, blir forsvarere i mål A.',
        'Den tredje angriperen går til sidelinjen og venter på neste bølge.'
      ],
      coaching: [
        'Snu med én gang, ikke se på om skuddet gikk inn',
        'Spre dere i bredden: en på hver side, en i midten',
        'Den som går hjem: sprint til 6-meteren først, så ta mann',
        'Avslutt innen 8 sekunder'
      ],
      variations: [
        '2 mot 1 for de som er nye i øvelsen',
        'Forsvarerne som tapte, må ta i gulvet ved midtlinjen før de løper hjem',
        'Poengjakt: lag rød mot lag blå, hvert mål i bølgen teller'
      ],
      diagram: { width:240, height:200, field:'small', elements:[
        {type:'goal',x:102,y:10,w:36,h:10},
        {type:'goal',x:102,y:180,w:36,h:10},
        {type:'keeper',x:120,y:26},
        {type:'keeper',x:120,y:174},
        {type:'zone_line',x1:8,y1:100,x2:232,y2:100},
        {type:'player',x:60,y:130,team:'a',label:''},{type:'ball',x:68,y:126},
        {type:'player',x:120,y:120,team:'a',label:''},
        {type:'player',x:180,y:130,team:'a',label:''},
        {type:'player',x:95,y:155,team:'b',label:'F'},
        {type:'player',x:145,y:155,team:'b',label:'F'},
        {type:'player',x:225,y:100,team:'neutral',label:'N'},
        {type:'arrow',from:[68,128],to:[115,122],style:'pass'},
        {type:'arrow',from:[120,124],to:[118,176],style:'shot'},
        {type:'arrow',from:[145,152],to:[160,60],style:'run'}
      ]}
    },

    // --- KONTRA: Korridor ---
    {
      key: 'korridor',
      label: 'Korridorspill',
      defaultMin: 15,
      category: 'smalagsspill',
      ages: ['10-12','13-16'],
      players: '8-16',
      equipment: 'To mål med keepere, vester, kjegler til korridorer',
      nffCategory: 'smalagsspill',
      themes: ['kontring_retur'],
      nffPhases: ['angrep_fremover', 'forsvar_hindre_maal'],
      learningGoals: ['Kantene sprinter i korridoren ved ballvinning', 'Lang pasning i fart til ledig løper', 'Forsvar: løpe hjem gjennom midten'],
      intensity: 'high',
      hasOpposition: true,
      playerCount: { min: 8, max: 16 },
      equipmentTags: ['maal', 'vester', 'kjegler'],
      description: 'Kampspill der en korridor langs hver sidelinje bare kan brukes av angripende lag. Ballvinning og rask pasning til en kant i korridoren gir fri kontra. Kontramål teller dobbelt.',
      setup: 'Hel bane eller tverrbane med to mål. Kjegler markerer en 3 m bred korridor langs hver sidelinje. Lag på 4-6 med keeper.',
      steps: [
        'Vanlig spill, men forsvarere får ikke gå inn i korridorene.',
        'Ved ballvinning: kantene sprinter fram i korridoren.',
        'Mål som scores innen 6 sekunder etter ballvinning teller dobbelt.',
        'Spill 4-5 minutters perioder, bytt lag.'
      ],
      coaching: [
        'Kanten starter i det laget vinner ballen, ikke etterpå',
        'Første pasning fremover hvis det er åpent',
        'Løp hjem gjennom midten når dere mister ballen',
        'Keeper: se etter kanten før du ser etter nærmeste spiller'
      ],
      variations: [
        'Uten korridorer siste periode: klarer de fortsatt å kontre?',
        'Keeper må kaste ut innen 3 sekunder',
        'Én forsvarer får gå i korridoren (retur mot kontra)'
      ],
      diagram: { width:240, height:200, field:'small', elements:[
        {type:'zone_line',x1:38,y1:8,x2:38,y2:192},
        {type:'zone_line',x1:202,y1:8,x2:202,y2:192},
        {type:'goal',x:102,y:10,w:36,h:10},
        {type:'goal',x:102,y:180,w:36,h:10},
        {type:'keeper',x:120,y:26},
        {type:'keeper',x:120,y:174},
        {type:'player',x:120,y:60,team:'a',label:''},{type:'ball',x:128,y:56},
        {type:'player',x:22,y:70,team:'a',label:'VK'},
        {type:'player',x:140,y:90,team:'b',label:''},
        {type:'arrow',from:[22,74],to:[22,150],style:'run'},
        {type:'arrow',from:[125,62],to:[26,145],style:'pass'},
        {type:'arrow',from:[140,94],to:[125,160],style:'run'}
      ]}
    },

    // --- FINTER: Finter mot kjegle ---
    {
      key: 'finte_kjegle',
      label: 'Finte mot kjegle',
      defaultMin: 10,
      category: 'teknikk',
      ages: ['6-7','8-9','10-12','13-16'],
      players: '4-20',
      equipment: '1 ball per spiller, 1 kjegle per 2-3 spillere',
      nffCategory: 'sjef_over_ballen',
      themes: ['finter', 'dribling_bevegelse'],
      nffPhases: ['angrep_fremover'],
      learningGoals: ['Få «forsvareren» til å tro at du skal én vei, og gå den andre', 'Temposkifte ut av finten', 'Finte begge veier'],
      suggestedGroupSize: 3,
      intensity: 'medium',
      hasOpposition: false,
      playerCount: { min: 4, max: 20 },
      equipmentTags: ['ball', 'kjegler'],
      description: 'Finter med ball mot en kjegle som forsvarer. Alle får mange forsøk med minimal kø. 6-7 år: enkel retningsforandring med ball. Fra 8-9 år: tobeinsfinte og kastfinte. Grunnlaget før finter mot en ekte forsvarer.',
      setup: 'Én kjegle per 2-3 spillere, 5-6 m tilløp. Alle har ball. Flere stasjoner ved siden av hverandre.',
      steps: [
        'Løp med ball mot kjeglen. Ca. én armlengde fra den: ta et tydelig steg til den ene siden.',
        'Skyv fra med samme fot og gå forbi kjeglen på den andre siden.',
        'Øk farten ut av finten og spill ballen til neste i køen.',
        'Bytt side hver gang. Etter 3-4 minutter: kastfinte (løft ballen som for å kaste, gå forbi).'
      ],
      coaching: [
        'Stor og tydelig inn i finten, eksplosiv ut',
        'Temposkiftet er det viktigste, ikke hvor fin finten ser ut',
        'Riktig avstand: for langt unna og finten virker ikke',
        'Øv finter begge veier'
      ],
      variations: [
        '6-7 år: løp med ball og bytt retning ved kjeglen, ingen teknikkrav',
        'Avslutt med stegskudd på mål etter finten',
        'To kjegler etter hverandre: to finter i samme løp'
      ],
      diagram: { width:220, height:160, field:'small', elements:[
        {type:'cone',x:110,y:70},
        {type:'player',x:110,y:140,team:'a',label:''},{type:'ball',x:118,y:136},
        {type:'arrow',from:[110,138],to:[92,92],style:'run'},
        {type:'arrow',from:[92,92],to:[130,48],style:'run'},
        {type:'cone',x:180,y:70},
        {type:'player',x:180,y:140,team:'b',label:''},{type:'ball',x:188,y:136},
        {type:'arrow',from:[180,138],to:[198,92],style:'run'},
        {type:'arrow',from:[198,92],to:[165,48],style:'run'}
      ]}
    },

    // --- FINTER: Finte mot forsvarer ---
    {
      key: 'finte_forsvarer',
      label: 'Finte mot forsvarer',
      defaultMin: 12,
      category: 'spill_m_motstand',
      ages: ['8-9','10-12','13-16'],
      players: '6-16',
      equipment: 'Baller, kjegler til korridorer, mål med keeper',
      nffCategory: 'spille_med_og_mot',
      themes: ['finter', '1v1_duell'],
      nffPhases: ['angrep_avslutning'],
      learningGoals: ['Gå rett på forsvareren før finten', 'Lese forsvareren og gå til den åpne siden', 'Avslutte eller spille videre etter finten'],
      suggestedGroupSize: 3,
      intensity: 'medium',
      hasOpposition: true,
      playerCount: { min: 6, max: 16 },
      equipmentTags: ['ball', 'kjegler', 'maal'],
      description: 'Fra kjegle til menneske. Forsvareren går fra passiv til aktiv, og angriperen lærer å lese forsvareren og finte til den åpne siden. Fokus er angriperens finte med ball. Duellspill (1 mot 1 begge veier) har egne øvelser.',
      setup: 'Korridorer 4-5 m brede mot 9-meteren, keeper i mål. Angriper med ball, forsvarer ved 7-8 m. Kø bak hver angriper.',
      steps: [
        'Passiv: forsvareren står stille med armene ut. Angriperen går rett på og finter forbi.',
        'Halvaktiv: forsvareren flytter seg ett steg til én side. Angriperen går den andre veien.',
        'Aktiv: forsvareren prøver å stoppe (lovlig, forfra). Angriperen finter og skyter.',
        'Bytt roller etter 4-5 forsøk.'
      ],
      coaching: [
        'Gå rett på forsvareren, ikke på siden',
        'Finte når forsvareren er én til to meter unna',
        'Se på beina: flytter forsvareren vekten til én side, gå den andre',
        'Etter finten: rett mot mål, ikke på tvers'
      ],
      variations: [
        'Angriperen velger mellom finte og pasning til en medspiller på siden',
        'Skuddfinte: fint skudd, gå forbi og skyt fra nærmere hold',
        'Forsvareren starter bakfra og må løpe inn i posisjon'
      ],
      diagram: { width:240, height:200, field:'handball_half', elements:[
        {type:'zone_line',x1:95,y1:20,x2:95,y2:120},
        {type:'zone_line',x1:145,y1:20,x2:145,y2:120},
        {type:'player',x:120,y:45,team:'a',label:'A'},{type:'ball',x:128,y:41},
        {type:'player',x:120,y:88,team:'b',label:'F'},
        {type:'keeper',x:120,y:175},
        {type:'arrow',from:[120,47],to:[106,76],style:'run'},
        {type:'arrow',from:[106,76],to:[136,104],style:'run'},
        {type:'arrow',from:[136,106],to:[125,183],style:'shot'}
      ]}
    },

    // --- FINTER/SAMSPILL: Avløp ---
    {
      key: 'avlop',
      label: 'Avløp: kom deg fri',
      defaultMin: 10,
      category: 'spill_m_motstand',
      ages: ['6-7','8-9','10-12'],
      players: '6-16',
      equipment: '1 ball per gruppe på 3, kjegler',
      nffCategory: 'spille_med_og_mot',
      themes: ['finter', 'samarbeidsspill'],
      nffPhases: ['angrep_fremover'],
      learningGoals: ['Komme seg fri fra forsvareren uten ball', 'Rope på ballen når du er fri', 'Ta imot i fart'],
      suggestedGroupSize: 3,
      intensity: 'high',
      hasOpposition: true,
      playerCount: { min: 6, max: 16 },
      equipmentTags: ['ball', 'kjegler'],
      description: 'Avløp er å komme seg forbi eller fri fra en forsvarer uten ball, slik at du kan ta imot. Utviklingstrappa har det med fra 6-9 år. Starter som skyggelek og bygges opp med en kaster.',
      setup: 'Firkant ca. 10x10 m per gruppe. Grupper på 3: én angriper, én forsvarer og én kaster med ball utenfor firkanten.',
      steps: [
        'Skyggelek: angriperen prøver å riste av seg forsvareren med retningsforandringer. Treneren roper «stopp»: er du mer enn en armlengde unna, får du poeng.',
        'Med kaster: angriperen kommer seg fri og roper på ballen. Kasteren spiller når angriperen er fri.',
        'Mottak i fart, kast tilbake til kasteren, ny runde.',
        'Bytt roller etter 1 minutt.'
      ],
      coaching: [
        'Gå én vei, snu raskt og kom den andre: avløp er en finte uten ball',
        'Rop når du er fri, ikke før',
        'Hendene klare foran kroppen når du kommer fri',
        'Forsvareren følger, men holder ikke'
      ],
      variations: [
        '6-7 år: bare skyggeleken',
        'To angripere og én forsvarer: den som blir fri får ballen',
        'Mot mål: kom deg fri, ta imot og skyt'
      ],
      diagram: { width:220, height:160, field:'small', elements:[
        {type:'cone',x:40,y:30},{type:'cone',x:180,y:30},
        {type:'cone',x:40,y:130},{type:'cone',x:180,y:130},
        {type:'player',x:95,y:85,team:'a',label:'A'},
        {type:'player',x:115,y:80,team:'b',label:'F'},
        {type:'player',x:205,y:80,team:'neutral',label:'P'},{type:'ball',x:205,y:66},
        {type:'arrow',from:[95,85],to:[75,60],style:'run'},
        {type:'arrow',from:[75,60],to:[140,110],style:'run'},
        {type:'arrow',from:[200,82],to:[146,106],style:'pass'}
      ]}
    },

    // ── EGENDEFINERT (alltid nederst) ──
    { key: 'custom', label: 'Skriv inn selv', defaultMin: 10, isCustom: true, category: 'special',
      nffCategory: 'sjef_over_ballen', themes: [], nffPhases: [], learningGoals: [],
      intensity: 'medium', hasOpposition: false }
];
