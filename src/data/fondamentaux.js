// Les fondamentaux que tout étudiant doit voir pendant le cycle

// Les 4 immobilisations de base, avec les retournements qui y mènent, les sorties de uke et les passages
export const IMMOS = [
  { id: 'kesa-gatame', ordre: 1,
    position: 'Tori assis contre le flanc de uke, au niveau de la poitrine, tourné vers sa tête.',
    controle: 'La tête (bras autour du cou) et un bras de uke (coincé sous l\'aisselle).',
    depuis: ['retournement-bras-ceinture', 'o-soto-gari'], depuisTxt: 'Retournement bras-ceinture ; liaison après o-soto-gari ou o-goshi.',
    sortie: 'Récupérer son bras, coller son corps à tori, pont puis rotation vers l\'épaule de tori.',
    passage: 'Uke pousse la tête de tori → kuzure-kesa-gatame ; uke se tourne vers tori → yoko-shiho-gatame.' },
  { id: 'yoko-shiho-gatame', ordre: 2,
    position: 'Tori en travers de uke, perpendiculaire, à genoux contre son flanc.',
    controle: 'La tête (bras sous la nuque) et une jambe (bras entre les jambes), poitrine sur poitrine.',
    depuis: ['retournement-jambe', 'passage-jambes'], depuisTxt: 'Retournement par la jambe ; passage de jambes quand uke est sur le dos.',
    sortie: 'Crevette : glisser un genou entre soi et tori, puis remettre tori dans ses jambes.',
    passage: 'Tourner autour de la tête → kami-shiho-gatame ; enjamber le ventre → tate-shiho-gatame.' },
  { id: 'kami-shiho-gatame', ordre: 3,
    position: 'Tori à la tête de uke, dans l\'axe, à genoux ou jambes tendues.',
    controle: 'Les deux épaules : bras passés sous les épaules, mains à la ceinture.',
    depuis: ['retournement-tete'], depuisTxt: 'Retournement par la tête (tori devant uke à quatre pattes).',
    sortie: 'Pont, puis rotation sur le côté pour faire glisser tori ; ramener les genoux.',
    passage: 'Tourner sur le côté → yoko-shiho-gatame (de l\'autre côté).' },
  { id: 'tate-shiho-gatame', ordre: 4,
    position: 'Tori à cheval sur uke, dans le même axe.',
    controle: 'La tête et un bras de uke ; jambes crochetées sous celles de uke ou genoux serrés contre ses flancs.',
    depuis: ['retournement-crochet'], depuisTxt: 'Retournement en roulant avec crochet ; enjamber depuis yoko-shiho-gatame.',
    sortie: 'Bloquer la jambe de tori du côté du bras libre, pont puis rotation de ce côté.',
    passage: 'Uke se retourne sur le ventre → contrôle du dos puis nouveau retournement.' },
];
export const CIRCUIT_SOL = 'Circuit à enchaîner sans lâcher le contact : kesa-gatame → yoko-shiho-gatame → kami-shiho-gatame → yoko-shiho-gatame de l\'autre côté → tate-shiho-gatame.';

// Renverser uke à quatre pattes (« la tortue »)
export const RETOURNEMENTS = [
  { id: 'retournement-bras-ceinture', place: 'Sur le côté', vers: 'kesa-gatame', niv: 'D' },
  { id: 'retournement-jambe', place: 'Sur le côté', vers: 'yoko-shiho-gatame', niv: 'D' },
  { id: 'retournement-tete', place: 'Devant la tête', vers: 'kami-shiho-gatame', niv: 'I' },
  { id: 'retournement-crochet', place: 'Derrière, sur le côté', vers: 'tate-shiho-gatame', niv: 'I' },
];
export const PRINCIPES_RETOURNEMENT = [
  'Contrôler d\'abord un bras ou une jambe : uke ne peut plus poser cet appui pour se rattraper.',
  'Pousser avec le poids du corps (la poitrine), pas seulement tirer avec les bras.',
  'Renverser uke du côté de l\'appui contrôlé.',
  'Rester collé pendant la bascule et finir directement en immobilisation (moins de 3 s).',
];

