// nff-data.js — NHF-konstanter og maler for barnehåndball
// Brukes av workout.js, sesong-workout.js via window.NFF_DATA

window.NFF_DATA = {

  EXERCISE_CATEGORIES: [
    { id: 'oppvarming',       label: '🏃 Leker og oppvarming' },
    { id: 'teknikk',          label: '🤾 Ballbehandling og teknikk' },
    { id: 'avslutning',       label: '🎯 Kast og skudd' },
    { id: 'spill_m_motstand', label: '⚔️ Spill og motspill' },
    { id: 'smalagsspill',     label: '🏟️ Smålagsspill' },
    { id: 'keeper',           label: '🧤 Målvakt' },
  ],

  NFF_CATEGORIES: [
    { id: 'sjef_over_ballen',  label: '🤾 Ballmestring',        short: 'Ball',    color: '#2e8b57',
      label1316: '🤾 Ballmestring', short1316: 'Ball' },
    { id: 'spille_med_og_mot', label: '⚔️ Spill med og mot',    short: 'Øvelse',  color: '#e67e22',
      label1316: '⚔️ Situasjonsøving', short1316: 'Situasjon' },
    { id: 'smalagsspill',      label: '🏟️ Smålagsspill',        short: 'Spill',   color: '#3498db',
      label1316: '🏟️ Spill', short1316: 'Spill' },
    { id: 'scoringstrening',   label: '🎯 Kast og skudd',       short: 'Kast',    color: '#e74c3c',
      label1316: '🎯 Avslutning', short1316: 'Avslutning' },
  ],

  NFF_THEMES: [
    { id: 'kast_teknikk',       label: 'Kastteknikk',            phase: 'angrep',  icon: '🎯' },
    { id: 'mottak_pasning',     label: 'Mottak og pasning',      phase: 'angrep',  icon: '🤝' },
    { id: 'dribling_bevegelse', label: 'Dribling og bevegelse',  phase: 'angrep',  icon: '🏃' },
    { id: 'finter',             label: 'Finter og avløp',        phase: 'angrep',  icon: '💨' },
    { id: '1v1_duell',          label: '1 mot 1',                phase: 'begge',   icon: '⚡' },
    { id: 'samarbeidsspill',    label: 'Samarbeid og kombinasjon',phase: 'angrep', icon: '👥' },
    { id: 'forsvarsspill',      label: 'Forsvarsspill',          phase: 'forsvar', icon: '🛡️' },
    { id: 'kontring_retur',     label: 'Kontring og retur',      phase: 'begge',   icon: '🔁' },
    { id: 'linjespill',         label: 'Linjespill og innspill', phase: 'angrep',  icon: '📐' },
    { id: 'keeper',             label: 'Målvakt',                phase: 'forsvar', icon: '🧤' },
    { id: 'leik_stafett',       label: 'Lek og stafett',         phase: 'noytral', icon: '🎮' },
  ],

  NFF_THEMES_BY_AGE: {
    '6-7':  ['kast_teknikk', 'mottak_pasning', 'dribling_bevegelse', 'leik_stafett', 'keeper'],
    '8-9':  ['kast_teknikk', 'mottak_pasning', 'dribling_bevegelse', 'finter', '1v1_duell', 'samarbeidsspill', 'leik_stafett', 'keeper'],
    '10-12': ['kast_teknikk', 'mottak_pasning', 'finter', '1v1_duell', 'samarbeidsspill', 'forsvarsspill', 'kontring_retur', 'linjespill', 'keeper'],
    '13-16': ['kast_teknikk', 'mottak_pasning', 'finter', '1v1_duell', 'samarbeidsspill', 'forsvarsspill', 'kontring_retur', 'linjespill', 'keeper'],
  },

  NFF_TIME_DISTRIBUTION: {
    '6-7':   { sjef_over_ballen: 40, spille_med_og_mot: 5,  smalagsspill: 45, scoringstrening: 10 },
    '8-9':   { sjef_over_ballen: 25, spille_med_og_mot: 15, smalagsspill: 45, scoringstrening: 15 },
    '10-12': { sjef_over_ballen: 15, spille_med_og_mot: 25, smalagsspill: 45, scoringstrening: 15 },
    '13-16': { sjef_over_ballen: 10, spille_med_og_mot: 35, smalagsspill: 40, scoringstrening: 15 },
  },

  NFF_LEARNING_GOALS: {
    'kast_teknikk': {
      '6-7':  ['Kast med høy arm over skulderen', 'Tørr å kaste — ikke kast ned i gulvet', 'Fullføre kastet helt ut med fingertuppene'],
      '8-9':  ['Høy arm, balanse og piskekast', 'Riktig stemfot: motsatt ben av kastarm', 'Kast i fart med kontroll'],
      '10-12': ['Hoppskudd fra ulike vinkler', 'Kom i stor fart — sats med riktig ben', 'Les målvakten og velg hjørne'],
      '13-16': ['Hurtig kastklar posisjon, kort oppladning', 'Variasjon: hoppskudd, sideskudd, underarmsskudd', 'Kast under press fra distanse'],
    },
    'mottak_pasning': {
      '6-7':  ['Ta imot ballen med begge hender foran kroppen', 'Kast til lagkamerat — se mot mottaker FØR du kaster'],
      '8-9':  ['Støtpasning og piskekast — varier', 'Prøv pasninger med venstre og høyre arm', 'Se mot mottaker, sikte og kast'],
      '10-12': ['Sjekk over skulderen FØR ballen kommer', 'Åpne kroppen mot dit du skal spille', 'Pasning i bevegelse uten å stoppe'],
      '13-16': ['Hurtige pasninger under press', 'Rask distribusjon — se opp og velg', 'Mottak med kroppen som skjerm'],
    },
    'dribling_bevegelse': {
      '6-7':  ['Drible med kontroll — ballen skal komme tilbake til hånden', 'Bytt retning mens du dribler'],
      '8-9':  ['Drible i fart og se opp', 'Bruk kroppen til å beskytte ballen', 'Kombiner dribling med pasning'],
      '10-12': ['Dribling i press for å skape rom', 'Temposkifte: sakte–rask', 'Bevegelse uten ball: finn rom og gjør deg spillbar'],
      '13-16': ['Rask dribling for å utnytte overganger', 'Fartsvariasjon for å bryte gjennom forsvar', 'Beholde oversikt i høyt tempo'],
    },
    'finter': {
      '8-9':  ['Tobeinsfinte: gå en vei, skift raskt andre veien', 'Fart ut av finten — temposkiftet er det viktigste', 'Øv finter begge veier'],
      '10-12': ['Riktig avstand til forsvar/kjegle før finte', 'Gå på rom etter vellykket finte', 'Kombiner finte med pasning videre'],
      '13-16': ['Finte for å skape rom for seg selv eller lagkamerat', 'Les forsvarerens kropp og angrip den svake siden', 'Avløp: trekk på deg forsvarer, spill videre'],
    },
    '1v1_duell': {
      '6-7':  ['Tørr å utfordre motspilleren', 'Bruk kroppen til å beskytte ballen'],
      '8-9':  ['Angriper: bruk finte og retningsforandring', 'Forsvarer: vær tålmodig, steng innover', 'Lav tyngdepunkt for rask retningsendring'],
      '10-12': ['Angriper: angrip den svake siden — akseler forbi', 'Forsvarer: steng vei mot 6m-sonen', 'Avgjøre raskt: kast, drible eller spille videre'],
      '13-16': ['Skape rom med løp, finte og retningsforandring', 'Forsvarer: press uten å bryte balansen', 'Rask avgjørelse i stor fart'],
    },
    'samarbeidsspill': {
      '6-7':  ['Spill til fri lagkamerat', 'Løp etter pasning — stå ikke stille'],
      '8-9':  ['2 mot 1: hvem er fri? Spill til den frie', 'Veggspill: spill inn, løp forbi, motta retur', 'Gjør deg spillbar: beveg deg og finn rom'],
      '10-12': ['3 mot 2: utnytt overtallet', 'Kombiner pasning og avløp', 'Linjespillerbevegelse bak forsvaret'],
      '13-16': ['Kombinasjonsspill mot organisert forsvar', 'Skape rom med bevegelse og finter', 'Utnytte overganger raskt og direkte'],
    },
    'forsvarsspill': {
      '8-9':  ['Stå mellom ball og mål — forsvarsposisjonen', 'Jakt/snapp ballen på egen banehalvdel', 'Ballorientert forsvar: følg ballen'],
      '10-12': ['Forsvarslinje: hold linjen, beveg deg som enhet', 'Press mot ballfører, de andre lukker rom', 'Kommunisér: "ball!", "hjelp!", "din!"'],
      '13-16': ['Utgruppert forsvarssystem', 'Taktisk press og sonebytte', 'Overgangen forsvar-angrep: reagér umiddelbart'],
    },
    'kontring_retur': {
      '8-9':  ['Reagér raskt når laget vinner ball', 'Løp fort fremover i kontra — ikke vent'],
      '10-12': ['Kontring to og to: hvem er fri? Spill raskt', '2:1 i kontring: utnytt overtallet', 'Bytte fra forsvar til angrep på sekunder'],
      '13-16': ['Rask kontring etter ballvinning', 'Forsvare mot kontring: løp tilbake umiddelbart', 'Lese spillet og velge tempo'],
    },
    'linjespill': {
      '10-12': ['Linjespiller bak forsvaret: finn og hold posisjon', 'Back-spiller: se linjespilleren og gi innspillet', 'Linjespiller: stå i ro, vend etter mottak og kast'],
      '13-16': ['Linjespillerens timing og bevegelse', 'Backs skaper rom for linjespiller', 'Kombinasjonsspill via linjespiller'],
    },
    'keeper': {
      '6-7':  ['Alle prøver å stå i mål', 'Stå klar med hendene fremme'],
      '8-9':  ['Grunnstilling: let foroverlent, hender fremme, lett på tærne', 'Beveg deg mot ballen — ikke vent', 'Kast ut ballen raskt etter redning'],
      '10-12': ['Posisjonering etter vinkler og skuddposisjon', 'Les kast og reager', 'Rask og presis utdeling etter redning'],
      '13-16': ['Vinkeljustering mot skytter', 'Organisere forsvarssystemet fra mål', 'Stupes og redninger'],
    },
    'leik_stafett': {
      '6-7':  ['Delta aktivt og ha det gøy', 'Samarbeide og vente på tur'],
      '8-9':  ['Samarbeide med lagkameratene', 'Prøve nye bevegelser og teknikker'],
      '10-12': ['Konkurrere med lek og humor', 'Bruke teknikk i lekpreget setting'],
    },
  },

  NFF_TEMPLATES: {
    '6-7': [
      { title: 'Lek og kast (45 min)', theme: 'kast_teknikk', duration: 45, blocks: [
        { key: 'ball_luften', min: 8 },
        { key: 'kastlek_halvdeler', min: 8 },
        { key: 'drink', min: 2 },
        { key: 'ssg', min: 18 },
        { key: 'shot', min: 9 }
      ]},
      { title: 'Ball og bevegelse (45 min)', theme: 'dribling_bevegelse', duration: 45, blocks: [
        { key: 'tag', min: 8 },
        { key: 'warm_ball', min: 8 },
        { key: 'driving', min: 8 },
        { key: 'drink', min: 2 },
        { key: 'ssg', min: 15 },
        { key: 'kanonball', min: 4 }
      ]},
      { title: 'Kast og mål (60 min)', theme: 'kast_teknikk', duration: 60, blocks: [
        { key: 'kongen_haugen', min: 10 },
        { key: 'kast_vegg', min: 10 },
        { key: 'ball_sisten', min: 8 },
        { key: 'drink', min: 2 },
        { key: 'shot', min: 10 },
        { key: 'ssg', min: 16 },
        { key: 'shot_race', min: 4 }
      ]}
    ],
    '8-9': [
      { title: 'Pasning og samspill (60 min)', theme: 'mottak_pasning', duration: 60, blocks: [
        { key: 'ball_sisten', min: 8 },
        { key: 'pass_pair', min: 10 },
        { key: 'pass_move', min: 10 },
        { key: 'drink', min: 2 },
        { key: 'possession', min: 12 },
        { key: 'ssg_theme', min: 14 },
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
      { title: 'Kast og avslutning (75 min)', theme: 'kast_teknikk', duration: 75, blocks: [
        { key: 'kongen_haugen', min: 8 },
        { key: 'pass_pair', min: 10 },
        { key: 'shot', min: 10 },
        { key: 'drink', min: 2 },
        { key: 'finish_assist', min: 10 },
        { key: '2v1', min: 10 },
        { key: 'ssg', min: 21 },
        { key: 'shot_race', min: 4 }
      ]},
      { title: 'Finter og 1v1 (60 min)', theme: '1v1_duell', duration: 60, blocks: [
        { key: 'ball_sisten', min: 8 },
        { key: 'driving', min: 8 },
        { key: 'turn', min: 10 },
        { key: 'drink', min: 2 },
        { key: '1v1', min: 10 },
        { key: 'ssg', min: 18 },
        { key: 'shot', min: 4 }
      ]}
    ],
    '10-12': [
      { title: 'Linjespill og samarbeid (75 min)', theme: 'linjespill', duration: 75, blocks: [
        { key: 'tag', min: 8 },
        { key: 'rondo_easy', min: 10 },
        { key: 'receive_turn', min: 10 },
        { key: 'drink', min: 2 },
        { key: '3v2', min: 12 },
        { key: 'ssg_theme', min: 25 },
        { key: 'shot', min: 8 }
      ]},
      { title: 'Omstilling og kontring (75 min)', theme: 'kontring_retur', duration: 75, blocks: [
        { key: 'tag', min: 8 },
        { key: 'warm_ball', min: 8 },
        { key: 'kontring', min: 10 },
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
        { key: '2v1', min: 12 },
        { key: 'kontring', min: 10 },
        { key: 'ssg', min: 22 },
        { key: 'shot', min: 5 }
      ]}
    ],
    '13-16': [
      { title: 'Forsvarsspill og pressing (90 min)', theme: 'forsvarsspill', duration: 90, blocks: [
        { key: 'rondo_easy', min: 10 },
        { key: 'defend_press', min: 12 },
        { key: 'drink', min: 2 },
        { key: 'wall_pass', min: 12 },
        { key: 'transition', min: 15 },
        { key: 'ssg_theme', min: 28 },
        { key: 'shot', min: 8 },
        { key: 'drink', min: 3 }
      ]},
      { title: 'Linjespill og kombinasjon (90 min)', theme: 'linjespill', duration: 90, blocks: [
        { key: 'rondo_easy', min: 10 },
        { key: 'receive_turn', min: 10 },
        { key: 'drink', min: 2 },
        { key: '3v2', min: 12 },
        { key: 'wall_pass', min: 12 },
        { key: 'ssg_theme', min: 30 },
        { key: 'shot', min: 8 },
        { key: 'drink', min: 2 },
        { key: 'game_activity', min: 4 }
      ]},
      { title: 'Omstilling og kontring (75 min)', theme: 'kontring_retur', duration: 75, blocks: [
        { key: 'rondo_easy', min: 10 },
        { key: 'wall_pass', min: 10 },
        { key: 'drink', min: 2 },
        { key: 'kontring', min: 12 },
        { key: 'transition', min: 15 },
        { key: 'ssg_theme', min: 20 },
        { key: 'finish_assist', min: 6 }
      ]},
      { title: 'Angrep og avslutning (90 min)', theme: 'kast_teknikk', duration: 90, blocks: [
        { key: 'rondo_easy', min: 10 },
        { key: 'pass_move', min: 10 },
        { key: 'drink', min: 2 },
        { key: 'finish_assist', min: 12 },
        { key: '3v2', min: 12 },
        { key: 'ssg_theme', min: 28 },
        { key: 'shot_race', min: 8 },
        { key: 'drink', min: 2 },
        { key: 'game_activity', min: 6 }
      ]}
    ]
  }

};
