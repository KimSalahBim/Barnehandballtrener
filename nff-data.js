// nff-data.js — NFF-konstanter og maler (ren data, ingen logikk)
// Brukes av workout.js, sesong-workout.js via window.NFF_DATA

window.NFF_DATA = {

  EXERCISE_CATEGORIES: [
    { id: 'oppvarming', label: '🏃 Oppvarming' },
    { id: 'teknikk', label: '⚽ Teknikk' },
    { id: 'avslutning', label: '🎯 Avslutning' },
    { id: 'spill_m_motstand', label: '⚔️ Spill med motstand' },
    { id: 'smalagsspill', label: '🏟️ Smålagsspill' },
    { id: 'keeper', label: '🧤 Keeper' },
  ],

  NFF_CATEGORIES: [
    { id: 'sjef_over_ballen',   label: '⚽ Sjef over ballen',   short: 'Sjef',    color: '#2e8b57',
      label1316: '⚽ Prepp\u2019n', short1316: 'Prepp' },
    { id: 'spille_med_og_mot',  label: '⚔️ Spille med og mot',  short: 'Øvelse',  color: '#e67e22',
      label1316: '⚔️ Situasjonsøving', short1316: 'Situasjon' },
    { id: 'smalagsspill',       label: '🏟️ Smålagsspill',       short: 'Spill',   color: '#3498db',
      label1316: '🏟️ Spill', short1316: 'Spill' },
    { id: 'scoringstrening',    label: '🎯 Scoringstrening',    short: 'Scoring', color: '#e74c3c',
      label1316: '🎯 Avslutning', short1316: 'Avslutning' },
  ],

  NFF_THEMES: [
    { id: 'foering_dribling',   label: 'Føring og dribling',    phase: 'angrep',  icon: '🏃' },
    { id: 'vendinger_mottak',   label: 'Vendinger og mottak',   phase: 'angrep',  icon: '🔄' },
    { id: 'pasning_samspill',   label: 'Pasning og samspill',   phase: 'angrep',  icon: '🤝' },
    { id: 'avslutning',         label: 'Avslutning',            phase: 'angrep',  icon: '🎯' },
    { id: '1v1_duell',          label: '1 mot 1',               phase: 'begge',   icon: '⚡' },
    { id: 'samarbeidsspill',    label: 'Samarbeidsspill',        phase: 'angrep',  icon: '👥' },
    { id: 'forsvarsspill',      label: 'Forsvarsspill',          phase: 'forsvar', icon: '🛡️' },
    { id: 'omstilling',         label: 'Omstilling',             phase: 'begge',   icon: '🔁' },
    { id: 'spilloppbygging',    label: 'Spilloppbygging',        phase: 'angrep',  icon: '📐' },
    { id: 'keeper',             label: 'Keeper',                 phase: 'forsvar', icon: '🧤' },
  ],

  NFF_THEMES_BY_AGE: {
    '6-7':  ['foering_dribling', 'avslutning', '1v1_duell'],
    '8-9':  ['foering_dribling', 'vendinger_mottak', 'pasning_samspill', 'avslutning', '1v1_duell', 'samarbeidsspill', 'forsvarsspill'],
    '10-12': ['foering_dribling', 'vendinger_mottak', 'pasning_samspill', 'avslutning', '1v1_duell', 'samarbeidsspill', 'forsvarsspill', 'omstilling', 'spilloppbygging', 'keeper'],
    '13-16': ['foering_dribling', 'vendinger_mottak', 'pasning_samspill', 'avslutning', '1v1_duell', 'samarbeidsspill', 'forsvarsspill', 'omstilling', 'spilloppbygging', 'keeper'],
  },

  NFF_TIME_DISTRIBUTION: {
    '6-7':  { sjef_over_ballen: 35, spille_med_og_mot: 5,  smalagsspill: 50, scoringstrening: 10 },
    '8-9':  { sjef_over_ballen: 20, spille_med_og_mot: 20, smalagsspill: 45, scoringstrening: 15 },
    '10-12': { sjef_over_ballen: 15, spille_med_og_mot: 25, smalagsspill: 45, scoringstrening: 15 },
    '13-16': { sjef_over_ballen: 15, spille_med_og_mot: 35, smalagsspill: 40, scoringstrening: 10 },
  },

  NFF_LEARNING_GOALS: {
    'foering_dribling': {
      '6-7':  ['Hold ballen nær foten med korte touch', 'Bruk ulike deler av foten (innside, utside, såle)', 'Løft blikket mens du fører ballen'],
      '8-9':  ['Fart i føringen: tett ball i press, lengre touch i åpent rom', 'Bruk kroppen til å skjerme ballen', 'Se fremover og ta valg: føre, drible eller spille'],
      '10-12': ['Føring i fart med retningsforandring under press', 'Velg riktig teknikk for situasjonen', 'Retningsbestemt føring mot ledig rom'],
      '13-16': ['Korte hurtige touch med begge føtter for å utnytte rom', 'Beholde oversikt med ball i beina, kunne ombestemme valg', 'Fartsvariasjon og retningsforandring for å skape overtall'],
    },
    'vendinger_mottak': {
      '8-9':  ['Sjekk over skulderen FØR ballen kommer', 'Åpne kroppen mot dit du vil vende', 'Førstetouch i retning du skal spille'],
      '10-12': ['Mottak under press med skjermingskontakt', 'Varier vendeteknikk etter situasjonen', 'Retningsbestemt mottak med begge føtter'],
      '13-16': ['Ro med ball, åpne i førstetouch, true med blikk og fot', 'Mottak med fart: første touch setter opp neste handling', 'Vende i press for å utnytte rom bak motstander'],
    },
    'pasning_samspill': {
      '6-7':  ['Spark ballen med innsiden av foten', 'Pek støttefoten mot den du sender til'],
      '8-9':  ['Orientert førsteberøring: se mot mål før mottak', 'Beveg deg etter pasning (slå og gå)', 'Gjør deg spillbar: finn rom, ut av pasningsskygge'],
      '10-12': ['Spill med færrest mulig berøringer under press', 'Veggspill og kombinasjoner', 'Les medspillerens bevegelse, spill i rom'],
      '13-16': ['Spille kontrollert fremover, søke igjennom framfor rundt', 'Skape nye rom med pasninger i riktig fart til riktig fot', 'Prinsipper: opp-tilbake-igjennom, fra trangt til ledig'],
    },
    'avslutning': {
      '6-7':  ['Plassering foran kraft: sikte mot mål', 'Tørr å skyte!'],
      '8-9':  ['Plassering i hjørnene, lav avslutning', 'Avslutt raskt, ikke nøl', 'Følg opp skuddet, vær klar for retur'],
      '10-12': ['Avslutning under press (tidskrav, forsvarer)', 'Les keeper: velg hjørne', 'Avslutning fra ulike vinkler og avstander'],
      '13-16': ['Kort tid mellom nest siste touch og avslutning', 'True 1. stolpe, bakre stolpe og 45 med bevegelse', 'Se på keeper, så på ball — plassering framfor kraft'],
    },
    '1v1_duell': {
      '6-7':  ['Tørr å utfordre motspilleren', 'Bruk kroppen for å beskytte ballen'],
      '8-9':  ['Angriper: brems opp, bruk finter', 'Forsvarer: stå sidelengs, vær tålmodig', 'Lav tyngdepunkt for rask retningsendring'],
      '10-12': ['Les forsvarerens kropp: angrip den svake siden', 'Fartsvariasjon: brems-akseler', 'Forsvarer: tving til svak fot, steng rom mot mål'],
      '13-16': ['Utnytte dårlige, lange og for mange touch hos motstander', 'Aktiv armbruk ved duellspill og kroppskontakt', 'Ta rommet mellom ballfører og ball før du tar ball'],
    },
    'samarbeidsspill': {
      '8-9':  ['Angriper med ball: trekk forsvarer FØR pasning', 'Angriper uten ball: hold avstand og vinkel', 'Timing: spill pasning i riktig øyeblikk'],
      '10-12': ['Trekantspill: spill og beveg deg til ny posisjon', 'Veggspill: gi-og-gå forbi forsvarer', 'Les medspiller, tilpass fart og vinkel'],
      '13-16': ['Bevegelse for å skape og utnytte overtall sammen med ballfører', 'Flere bevegelser etter hverandre for å åpne rom', 'Spillbarhet med riktig avstand og vinkel i alle situasjoner'],
    },
    'forsvarsspill': {
      '8-9':  ['Tett opp i ballfører, press!', 'Stå mellom ballfører og eget mål', 'Alle tilbake raskt ved balltap'],
      '10-12': ['Steng pasningslinjer, tving til side', 'Beveg dere som enhet (soneprinsipp)', 'Omstilling: første forsvarer presser, andre sikrer'],
      '13-16': ['Komme tett i press med riktig fart, korte ned stegene', 'Lese presseøyeblikk: støttepasning, dårlig touch, feilvendt spiller', 'Soneforsvar: posisjonering ift ball og medspillere, sideforskyvning og pumping'],
    },
    'omstilling': {
      '10-12': ['Raskt tilbake ved balltap', 'Første forsvarer presser, resten organiserer', 'Ved ballvinning: se fremover umiddelbart'],
      '13-16': ['Ved balltap: fortest mulig flest mulig på rett side av ball', 'Ved ballvinning: identifiser balanseforhold — kontring eller kontroll?', 'Hurtig samlet reaksjon på definerte press-signaler'],
    },
    'spilloppbygging': {
      '10-12': ['Keeper/back starter rolig, bygg opp bakfra', 'Finn den frie spilleren mellom linjene', 'Tålmodighet: ikke slå lange baller i panikk'],
      '13-16': ['Ro med ball, åpne i førstetouch, true med blikk og fot', 'Unngå å gi bort presseøyeblikk — kontrollert oppspill', 'Fra små rom til store rom, opp og ned, inn og ut'],
    },
    'keeper': {
      '8-9':  ['Grunnstilling: føtter i skulderbredde, lett på tå', 'W-grep, fingre spredt', 'Fall til siden, ikke bakover'],
      '10-12': ['Les angriperens kropp: forutse skuddretning', 'Utkast/utspark for rask omstilling', 'Kommuniser med forsvarslinja'],
      '13-16': ['Posisjonering i forhold til forsvar og motstander', 'Pasningsalternativ for vending av spill', 'Kommunikasjon: styre leddet foran, tetthet og pumping'],
    },
  },

  NFF_TEMPLATES: {
    '6-7': [
      { title: 'Leik og føring (45 min)', theme: 'foering_dribling', duration: 45, blocks: [
        { key: 'tag', min: 8 },
        { key: 'ball_tag', min: 8 },
        { key: 'driving', min: 8 },
        { key: 'drink', min: 2 },
        { key: 'ssg', min: 15 },
        { key: 'shot', min: 4 }
      ]},
      { title: 'Score mål! (45 min)', theme: 'avslutning', duration: 45, blocks: [
        { key: 'tag', min: 6 },
        { key: 'warm_ball', min: 8 },
        { key: 'shot', min: 8 },
        { key: 'drink', min: 2 },
        { key: 'game_activity', min: 18 },
        { key: 'shot_race', min: 3 }
      ]},
      { title: 'Føring og spill (60 min)', theme: 'foering_dribling', duration: 60, blocks: [
        { key: 'ball_tag', min: 8 },
        { key: 'driving', min: 10 },
        { key: 'relay_ball', min: 8 },
        { key: 'drink', min: 2 },
        { key: 'dribble', min: 10 },
        { key: 'ssg', min: 18 },
        { key: 'shot_race', min: 4 }
      ]}
    ],
    '8-9': [
      { title: 'Pasning og samspill (60 min)', theme: 'pasning_samspill', duration: 60, blocks: [
        { key: 'tag', min: 6 },
        { key: 'pass_pair', min: 10 },
        { key: 'pass_move', min: 10 },
        { key: 'drink', min: 2 },
        { key: 'wall_pass', min: 10 },
        { key: 'ssg_theme', min: 18 },
        { key: 'shot', min: 4 }
      ]},
      { title: 'Forsvarsspill (60 min)', theme: 'forsvarsspill', duration: 60, blocks: [
        { key: 'tag', min: 6 },
        { key: 'warm_ball', min: 8 },
        { key: 'defend_press', min: 10 },
        { key: 'drink', min: 2 },
        { key: '1v1', min: 10 },
        { key: 'ssg', min: 20 },
        { key: 'shot_race', min: 4 }
      ]},
      { title: 'Avslutning og mål (75 min)', theme: 'avslutning', duration: 75, blocks: [
        { key: 'tag', min: 8 },
        { key: 'warm_ball', min: 10 },
        { key: 'shot', min: 10 },
        { key: 'drink', min: 2 },
        { key: 'finish_assist', min: 10 },
        { key: '2v1', min: 10 },
        { key: 'ssg', min: 22 },
        { key: 'shot_race', min: 3 }
      ]},
      { title: 'Dribling og 1v1 (60 min)', theme: '1v1_duell', duration: 60, blocks: [
        { key: 'ball_tag', min: 8 },
        { key: 'driving', min: 8 },
        { key: '1v1', min: 10 },
        { key: 'drink', min: 2 },
        { key: '1v1_gates', min: 10 },
        { key: 'ssg', min: 18 },
        { key: 'shot', min: 4 }
      ]}
    ],
    '10-12': [
      { title: 'Spilloppbygging (75 min)', theme: 'spilloppbygging', duration: 75, blocks: [
        { key: 'tag', min: 8 },
        { key: 'rondo_easy', min: 10 },
        { key: 'pass_square', min: 10 },
        { key: 'drink', min: 2 },
        { key: 'possession_dir', min: 15 },
        { key: 'ssg_theme', min: 25 },
        { key: 'shot', min: 5 }
      ]},
      { title: 'Omstilling (75 min)', theme: 'omstilling', duration: 75, blocks: [
        { key: 'tag', min: 8 },
        { key: 'warm_ball', min: 8 },
        { key: 'defend_press', min: 10 },
        { key: 'drink', min: 2 },
        { key: 'transition', min: 15 },
        { key: 'ssg_theme', min: 25 },
        { key: 'shot', min: 7 }
      ]},
      { title: 'Samarbeid og avslutning (90 min)', theme: 'samarbeidsspill', duration: 90, blocks: [
        { key: 'tag', min: 8 },
        { key: 'pass_move', min: 10 },
        { key: 'wall_pass', min: 10 },
        { key: 'drink', min: 2 },
        { key: '3v2', min: 12 },
        { key: 'finish_assist', min: 10 },
        { key: 'ssg_theme', min: 28 },
        { key: 'shot', min: 5 },
        { key: 'drink', min: 2 },
        { key: 'game_activity', min: 3 }
      ]},
      { title: 'Forsvar og pressing (75 min)', theme: 'forsvarsspill', duration: 75, blocks: [
        { key: 'tag', min: 8 },
        { key: 'warm_ball', min: 8 },
        { key: 'defend_press', min: 10 },
        { key: 'drink', min: 2 },
        { key: '2v2', min: 12 },
        { key: 'block_shot', min: 10 },
        { key: 'ssg', min: 22 },
        { key: 'shot', min: 3 }
      ]}
    ],
    '13-16': [
      { title: 'Prepp + Forsvarsspill (90 min)', theme: 'forsvarsspill', duration: 90, blocks: [
        { key: 'prepp', min: 12 },
        { key: 'defend_press', min: 12 },
        { key: 'drink', min: 2 },
        { key: 'sit_defend', min: 15 },
        { key: 'zone_defense', min: 15 },
        { key: 'ssg_theme', min: 28 },
        { key: 'cross_finish', min: 6 }
      ]},
      { title: 'Prepp + Spilloppbygging (90 min)', theme: 'spilloppbygging', duration: 90, blocks: [
        { key: 'prepp', min: 12 },
        { key: 'rondo_easy', min: 10 },
        { key: 'drink', min: 2 },
        { key: 'build_up', min: 15 },
        { key: 'sit_attack', min: 15 },
        { key: 'ssg_theme', min: 30 },
        { key: 'shot', min: 6 }
      ]},
      { title: 'Prepp + Omstilling (75 min)', theme: 'omstilling', duration: 75, blocks: [
        { key: 'prepp', min: 12 },
        { key: 'wall_pass', min: 10 },
        { key: 'drink', min: 2 },
        { key: 'transition', min: 15 },
        { key: 'ssg_theme', min: 28 },
        { key: 'finish_assist', min: 8 }
      ]},
      { title: 'Prepp + Angrep og avslutning (90 min)', theme: 'avslutning', duration: 90, blocks: [
        { key: 'prepp', min: 12 },
        { key: 'pass_square', min: 10 },
        { key: 'drink', min: 2 },
        { key: 'sit_attack', min: 15 },
        { key: 'finish_assist', min: 10 },
        { key: 'ssg_theme', min: 30 },
        { key: 'cross_finish', min: 8 },
        { key: 'drink', min: 2 },
        { key: 'game_activity', min: 1 }
      ]}
    ]
  }

};