// Les familles de techniques debout (classification du Kodokan), avec une technique de référence pour le cycle
export const FAMILLES_DEBOUT = [
  { fam: 'te', groupe: 'Tachi-waza (techniques debout)', def: 'Tori projette surtout par l\'action des bras et des épaules.', ref: 'ippon-seoi-nage', autres: ['morote-seoi-nage', 'tai-otoshi', 'seoi-otoshi'], qui: 'Tous les niveaux' },
  { fam: 'koshi', groupe: 'Tachi-waza (techniques debout)', def: 'La hanche de tori sert de point d\'appui pour faire basculer uke.', ref: 'o-goshi', autres: ['uki-goshi', 'harai-goshi', 'hane-goshi'], qui: 'Tous les niveaux' },
  { fam: 'ashi', groupe: 'Tachi-waza (techniques debout)', def: 'La jambe ou le pied de tori fauche, balaie, accroche ou bloque une jambe de uke.', ref: 'o-soto-gari', autres: ['o-uchi-gari', 'ko-uchi-gari', 'de-ashi-barai', 'uchi-mata'], qui: 'Tous les niveaux' },
  { fam: 'masutemi', groupe: 'Sutemi-waza (sacrifices)', def: 'Tori se laisse tomber sur le dos, dans l\'axe, pour emmener uke par-dessus lui.', ref: 'tomoe-nage', autres: ['sumi-gaeshi', 'ura-nage'], qui: 'Intermédiaires et plus ; débutants : démonstration et chute avant roulée seulement' },
  { fam: 'yokosutemi', groupe: 'Sutemi-waza (sacrifices)', def: 'Tori se laisse tomber sur le côté en entraînant uke.', ref: 'tani-otoshi', autres: ['yoko-otoshi', 'soto-makikomi'], qui: 'Confirmés et avancés ; autres niveaux : démonstration seulement' },
];
export const FAMILLES_SOL = [
  { fam: 'osae', def: 'Maintenir uke sur le dos (20 s = ippon).', ref: 'kesa-gatame', qui: 'Tous les niveaux' },
  { fam: 'shime', def: 'Étranglements, pression sur les côtés du cou.', ref: 'hadaka-jime', qui: 'Intermédiaires et plus' },
  { fam: 'kansetsu', def: 'Clés articulaires, sur le coude uniquement.', ref: 'ude-garami', qui: 'Intermédiaires et plus' },
];

