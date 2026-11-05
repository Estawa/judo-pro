// Parcours « Prog Élèves » : progression de 15 séances de 1 h 30 conçue pour un public débutant,
// présentée aux étudiants de L2 STAPS comme on la ferait avec des élèves (C. Guilhem, novembre 2026).

export const ETAPES_P15 = [
  ['1 à 3', 'Entrer dans l\'activité', 'Rituels, chutes, jeux d\'opposition, première immobilisation'],
  ['4 à 6', 'Maîtriser le sol', '4 immobilisations, retournements, renversements, randori au sol arbitré'],
  ['7 à 10', 'Apprendre à projeter', 'Kumikata (saisie), déplacements, kuzushi (déséquilibre), 1 technique par famille'],
  ['11 à 13', 'Relier et s\'opposer', 'Liaison debout-sol, randori debout, arbitrage complet, préparation des évaluations'],
  ['14 et 15', 'Évaluer', 'Démonstration technique, combat arbitré, épreuve théorique'],
];

export const PUBLIC_P15 = [
  'Étudiants de L2 STAPS, en grande majorité débutants, groupe mixte.',
  'Double finalité : apprendre à pratiquer le judo, et apprendre à l\'enseigner à des débutants (chaque séance est construite comme une séance « élèves »).',
  'À chaque séance, un temps court d\'analyse didactique : pourquoi cet ordre, quelles erreurs typiques, quelles variables pour simplifier ou complexifier.',
  'Le sol passe en premier : il est plus sûr pour des débutants et donne vite des situations d\'opposition réelles.',
];

export const CONTENUS_P15 = [
  ['Chutes (ukemi)', 'arrière, côté, avant roulée.'],
  ['Sol (ne-waza)', 'les 4 immobilisations de base (kesa-gatame, yoko-shiho-gatame, kami-shiho-gatame, tate-shiho-gatame), leurs sorties, les retournements de uke à plat ventre, les renversements de uke à 4 pattes.'],
  ['Debout (tachi-waza)', 'saisie, déplacements, déséquilibres, et au moins une technique par famille : te-waza (tai-otoshi), koshi-waza (o-goshi), ashi-waza (o-soto-gari), sutemi-waza (tomoe-nage).'],
  ['Opposition', 'randori au sol puis debout, avec thèmes et règles adaptées.'],
  ['Arbitrage', 'annonces, gestes et valeurs des points (FIJ 2025-2028).'],
  ['Culture judo', 'salut, code moral, vocabulaire japonais, histoire (Jigoro Kano, 1882).'],
];

export const STRUCTURE_P15 = [
  ['Accueil', 5, 'Salut debout et à genoux, appel, objectif de la séance'],
  ['Échauffement', 15, 'Mobilisation articulaire (cou, épaules, poignets, hanches, genoux), déplacements, jeux d\'opposition'],
  ['Chutes', 10, 'Révision et progression des ukemi'],
  ['Apprentissage', 30, 'Technique du jour : démonstration, travail à deux, consignes, corrections (30 à 35 min)'],
  ['Opposition', 20, 'Randori à thème ou libre, rotation des partenaires (15 à 20 min)'],
  ['Retour au calme et bilan', 10, 'Étirements, bilan didactique, salut (5 à 10 min)'],
];

export const SECURITE_P15 = [
  'Ongles courts, pas de bijoux, cheveux attachés, judogi ou tenue couvrante sans fermeture éclair.',
  'Pieds nus sur le tapis, chaussures (zoori) au bord.',
  'Abandon immédiat en tapant 2 fois sur le partenaire ou le tapis (ou en disant « stop ») ; le partenaire lâche aussitôt.',
  'Pas de clé de bras ni d\'étranglement dans ce cycle de débutants.',
  'Pas de projection sur la tête ni de chute en arrière en tenant le partenaire par le cou.',
  'Interdiction de plonger tête en avant pour attaquer ou défendre.',
  'Couples de gabarits proches, distance de sécurité entre les couples, sens de projection donné par l\'enseignant.',
  'Arrêt de tous les couples au signal « Mate ».',
];

export const DEMO_P15 = '3 chutes (arrière, côté, avant roulée) ; les 4 immobilisations avec une sortie au choix ; 1 retournement à plat ventre et 1 renversement à 4 pattes enchaînés avec une immobilisation ; 1 technique par famille de projection, des deux côtés pour l\'une d\'elles ; 1 liaison debout-sol.';

export const EXIGENCES_BILAN_P15 = 'Bilan de l\'étape sol (S6) : 3 chutes, les 4 immobilisations, 1 retournement et 1 renversement enchaînés avec une immobilisation.';

