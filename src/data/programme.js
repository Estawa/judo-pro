// Cadre de la programmation et de l'évaluation (d'après les documents de C. Guilhem)
export const PROGRAMMES = {
  p24: { label: '24 séances (année)', court: '24 séances', bilan: 12, theo: 22, prat: [23, 24], blocs: '5 blocs de 4 à 5 séances ; bilan formatif en S12, évaluation finale de S22 à S24.', dureeEcrit: 30, reajust: 12 },
  p12: { label: '12 séances (semestre)', court: '12 séances', bilan: 4, theo: 10, prat: [11, 12], blocs: '4 blocs de 2 à 4 séances ; réajustement des niveaux en S4 ; évaluation théorique en S10, évaluation pratique en S11 et S12.', dureeEcrit: 25, reajust: 4 },
};

export const PRINCIPES = [
  'Un thème commun par séance : tout le monde travaille la même famille technique, ce qui garde la cohésion du groupe.',
  'Quatre niveaux de contenu : chaque étudiant applique le thème à son niveau.',
  'Repérage visuel : un brassard par niveau pour composer vite les binômes.',
  'Binômes : même niveau pour l\'apprentissage ; avancé + débutant pour le tutorat, l\'avancé étant uke et conseiller.',
  'Sécurité d\'abord : kansetsu-waza (clés), shime-waza (étranglements) et sutemi-waza (sacrifices) sont réservés aux niveaux intermédiaire et plus.',
  'Chaque terme japonais est traduit entre parenthèses.',
];

export const OBJECTIFS_NIVEAU = {
  D: 'Chuter sans danger, projeter un partenaire coopérant avec 4 à 5 techniques, l\'immobiliser, faire un randori en sécurité.',
  I: 'Maîtriser le programme de la ceinture verte, enchaîner debout-sol, placer une combinaison simple en randori.',
  C: 'Construire un système d\'attaque (tokui-waza + combinaison + contre), utiliser clés et étranglements, arbitrer un combat.',
  A: 'Affiner son judo de combat, encadrer les débutants comme uke, arbitrer en central.',
};

export const STRUCTURE = [
  ['Rei (salut) et présentation du thème', 5, ''],
  ['Échauffement', 15, 'Articulaire (nuque, épaules, poignets), déplacements, jeux d\'opposition, ukemi'],
  ['Apprentissage technique', 25, 'Démonstration du thème commun, puis travail par niveau en binômes tori / uke'],
  ['Répétitions', 15, 'Uchi-komi, nage-komi, situations à thème'],
  ['Randori', 20, 'Au sol pour tous, debout ensuite pour les débutants ; rotations de 2 à 3 min'],
  ['Retour au calme, théorie et rei', 10, 'Étirements, bilan oral, point théorie de 5 min (mini-quiz + nouveau point)'],
];

// Contenus de fin d'année (programme 24) — liste dans laquelle l'étudiant choisit sa démonstration
export const CONTENUS_NIVEAU = {
  D: { ukemi: ['ushiro-ukemi', 'yoko-ukemi', 'mae-ukemi'], nage: ['o-soto-gari', 'o-uchi-gari', 'o-goshi', 'ippon-seoi-nage', 'de-ashi-barai'], katame: ['kesa-gatame', 'yoko-shiho-gatame', 'kami-shiho-gatame', 'tate-shiho-gatame', 'sortie-pont', 'retournement-bras-ceinture', 'retournement-jambe'], randori: 'Randori au sol libre, randori debout sans sacrifice' },
  I: { ukemi: ['mae-mawari-ukemi'], nage: ['ko-uchi-gari', 'ko-soto-gari', 'uki-goshi', 'morote-seoi-nage', 'tai-otoshi', 'hiza-guruma', 'o-soto-gaeshi', 'tomoe-nage'], katame: ['retournement-tete', 'retournement-crochet', 'ude-garami', 'hadaka-jime', 'passage-jambes'], randori: '1 combinaison, 1 enchaînement debout-sol' },
  C: { ukemi: [], nage: ['harai-goshi', 'uchi-mata', 'sasae-tsuri-komi-ashi', 'ko-soto-gake', 'eri-seoi-nage', 'sumi-gaeshi', 'o-uchi-gaeshi', 'tsubame-gaeshi'], katame: ['juji-gatame', 'okuri-eri-jime', 'kata-ha-jime', 'kata-gatame'], randori: 'Tokui-waza + combinaison + contre ; arbitrage complet' },
  A: { ukemi: [], nage: ['hane-goshi', 'ura-nage', 'utsuri-goshi', 'okuri-ashi-barai', 'tani-otoshi', 'seoi-otoshi'], katame: ['kuzure-kesa-gatame'], randori: 'Système d\'attaque personnel ; arbitre central ; tutorat' },
};

export const DEMO = {
  D: '3 nage-waza (projections) au choix + 2 osae-komi-waza (immobilisations) + 1 sortie.',
  I: '5 nage-waza dont 1 renraku-waza (combinaison) + 3 osae-komi-waza + 1 enchaînement debout-sol.',
  C: '6 nage-waza dont 1 kaeshi-waza (contre) et 1 sutemi-waza (sacrifice) + 1 kansetsu-waza (clé de bras) + 1 shime-waza (étranglement) + 2 enchaînements.',
  A: 'Tokui-waza à droite et à gauche + 2 renraku-waza + 2 kaeshi-waza + enchaînement ne-waza libre.',
};

export const DUREE_RANDORI = { D: '2 min', I: '3 min', C: '3 min', A: '4 min' };

// Grille de l'évaluation pratique (/14) — chaque critère est noté en points, par pas de 0,5
export const GRILLE_PRATIQUE = [
  { epreuve: 'A. Démonstration technique', total: 7, criteres: [
    { id: 'a1', label: 'Kuzushi (déséquilibre) et tsukuri (placement)', max: 3 },
    { id: 'a2', label: 'Chute de uke contrôlée', max: 2 },
    { id: 'a3', label: 'Liaison debout-sol', max: 2 },
  ] },
  { epreuve: 'B. Randori (3 randori, même niveau et gabarit)', total: 5, criteres: [
    { id: 'b1', label: 'Attitude offensive', max: 2 },
    { id: 'b2', label: 'Variété et efficacité', max: 2 },
    { id: 'b3', label: 'Défense et sécurité', max: 1 },
  ] },
  { epreuve: 'C. Rôles sociaux', total: 2, criteres: [
    { id: 'c1', label: 'Arbitrage : gestes et annonces justes', max: 1 },
    { id: 'c2', label: 'Uke coopérant et sûr', max: 1 },
  ] },
];

export const EXIGENCES_BILAN = {
  D: 'Présenter les chutes + 2 projections + 2 osae-komi (immobilisations).',
  I: '4 projections + 3 osae-komi + 1 sortie.',
  C: '2 enchaînements debout-sol + 1 clé.',
  A: 'Tokui-waza + 1 combinaison + 1 contre.',
};