// L'opposition : au sol, puis debout
export const OPPOSITION = {
  sol: {
    intro: 'Le randori au sol (ne-waza) se pratique dès la première séance : on s\'oppose réellement sans risque de chute. Il sert de base à tout le cycle.',
    regles: [
      'Départ à genoux ; interdit de se relever (on reste au sol).',
      'But : immobiliser uke sur le dos (20 s), ou, pour uke, sortir de l\'immobilisation.',
      'Clés et étranglements seulement entre intermédiaires et plus ; abandon par 2 tapes ou « maitta », lâcher tout de suite.',
      'Pas de pression sur le visage ou la nuque, pas de do-jime (serrer le tronc avec les jambes).',
      'Au bord du tapis ou au matte, tout s\'arrête ; on reprend au centre.',
    ],
    situations: [
      { nom: 'Dos à dos', depart: 'Assis dos à dos', but: 'Au signal, se retourner et immobiliser le premier', niv: 'Tous' },
      { nom: 'Retourner la tortue', depart: 'Uke à quatre pattes, tori sur le côté', but: 'Tori a 30 s pour retourner et immobiliser', niv: 'Tous' },
      { nom: 'Sortir en 30 s', depart: 'Tori en immobilisation', but: 'Uke a 30 s pour sortir ; on inverse', niv: 'Tous' },
      { nom: 'Passer la garde', depart: 'Uke sur le dos, jambes autour de tori', but: 'Tori passe les jambes et immobilise ; uke le retient ou le renverse', niv: 'Intermédiaire et plus' },
      { nom: 'Ne-waza libre', depart: 'À genoux face à face', but: 'Rotations de 2 min, changement de partenaire', niv: 'Tous' },
    ],
  },
  debout: {
    intro: 'Le randori debout (tachi-waza) n\'arrive qu\'après la maîtrise des chutes. On passe progressivement de la coopération à l\'opposition libre.',
    etapes: [
      ['Lutte de saisie (kumikata)', 'Prendre sa garde, casser celle de l\'autre ; aucune projection.'],
      ['Travail convenu (yakusoku-geiko)', 'Attaques en déplacement, uke se laisse projeter.'],
      ['Randori à thème', 'Une seule famille ou une direction autorisée (ex. techniques arrière).'],
      ['Randori souple', 'Uke résiste à moitié, ne contre pas.'],
      ['Randori libre', 'Toutes les techniques du niveau, avec liaison au sol.'],
      ['Combat arbitré (shiai)', 'Règlement, scores et arbitrage par les étudiants.'],
    ],
    regles: [
      'Pas de chute forcée : on projette pour marquer, pas pour faire mal ; tori retient la manche.',
      'Interdits : plonger tête la première, clés et étranglements debout, sacrifices pour les débutants.',
      'Partenaires de gabarit et de niveau proches ; un avancé contre un débutant contrôle tout.',
      'Durées : 1 min 30 au début pour les débutants, puis 2 à 4 min selon le niveau.',
    ],
    situations: [
      { nom: 'Premier en garde', depart: 'Debout, sans saisie', but: 'Le premier qui obtient sa garde complète marque', niv: 'Tous' },
      { nom: 'Randori arrière', depart: 'Garde normale', but: 'Seules les techniques vers l\'arrière sont permises', niv: 'Débutant' },
      { nom: 'Projeter puis contrôler', depart: 'Garde normale', but: 'Après une chute, immobiliser en moins de 3 s', niv: 'Tous' },
      { nom: 'Tori-uke alterné', depart: 'Garde normale', but: 'Toutes les 30 s on change : l\'un attaque, l\'autre défend sans contrer', niv: 'Tous' },
      { nom: 'Randori à handicap', depart: 'Le plus fort avec une seule famille autorisée', but: 'Équilibrer l\'opposition entre niveaux', niv: 'Mixte' },
    ],
  },
};

// Où chaque fondamental est travaillé dans le cycle (numéros de séance)
export const PLACE = {
  p24: { immos: [3, 4, 8, 12], retournements: [4, 8, 17], te: [11, 14], koshi: [10, 14], ashi: [6, 7, 13], masutemi: [16], yokosutemi: [16], solOpp: [1, 2, 3, 4, 5, 6, 7, 8], deboutOpp: [5, 9, 10, 13, 19, 20, 22] },
  p12: { immos: [2, 3, 5], retournements: [3, 5, 9], te: [6, 7], koshi: [6, 7], ashi: [4, 5, 7], masutemi: [8], yokosutemi: [8], solOpp: [1, 2, 3, 4], deboutOpp: [4, 5, 6, 7, 10] },
};
export const PLACE_LABELS = [
  ['immos', 'Les 4 immobilisations de base'], ['retournements', 'Retournements de uke à quatre pattes'], ['solOpp', 'Opposition au sol (randori ne-waza)'],
  ['te', 'Famille te-waza (bras)'], ['koshi', 'Famille koshi-waza (hanche)'], ['ashi', 'Famille ashi-waza (jambe)'], ['masutemi', 'Famille ma-sutemi-waza (sacrifice dans l\'axe)'], ['yokosutemi', 'Famille yoko-sutemi-waza (sacrifice sur le côté)'],
  ['deboutOpp', 'Opposition debout (randori tachi-waza)'],
];