// Grille de l'évaluation pratique (/12) : démonstration /6, combat /4, arbitrage /2
export const GRILLE_P15 = [
  { epreuve: 'A. Démonstration technique', total: 6, criteres: [
    { id: 'e1', label: 'Chutes : 3 chutes, tête protégée, frappe des bras', max: 1 },
    { id: 'e2', label: 'Immobilisations : les 4 correctes, 1 sortie', max: 1.5 },
    { id: 'e3', label: 'Retournement et renversement enchaînés sans temps mort', max: 1 },
    { id: 'e4', label: 'Projections : 1 par famille, kuzushi visible, uke accompagné', max: 2 },
    { id: 'e5', label: 'Liaison debout-sol : manche conservée, immobilisation immédiate', max: 0.5 },
  ] },
  { epreuve: 'B. Combat arbitré (2 combats de 2 min)', total: 4, criteres: [
    { id: 'f1', label: 'Engagement : attaque, prend la saisie, ne fuit pas', max: 1.5 },
    { id: 'f2', label: 'Efficacité : marque des avantages debout ou au sol', max: 1.5 },
    { id: 'f3', label: 'Respect des règles : aucun geste dangereux, salut, contrôle de uke', max: 1 },
  ] },
  { epreuve: 'C. Arbitrage', total: 2, criteres: [
    { id: 'g1', label: 'Annonces et gestes justes, temps d\'immobilisation corrects', max: 2 },
  ] },
];

const B1 = 'Étape 1 — Entrer dans l\'activité (S1 à S3)';
const B2 = 'Étape 2 — Maîtriser le sol (S4 à S6)';
const B3 = 'Étape 3 — Apprendre à projeter (S7 à S10)';
const B4 = 'Étape 4 — Relier et s\'opposer (S11 à S13)';
const B5 = 'Étape 5 — Évaluer (S14 et S15)';
const th = (titre, dire) => ({ titre, dire, quiz: [], quizTitre: '' });

