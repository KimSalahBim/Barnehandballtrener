// nff-data.js — NHF-kontrakt og maler for barnehåndball
// Kilder: handball.no retningslinjer, Region Sør øktplaner 6–9 år (60 min: 20 oppvarming / 30 stasjoner / 10 avslutning).
// Øvelsesnøkler og gamle aldersnøkler (6-7, 8-9, …) beholdes så lagrede økter ikke knekker.
// Brukes av workout.js, sesong-workout.js, season.js via window.NFF_DATA

window.NFF_DATA = {

  EXERCISE_CATEGORIES: [
    { id: 'oppvarming',       label: '🏃 Leker og oppvarming' },
    { id: 'teknikk',          label: '🤾 Ballbehandling og teknikk' },
    { id: 'avslutning',       label: '🎯 Kast og skudd' },
    { id: 'spill_m_motstand', label: '⚔️ Spill og motspill' },
    { id: 'smalagsspill',     label: '🏟️ Smålagsspill' },
    { id: 'keeper',           label: '🧤 Målvakt' },
  ],

  // Fire innholdskategorier for balanse-visningen i øktbyggeren.
  // Id-er er uendret pga. lagrede blokker; etikettene er håndballspråk.
  NFF_CATEGORIES: [
    { id: 'sjef_over_ballen',  label: '🤾 Individuelle balløvelser', short: 'Ball',  color: '#2e8b57',
      label1316: '🤾 Ballmestring', short1316: 'Ball' },
    { id: 'spille_med_og_mot', label: '⚔️ Valg og motspill',         short: 'Valg',  color: '#e67e22',
      label1316: '⚔️ Situasjonsøving', short1316: 'Situasjon' },
    { id: 'smalagsspill',      label: '🏟️ Småspill',                 short: 'Spill', color: '#3498db',
      label1316: '🏟️ Spill', short1316: 'Spill' },
    { id: 'scoringstrening',   label: '🎯 Kast og mottak',           short: 'Kast',  color: '#e74c3c',
      label1316: '🎯 Avslutning', short1316: 'Avslutning' },
  ],

  NFF_THEMES: [
    { id: 'kast_teknikk',       label: 'Kastteknikk',            phase: 'angrep',  icon: '🎯' },
    { id: 'mottak_pasning',     label: 'Mottak og pasning',      phase: 'angrep',  icon: '🤝' },
    { id: 'dribling_bevegelse', label: 'Dribling og bevegelse',  phase: 'angrep',  icon: '🏃' },
    { id: 'finter',             label: 'Finter',                 phase: 'angrep',  icon: '💨' },
    { id: '1v1_duell',          label: 'Duellspill',             phase: 'begge',   icon: '⚡' },
    { id: 'samarbeidsspill',    label: 'Samspill',               phase: 'angrep',  icon: '👥' },
    { id: 'forsvarsspill',      label: 'Forsvarsspill',          phase: 'forsvar', icon: '🛡️' },
    { id: 'kontring_retur',     label: 'Kontring og retur',      phase: 'begge',   icon: '🔁' },
    { id: 'linjespill',         label: 'Linjespill og innspill', phase: 'angrep',  icon: '📐' },
    { id: 'keeper',             label: 'Målvakt',                phase: 'forsvar', icon: '🧤' },
    { id: 'leik_stafett',       label: 'Lek og stafett',         phase: 'noytral', icon: '🎮' },
  ],

  NFF_THEMES_BY_AGE: {
    '6-7':  ['kast_teknikk', 'mottak_pasning', 'dribling_bevegelse', 'finter', 'forsvarsspill', 'leik_stafett', 'keeper'],
    '8-9':  ['kast_teknikk', 'mottak_pasning', 'dribling_bevegelse', 'finter', '1v1_duell', 'samarbeidsspill', 'forsvarsspill', 'leik_stafett', 'keeper'],
    '6-9':  ['kast_teknikk', 'mottak_pasning', 'dribling_bevegelse', 'finter', '1v1_duell', 'forsvarsspill', 'leik_stafett', 'keeper'],
    '10-12': ['kast_teknikk', 'mottak_pasning', 'finter', '1v1_duell', 'samarbeidsspill', 'forsvarsspill', 'kontring_retur', 'linjespill', 'leik_stafett', 'keeper'],
    '13-16': ['kast_teknikk', 'mottak_pasning', 'finter', '1v1_duell', 'samarbeidsspill', 'forsvarsspill', 'kontring_retur', 'linjespill', 'keeper'],
  },

  // Tyngdepunkt per alder — ikke eneste tillatte tema. Avløp ligger i finter/samspill.
  THEME_FOCUS_BY_AGE: {
    '6-7':   ['kast_teknikk', 'mottak_pasning'],
    '8-9':   ['finter', '1v1_duell'],
    '6-9':   ['kast_teknikk', 'mottak_pasning', 'finter', '1v1_duell'],
    '10-12': ['kontring_retur', 'forsvarsspill', 'linjespill', 'samarbeidsspill'],
    '13-16': ['forsvarsspill', 'linjespill', 'samarbeidsspill', 'kontring_retur', 'kast_teknikk']
  },

  // App-standard (IKKE et NHF-tall): jevn fordeling som utgangspunkt for balanse-visningen.
  // NHF/Region Sør øktplaner for 6–9 år er 60 min delt 20/30/10 (oppvarming/stasjoner/avslutning).
  NFF_TIME_DISTRIBUTION: {
    '6-7':   { sjef_over_ballen: 25, spille_med_og_mot: 25, smalagsspill: 25, scoringstrening: 25 },
    '8-9':   { sjef_over_ballen: 25, spille_med_og_mot: 25, smalagsspill: 25, scoringstrening: 25 },
    '6-9':   { sjef_over_ballen: 25, spille_med_og_mot: 25, smalagsspill: 25, scoringstrening: 25 },
    '10-12': { sjef_over_ballen: 25, spille_med_og_mot: 25, smalagsspill: 25, scoringstrening: 25 },
    '13-16': { sjef_over_ballen: 20, spille_med_og_mot: 30, smalagsspill: 30, scoringstrening: 20 },
  },

  // Fotball-tema-id-er som fortsatt kan ligge i gamle sesongstatistikk-rader
  THEME_ID_ALIASES: {
    foering_dribling: 'dribling_bevegelse',
    vendinger_mottak: 'mottak_pasning',
    pasning_samspill: 'mottak_pasning',
    avslutning: 'kast_teknikk',
    omstilling: 'kontring_retur',
    spilloppbygging: 'samarbeidsspill'
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
      '6-7':  ['Gå én vei med ballen, snu og gå den andre', 'Kom deg fri fra den som følger deg (avløp)'],
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
      '6-7':  ['Følg ballen: flytt deg dit ballen er', 'Snapp pasninger med hendene, aldri slag på armen'],
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
      { title: 'NHF: Kast, mottak og lek (60 min)', theme: 'kast_teknikk', duration: 60, blocks: [
        { key: 'kjeglelek', min: 8 },
        { key: 'pass_pair', min: 8 },
        { key: 'step_shot', min: 8 },
        { key: 'drink', min: 2 },
        { key: 'mattespill', min: 8 },
        { key: 'ssg', min: 26 }
      ]},
      { title: 'NHF: Bli venn med ballen (60 min)', theme: 'dribling_bevegelse', duration: 60, blocks: [
        { key: 'ball_luften', min: 8 },
        { key: 'kjeglelek', min: 6 },
        { key: 'stussball', min: 8 },
        { key: 'drink', min: 2 },
        { key: 'mattespill', min: 10 },
        { key: 'ssg', min: 26 }
      ]},
      { title: 'Lek og kast (45 min)', theme: 'kast_teknikk', duration: 45, blocks: [
        { key: 'ball_luften', min: 8 },
        { key: 'activity_course', min: 8 },
        { key: 'drink', min: 2 },
        { key: 'ssg', min: 18 },
        { key: 'shot', min: 9 }
      ]},
      { title: 'Ball og bevegelse (45 min)', theme: 'dribling_bevegelse', duration: 45, blocks: [
        { key: 'chain_tag', min: 8 },
        { key: 'dribbling', min: 8 },
        { key: 'ball_sisten', min: 8 },
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
      { title: 'NHF: Finter (60 min)', theme: 'finter', duration: 60, blocks: [
        { key: 'stussball', min: 6 },
        { key: 'finte_kjegle', min: 10 },
        { key: 'avlop', min: 8 },
        { key: 'drink', min: 2 },
        { key: 'finte_forsvarer', min: 8 },
        { key: 'ssg', min: 26 }
      ]},
      { title: 'NHF: Duellspill (60 min)', theme: '1v1_duell', duration: 60, blocks: [
        { key: 'kjeglelek', min: 8 },
        { key: 'snapp', min: 8 },
        { key: 'drink', min: 2 },
        { key: '1v1', min: 12 },
        { key: 'ssg_2v2_sektor', min: 12 },
        { key: 'ssg', min: 18 }
      ]},
      { title: 'NHF: Kast og skudd (60 min)', theme: 'kast_teknikk', duration: 60, blocks: [
        { key: 'kjeglelek', min: 6 },
        { key: 'pass_pair', min: 8 },
        { key: 'step_shot', min: 10 },
        { key: 'drink', min: 2 },
        { key: 'snapp', min: 8 },
        { key: 'ssg', min: 26 }
      ]},
      { title: 'Pasning og samspill (60 min)', theme: 'mottak_pasning', duration: 60, blocks: [
        { key: 'ball_sisten', min: 8 },
        { key: 'pass_pair', min: 8 },
        { key: 'pass_move', min: 8 },
        { key: 'drink', min: 2 },
        { key: 'pass_run', min: 8 },
        { key: 'ssg_theme', min: 22 },
        { key: 'shot', min: 4 }
      ]},
      { title: 'Forsvarsspill (60 min)', theme: 'forsvarsspill', duration: 60, blocks: [
        { key: 'chain_tag', min: 6 },
        { key: 'defensive_movement', min: 8 },
        { key: 'defend_press', min: 8 },
        { key: 'drink', min: 2 },
        { key: '1v1', min: 8 },
        { key: 'ssg', min: 24 },
        { key: 'shot_race', min: 4 }
      ]},
      { title: 'Kast og avslutning (60 min)', theme: 'kast_teknikk', duration: 60, blocks: [
        { key: 'kongen_haugen', min: 6 },
        { key: 'pass_pair', min: 8 },
        { key: 'shot', min: 8 },
        { key: 'drink', min: 2 },
        { key: '2v1', min: 8 },
        { key: 'ssg', min: 24 },
        { key: 'shot_race', min: 4 }
      ]},
      { title: 'Dribling og duell (60 min)', theme: '1v1_duell', duration: 60, blocks: [
        { key: 'ball_sisten', min: 8 },
        { key: 'kongen_haugen', min: 8 },
        { key: 'dribbling', min: 10 },
        { key: 'drink', min: 2 },
        { key: '1v1', min: 10 },
        { key: 'ssg', min: 18 },
        { key: 'shot', min: 4 }
      ]}
    ],
    '10-12': [
      { title: 'NHF: Kontring og omstilling (90 min)', theme: 'kontring_retur', duration: 90, blocks: [
        { key: 'tag', min: 8 },
        { key: 'forflytning', min: 10 },
        { key: 'islandsk_kontra', min: 12 },
        { key: 'drink', min: 2 },
        { key: 'bolgen', min: 14 },
        { key: 'korridor', min: 16 },
        { key: 'ssg_theme', min: 26 },
        { key: 'drink', min: 2 }
      ]},
      { title: 'NHF: Linjespill og samspill (90 min)', theme: 'linjespill', duration: 90, blocks: [
        { key: 'tag', min: 8 },
        { key: 'padrag', min: 12 },
        { key: 'krysning', min: 12 },
        { key: 'drink', min: 2 },
        { key: 'line_shot', min: 10 },
        { key: 'ssg_3v2_linje', min: 16 },
        { key: 'ssg_theme', min: 28 },
        { key: 'drink', min: 2 }
      ]},
      { title: 'NHF: Forsvar, snapp og blokk (90 min)', theme: 'forsvarsspill', duration: 90, blocks: [
        { key: 'tag', min: 8 },
        { key: 'forflytning', min: 10 },
        { key: 'snapp', min: 10 },
        { key: 'blokk', min: 10 },
        { key: 'drink', min: 2 },
        { key: 'takle', min: 10 },
        { key: 'ssg', min: 38 },
        { key: 'drink', min: 2 }
      ]},
      { title: 'Linjespill og veggspill (90 min)', theme: 'linjespill', duration: 90, blocks: [
        { key: 'tag', min: 8 },
        { key: 'pass_move', min: 10 },
        { key: 'wall_pass', min: 10 },
        { key: 'drink', min: 2 },
        { key: '3v2', min: 12 },
        { key: 'ssg_theme', min: 36 },
        { key: 'shot', min: 10 },
        { key: 'drink', min: 2 }
      ]},
      { title: 'Omstilling og kontring (90 min)', theme: 'kontring_retur', duration: 90, blocks: [
        { key: 'chain_tag', min: 8 },
        { key: 'ball_sisten', min: 8 },
        { key: 'kontring', min: 12 },
        { key: 'drink', min: 2 },
        { key: 'transition', min: 20 },
        { key: 'ssg_theme', min: 30 },
        { key: 'shot', min: 8 },
        { key: 'drink', min: 2 }
      ]},
      { title: 'Samspill og avslutning (90 min)', theme: 'samarbeidsspill', duration: 90, blocks: [
        { key: 'tag', min: 8 },
        { key: 'pass_move', min: 8 },
        { key: 'wall_pass', min: 10 },
        { key: 'drink', min: 2 },
        { key: '3v2', min: 12 },
        { key: 'jump_shot', min: 10 },
        { key: 'ssg_theme', min: 34 },
        { key: 'shot', min: 4 },
        { key: 'drink', min: 2 }
      ]},
      { title: 'Forsvar og pressing (90 min)', theme: 'forsvarsspill', duration: 90, blocks: [
        { key: 'tag', min: 8 },
        { key: 'defensive_movement', min: 10 },
        { key: 'defend_press', min: 10 },
        { key: 'drink', min: 2 },
        { key: '2v1', min: 10 },
        { key: 'kontring', min: 8 },
        { key: 'ssg', min: 40 },
        { key: 'drink', min: 2 }
      ]}
    ],
    '13-16': [
      { title: 'NHF: Angrep mot organisert forsvar (90 min)', theme: 'samarbeidsspill', duration: 90, blocks: [
        { key: 'pass_run', min: 10 },
        { key: 'krysning', min: 12 },
        { key: 'padrag', min: 12 },
        { key: 'drink', min: 2 },
        { key: 'wing_shot', min: 10 },
        { key: 'ssg_3v2_linje', min: 16 },
        { key: 'ssg_theme', min: 26 },
        { key: 'drink', min: 2 }
      ]},
      { title: 'NHF: Kontring og korridor (90 min)', theme: 'kontring_retur', duration: 90, blocks: [
        { key: 'pass_move', min: 10 },
        { key: 'islandsk_kontra', min: 12 },
        { key: 'bolgen', min: 14 },
        { key: 'drink', min: 2 },
        { key: 'korridor', min: 18 },
        { key: 'ssg_theme', min: 26 },
        { key: 'drink', min: 2 },
        { key: 'step_shot', min: 6 }
      ]},
      { title: 'Forsvarsspill og pressing (90 min)', theme: 'forsvarsspill', duration: 90, blocks: [
        { key: 'dribbling', min: 10 },
        { key: 'defend_press', min: 12 },
        { key: 'drink', min: 2 },
        { key: 'defensive_movement', min: 12 },
        { key: 'transition', min: 15 },
        { key: 'ssg_theme', min: 28 },
        { key: 'shot', min: 8 },
        { key: 'drink', min: 3 }
      ]},
      { title: 'Linjespill og kombinasjon (90 min)', theme: 'linjespill', duration: 90, blocks: [
        { key: 'pass_pair', min: 10 },
        { key: 'pass_move', min: 10 },
        { key: 'drink', min: 2 },
        { key: '3v2', min: 12 },
        { key: 'wall_pass', min: 12 },
        { key: 'ssg_theme', min: 30 },
        { key: 'shot', min: 8 },
        { key: 'drink', min: 2 },
        { key: 'game_activity', min: 4 }
      ]},
      { title: 'Omstilling og kontring (90 min)', theme: 'kontring_retur', duration: 90, blocks: [
        { key: 'pass_move', min: 10 },
        { key: 'wall_pass', min: 10 },
        { key: 'drink', min: 2 },
        { key: 'kontring', min: 12 },
        { key: 'transition', min: 18 },
        { key: 'ssg_theme', min: 28 },
        { key: 'drink', min: 2 },
        { key: 'shot_race', min: 8 }
      ]},
      { title: 'Angrep og avslutning (90 min)', theme: 'kast_teknikk', duration: 90, blocks: [
        { key: 'pass_pair', min: 10 },
        { key: 'pass_move', min: 10 },
        { key: 'drink', min: 2 },
        { key: 'jump_shot', min: 12 },
        { key: '3v2', min: 12 },
        { key: 'ssg_theme', min: 28 },
        { key: 'shot_race', min: 8 },
        { key: 'drink', min: 2 },
        { key: 'game_activity', min: 6 }
      ]}
    ]
  }

};

(function attachNhfHelpers(data) {
  data.parseAgeFromClass = function (ageClass) {
    if (!ageClass) return null;
    var n = parseInt(String(ageClass).replace(/[^0-9]/g, ''), 10);
    return (n >= 6 && n <= 19) ? n : null;
  };

  // Alder → økt-nøkkel. Gruppene følger navnene sine (6-7, 8-9, 10-12, 13-16),
  // slik at 9/10-skillet for treningsvarighet (60/90 min) faller mellom 8-9 og 10-12.
  data.workoutAgeGroupFromAge = function (age) {
    if (age == null || isNaN(age)) return '8-9';
    if (age <= 7) return '6-7';
    if (age <= 9) return '8-9';
    if (age <= 12) return '10-12';
    return '13-16';
  };

  data.workoutAgeGroupFromAgeClass = function (ageClass) {
    return data.workoutAgeGroupFromAge(data.parseAgeFromClass(ageClass));
  };

  // 6–9: 60 min (Region Sør øktplaner). Fra 10 år: 90 min (vanlig klubbhalltid, trenervalg).
  data.defaultMinutesForAgeGroup = function (ageGroup) {
    return (ageGroup === '10-12' || ageGroup === '13-16') ? 90 : 60;
  };

  data.defaultTrainingMinutes = function (ageClass) {
    var age = data.parseAgeFromClass(ageClass);
    if (!age || age <= 9) return 60;
    return 90;
  };

  data.focusThemesForAgeGroup = function (ageGroup) {
    var map = data.THEME_FOCUS_BY_AGE || {};
    return map[ageGroup] || [];
  };

  data.isFocusTheme = function (ageGroup, themeId) {
    var id = data.normalizeThemeId(themeId);
    return data.focusThemesForAgeGroup(ageGroup).indexOf(id) >= 0;
  };

  data.normalizeThemeId = function (themeId) {
    if (!themeId) return themeId;
    return data.THEME_ID_ALIASES[themeId] || themeId;
  };

  data.themeMeta = function (themeId) {
    var id = data.normalizeThemeId(themeId);
    var themes = data.NFF_THEMES || [];
    for (var i = 0; i < themes.length; i++) {
      if (themes[i].id === id) return themes[i];
    }
    return null;
  };

  data.themesForAgeGroup = function (ageGroup) {
    var map = data.NFF_THEMES_BY_AGE || {};
    return map[ageGroup] || map['8-9'] || [];
  };
})(window.NFF_DATA);
