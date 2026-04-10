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
      nffCategory: 'sjef_over_ballen', themes: ['oppvarming_generell', 'leik'], nffPhases: ['noytral'],
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
    {
      key: 'warm_ball', label: 'Ballmestring', defaultMin: 10, category: 'oppvarming',
      ages: ['6-7','8-9','10-12','13-16'], players: '4-20',
      equipment: '1 ball per spiller, kjegler',
      nffCategory: 'sjef_over_ballen', themes: ['foering_dribling'], nffPhases: ['angrep_fremover'],
      learningGoals: ['Kontroll på ballen med korte touch', 'Bruk ulike deler av foten', 'Løft blikket mens du fører ballen'],
      intensity: 'medium', hasOpposition: false,
      playerCount: { min: 4, max: 20 }, equipmentTags: ['ball', 'kjegler'],
      description: 'Individuell ballkontroll der hver spiller har sin egen ball. Føring med ulike deler av foten, vendinger, tempo-endringer. Bygger selvtillit og kontroll.',
      setup: 'Avgrens et område på ca. 15x15 meter. Alle spillere med egen ball inne i området.',
      steps: [
        'Spillerne fører ball fritt i området med korte touch.',
        'Treneren roper kommandoer: "Innsiden!", "Utsiden!", "Sålen!".',
        'På signal: stopp ball med sålen, vend og skift retning.',
        'Øk tempo gradvis. Avslutt med "hvem klarer flest vendinger på 30 sek?".'
      ],
      coaching: [
        'Ballen tett i foten, korte touch',
        'Løft blikket! Se etter rom og andre spillere',
        'Bruk begge føtter'
      ],
      variations: [
        'Kobling med nummersisten: trener roper tall, de med tallet blir fanger',
        'Legg til kjegler som slalåmløype'
      ],
      diagram: { width:220, height:160, field:'small', elements:[
        {type:'cone',x:20,y:20},{type:'cone',x:200,y:20},
        {type:'cone',x:20,y:140},{type:'cone',x:200,y:140},
        {type:'player',x:60,y:50,team:'a',label:''},{type:'ball',x:68,y:56},
        {type:'player',x:160,y:45,team:'a',label:''},{type:'ball',x:168,y:51},
        {type:'player',x:100,y:100,team:'a',label:''},{type:'ball',x:108,y:106},
        {type:'player',x:45,y:115,team:'a',label:''},{type:'ball',x:53,y:121},
        {type:'player',x:170,y:110,team:'a',label:''},{type:'ball',x:178,y:116},
        {type:'arrow',from:[60,50],to:[80,70],style:'run'},
        {type:'arrow',from:[160,45],to:[140,65],style:'run'}
      ]}
    },
    {
      key: 'rondo_easy', label: 'Rondo (lett)', defaultMin: 10, category: 'oppvarming',
      ages: ['8-9','10-12','13-16'], players: '5-8',
      equipment: '1 ball, kjegler til firkant',
      nffCategory: 'spille_med_og_mot', themes: ['pasning_samspill'], nffPhases: ['angrep_fremover', 'forsvar_vinne_ball'],
      learningGoals: ['Gjør deg spillbar: avstand og vinkel til ballfører', 'Beveg deg etter pasning for å gi ny vinkel', 'Forsvarer: press på ballfører, steng pasningslinjer'],
      intensity: 'medium', hasOpposition: true,
      playerCount: { min: 5, max: 8 }, equipmentTags: ['ball', 'kjegler'],
      description: 'Pasningsspill med overtall i firkant: 4 mot 1 eller 5 mot 2. Spillerne på utsiden holder ballen, den i midten prøver å vinne den. Kjerneøvelse i moderne fotball.',
      setup: 'Sett opp en firkant på ca. 6x6 meter (8x8 for 5v2). Spillere på utsiden, 1-2 i midten.',
      steps: [
        'Spillerne på utsiden passer ballen med maks 2 touch.',
        'Spilleren i midten jager ballen og prøver å ta den.',
        'Ved erobring: den som mistet ballen bytter inn i midten.',
        'Tell antall pasninger i strekk — sett rekord!'
      ],
      coaching: [
        'Åpne kroppen mot banen, ikke bare mot ballen',
        'Spill med innsiden for presisjon',
        'Beveg deg etter pasning for å gi ny vinkel',
        'Forsvareren: press på ballfører, steng pasningslinjer'
      ],
      variations: [
        '4v1 for yngre/lavere nivå, 5v2 for eldre/høyere nivå',
        'Kun 1 touch for mer intensitet'
      ],
      diagram: { width:200, height:200, field:'small', elements:[
        {type:'player',x:100,y:22,team:'a',label:''},
        {type:'player',x:172,y:68,team:'a',label:''},
        {type:'player',x:172,y:132,team:'a',label:''},
        {type:'player',x:100,y:178,team:'a',label:''},
        {type:'player',x:28,y:132,team:'a',label:''},
        {type:'player',x:28,y:68,team:'a',label:''},
        {type:'player',x:88,y:100,team:'b',label:'F'},
        {type:'ball',x:100,y:45},
        {type:'arrow',from:[100,28],to:[168,65],style:'pass'},
        {type:'arrow',from:[88,100],to:[100,50],style:'run'}
      ]}
    },

    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    // ⚽ TEKNIKK
    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    {
      key: 'driving', label: 'Føring av ball', defaultMin: 10, category: 'teknikk',
      ages: ['6-7','8-9','10-12','13-16'], players: '4-16',
      equipment: '1 ball per spiller, 6-10 kjegler',
      nffCategory: 'sjef_over_ballen', themes: ['foering_dribling'], nffPhases: ['angrep_fremover'],
      learningGoals: ['Ballen tett i foten med korte touch', 'Løft blikket mellom kjeglene', 'Bruk begge føtter og ulike deler av foten'],
      intensity: 'medium', hasOpposition: false,
      playerCount: { min: 4, max: 16 }, equipmentTags: ['ball', 'kjegler'],
      description: 'Spillerne fører ballen gjennom en kjegleløype med ulike deler av foten. Trener kontroll i fart og evnen til å holde ballen tett mens man beveger seg fremover.',
      setup: 'Sett opp 6-10 kjegler i sikk-sakk med 2-3 meters mellomrom. 2-4 spillere starter samtidig i parallelle løyper.',
      steps: [
        'Før ballen med innsiden gjennom hele løypen.',
        'Tilbake med utsiden av foten.',
        'Tredje runde: veksle innside/utside rundt hver kjegle.',
        'Fjerde runde: fri føring med maks fart!'
      ],
      coaching: [
        'Korte touch, ballen nær foten',
        'Blikket opp mellom kjeglene',
        'Bruk begge føtter',
        'Press tempoet gradvis'
      ],
      variations: [
        'Siste kjegle = skudd på mål for motivasjon',
        'Stafett mellom to lag for konkurranse'
      ],
      diagram: { width:220, height:150, field:'small', elements:[
        {type:'cone',x:45,y:20},{type:'cone',x:45,y:55},
        {type:'cone',x:45,y:90},{type:'cone',x:45,y:125},
        {type:'player',x:80,y:25,team:'a',label:''},{type:'ball',x:88,y:21},
        {type:'arrow',from:[80,25],to:[55,50],style:'run'},
        {type:'arrow',from:[55,55],to:[75,80],style:'run'},
        {type:'arrow',from:[75,90],to:[55,115],style:'run'},
        {type:'arrow',from:[55,125],to:[80,145],style:'run'}
      ]}
    },
    {
      key: 'pass_pair', label: 'Pasning parvis', defaultMin: 10, category: 'teknikk',
      ages: ['6-7','8-9','10-12','13-16'], players: '4-20',
      equipment: '1 ball per par, kjegler som markering',
      nffCategory: 'sjef_over_ballen', themes: ['pasning_samspill'], nffPhases: ['angrep_fremover'],
      learningGoals: ['Støttefoten peker mot mottaker', 'Treffe midt på ballen med innsiden', 'Åpent mottak: demp og legg klar i én bevegelse'],
      suggestedGroupSize: 2, intensity: 'low', hasOpposition: false,
      playerCount: { min: 4, max: 20 }, equipmentTags: ['ball', 'kjegler'],
      description: 'Grunnøvelsen i pasningsspill. To og to spillere sender ballen til hverandre med innsidetouch. Fokus på teknikk, mottak og presisjon.',
      setup: 'Spillerne stiller seg parvis med 5-10 meters avstand (kortere for yngre). Hvert par har én ball.',
      steps: [
        'Spiller A sender innsidepasning til B.',
        'B tar imot med innsiden (demper ballen), legger til rette.',
        'B passer tilbake til A.',
        'Etter 2 min: øk avstand. Etter 4 min: bruk kun venstre fot.'
      ],
      coaching: [
        'Støttefoten peker mot mottakeren',
        'Treffe midt på ballen med innsiden',
        'Åpent mottak: demp og legg klar i én bevegelse',
        'Kommuniser! Rop "her!" eller bruk navn'
      ],
      variations: [
        'Mottak med høyre, pass med venstre (og omvendt)',
        'Legg til "vegg": en tredje spiller i midten som spiller videre'
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
      key: 'pass_move', label: 'Pasning og bevegelse', defaultMin: 10, category: 'teknikk',
      ages: ['8-9','10-12','13-16'], players: '6-12',
      equipment: '2-3 baller, kjegler',
      nffCategory: 'sjef_over_ballen', themes: ['pasning_samspill'], nffPhases: ['angrep_fremover'],
      learningGoals: ['Beveg deg etter pasning (slå og gå)', 'Se deg rundt FØR ballen kommer', 'Førsteberøring legger ballen klar for neste pasning'],
      intensity: 'medium', hasOpposition: false,
      playerCount: { min: 6, max: 12 }, equipmentTags: ['ball', 'kjegler'],
      description: 'Etter å ha spilt pasning, beveger spilleren seg til ny posisjon for å motta igjen. Trener det viktigste prinsippet i lagspill: spill og flytt deg!',
      setup: 'Sett opp en trekant med kjegler (8-10m mellom). Spillere fordelt på hjørnene, ball starter hos én.',
      steps: [
        'A passer til B og løper mot Bs posisjon.',
        'B tar imot, passer til C, og løper mot Cs posisjon.',
        'C tar imot, passer til neste, og følger ballen.',
        'Hold flyten gående. Ball og spillere sirkulerer hele tiden.'
      ],
      coaching: [
        'Beveg deg MED EN GANG etter pasning',
        'Mottaker: se deg rundt FØR ballen kommer',
        'Tempo på pasningene — trill ballen med fart',
        'Førstekontakt legger ballen klar for neste pasning'
      ],
      variations: [
        'To baller i omløp samtidig for mer intensitet',
        'Legg til en forsvarer i midten (halvt rondo-prinsipp)'
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
    {
      key: 'pass_square', label: 'Pasningsfirkant', defaultMin: 12, category: 'teknikk',
      ages: ['8-9','10-12','13-16'], players: '4-12',
      equipment: 'Kjegler, 1-3 baller',
      nffCategory: 'sjef_over_ballen', themes: ['pasning_samspill', 'vendinger_mottak'], nffPhases: ['angrep_fremover'],
      learningGoals: ['Orientert førsteberøring: se dit du skal spille', 'Førstetouch legger ballen klar for pasning', 'Åpne kroppen før mottak'],
      intensity: 'medium', hasOpposition: false,
      playerCount: { min: 4, max: 12 }, equipmentTags: ['kjegler', 'ball'],
      description: 'Klassisk pasningsøvelse. Spillerne står i en firkant og passer ballen rundt med mottak, vending og videre pasning. Trener orientering, presisjon og å løfte blikket.',
      setup: 'Fire kjegler i firkant, ca. 8x8 meter. Én spiller ved hvert hjørne (flere spillere: 2-3 per hjørne i kø).',
      steps: [
        'A passer til B med innsiden og løper etter ballen til Bs plass.',
        'B tar imot, vender med ball, og passer videre til C.',
        'Mønsteret fortsetter rundt firkanten.',
        'Bytt retning hvert 2. minutt!'
      ],
      coaching: [
        'Åpne kroppen før mottak — se dit du skal spille',
        'Førstetouch legger ballen klar for pasning',
        'Innsiden for kort, driv for lang distanse',
        'Ballen skal aldri ligge stille'
      ],
      variations: [
        'Legg til en forsvarer i midten (rondo-variant)',
        'Krev kun 2 touch: mottak + pasning'
      ],
      diagram: { width:220, height:170, field:'none', elements:[
        {type:'cone',x:40,y:25},{type:'cone',x:180,y:25},{type:'cone',x:180,y:145},{type:'cone',x:40,y:145},
        {type:'player',x:40,y:33,team:'a',label:'A'},{type:'player',x:180,y:33,team:'a',label:'B'},
        {type:'player',x:180,y:137,team:'a',label:'C'},{type:'player',x:40,y:137,team:'a',label:'D'},
        {type:'ball',x:55,y:30},
        {type:'arrow',from:[50,33],to:[170,33],style:'pass'},
        {type:'arrow',from:[180,41],to:[180,130],style:'pass'},
        {type:'arrow',from:[55,43],to:[168,38],style:'run'}
      ]}
    },
    {
      key: 'dribble', label: 'Dribling 1 mot 1', defaultMin: 10, category: 'teknikk',
      ages: ['6-7','8-9','10-12','13-16'], players: '4-16',
      equipment: 'Baller, småmål eller kjegler, vester',
      nffCategory: 'spille_med_og_mot', themes: ['foering_dribling', '1v1_duell'], nffPhases: ['angrep_fremover', 'forsvar_vinne_ball'],
      learningGoals: ['Angriper: brems opp foran forsvarer, bruk finter', 'Forsvarer: stå sidelengs, vær tålmodig', 'Lav tyngdepunkt for rask retningsendring'],
      suggestedGroupSize: 2, intensity: 'high', hasOpposition: true,
      playerCount: { min: 4, max: 16 }, equipmentTags: ['ball', 'smaamaal', 'kjegler', 'vester'],
      description: 'Én angriper mot én forsvarer. Angriperen prøver å drible forbi og score. Ren duelltrening som bygger selvtillit og mot til å ta på seg spillere.',
      setup: 'Liten bane (10x15m) med to kjeglemål. Spillerne i to køer, én angriper og én forsvarer per runde.',
      steps: [
        'Angriperen starter med ball fra enden av banen.',
        'Forsvareren starter fra midtlinjen og møter angriperen.',
        'Angriperen prøver å drible forbi og score i småmål.',
        'Bytt rolle etter hver runde.'
      ],
      coaching: [
        'Angriper: løp MOT forsvareren, brems i siste øyeblikk',
        'Bruk finter og kroppsvendinger for å lure',
        'Forsvarer: stå sidelengs, tving angriperen dit du vil',
        'Ikke stup inn — vær tålmodig!'
      ],
      variations: [
        '2v1 for å trene samarbeid i overtall',
        'Tidsbegrensning: 8 sekunder per forsøk'
      ],
      diagram: { width:220, height:160, field:'none', elements:[
        {type:'goal',x:85,y:5,w:50,h:12},
        {type:'player',x:110,y:55,team:'b',label:'F'},{type:'player',x:110,y:120,team:'a',label:'A'},
        {type:'ball',x:118,y:126},
        {type:'arrow',from:[110,120],to:[110,65],style:'run'},
        {type:'cone',x:75,y:55},{type:'cone',x:145,y:55},
        {type:'goal',x:85,y:143,w:50,h:12}
      ]}
    },
    {
      key: 'turn', label: 'Vendinger', defaultMin: 10, category: 'teknikk',
      ages: ['8-9','10-12','13-16'], players: '4-16',
      equipment: '1 ball per spiller, kjegler',
      nffCategory: 'sjef_over_ballen', themes: ['vendinger_mottak', 'foering_dribling'], nffPhases: ['angrep_fremover'],
      learningGoals: ['Brems ned FØR vendingen, akseler ETTER', 'Bruk kroppen til å skjerme ballen', 'Se deg rundt i vendingsøyeblikket'],
      intensity: 'medium', hasOpposition: false,
      playerCount: { min: 4, max: 16 }, equipmentTags: ['ball', 'kjegler'],
      description: 'Trening av ulike vendeteknikker: Cruyff-vending, innsidevending, utsidedraging. Evnen til å snu med ball er avgjørende for å komme ut av press.',
      setup: 'Spillerne fører ball mot en kjegle, utfører vending, og fører ball tilbake. 3-4 parallelle stasjoner.',
      steps: [
        'Før ballen mot kjeglen i rolig tempo.',
        'Ved kjeglen: utfør vendeteknikk (trener viser hvilken).',
        'Akseler ut av vendingen og før ball tilbake.',
        'Roter mellom teknikkene: innsidevending, Cruyff, sålevending.'
      ],
      coaching: [
        'Brems ned FØR vendingen, akseler ETTER',
        'Bruk kroppen til å skjerme ballen',
        'Se deg rundt i vendingsøyeblikket',
        'Øv begge retninger!'
      ],
      variations: [
        'Legg til en passiv forsvarer som presser lett',
        'Vend og slå pasning til neste i køen'
      ],
      diagram: { width:220, height:160, field:'small', elements:[
        {type:'cone',x:110,y:55},
        {type:'player',x:55,y:55,team:'a',label:''},{type:'ball',x:63,y:51},
        {type:'arrow',from:[55,55],to:[100,55],style:'run'},
        {type:'arrow',from:[115,55],to:[165,35],style:'run'},
        {type:'player',x:175,y:30,team:'a',label:''},
        {type:'cone',x:110,y:110},
        {type:'player',x:55,y:110,team:'a',label:''},
        {type:'arrow',from:[55,110],to:[100,110],style:'run'},
        {type:'arrow',from:[115,110],to:[165,130],style:'run'},
        {type:'player',x:175,y:135,team:'a',label:''}
      ]}
    },
    {
      key: 'receive_turn', label: 'Mottak og vending', defaultMin: 10, category: 'teknikk',
      ages: ['8-9','10-12','13-16'], players: '6-12',
      equipment: '1 ball per par, kjegler',
      nffCategory: 'sjef_over_ballen', themes: ['vendinger_mottak', 'pasning_samspill'], nffPhases: ['angrep_fremover'],
      learningGoals: ['Sjekk over skulderen FØR ballen kommer', 'Åpne kroppen mot dit du vil vende', 'Førstetouch i retning du skal spille'],
      suggestedGroupSize: 2, intensity: 'medium', hasOpposition: false,
      playerCount: { min: 6, max: 12 }, equipmentTags: ['ball', 'kjegler'],
      description: 'Spilleren mottar pasning med ryggen mot spilleretning, vender med førstetouch, og spiller videre. Trener orientert førstetouch — en nøkkelferdighet.',
      setup: 'Spillerne i par, 10m avstand. Én kjegle bak mottakeren (representerer retningen å vende mot).',
      steps: [
        'A passer til B som har ryggen mot Bs kjegle.',
        'B tar imot med åpent mottak: vender kroppen og ballen i én bevegelse.',
        'B fører ballen forbi kjeglen og passer tilbake til A.',
        'Bytt roller etter 5 repetisjoner.'
      ],
      coaching: [
        'Sjekk over skulderen FØR ballen kommer',
        'Åpne kroppen mot dit du vil vende',
        'Førstetouch i retning du skal spille',
        'Bruk utsiden av foten for å ta med ballen rundt'
      ],
      variations: [
        'Legg til en passiv forsvarer bak mottakeren',
        'Mottak-vending-skudd: avslutt på mål etter vending'
      ],
      diagram: { width:220, height:100, field:'none', elements:[
        {type:'player',x:30,y:50,team:'a',label:'L'},{type:'ball',x:38,y:46},
        {type:'player',x:110,y:50,team:'neutral',label:'M'},
        {type:'player',x:190,y:50,team:'b',label:'R'},
        {type:'arrow',from:[42,50],to:[98,50],style:'pass'},
        {type:'arrow',from:[120,50],to:[178,50],style:'pass'},
        {type:'arrow',from:[110,62],to:[30,62],style:'run'}
      ]}
    },

    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    // 🎯 AVSLUTNING
    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    {
      key: 'shot', label: 'Skudd på mål', defaultMin: 12, category: 'avslutning',
      ages: ['6-7','8-9','10-12','13-16'], players: '4-14',
      equipment: 'Mål (stort eller småmål), baller, kjegler',
      nffCategory: 'scoringstrening', themes: ['avslutning'], nffPhases: ['angrep_avslutning'],
      learningGoals: ['Plassering foran kraft: sikte lavt i hjørnene', 'Støttefot peker mot mål', 'Følg opp skuddet, vær klar for retur'],
      intensity: 'medium', hasOpposition: false,
      playerCount: { min: 4, max: 14 }, equipmentTags: ['maal', 'ball', 'kjegler'],
      description: 'Avslutninger fra ulike posisjoner. Fokus på plassering framfor kraft. Alle barn elsker å skyte på mål — la dem gjøre det mye!',
      setup: 'Mål med keeper (eller åpent med kjegler). Spillere i kø ca. 12-16m fra mål. Baller klare på rekke.',
      steps: [
        'Spilleren fører ball mot mål fra sentralt.',
        'Avslutt på mål fra ca. 10-12 meter.',
        'Neste runde: skudd fra venstre side.',
        'Tredje runde: skudd fra høyre side.',
        'Fjerde runde: mottar pasning fra siden og avslutter direkte.'
      ],
      coaching: [
        'Plassering slår kraft — sikte lavt i hjørnene',
        'Støttefot peker mot mål',
        'Treffe midt/øvre del av ballen for lavt skudd',
        'Følg opp skuddet — vær klar for retur!'
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
      nffCategory: 'scoringstrening', themes: ['avslutning', 'foering_dribling'], nffPhases: ['angrep_avslutning'],
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
        {type:'cone',x:55,y:95},{type:'cone',x:88,y:78},
        {type:'cone',x:120,y:73},{type:'cone',x:152,y:78},{type:'cone',x:185,y:95},
        {type:'player',x:55,y:108,team:'a',label:''},{type:'ball',x:63,y:104},
        {type:'player',x:185,y:108,team:'b',label:''},
        {type:'keeper',x:120,y:175},
        {type:'arrow',from:[55,108],to:[100,185],style:'shot'},
        {type:'arrow',from:[185,108],to:[140,185],style:'shot'}
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
      nffCategory: 'spille_med_og_mot', themes: ['samarbeidsspill', 'avslutning'], nffPhases: ['angrep_avslutning'],
      learningGoals: ['Angriper med ball: trekk forsvarer FØR pasning', 'Angriper uten ball: hold avstand og vinkel, vær spillbar', 'Timing: spill pasning i riktig øyeblikk'],
      suggestedGroupSize: 3, intensity: 'high', hasOpposition: true,
      playerCount: { min: 6, max: 12 }, equipmentTags: ['smaamaal', 'kjegler', 'ball'],
      description: 'To angripere mot én forsvarer. Trener den viktigste beslutningen i fotball: når skal jeg drible, og når skal jeg spille pasning?',
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
      nffCategory: 'spille_med_og_mot', themes: ['samarbeidsspill', 'avslutning'], nffPhases: ['angrep_avslutning'],
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
      nffCategory: 'smalagsspill', themes: ['spillforstaelse'], nffPhases: ['angrep_fremover', 'angrep_avslutning', 'forsvar_vinne_ball', 'forsvar_hindre_maal'],
      learningGoals: ['Spre dere! Ikke alle rundt ballen', 'Snakk sammen: rop på ballen, gi beskjed', 'Etter ballvinning: se framover først'],
      intensity: 'high', hasOpposition: true,
      playerCount: { min: 6, max: 16 }, equipmentTags: ['maal', 'vester', 'ball', 'kjegler'],
      description: 'Kjerneøvelsen i barnehåndball. Minimum 50% av økten bør være smålagsspill. 3v3, 4v4 eller 5v5 på tilpasset bane gir mest mulig ballkontakt i kamplike situasjoner.',
      setup: 'Tilpass banestørrelse (3v3: 20x25m, 5v5: 30x40m). To mål, vester for lagdeling.',
      steps: [
        'Del inn i to lag med vester.',
        'Vanlige regler, innkast/innspark ved sidelinje.',
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
      nffCategory: 'smalagsspill', themes: ['pasning_samspill', 'forsvarsspill'], nffPhases: ['angrep_fremover', 'forsvar_vinne_ball'],
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
      nffCategory: 'smalagsspill', themes: ['spillforstaelse', 'leik'], nffPhases: ['angrep_fremover', 'angrep_avslutning', 'forsvar_vinne_ball', 'forsvar_hindre_maal'],
      learningGoals: ['La barna løse problemene selv', 'Ros samarbeid og innsats, ikke bare scoring'],
      intensity: 'high', hasOpposition: true,
      playerCount: { min: 6, max: 20 }, equipmentTags: ['maal', 'ball', 'vester'],
      description: 'Ustrukturert spill der barna styrer selv. Treneren observerer og heier, men griper minimalt inn. Gir eierskap, kreativitet og ren fotballglede.',
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
    {
      key: 'square_game', label: 'Spill i soner', defaultMin: 12, category: 'smalagsspill',
      ages: ['10-12','13-16'], players: '8-16',
      equipment: 'Mål, vester, kjegler, baller',
      nffCategory: 'smalagsspill', themes: ['spillforstaelse', 'romforstaelse'], nffPhases: ['angrep_fremover', 'angrep_avslutning', 'forsvar_vinne_ball'],
      learningGoals: ['Se etter rom i neste sone FØR du mottar', 'Bruk bredden, ikke bare gjennom midten', 'Forsvar: kontroller midtsonen, press som lag'],
      intensity: 'high', hasOpposition: true,
      playerCount: { min: 8, max: 16 }, equipmentTags: ['maal', 'vester', 'kjegler', 'ball'],
      description: 'Spill i avgrenset område med soneoppgaver. F.eks. må ballen innom midtsonen før scoring. Trener romforståelse og taktisk tenkning.',
      setup: 'Del en halvbane i 2-3 soner med kjegler. Mål i hver ende. Tydelig markering mellom sonene.',
      steps: [
        'Vanlig spill, men ballen MÅ ha vært i midtsonen før scoring.',
        'Spill i perioder på 5 minutter.',
        'Varier soneregelen underveis.',
        'F.eks.: "score kun etter innlegg fra ytterkanten".'
      ],
      coaching: [
        'Se etter rom i neste sone FØR du mottar',
        'Bruk bredden — ikke spill gjennom midten hele tiden',
        'Forsvar: kontroller midtsonen, press som lag',
        'Beveg dere mellom sonene for å skape rom'
      ],
      variations: [
        'Legg til jokere i midtsonen',
        'Tidsbegrensning: 20 sek etter sonegjennomspill'
      ],
      diagram: { width:240, height:160, field:'half', elements:[
        {type:'goal',x:5,y:55,w:12,h:50,vertical:true},{type:'goal',x:223,y:55,w:12,h:50,vertical:true},
        {type:'zone_line',x1:100,y1:8,x2:100,y2:152},{type:'zone_line',x1:140,y1:8,x2:140,y2:152},
        {type:'player',x:50,y:55,team:'a',label:''},{type:'player',x:50,y:105,team:'a',label:''},
        {type:'player',x:120,y:80,team:'neutral',label:'J'},
        {type:'player',x:185,y:55,team:'b',label:''},{type:'player',x:185,y:105,team:'b',label:''},
        {type:'ball',x:58,y:100}
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
      key: 'ball_tag', label: 'Ballsisten', defaultMin: 8, category: 'oppvarming',
      ages: ['6-7', '8-9'], players: '6-20',
      equipment: '1 ball per spiller, kjegler til bane',
      nffCategory: 'sjef_over_ballen', themes: ['foering_dribling'], nffPhases: ['noytral'],
      learningGoals: ['Hold ballen nær foten mens du ser deg rundt', 'Retningsforandring for å unngå fanger', 'Bruk kroppen til å skjerme ballen'],
      intensity: 'high', hasOpposition: false,
      playerCount: { min: 6, max: 20 }, equipmentTags: ['ball', 'kjegler'],
      description: 'Sistenlek der alle har egen ball. Fangeren fører sin ball samtidig som den prøver å ta de andre. Kombinerer ballkontroll med bevegelse og romforståelse.',
      setup: 'Avgrens et område (15x15 til 20x20m). Alle spillere har egen ball. Velg 1-2 fangere (vester).',
      steps: [
        'Alle fører ball innenfor området.',
        'Fangerne (med vest) prøver å ta de andre ved å berøre dem.',
        'Blir du tatt, stopp og gjør 5 fotbytter på ballen. Så er du fri igjen.',
        'Bytt fangere hvert 2. minutt.'
      ],
      coaching: [
        'Hold ballen nær foten — korte, raske touch',
        'Løft blikket! Se hvor fangeren er',
        'Bruk retningsforandring for å stikke unna',
        'Fangere: ikke bare jag — avskjær!'
      ],
      variations: [
        'Tatt = bli fanger selv (siste spiller igjen vinner)',
        'Fangere uten ball — sparker andres ball ut av området'
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
        'Gi forsvareren poeng for å tvinge skudd utenfor 16-meter'
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
      nffCategory: 'smalagsspill', themes: ['spillforstaelse', 'pasning_samspill'], nffPhases: ['angrep_fremover', 'forsvar_vinne_ball'],
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
      nffCategory: 'smalagsspill', themes: ['omstilling'], nffPhases: ['angrep_fremover', 'angrep_avslutning', 'forsvar_vinne_ball'],
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
      nffCategory: 'spille_med_og_mot', themes: ['samarbeidsspill', 'pasning_samspill'], nffPhases: ['angrep_fremover', 'angrep_avslutning'],
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
      nffCategory: 'scoringstrening', themes: ['avslutning', 'samarbeidsspill'], nffPhases: ['angrep_avslutning'],
      learningGoals: ['Tverrpasning eller tilbakelegg til medspiller i skuddposisjon', 'Avslutt på direkten eller med færrest mulig touch', 'Beveg deg inn i scoringsposisjon med riktig timing'],
      suggestedGroupSize: 2, intensity: 'high', hasOpposition: false,
      playerCount: { min: 6, max: 14 }, equipmentTags: ['maal', 'ball', 'kjegler'],
      description: 'Avslutningsøvelse der to spillere samarbeider om å score. Øver på tverrballer, tilbakelegg og direkte avslutning — mer realistisk enn å skyte alene.',
      setup: 'Spillere i par. Kø sentralt og på høyre/venstre side, 20m fra mål. Keeper i mål.',
      steps: [
        'Spiller A fører ball langs siden mot dødlinja.',
        'Spiller B løper inn i boksen fra sentralt.',
        'A slår tverrball eller tilbakelegg til B.',
        'B avslutter på mål — helst på direkten.',
        'Bytt sider og roller. Varier mellom høyre og venstre.'
      ],
      coaching: [
        'Innlegger: løft blikket, finn medspillerens løp',
        'Avslutter: timing! Ikke stå stille — løp inn i ballen',
        'Avslutt raskt, keeper skal ikke rekke å flytte seg',
        'Plassering i det ledige hjørnet, ikke rett på keeper'
      ],
      variations: [
        'Legg til en forsvarer som prøver å blokkere tverrballen',
        'Varier: tilbakelegg fra dødlinja, tverrball fra 16m, gjennombrudd sentralt'
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

    // ═══════════════════════════════
    // 🆕 TIER 2: UTVIDET DEKNING (egenprodusert innhold)
    // ═══════════════════════════════

    // --- 2 mot 2 (+keeper) ---
    {
      key: '2v2', label: '2 mot 2', defaultMin: 12, category: 'spill_m_motstand',
      ages: ['8-9', '10-12', '13-16'], players: '8-16',
      equipment: 'Småmål eller store mål med keeper, vester, baller, kjegler',
      nffCategory: 'spille_med_og_mot', themes: ['samarbeidsspill', 'forsvarsspill', '1v1_duell'], nffPhases: ['angrep_avslutning', 'forsvar_vinne_ball'],
      learningGoals: ['Samarbeid i angrep: når drible, når spille?', 'Forsvar: fordel ansvar — én presser, én sikrer', 'Kommuniser med makker om hvem som gjør hva'],
      suggestedGroupSize: 4, intensity: 'high', hasOpposition: true,
      playerCount: { min: 8, max: 16 }, equipmentTags: ['smaamaal', 'maal', 'vester', 'ball', 'kjegler'],
      description: 'To mot to på liten bane med mål. Mellomtingen mellom 1v1 og lagspill — her må du samarbeide med én makker for å løse situasjonen. Trener både angrep og forsvar i par.',
      setup: 'Bane 15x20m med mål (småmål eller stort med keeper) i hver ende. Par stiller opp bak hvert mål.',
      steps: [
        'Trener spiller ball inn til det ene paret.',
        'Paret angriper mot det andre parets mål.',
        'Forsvarende par prøver å vinne ball og kontre.',
        'Spill til mål, ball ut, eller 30 sek. Nye par inn.',
        'Hold poeng per par over flere runder.'
      ],
      coaching: [
        'Angrep: én fører ball, den andre tilbyr seg i rom',
        'Forsvar: én presser ballfører, den andre sikrer bak',
        'Snakk sammen! «Jeg tar ball, du sikrer»',
        'Bruk bredden — ikke stå oppå hverandre'
      ],
      variations: [
        'Med keeper: 2v2+K, større mål',
        '2v2 med jokere på sidene (3v2 i angrep)'
      ],
      diagram: { width:200, height:160, field:'small', elements:[
        {type:'goal',x:70,y:5,w:60,h:12},{type:'goal',x:70,y:143,w:60,h:12},
        {type:'player',x:75,y:70,team:'a',label:''},{type:'player',x:130,y:55,team:'a',label:''},
        {type:'ball',x:83,y:66},
        {type:'player',x:90,y:95,team:'b',label:''},{type:'player',x:140,y:85,team:'b',label:''},
        {type:'arrow',from:[80,65],to:[125,50],style:'pass'}
      ]}
    },

    // --- 1v1 med porter ---
    {
      key: '1v1_gates', label: '1 mot 1 med porter', defaultMin: 10, category: 'spill_m_motstand',
      ages: ['8-9', '10-12', '13-16'], players: '6-16',
      equipment: 'Kjegler (mange), baller',
      nffCategory: 'spille_med_og_mot', themes: ['1v1_duell', 'foering_dribling'], nffPhases: ['angrep_fremover', 'forsvar_vinne_ball'],
      learningGoals: ['Angriper: les forsvareren og velg hvilken port du angriper', 'Bruk finter og retningsforandring for å åpne porter', 'Forsvarer: steng den nærmeste porten, tving til side'],
      suggestedGroupSize: 2, intensity: 'high', hasOpposition: true,
      playerCount: { min: 6, max: 16 }, equipmentTags: ['kjegler', 'ball'],
      description: 'Duelltrening der angriperen scorer ved å føre ball gjennom én av flere kjegleporter. Forsvareren må lese angriperen og stenge porter. Trener retningsforandring og valgtaking.',
      setup: 'Firkant 12x12m. 3-4 kjegleporter (1m brede) spredt langs én side. Angriper starter med ball fra motsatt side.',
      steps: [
        'Angriper fører ball mot portene.',
        'Forsvarer starter ved portene og prøver å stenge veien.',
        'Angriper scorer ved å føre ball gjennom en åpen port.',
        'Forsvarer scorer ved å vinne ball eller tvinge angriper ut av banen.',
        'Bytt roller etter 3 forsøk. Tell poeng.'
      ],
      coaching: [
        'Angriper: løft blikket! Se hvilken port som er åpen',
        'Bruk finter for å trekke forsvareren til én side',
        'Forsvarer: stå sentralt, reager på angriperens valg',
        'Tempo! Ikke nøl — ta en avgjørelse og gjennomfør'
      ],
      variations: [
        'Flere porter = lettere for angriper',
        'To forsvarere = vanskeligere, krever mer finter'
      ],
      diagram: { width:200, height:160, field:'none', elements:[
        {type:'cone',x:40,y:15},{type:'cone',x:55,y:15},
        {type:'cone',x:90,y:15},{type:'cone',x:105,y:15},
        {type:'cone',x:140,y:15},{type:'cone',x:155,y:15},
        {type:'player',x:100,y:130,team:'a',label:'A'},{type:'ball',x:108,y:126},
        {type:'player',x:100,y:50,team:'b',label:'F'},
        {type:'arrow',from:[100,125],to:[100,60],style:'run'}
      ]}
    },

    // --- Retningsspill ---
    {
      key: 'possession_dir', label: 'Retningsspill', defaultMin: 15, category: 'smalagsspill',
      ages: ['10-12', '13-16'], players: '8-16',
      equipment: 'Vester, baller, kjegler til bane og endesoner',
      nffCategory: 'smalagsspill', themes: ['spillforstaelse', 'spilloppbygging'], nffPhases: ['angrep_fremover', 'forsvar_vinne_ball'],
      learningGoals: ['Bygg opp spillet kontrollert mot endesonen', 'Gjør deg spillbar foran ballfører med riktig vinkel', 'Ved balltap: omstill raskt og press'],
      intensity: 'high', hasOpposition: true,
      playerCount: { min: 8, max: 16 }, equipmentTags: ['vester', 'ball', 'kjegler'],
      description: 'Ballbesittelse med retning: score ved å spille ballen kontrollert inn i motstanderens endesone. Trener spilloppbygging, romforståelse og tålmodighet i oppspillsfasen.',
      setup: 'Bane 30x20m med 3m dype endesoner i begge ender. To lag med vester. Ingen mål — score ved å motta ball i kontroll inne i endesonen.',
      steps: [
        'Laget med ball bygger opp spillet og prøver å spille en medspiller inn i motstanderens endesone.',
        'Scoring: en spiller mottar ball med kontroll inne i endesonen (foten på ballen).',
        'Ved ballvinning: det andre laget angriper andre veien.',
        'Spill 3-4 min perioder, hvile, bytt.'
      ],
      coaching: [
        'Tålmodighet! Ikke slå lange baller i panikk',
        'Gjør deg spillbar: ut av pasningsskygge, åpen kropp',
        'Spill bakover eller sideveis for å finne åpning fremover',
        'Ved balltap: press umiddelbart, ikke vent!'
      ],
      variations: [
        'Touchbegrensning (maks 3 touch) for raskere spill',
        'Joker: én nøytral spiller alltid med angripende lag'
      ],
      diagram: { width:240, height:150, field:'small', elements:[
        {type:'cone',x:10,y:10},{type:'cone',x:10,y:140},{type:'cone',x:230,y:10},{type:'cone',x:230,y:140},
        {type:'cone',x:35,y:10},{type:'cone',x:35,y:140},{type:'cone',x:205,y:10},{type:'cone',x:205,y:140},
        {type:'player',x:70,y:50,team:'a',label:''},{type:'player',x:70,y:110,team:'a',label:''},
        {type:'player',x:120,y:75,team:'a',label:''},{type:'ball',x:128,y:71},
        {type:'player',x:150,y:45,team:'b',label:''},{type:'player',x:150,y:115,team:'b',label:''},
        {type:'player',x:180,y:75,team:'b',label:''},
        {type:'arrow',from:[128,71],to:[60,45],style:'pass'}
      ]}
    },

    // --- Blokker og redd ---
    {
      key: 'block_shot', label: 'Blokker og redd', defaultMin: 10, category: 'spill_m_motstand',
      ages: ['10-12', '13-16'], players: '6-14',
      equipment: 'Mål med keeper, baller, kjegler',
      nffCategory: 'spille_med_og_mot', themes: ['forsvarsspill', 'keeper'], nffPhases: ['forsvar_hindre_maal'],
      learningGoals: ['Kom mellom ball og mål i riktig vinkel', 'Blokkér med fremsiden av kroppen, stå på beina', 'Keeper: kommuniser posisjon og gi beskjed til forsvarer'],
      suggestedGroupSize: 2, intensity: 'high', hasOpposition: true,
      playerCount: { min: 6, max: 14 }, equipmentTags: ['maal', 'ball', 'kjegler'],
      description: 'Forsvareren øver på å blokkere skudd og hindre avslutning nær eget mål. Keeper og forsvarer samarbeider om å stenge rom og vinkel. Trener NFF fase F3.',
      setup: 'Halvbane eller 20x15m foran mål med keeper. Angripere i kø 18-20m ut. Forsvarere starter ved 16-meteren.',
      steps: [
        'Angriper mottar ball fra trener og fører mot mål.',
        'Forsvarer rykker ut og posisjonerer seg mellom angriper og mål.',
        'Angriper forsøker å score. Forsvarer blokkerer eller vinner ball.',
        'Keeper kommuniserer: «Hold side!», «Jeg har nær stolpe!»',
        'Bytt roller etter 3 forsøk.'
      ],
      coaching: [
        'Forsvarer: stå på beina, ikke kast deg ned for tidlig',
        'Blokkér med fremsiden av kroppen — aldri ryggen til',
        'Steng ett hjørne, la keeper ta det andre',
        'Keeper: snakk! Fortell forsvareren hvor du er'
      ],
      variations: [
        '2v1 nær mål: to angripere mot én forsvarer + keeper',
        'Innlegg fra siden: forsvarer må markere og cleare'
      ],
      diagram: { width:220, height:150, field:'small', elements:[
        {type:'goal',x:60,y:5,w:100,h:18},{type:'keeper',x:110,y:20},
        {type:'player',x:110,y:120,team:'a',label:'A'},{type:'ball',x:118,y:116},
        {type:'player',x:110,y:60,team:'b',label:'F'},
        {type:'arrow',from:[110,115],to:[110,70],style:'run'},
        {type:'arrow',from:[110,35],to:[110,55],style:'run'}
      ]}
    },

    // --- Keeperduell ---
    {
      key: 'keeper_play', label: 'Keeperduell', defaultMin: 10, category: 'keeper',
      ages: ['8-9', '10-12'], players: '4-10',
      equipment: '2 småmål (eller store mål), baller',
      nffCategory: 'sjef_over_ballen', themes: ['keeper'], nffPhases: ['forsvar_hindre_maal'],
      learningGoals: ['Grunnstilling og forflytning i målet', 'Grep og skyv ved lave og høye skudd', 'Rask reaksjon og igangsetting etter redning'],
      suggestedGroupSize: 2, intensity: 'medium', hasOpposition: false,
      playerCount: { min: 4, max: 10 }, equipmentTags: ['smaamaal', 'maal', 'ball'],
      description: 'To keepere mot hverandre i hver sitt mål på kort avstand. Trener reaksjon, grep, plassering og utspark. Morsomt og intenst — alle får mange repetisjoner.',
      setup: 'To mål (småmål eller store) 8-12m fra hverandre. Én keeper i hvert mål. Ekstra baller bak målene.',
      steps: [
        'Keeper A kaster eller sparker ballen mot Keeper Bs mål.',
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
      diagram: { width:240, height:200, field:'handball_half', elements:[
        {type:'player',x:80,y:88,team:'b',label:''},
        {type:'player',x:162,y:85,team:'a',label:''},{type:'ball',x:170,y:81},
        {type:'player',x:120,y:62,team:'a',label:''},
        {type:'keeper',x:120,y:170},
        {type:'arrow',from:[162,85],to:[122,168],style:'shot'},
        {type:'arrow',from:[120,168],to:[82,90],style:'pass'}
      ]}
    },

    // --- Stafett med ball ---
    {
      key: 'relay_ball', label: 'Stafett med ball', defaultMin: 8, category: 'oppvarming',
      ages: ['6-7', '8-9'], players: '6-20',
      equipment: 'Baller, kjegler',
      nffCategory: 'sjef_over_ballen', themes: ['foering_dribling'], nffPhases: ['noytral'],
      learningGoals: ['Før ballen i fart uten å miste kontroll', 'Vend med ball rundt kjegle', 'Legg til fart gradvis — kontroll først'],
      intensity: 'high', hasOpposition: false,
      playerCount: { min: 6, max: 20 }, equipmentTags: ['ball', 'kjegler'],
      description: 'Lagstafett der spillerne fører ball gjennom en kjegleløype og tilbake. Kombinerer ballkontroll med fart og lagkonkurranse. Perfekt oppvarming med mye engasjement.',
      setup: 'To eller flere lag i kø bak en startlinje. Kjegleløype 10-15m foran (rett linje, slalåm, eller sirkelbane).',
      steps: [
        'Første spiller på hvert lag fører ball gjennom løypa og tilbake.',
        'Overlever ballen til neste i køen med en pasning.',
        'Laget som fullfører først vinner runden.',
        'Kjør 3-4 runder med ulike løyper eller regler.'
      ],
      coaching: [
        'Kontroll først, fart etterpå — ballen må være nær foten',
        'Bruk innsiden og utsiden rundt kjeglene',
        'Hei på lagkameratene! Sørg for at alle er klare',
        'Presis overlevering: pasning til neste, ikke bare spark den'
      ],
      variations: [
        'Kun venstre fot, kun utside',
        'Løype med vending + skudd på mål til slutt'
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

    // ═══════════════════════════════
    // 🆕 TIER 3: 13-16 ÅR SPESIFIKKE (egenprodusert innhold)
    // ═══════════════════════════════

    // --- Prepp'n (oppvarming ungdom) ---
    {
      key: 'prepp', label: 'Prepp\u2019n', defaultMin: 12, category: 'oppvarming',
      ages: ['13-16'], players: '8-22',
      equipment: 'Baller, kjegler',
      nffCategory: 'sjef_over_ballen', themes: ['foering_dribling', 'vendinger_mottak'], nffPhases: ['noytral'],
      learningGoals: ['Fart i beina: høy frekvens i forflytninger med og uten ball', 'Fart i ballen: rask ballhåndtering med begge føtter', 'Kroppskontroll: kontroll på overkropp i utgangsstillinger og retningsforandringer'],
      intensity: 'medium', hasOpposition: false,
      playerCount: { min: 8, max: 22 }, equipmentTags: ['ball', 'kjegler'],
      description: 'Strukturert oppvarming for ungdom. Fokus på fart i hodet, fart i beina og fart i ballen. Gjør spillerne spilleklare for høy intensitet i spill. Bør knyttes til øktens tema.',
      setup: 'Firkant 15x15m med kjegler. Alle spillere med ball. Kan kjøres i par eller individuelt.',
      steps: [
        'Føring (3 min): alle fører ball i firkanten. Trener roper kommandoer — innside, utside, såle, vending, tempoøkning.',
        'Frekvens (3 min): ball i hendene, kjappe føtter over ball, sidesteg langs kjegler, akselerasjon ut.',
        'Pasning i par (4 min): kort avstand, vekslende pasning med førstetouch i bevegelse. Øk avstand gradvis.',
        'Fritt (2 min): kombiner føring, vending og pasning i fritt tempo med stigende fart.'
      ],
      coaching: [
        'Kontroll på overkroppen: stå rett, ikke len deg forover',
        'Høy frekvens i beina, korte raske steg',
        'Førstetouch legger ballen klar for neste handling',
        'Knytt aktivitetene til øktens tema — f.eks. vendinger hvis tema er spilloppbygging'
      ],
      variations: [
        'Med motstand: legg til en passiv jager i del 1',
        'Konkurranseform: hvem klarer flest vendinger på 30 sek?'
      ],
      diagram: { width:200, height:200, field:'small', elements:[
        {type:'cone',x:20,y:20},{type:'cone',x:180,y:20},{type:'cone',x:20,y:180},{type:'cone',x:180,y:180},
        {type:'player',x:60,y:70,team:'a',label:''},{type:'ball',x:68,y:66},
        {type:'player',x:140,y:90,team:'a',label:''},{type:'ball',x:148,y:86},
        {type:'player',x:80,y:140,team:'a',label:''},{type:'ball',x:88,y:136},
        {type:'player',x:120,y:50,team:'a',label:''},{type:'ball',x:128,y:46},
        {type:'arrow',from:[65,75],to:[100,100],style:'run'},
        {type:'arrow',from:[145,85],to:[115,65],style:'run'}
      ]}
    },

    // --- Spilloppbygging bakfra ---
    {
      key: 'build_up', label: 'Spilloppbygging bakfra', defaultMin: 15, category: 'smalagsspill',
      ages: ['13-16'], players: '10-18',
      equipment: 'Vester (2-3 farger), baller, store mål med keeper, kjegler',
      nffCategory: 'smalagsspill', themes: ['spilloppbygging', 'pasning_samspill'], nffPhases: ['angrep_fremover'],
      learningGoals: ['Keeper/back: ro med ball, åpne i førstetouch, true med blikk', 'Midtbane: spillbar i framrom med oversikt fremover', 'Unngå å gi bort presseøyeblikk — kontrollert oppspill ut av press'],
      intensity: 'high', hasOpposition: true,
      playerCount: { min: 10, max: 18 }, equipmentTags: ['vester', 'ball', 'maal', 'kjegler'],
      description: 'Laget øver på å spille seg ut bakfra mot organisert press. Keeper starter, backer og midtbane bygger opp, angrepsspillerne tilbyr seg i rom. Trener NFF fase A1.',
      setup: 'Halv bane. Keeper + 4-5 oppbyggingsspillere mot 3-4 pressende motstandere. Mål å spille ballen over midtlinjen kontrollert (eller til mottaker i endesone).',
      steps: [
        'Keeper starter med ball (utspark eller utkast til back).',
        'Backene og midtbanen tilbyr seg med riktig avstand og vinkel.',
        'Pressende lag forsøker å vinne ball og score på motangrep.',
        'Oppbyggingslaget scorer ved å spille en spiller gjennom midtsonen med ball i kontroll.',
        'Ved ballvinning for presslaget: score på stort mål innen 8 sek.'
      ],
      coaching: [
        'Keeper: oversikt først, ikke bare spark den lang',
        'Backer: åpen kropp, se begge sider FØR du får ballen',
        'Midtbane: gjør deg spillbar mellom linjene, vis deg!',
        'Presslaget: les presseøyeblikk — støttepasning, dårlig touch, ball til keeper'
      ],
      variations: [
        'Øk antall pressende spillere for mer utfordring',
        'Krav: minst 3 pasninger før ballen kan krysse midtlinjen'
      ],
      diagram: { width:240, height:180, field:'half', elements:[
        {type:'goal',x:5,y:65,w:12,h:50,vertical:true},{type:'keeper',x:20,y:90},
        {type:'player',x:55,y:45,team:'a',label:''},{type:'player',x:55,y:135,team:'a',label:''},
        {type:'player',x:100,y:70,team:'a',label:''},{type:'player',x:100,y:110,team:'a',label:''},
        {type:'ball',x:28,y:88},
        {type:'player',x:130,y:55,team:'b',label:''},{type:'player',x:130,y:125,team:'b',label:''},
        {type:'player',x:160,y:90,team:'b',label:''},
        {type:'arrow',from:[28,88],to:[50,50],style:'pass'},
        {type:'arrow',from:[55,50],to:[95,75],style:'pass'}
      ]}
    },

    // --- Soneforsvar intro ---
    {
      key: 'zone_defense', label: 'Soneforsvar', defaultMin: 15, category: 'spill_m_motstand',
      ages: ['13-16'], players: '10-18',
      equipment: 'Vester, baller, store mål med keeper, kjegler',
      nffCategory: 'spille_med_og_mot', themes: ['forsvarsspill'], nffPhases: ['forsvar_vinne_ball', 'forsvar_hindre_maal'],
      learningGoals: ['Posisjonering i forhold til ball og medspillere, ikke motspillere', 'Sideforskyvning som enhet: korte og smale når ball er sentralt', 'Lese presseøyeblikk og reagere samlet'],
      intensity: 'high', hasOpposition: true,
      playerCount: { min: 10, max: 18 }, equipmentTags: ['vester', 'ball', 'maal', 'kjegler'],
      description: 'Forsvarslaget øver på å bevege seg som enhet: sideforskyvning, pumping (opp/ned) og samlet press. Angrepslaget prøver å trenge gjennom. Trener NFF fase F1/F2.',
      setup: 'Halv bane med stort mål og keeper. Forsvarslag (4-5 spillere) mot angrepsslag (5-6 spillere). Angrepslaget starter med ball fra midten.',
      steps: [
        'Angrepslaget bygger opp og prøver å score.',
        'Forsvarslaget holder formasjon: sideforskyvning mot ball, pumper opp ved press.',
        'Trener fryser spillet 2-3 ganger for å vise posisjoner.',
        'Ved ballvinning: forsvarslaget spiller raskt til en mottaker over midtlinjen (omstilling).',
        'Bytt roller etter 5 min.'
      ],
      coaching: [
        'Se på ballen, ikke motspillerne — posisjoner dere ift ball',
        'Korte avstander! Glipper det mellom to, kommer ballen gjennom',
        'Når ball er på siden: forskyv samlet, steng midten',
        'Presssignaler: dårlig touch, ball til back, feilvendt spiller → PRESS SAMLET!'
      ],
      variations: [
        'Begynn uten mål: forsvarslaget scorer ved ballvinning + 5 pasninger',
        '3 linjer: backer, midtbane, angrep — øv pumping mellom leddene'
      ],
      diagram: { width:240, height:180, field:'half', elements:[
        {type:'goal',x:5,y:65,w:12,h:50,vertical:true},{type:'keeper',x:20,y:90},
        {type:'player',x:60,y:50,team:'b',label:''},{type:'player',x:60,y:90,team:'b',label:''},
        {type:'player',x:60,y:130,team:'b',label:''},{type:'player',x:90,y:70,team:'b',label:''},
        {type:'player',x:90,y:110,team:'b',label:''},
        {type:'player',x:140,y:40,team:'a',label:''},{type:'player',x:140,y:90,team:'a',label:''},
        {type:'player',x:140,y:140,team:'a',label:''},{type:'player',x:180,y:65,team:'a',label:''},
        {type:'player',x:180,y:115,team:'a',label:''},{type:'ball',x:148,y:86},
        {type:'arrow',from:[65,55],to:[65,85],style:'run'},{type:'arrow',from:[65,125],to:[65,95],style:'run'}
      ]}
    },

    // --- Situasjonsøvelse angrep ---
    {
      key: 'sit_attack', label: 'Situasjonsøvelse angrep', defaultMin: 15, category: 'spill_m_motstand',
      ages: ['13-16'], players: '10-18',
      equipment: 'Vester, baller, store mål med keeper, kjegler',
      nffCategory: 'spille_med_og_mot', themes: ['samarbeidsspill', 'avslutning'], nffPhases: ['angrep_fremover', 'angrep_avslutning'],
      learningGoals: ['Ballfører: ro med ball, true med blikk, spille kontrollert fremover', 'Medspillere: bevegelse for å skape og utnytte overtall', 'Avslutning: kort tid mellom nest siste touch og skudd'],
      intensity: 'high', hasOpposition: true,
      playerCount: { min: 10, max: 18 }, equipmentTags: ['vester', 'ball', 'maal', 'kjegler'],
      description: 'Kamplik øvelse med mange repetisjoner inn mot angrepstemaet. Starter med oppspill fra trener/keeper, angrepsspillerne kombinerer seg gjennom forsvar og avslutter. NFF fase A2/A3.',
      setup: 'Halv bane med mål og keeper. Angrepsgruppe (3-5 spillere) mot forsvarsgruppe (2-4 spillere). Trener/keeper igangsetter.',
      steps: [
        'Trener spiller ball til en angrepsspiller sentralt eller på siden.',
        'Angrepslaget kombinerer seg mot mål (overtall eller likt antall).',
        'Forsvarslaget prøver å vinne ball — ved vinning spill raskt over midtlinjen.',
        'Ny ball fra trener umiddelbart etter avslutning/ball ut.',
        'Mange repetisjoner! 10-12 angrep på 5 min, deretter bytt.'
      ],
      coaching: [
        'Angrip hurtig fremover — ikke overspill, ta sjansen!',
        'Beveg dere bak, forbi og foran ballfører',
        'True flere rom samtidig: bakrom, mellomrom',
        'Avslutter: se på keeper, plassering framfor kraft'
      ],
      variations: [
        'Start med 3v2, øk til 4v3 eller 5v4',
        'Krav: scoring innen 8 sekunder etter igangsetting'
      ],
      diagram: { width:240, height:180, field:'half', elements:[
        {type:'goal',x:5,y:65,w:12,h:50,vertical:true},{type:'keeper',x:20,y:90},
        {type:'player',x:80,y:60,team:'b',label:'F'},{type:'player',x:80,y:120,team:'b',label:'F'},
        {type:'player',x:150,y:50,team:'a',label:''},{type:'player',x:150,y:90,team:'a',label:''},
        {type:'player',x:150,y:130,team:'a',label:''},{type:'ball',x:158,y:86},
        {type:'arrow',from:[155,85],to:[90,65],style:'pass'},
        {type:'arrow',from:[155,50],to:[60,50],style:'run'}
      ]}
    },

    // --- Situasjonsøvelse forsvar ---
    {
      key: 'sit_defend', label: 'Situasjonsøvelse forsvar', defaultMin: 15, category: 'spill_m_motstand',
      ages: ['13-16'], players: '10-18',
      equipment: 'Vester, baller, store mål med keeper, kjegler',
      nffCategory: 'spille_med_og_mot', themes: ['forsvarsspill'], nffPhases: ['forsvar_vinne_ball', 'forsvar_hindre_maal'],
      learningGoals: ['Førsteforsvarer: tett i press, styr ballfører vekk fra mål', 'Resten: sikring bak press, steng rom sentralt', 'Ved ballvinning: hurtig omstilling til angrep'],
      intensity: 'high', hasOpposition: true,
      playerCount: { min: 10, max: 18 }, equipmentTags: ['vester', 'ball', 'maal', 'kjegler'],
      description: 'Kamplik øvelse med fokus på forsvarsspill. Forsvarslaget øver på å stoppe organiserte angrep gjennom press, sikring og blokkering. NFF fase F1/F2/F3.',
      setup: 'Halv bane med mål og keeper. Forsvargruppe (3-4 spillere) mot angrepsgruppe (4-5 spillere i overtall). Angrepslaget har fritt spill.',
      steps: [
        'Angrepslaget starter med ball og angriper fritt mot mål.',
        'Forsvarslaget organiserer seg: første forsvarer presser, andre sikrer.',
        'Keeper kommuniserer: «Steng side!», «Hold linja!»',
        'Ved ballvinning: forsvarslaget kontrerer raskt mot småmål på midtlinjen.',
        'Ny ball umiddelbart etter avslutning. 10-12 repetisjoner per periode.'
      ],
      coaching: [
        'Første forsvarer: riktig fart inn i press, korte steg, stå på beina',
        'Sikring: tett bak, steng rom mellom forsvarer og mål',
        'Kommuniser! «Jeg tar ball, du sikrer», «Hold feilvendt!»',
        'Blokkér skudd med fremsiden av kroppen'
      ],
      variations: [
        'Start i undertall (2v3) for å øve desperatforsvar',
        'Fokus F3: angrep starter med innlegg fra siden'
      ],
      diagram: { width:240, height:180, field:'half', elements:[
        {type:'goal',x:5,y:65,w:12,h:50,vertical:true},{type:'keeper',x:20,y:90},
        {type:'player',x:70,y:55,team:'b',label:'F'},{type:'player',x:70,y:90,team:'b',label:'F'},
        {type:'player',x:70,y:125,team:'b',label:'F'},
        {type:'player',x:140,y:40,team:'a',label:''},{type:'player',x:160,y:80,team:'a',label:''},
        {type:'player',x:140,y:120,team:'a',label:''},{type:'player',x:190,y:80,team:'a',label:''},
        {type:'ball',x:168,y:76},
        {type:'arrow',from:[75,60],to:[150,50],style:'run'},
        {type:'arrow',from:[73,93],to:[73,78],style:'run'},{type:'arrow',from:[73,122],to:[73,100],style:'run'}
      ]}
    },

    // --- Innlegg og avslutning ---
    {
      key: 'cross_finish', label: 'Innlegg og avslutning', defaultMin: 12, category: 'avslutning',
      ages: ['13-16'], players: '8-16',
      equipment: 'Store mål med keeper, baller, kjegler',
      nffCategory: 'scoringstrening', themes: ['avslutning', 'samarbeidsspill'], nffPhases: ['angrep_avslutning'],
      learningGoals: ['Innlegger: løft blikket, slå ballen i rom som angripes', 'Avslutter: true 1. stolpe, bakre stolpe eller 45 med timing', 'Bevegelser for å komme først på ballen: sprint, stå i ro, fra-imot'],
      intensity: 'high', hasOpposition: false,
      playerCount: { min: 8, max: 16 }, equipmentTags: ['maal', 'ball', 'kjegler'],
      description: 'Innleggsøvelse med avslutning fra ulike posisjoner i boksen. Kantspiller slår innlegg, medspillere angriper rom foran mål. Trener NFF fase A3 med fokus på siste pasning og avslutning.',
      setup: 'Halvbane med stort mål og keeper. Innleggere på begge kanter (ved sidelinja, 25m fra mål). Avsluttere i kø sentralt, 20m fra mål.',
      steps: [
        'Innlegger mottar ball fra trener og fører mot dødlinja.',
        'Avslutter starter løp inn i boksen: veksle mellom 1. stolpe, bakre stolpe og «45».',
        'Innlegger slår ball i rom som avslutteren angriper.',
        'Avslutter scorer med ett eller to touch.',
        'Veksle mellom høyre og venstre side. Roter roller.'
      ],
      coaching: [
        'Innlegger: se opp FØR du slår — finn medspillerens løp',
        'Avslutter: timing! Start løpet når innlegger ser opp',
        'True 1. stolpe tidlig, juster til bakre stolpe sent',
        'Plassering: styr ballen tilbake dit den kom fra (vanskeligst for keeper)'
      ],
      variations: [
        'Legg til forsvarer i boksen som markerer avslutteren',
        'Pasningsinnlegg lavt langs bakken (cutback) i stedet for høyt innlegg'
      ],
      diagram: { width:240, height:180, field:'none', elements:[
        {type:'goal',x:80,y:5,w:80,h:18},{type:'keeper',x:120,y:20},
        {type:'player',x:210,y:120,team:'a',label:'K'},{type:'ball',x:218,y:116},
        {type:'player',x:120,y:110,team:'a',label:'A'},
        {type:'player',x:90,y:110,team:'a',label:''},
        {type:'arrow',from:[210,115],to:[200,40],style:'run'},
        {type:'arrow',from:[200,40],to:[130,50],style:'pass'},
        {type:'arrow',from:[120,105],to:[130,45],style:'run'},
        {type:'arrow',from:[90,105],to:[100,50],style:'run'}
      ]}
    },

    // ── EGENDEFINERT (alltid nederst) ──
    { key: 'custom', label: 'Skriv inn selv', defaultMin: 10, isCustom: true, category: 'special',
      nffCategory: 'sjef_over_ballen', themes: [], nffPhases: [], learningGoals: [],
      intensity: 'medium', hasOpposition: false }
];