export const SEANCES_P15 = [
  {
    n: 1, bloc: B1, titre: 'Découverte, rituels et chute arrière',
    objectif: 'connaître les règles du dojo et de sécurité ; chuter en arrière sans se faire mal ; accepter le contact et l\'opposition par des jeux.',
    deroule: [
      ['Accueil (0-10 min)', 'présentation du cycle et des évaluations. Règles d\'hygiène et de sécurité. Apprentissage du salut debout (ritsu-rei) et à genoux (za-rei). Mots-clés : Hajime (commencez), Mate (arrêtez).'],
      ['Échauffement (10-25 min)', 'mobilisation articulaire. Déplacements variés sur le tapis (avant, arrière, pas chassés, quadrupédie). Jeu « la queue du diable » : une ceinture dans le dos, on essaie de prendre celle des autres.'],
      ['Chute arrière, ushiro-ukemi (25-40 min)', 'progression en 4 niveaux : 1. allongé, menton rentré, frappe des 2 bras à 45° ; 2. assis, rouler en arrière et frapper ; 3. accroupi ; 4. debout, descendre en pliant les jambes. Consigne : regarder sa ceinture.'],
      ['Jeux d\'opposition (40-65 min)', '1. Dos à dos assis : pousser l\'autre hors d\'une zone. 2. À genoux face à face : faire toucher le dos du partenaire au tapis. 3. « Tortue » : l\'un à 4 pattes, l\'autre doit le mettre sur le dos en 30 s. Rotation des partenaires toutes les 2 min.'],
      ['Opposition à genoux (65-80 min)', 'combat à genoux de 1 min : gagner en mettant le dos du partenaire au sol. Règles : pas de saisie de la tête ni du cou, pas de prise sur les doigts.'],
      ['Bilan et salut (80-90 min)', 'étirements. Bilan didactique : pourquoi commencer à genoux avec des débutants (hauteur de chute nulle, contact sans peur). Salut.'],
    ],
    niveaux: {}, criteres: 'la tête ne touche jamais le tapis à la chute ; les bras frappent ensemble ; l\'étudiant arrête dès l\'annonce « Mate ».',
    didac: 'Le jeu donne le sens (renverser, contrôler) avant la technique. Variables : surface de la zone, durée, position de départ.',
    tech: ['ushiro-ukemi'],
    theorie: th('Ce qu\'est le judo', 'Judo veut dire « voie de la souplesse ». Il a été créé en 1882 par Jigoro Kano, au Kodokan. On salue (rei) en entrant sur le tapis, avant et après chaque exercice : c\'est une marque de respect envers le partenaire.'),
  },
  {
    n: 2, bloc: B1, titre: 'Chute sur le côté et première immobilisation',
    objectif: 'chuter sur le côté ; découvrir le contrôle du partenaire sur le dos avec kesa-gatame ; comprendre la notion d\'immobilisation (osae-komi).',
    deroule: [
      ['Accueil (0-5 min)', 'salut, rappel des règles, objectif.'],
      ['Échauffement (5-20 min)', 'mobilisation, déplacements en quadrupédie avant et arrière, crevette (ebi) au sol, roulades latérales. Jeu des « déménageurs » : déplacer le partenaire allongé et relâché.'],
      ['Chutes (20-35 min)', 'révision ushiro-ukemi. Chute de côté (yoko-ukemi) : allongé, balancer les jambes et frapper d\'un bras ; puis accroupi, glisser une jambe devant et chuter sur le côté. Des deux côtés.'],
      ['Kesa-gatame (35-60 min)', 'démonstration. Points clés : tori assis sur le côté de uke, hanche contre ses côtes, bras de uke serré sous l\'aisselle, autre bras autour du cou, jambes écartées en ciseaux, tête basse. Travail : 3 x 30 s par rôle. Uke résiste à 30 %, puis 60 %. Sorties pour uke : pont et rotation, crevette pour remettre une jambe.'],
      ['Opposition au sol (60-80 min)', 'départ : tori en kesa-gatame. Uke doit sortir en 20 s, tori doit tenir. Puis départ dos à dos assis, au signal : premier qui immobilise 10 s.'],
      ['Bilan et salut (80-90 min)', 'étirements. Bilan : définition d\'une immobilisation (uke sur le dos, contrôlé, tori face à lui, jambes de tori libres). Salut.'],
    ],
    niveaux: {}, criteres: 'tenir kesa-gatame 20 s face à un uke qui résiste à 50 % ; uke sait se dégager au moins une fois sur trois.',
    didac: 'Apprendre l\'immobilisation et sa sortie dans la même séance, pour que chaque rôle ait un problème à résoudre.',
    tech: ['yoko-ukemi', 'kesa-gatame', 'sortie-pont'],
    theorie: th('Les deux principes de Kano', 'Seiryoku zen\'yo : meilleure utilisation de l\'énergie. Jita kyoei : entraide et prospérité mutuelle. Je progresse grâce à mon partenaire, donc je le protège.'),
  },
  {
    n: 3, bloc: B1, titre: 'Chute avant et yoko-shiho-gatame',
    objectif: 'chuter en avant de façon roulée ; immobiliser par le côté avec yoko-shiho-gatame ; passer d\'une immobilisation à l\'autre.',
    deroule: [
      ['Accueil (0-5 min)', 'salut, objectif, rappel de la séance précédente.'],
      ['Échauffement (5-20 min)', 'mobilisation, roulades avant sur le dos puis sur l\'épaule, jeu « sumo » à genoux dans un cercle.'],
      ['Chutes (20-35 min)', 'révision arrière et côté. Chute avant roulée (mae-mawari-ukemi) : à genoux, main et bras en arc de cercle, rouler sur l\'épaule en diagonale jusqu\'à la hanche opposée, frapper du bras. Puis départ accroupi, puis debout. Option prudente : chute avant à plat (mae-ukemi) à genoux, avant-bras en triangle.'],
      ['Yoko-shiho-gatame (35-60 min)', 'démonstration. Points clés : tori perpendiculaire à uke, poitrine sur sa poitrine, une main sous la nuque saisit le col, l\'autre bras passe entre les jambes de uke, genoux serrés contre son flanc, hanches basses. Travail : 3 x 30 s par rôle. Enchaînement : kesa-gatame puis passage en yoko-shiho-gatame quand uke se dégage.'],
      ['Opposition au sol (60-80 min)', 'randori au sol de 1 min 30, départ à genoux face à face. Points : 10 s d\'immobilisation = 1 point. Rotation des partenaires.'],
      ['Bilan et salut (80-90 min)', 'étirements. Bilan : différence entre contrôle latéral et contrôle par le côté de la tête. Salut.'],
    ],
    niveaux: {}, criteres: 'chute avant roulée sans contact de la tête ; passer de kesa-gatame à yoko-shiho-gatame sans perdre le contrôle.',
    didac: 'Enchaîner les immobilisations répond au vrai problème du combat (uke bouge). Erreur fréquente : tori trop haut, hanches levées.',
    tech: ['mae-mawari-ukemi', 'mae-ukemi', 'yoko-shiho-gatame', 'kesa-gatame'],
    theorie: th('Le code moral', 'Politesse, courage, sincérité, honneur, modestie, respect, contrôle de soi, amitié : ces 8 valeurs du code moral du judo français guident le comportement sur le tapis et en dehors.'),
  },
  {
    n: 4, bloc: B2, titre: 'Kami-shiho-gatame, tate-shiho-gatame et retournements de uke à plat ventre',
    objectif: 'connaître les 4 immobilisations de base ; mettre sur le dos un partenaire allongé à plat ventre puis l\'immobiliser.',
    deroule: [
      ['Accueil (0-5 min)', 'salut, objectif.'],
      ['Échauffement (5-20 min)', 'mobilisation, crevettes, ponts, rotations sur le dos. Jeu « la crêpe » : uke à plat ventre s\'accroche au tapis, tori doit le retourner en 30 s.'],
      ['Chutes (20-30 min)', 'révision des 3 chutes, en ligne, des deux côtés.'],
      ['Kami-shiho-gatame et tate-shiho-gatame (30-45 min)', 'kami-shiho : tori à la tête de uke, poitrine sur sa poitrine, mains saisissent la ceinture sous ses bras, genoux écartés, hanches basses. Tate-shiho : tori à cheval sur le ventre de uke, jambes crochetées sous ses cuisses, un bras de uke bloqué contre sa tête. Travail : 2 x 30 s par immobilisation et par rôle.'],
      ['Retournements à plat ventre (45-60 min)', '1. Par le bras et la jambe : tori sur le côté, saisit le bras et la jambe opposés, tire vers lui et fait rouler uke sur le dos, enchaîne en yoko-shiho. 2. Par la tête : tori face à la tête, passe les bras sous les aisselles, saisit la ceinture, pivote pour retourner uke et finit en kami-shiho. Uke passif puis résistant à 50 %.'],
      ['Opposition au sol (60-80 min)', 'départ uke à plat ventre : tori a 30 s pour retourner et immobiliser 10 s. Changement de rôle. Puis randori au sol libre de 1 min 30.'],
      ['Bilan et salut (80-90 min)', 'bilan : tableau des 4 immobilisations (position de tori, zone contrôlée). Salut.'],
    ],
    niveaux: {}, criteres: 'citer et réaliser les 4 immobilisations ; retourner un uke à plat ventre qui résiste à 50 % au moins 1 fois sur 2.',
    didac: 'Se mettre à plat ventre est le réflexe défensif du débutant : il faut donc apprendre tôt à le retourner.',
    tech: ['kami-shiho-gatame', 'tate-shiho-gatame', 'retournement-jambe', 'retournement-tete', 'yoko-shiho-gatame'],
    theorie: th('Les 4 immobilisations de base', 'Kesa-gatame (en écharpe), yoko-shiho-gatame (par le côté), kami-shiho-gatame (par le haut), tate-shiho-gatame (à cheval). « Shiho » signifie « quatre points » : tori contrôle les deux épaules et les deux hanches de uke.'),
  },
  {
    n: 5, bloc: B2, titre: 'Renversements de uke à 4 pattes',
    objectif: 'renverser un partenaire en position de « tortue » ; enchaîner renversement et immobilisation ; défendre en tortue.',
    deroule: [
      ['Accueil (0-5 min)', 'salut, objectif.'],
      ['Échauffement (5-20 min)', 'mobilisation. Gainage en tortue. Jeu « le rocher » : uke à 4 pattes, tori doit le faire tomber sur le côté en 20 s.'],
      ['Chutes (20-30 min)', 'chutes avant roulées en série, chutes côté depuis la position accroupie.'],
      ['3 renversements (30-60 min)', '1. Par le côté (bras et cuisse) : tori sur le côté, crochète le bras proche et la cuisse proche de uke, tire vers lui et pousse de l\'épaule, uke roule sur le dos, enchaînement yoko-shiho-gatame. 2. Par la tête : tori face à la tête de uke, passe un bras sous l\'aisselle, saisit la ceinture, pivote autour de la tête et renverse, enchaînement kami-shiho-gatame. 3. Roulé par-dessus : tori sur le côté, passe le bras sous le ventre et saisit le revers ou le bras opposé, roule sur son épaule en entraînant uke, finit en kesa-gatame. Pour chaque renversement : 5 répétitions par côté, uke passif, puis 5 avec résistance.'],
      ['Opposition à thème (60-80 min)', 'départ uke en tortue : tori a 20 s pour renverser et immobiliser. Uke doit tenir ou se relever. 4 rotations. Puis randori au sol de 2 min.'],
      ['Bilan et salut (80-90 min)', 'bilan : choix du renversement selon la position de uke (coudes collés, genoux écartés). Salut.'],
    ],
    niveaux: {}, criteres: 'réussir 2 renversements différents sur un uke qui résiste à 50 %, avec une immobilisation enchaînée sans temps mort.',
    didac: 'Faire chercher la solution d\'abord (jeu du rocher), montrer la technique ensuite. Erreur fréquente : tori pousse sans tirer, uke reste stable.',
    tech: ['retournement-bras-ceinture', 'retournement-tete', 'retournement-crochet', 'yoko-shiho-gatame', 'kami-shiho-gatame', 'kesa-gatame'],
    theorie: th('Tori et uke', 'Tori est celui qui réalise la technique, uke celui qui la subit. Uke n\'est pas un adversaire mais un partenaire : sa résistance dosée (30 %, 50 %, 100 %) est une variable didactique majeure.'),
  },
  {
    n: 6, bloc: B2, titre: 'Opposition au sol et arbitrage du sol',
    objectif: 'utiliser au sol tout ce qui a été appris en randori ; arbitrer un combat au sol ; connaître les annonces et les temps d\'immobilisation.',
    deroule: [
      ['Accueil (0-5 min)', 'salut, objectif.'],
      ['Échauffement (5-20 min)', 'mobilisation, jeux d\'opposition à genoux en rotation.'],
      ['Révision technique (20-30 min)', 'en couple, uke choisit sa position (dos, ventre, tortue), tori enchaîne retournement ou renversement et immobilisation. 3 min par rôle.'],
      ['Arbitrage du sol (30-45 min)', 'annonces et gestes : Hajime, Mate, Osae-komi (bras tendu vers les combattants), Toketa (bras qui balaie, sortie d\'immobilisation), Sono-mama et Yoshi (figer et reprendre), Soremade (fin). Temps FIJ 2025 : 5 à 9 s = yuko, 10 à 19 s = waza-ari, 20 s = ippon. Abandon par 2 frappes = ippon.'],
      ['Randori au sol arbitré (45-80 min)', 'groupes de 3 : 2 combattants, 1 arbitre avec chronomètre. Combats de 2 min, départ à genoux. Rotation des rôles après chaque combat. L\'enseignant passe et valide les annonces.'],
      ['Bilan et salut (80-90 min)', 'bilan de l\'étape sol, auto-évaluation des 4 immobilisations, des retournements et des renversements. Salut.'],
    ],
    niveaux: {}, criteres: 'enchaîner au moins une fois en randori un renversement et une immobilisation tenue 10 s ; arbitrer un combat avec les bonnes annonces.',
    didac: 'Le rôle d\'arbitre est un rôle d\'apprentissage : il oblige à identifier ce qu\'est une immobilisation valable.',
    tech: ['kesa-gatame', 'yoko-shiho-gatame', 'kami-shiho-gatame', 'tate-shiho-gatame', 'sortie-pont'],
    theorie: th('Arbitrer le sol', 'Osae-komi lance le temps, Toketa l\'arrête. Yuko de 5 à 9 s, waza-ari de 10 à 19 s, ippon à 20 s. L\'abandon (2 frappes) donne ippon.'),
  },
  {
    n: 7, bloc: B3, titre: 'Saisie, déplacements, déséquilibres et o-soto-gari (ashi-waza)',
    objectif: 'saisir le partenaire et se déplacer en restant équilibré ; déséquilibrer avant de projeter ; réaliser une première projection, o-soto-gari.',
    deroule: [
      ['Accueil (0-5 min)', 'salut, objectif, annonce de l\'étape debout. Rappel des familles : te-waza (bras), koshi-waza (hanches), ashi-waza (jambes) et sutemi-waza (sacrifice).'],
      ['Échauffement (5-20 min)', 'mobilisation. Jeu « pousse-tire » : en saisie, faire sortir le partenaire d\'un carré. Jeu « les pieds » : toucher le pied du partenaire avec le sien sans se faire toucher.'],
      ['Chutes (20-30 min)', 'chute arrière depuis debout, avec un partenaire qui accompagne en tenant la manche.'],
      ['Kumikata et déplacements (30-45 min)', 'garde de base : main droite au revers gauche, main gauche à la manche droite sous le coude. Posture naturelle (shizentai), posture défensive (jigotai). Déplacements : pas glissés (tsugi-ashi), pas marchés (ayumi-ashi), sans croiser les pieds. Déséquilibres (kuzushi) : avant, arrière, côtés, diagonales, en tirant et poussant avec les deux mains.'],
      ['O-soto-gari (45-70 min)', 'démonstration. Étapes : 1. tori déséquilibre uke en arrière sur son talon droit ; 2. avance le pied gauche à côté de uke ; 3. fauche la jambe droite de uke avec l\'arrière de sa jambe droite, poitrine contre poitrine ; 4. retient la manche pour amortir la chute. Progression : uchi-komi (répétition sans projection) 3 x 10, puis nage-komi (projection) uke en position basse, puis debout. 5 projections par côté.'],
      ['Opposition debout à thème (70-82 min)', 'faire reculer le partenaire hors d\'une zone en conservant la saisie, 1 min. Pas de projection en opposition à cette séance.'],
      ['Bilan et salut (82-90 min)', 'bilan : sans déséquilibre, pas de projection. Salut.'],
    ],
    niveaux: {}, criteres: 'se déplacer 30 s sans croiser les pieds ; projeter en o-soto-gari en gardant la manche de uke.',
    didac: 'Uke est un partenaire qui apprend à chuter ; tori est responsable de sa chute. Erreur fréquente : tori fauche en reculant le buste, sans déséquilibre.',
    tech: ['o-soto-gari', 'ushiro-ukemi'],
    theorie: th('Kuzushi, tsukuri, kake', 'Toute projection a trois temps : kuzushi (déséquilibrer), tsukuri (se placer), kake (exécuter). Sans kuzushi, la technique repose sur la force.'),
  },
  {
    n: 8, bloc: B3, titre: 'O-goshi (koshi-waza)',
    objectif: 'projeter par la hanche ; enchaîner déplacement, déséquilibre et entrée ; consolider o-soto-gari.',
    deroule: [
      ['Accueil (0-5 min)', 'salut, objectif.'],
      ['Échauffement (5-20 min)', 'mobilisation. Portés de partenaire sur le dos (« sacs de farine ») pour sentir le placement des hanches. Jeu pousse-tire.'],
      ['Chutes (20-30 min)', 'chute de côté depuis debout, puis chute après une rotation sur le partenaire à genoux.'],
      ['Révision o-soto-gari (30-40 min)', 'uchi-komi 2 x 10, nage-komi 5 par côté.'],
      ['O-goshi (40-65 min)', 'démonstration. Étapes : 1. tori déséquilibre uke vers l\'avant en tirant la manche ; 2. pivote pour placer ses hanches sous celles de uke, pieds entre les pieds de uke, genoux fléchis ; 3. bras droit entoure la taille de uke ; 4. tend les jambes, tire et tourne pour faire passer uke par-dessus la hanche. Progression : uchi-komi 3 x 10, projection depuis l\'arrêt, puis après un déplacement.'],
      ['Randori debout souple (65-82 min)', 'yakusoku-geiko : déplacements libres, chacun projette à son tour sans résistance, avec o-soto-gari ou o-goshi. 3 x 2 min, rotation.'],
      ['Bilan et salut (82-90 min)', 'bilan : les 3 temps d\'une projection, kuzushi, tsukuri (placement), kake (exécution). Salut.'],
    ],
    niveaux: {}, criteres: 'hanches de tori plus basses que celles de uke ; uke projeté sans que tori tombe avec lui.',
    didac: 'Apprendre par le placement. Variable : faire travailler avec un uke immobile, puis qui avance, puis qui recule.',
    tech: ['o-goshi', 'o-soto-gari', 'yoko-ukemi'],
    theorie: th('Les familles de projection', 'Nage-waza (projections) = tachi-waza (te-waza, koshi-waza, ashi-waza) + sutemi-waza (ma-sutemi, yoko-sutemi). O-goshi est la technique de hanche de référence.'),
  },
  {
    n: 9, bloc: B3, titre: 'Tai-otoshi (te-waza) et choix de la technique',
    objectif: 'projeter par le travail des bras avec tai-otoshi ; choisir une technique selon le déplacement du partenaire.',
    deroule: [
      ['Accueil (0-5 min)', 'salut, objectif.'],
      ['Échauffement (5-20 min)', 'mobilisation. Jeu « le miroir » : un guide se déplace, l\'autre suit en conservant la distance.'],
      ['Chutes (20-30 min)', 'chute avant roulée debout, chute de côté.'],
      ['Tai-otoshi (30-55 min)', 'démonstration. Étapes : 1. déséquilibre vers l\'avant droit ; 2. tori pivote, pied gauche en arrière, pied droit tendu devant la cheville droite de uke ; 3. traction des deux bras en rotation, comme un volant. La jambe ne fauche pas, elle bloque. Progression : uchi-komi 3 x 10, nage-komi 5 par côté.'],
      ['Choix de la technique (55-70 min)', 'uke recule : o-soto-gari. Uke avance : o-goshi ou tai-otoshi. Travail en déplacement guidé, 3 min par rôle.'],
      ['Randori debout à thème (70-82 min)', 'uke résiste à 30 %, tori a 1 min pour placer une projection. Changement de rôle.'],
      ['Bilan et salut (82-90 min)', 'bilan : utiliser la force de l\'autre (principe du judo, « meilleure utilisation de l\'énergie »). Salut.'],
    ],
    niveaux: {}, criteres: 'réaliser tai-otoshi des deux côtés ; adapter la technique au sens du déplacement de uke 3 fois sur 5.',
    didac: 'Tai-otoshi est une technique de bras où la jambe n\'est qu\'un obstacle, souvent mal compris par les débutants.',
    tech: ['tai-otoshi', 'o-soto-gari', 'o-goshi', 'mae-mawari-ukemi'],
    theorie: th('Utiliser la force de l\'autre', 'Quand uke pousse, je tire et je tourne ; quand il tire, je pousse et j\'avance. Le sens du déplacement de uke décide de la technique.'),
  },
  {
    n: 10, bloc: B3, titre: 'Tomoe-nage (sutemi-waza) et randori debout',
    objectif: 'découvrir une technique de sacrifice ; connaître les 4 familles de projection ; s\'opposer debout avec une résistance réelle.',
    deroule: [
      ['Accueil (0-5 min)', 'salut, objectif.'],
      ['Échauffement (5-20 min)', 'mobilisation, roulades avant et arrière, chutes en série.'],
      ['Chutes (20-30 min)', 'chute avant roulée par-dessus un partenaire à 4 pattes.'],
      ['Tomoe-nage (30-50 min)', 'sur tapis épais si possible. Étapes : 1. tori tire uke vers l\'avant ; 2. glisse entre ses jambes et s\'assoit au plus près de ses talons ; 3. place le pied au niveau de la ceinture de uke ; 4. roule sur le dos en tendant la jambe et en tirant les bras vers le haut. Uke chute en avant roulée. Progression lente, 5 répétitions par côté. Option : démonstration seule pour les étudiants mal à l\'aise.'],
      ['Rappel des familles (50-60 min)', 'chaque couple montre une technique par famille : tai-otoshi (te-waza), o-goshi (koshi-waza), o-soto-gari (ashi-waza), tomoe-nage (sutemi-waza).'],
      ['Randori debout (60-82 min)', 'règles : saisie obligatoire, pas de projection sur la tête, pas de plongeon, abandon au signal. 4 x 2 min, rotation. L\'enseignant arrête tout couple qui prend des risques.'],
      ['Bilan et salut (82-90 min)', 'bilan de l\'étape debout. Salut.'],
    ],
    niveaux: {}, criteres: 'citer les 4 familles et une technique de chacune ; placer au moins une projection en randori.',
    didac: 'Le randori libre se mérite : il vient après la maîtrise des chutes et des règles. Sécurité accrue sur les sacrifices.',
    tech: ['tomoe-nage', 'tai-otoshi', 'o-goshi', 'o-soto-gari', 'mae-mawari-ukemi'],
    theorie: th('Le randori', 'Randori signifie « exercice libre ». Ce n\'est pas une compétition : on cherche à placer ses techniques et à chuter, en respectant le partenaire.'),
  },
  {
    n: 11, bloc: B4, titre: 'Liaison debout-sol',
    objectif: 'enchaîner une projection et une immobilisation sans temps mort ; profiter d\'une attaque ratée de l\'adversaire pour passer au sol.',
    deroule: [
      ['Accueil (0-5 min)', 'salut, objectif.'],
      ['Échauffement (5-20 min)', 'mobilisation. Jeu « debout-couché » : au signal, chaque couple passe du jeu pousse-tire au combat à genoux.'],
      ['Chutes (20-30 min)', 'chutes en série des 3 types, puis chute suivie d\'une sortie rapide (se tourner, se protéger).'],
      ['Projection puis immobilisation (30-55 min)', 'enchaînements types : o-soto-gari puis kesa-gatame ; o-goshi puis kesa-gatame ; tai-otoshi puis yoko-shiho-gatame. Consigne : tori garde la manche et suit uke au sol. 5 répétitions par enchaînement et par côté.'],
      ['Attaque ratée (55-65 min)', 'uke chute à 4 pattes après une attaque manquée : tori renverse (séance 5) et immobilise. 3 min par rôle.'],
      ['Randori complet (65-82 min)', 'départ debout, le combat continue au sol après une chute. Règles de sécurité de la séance 10. 4 x 2 min, rotation.'],
      ['Bilan et salut (82-90 min)', 'bilan : le judo est un combat continu debout et au sol. Salut.'],
    ],
    niveaux: {}, criteres: 'enchaîner projection et immobilisation en moins de 2 s ; immobiliser au moins une fois en randori après une action debout.',
    didac: 'La liaison donne du sens aux deux parties du cycle. Erreur fréquente : tori lâche la manche et laisse uke se retourner.',
    tech: ['o-soto-gari', 'o-goshi', 'tai-otoshi', 'kesa-gatame', 'yoko-shiho-gatame', 'retournement-bras-ceinture'],
    theorie: th('Tachi-waza et ne-waza', 'Le judo se pratique debout (tachi-waza) et au sol (ne-waza). La liaison entre les deux est souvent décisive en combat.'),
  },
  {
    n: 12, bloc: B4, titre: 'Arbitrage complet et combats arbitrés',
    objectif: 'connaître les valeurs des points debout et au sol, les pénalités et les gestes ; arbitrer un combat complet ; combattre dans le respect des règles.',
    deroule: [
      ['Accueil (0-5 min)', 'salut, objectif.'],
      ['Échauffement (5-20 min)', 'mobilisation, randori souple 2 x 1 min 30.'],
      ['Règles et gestes (20-40 min)', 'debout (FIJ 2025) : ippon = projection sur le dos avec contrôle, force et vitesse ; waza-ari = un critère manque ; yuko = chute sur le côté de façon plus marquée. Deux waza-ari = ippon. Au sol : yuko 5 à 9 s, waza-ari 10 à 19 s, ippon 20 s. Pénalités (shido) : passivité, fausse attaque, sortie de la surface, refus de saisie ; 3 shido = hansoku-make (défaite). Gestes de l\'arbitre travaillés en miroir.'],
      ['Vidéos ou démonstrations (40-50 min)', 'l\'enseignant réalise des projections et immobilisations : les étudiants annoncent et font le geste correspondant.'],
      ['Combats arbitrés (50-82 min)', 'groupes de 3 ou 4 : 2 combattants, 1 arbitre, 1 chronométreur-marqueur. Combats de 2 min. Rotation des rôles. Fiche de marque simple (points et shido).'],
      ['Bilan et salut (82-90 min)', 'bilan : erreurs d\'arbitrage fréquentes. Présentation des modalités d\'évaluation. Salut.'],
    ],
    niveaux: {}, criteres: 'annoncer et faire le geste correct dans 4 situations sur 5 ; combattre sans pénalité pour comportement dangereux.',
    didac: 'Pour des débutants, l\'enseignant peut adapter le règlement (combat à genoux, durée réduite, pas de pénalité de passivité) ; cette adaptation est elle-même un contenu d\'enseignement.',
    tech: [],
    theorie: th('Les valeurs des points', 'Ippon (victoire), waza-ari, yuko. Deux waza-ari donnent ippon. Shido : pénalité ; 3 shido = hansoku-make.'),
  },
  {
    n: 13, bloc: B4, titre: 'Préparation des évaluations',
    objectif: 'revoir l\'ensemble des contenus du cycle ; s\'entraîner aux épreuves pratique et théorique dans les conditions de l\'examen.',
    deroule: [
      ['Accueil (0-5 min)', 'salut, rappel des modalités d\'évaluation.'],
      ['Échauffement (5-20 min)', 'échauffement mené par 2 ou 3 étudiants (compétence d\'intervention évaluable).'],
      ['Révision technique (20-45 min)', 'ateliers tournants de 6 min : 1. chutes ; 2. 4 immobilisations et sorties ; 3. retournements et renversements ; 4. 4 familles de projection.'],
      ['Simulation de démonstration (45-60 min)', 'par couple, enchaînement de l\'épreuve pratique, observé par un autre couple avec la grille d\'évaluation.'],
      ['Combats d\'entraînement arbitrés (60-80 min)', 'combats de 2 min, comme à l\'examen.'],
      ['Révision théorique (80-90 min)', 'quiz oral rapide sur le vocabulaire, l\'histoire, les règles et la didactique. Questions des étudiants. Salut.'],
    ],
    niveaux: {}, criteres: 'réaliser la démonstration complète sans oubli ; obtenir au moins 70 % au quiz oral.',
    didac: 'L\'auto-évaluation et l\'évaluation par les pairs avec la grille préparent l\'examen et forment au regard d\'enseignant.',
    tech: ['ushiro-ukemi', 'yoko-ukemi', 'mae-mawari-ukemi', 'kesa-gatame', 'yoko-shiho-gatame', 'kami-shiho-gatame', 'tate-shiho-gatame', 'tai-otoshi', 'o-goshi', 'o-soto-gari', 'tomoe-nage'],
    theorie: th('Révision', 'Rien de nouveau : on vérifie ce qui est acquis avec le quiz oral, et on répond aux questions avant l\'écrit.'),
  },
  {
    n: 14, bloc: B5, titre: 'Évaluation pratique',
    objectif: 'évaluer la maîtrise technique (démonstration) et l\'efficacité en opposition (combat arbitré).',
    deroule: [
      ['Accueil (0-5 min)', 'salut, rappel du déroulé et de la grille. Tirage des couples (gabarits proches).'],
      ['Échauffement (5-20 min)', 'échauffement autonome guidé, chutes, randori souple.'],
      ['Démonstration technique (20-60 min)', 'par couple, 3 min par candidat : 1. 3 chutes (arrière, côté, avant roulée) ; 2. les 4 immobilisations avec une sortie au choix ; 3. 1 retournement à plat ventre et 1 renversement à 4 pattes, enchaînés avec une immobilisation ; 4. 1 technique par famille de projection, des deux côtés pour l\'une d\'elles ; 5. 1 liaison debout-sol. Pendant ce temps, les autres couples s\'échauffent ou arbitrent.'],
      ['Combats arbitrés (60-85 min)', 'combats de 2 min, départ debout, arbitrés par les étudiants (note d\'arbitrage). 2 combats par candidat. Règles de sécurité du cycle.'],
      ['Bilan et salut (85-90 min)', 'bilan rapide, retours individuels à la séance suivante. Salut.'],
    ],
    niveaux: {}, criteres: 'grille d\'évaluation pratique /12 (démonstration /6, combat /4, arbitrage /2), dans l\'onglet Évaluation.',
    didac: 'En cas de blessure ou d\'appréhension, prévoir un combat au sol à la place du combat debout. Les étudiants dispensés passent l\'épreuve d\'arbitrage et la démonstration commentée à l\'oral.',
    tech: [],
    theorie: null,
  },
  {
    n: 15, bloc: B5, titre: 'Évaluation théorique et bilan du cycle',
    objectif: 'évaluer les connaissances culturelles, réglementaires et didactiques ; conclure le cycle.',
    deroule: [
      ['Accueil (0-5 min)', 'salut, consignes de l\'épreuve.'],
      ['Épreuve écrite (5-45 min)', 'partie 1, QCM : vocabulaire, histoire, familles, immobilisations, règles et temps d\'arbitrage. Partie 2, question de didactique : construire une séance de 1 h pour des débutants sur un thème donné (par exemple « faire découvrir l\'immobilisation à des élèves de 6e »), avec objectif, situations, critères de réussite et règles de sécurité.'],
      ['Correction collective du QCM (45-55 min)', 'questions des étudiants.'],
      ['Randori libre et rattrapage (55-80 min)', 'randori au choix sol ou debout ; rattrapage de l\'épreuve pratique pour les absents.'],
      ['Bilan et salut (80-90 min)', 'bilan du cycle : ce que les étudiants retiennent pour pratiquer et pour enseigner. Questionnaire de satisfaction. Salut final.'],
    ],
    niveaux: {}, criteres: 'écrit /8 : QCM /4 et question de didactique /4 (barème réglable dans Réglages).',
    didac: 'La question de didactique vérifie que l\'étudiant sait transposer la progression vécue à un public scolaire.',
    tech: [],
    theorie: null,
  },
];

// Où chaque fondamental est travaillé dans la progression en 15 séances
export const PLACE_P15 = { immos: [2, 3, 4, 6], retournements: [4, 5, 6], te: [9, 10], koshi: [8, 10], ashi: [7, 10], masutemi: [10], yokosutemi: [], solOpp: [1, 2, 3, 4, 5, 6], deboutOpp: [7, 9, 10, 11, 12, 13] };
