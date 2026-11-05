// Parcours L2 STAPS : formation de futurs intervenants (enseigner, observer, arbitrer, analyser)
// Les modalités réelles dépendent de la fiche de l'UE de chaque université : tout reste réglable.

export const PARCOURS = {
  suaps: { label: 'SUAPS / option notée', court: 'SUAPS', bareme: { qcm: 8, ptQcm: 0.5, courtes: 2, ptCourte: 1 }, contenu: 'base' },
  staps: { label: 'L2 STAPS', court: 'STAPS', bareme: { qcm: 6, ptQcm: 0.5, courtes: 3, ptCourte: 1 }, contenu: 'tout' },
  eleves: { label: 'Prog Élèves', court: 'Prog Élèves', bareme: { qcm: 16, ptQcm: 0.25, courtes: 1, ptCourte: 4 }, contenu: 'base' },
};

// Grille STAPS (/14) : la pratique pèse moins, l'intervention pédagogique entre dans la note
export const GRILLE_STAPS = [
  { epreuve: 'A. Démonstration technique', total: 4, criteres: [
    { id: 'a1', label: 'Kuzushi (déséquilibre) et tsukuri (placement)', max: 2 },
    { id: 'a2', label: 'Chute de uke contrôlée', max: 1 },
    { id: 'a3', label: 'Liaison debout-sol', max: 1 },
  ] },
  { epreuve: 'B. Randori', total: 3, criteres: [
    { id: 'b1', label: 'Attitude offensive', max: 1 },
    { id: 'b2', label: 'Variété et efficacité', max: 1 },
    { id: 'b3', label: 'Défense et sécurité', max: 1 },
  ] },
  { epreuve: 'C. Intervention pédagogique (conduite d\'une situation)', total: 6, criteres: [
    { id: 'd1', label: 'Objectif clair, consignes et critères de réussite annoncés', max: 1.5 },
    { id: 'd2', label: 'Organisation, gestion du temps et sécurité (appariement, espace)', max: 1.5 },
    { id: 'd3', label: 'Observation et régulation (retours, variables didactiques)', max: 1.5 },
    { id: 'd4', label: 'Justification : lien avec les principes techniques et le niveau du public', max: 1.5 },
  ] },
  { epreuve: 'D. Rôles sociaux', total: 1, criteres: [
    { id: 'c1', label: 'Arbitrage : gestes et annonces justes', max: 0.5 },
    { id: 'c2', label: 'Observateur ou uke fiable et sûr', max: 0.5 },
  ] },
];

// Volet STAPS de chaque séance : objectif de formation + tâche confiée aux étudiants
export const VOLET = {
  p15: {},
  p12: {
    1: ['Identifier les risques d\'une activité de combat et les règles qui les maîtrisent.', 'Observer le test de positionnement d\'un camarade et relever les critères de sécurité des chutes (tête, frappe à 45°).'],
    2: ['Analyser l\'équilibre : centre de gravité, polygone de sustentation, 8 directions de kuzushi.', 'Par binôme, noter la direction de déséquilibre obtenue sur chaque tentative.'],
    3: ['Concevoir une situation d\'opposition au sol adaptée à des débutants.', 'Un ou deux étudiants conduisent le jeu « retourner la tortue » (5 min) : but, consignes, sécurité.'],
    4: ['Décomposer une projection en kuzushi, tsukuri, kake.', 'Filmer un camarade en o-soto-gari et repérer la phase qui pose problème ; réajustement des niveaux.'],
    5: ['Gérer le passage de la coopération à l\'opposition.', 'Deux étudiants conduisent l\'échauffement ; arbitrage des premiers randori debout (hajime, matte).'],
    6: ['Distinguer projections de levier (hanche, épaule) et de couple (fauchages, balayages).', 'Un étudiant conduit une situation d\'apprentissage d\'o-goshi ; les autres observent avec la fiche.'],
    7: ['Comprendre le principe action-réaction des combinaisons.', 'Fiche d\'observation en randori : attaques avant / arrière, réussites, liaisons au sol.'],
    8: ['Manipuler une variable didactique pour gérer le risque (vitesse, opposition, tapis).', 'Conduire une situation de contre en faisant évoluer une variable ; justifier ce choix.'],
    9: ['Prévenir les accidents en clés et étranglements ; préparer l\'écrit.', 'Rédiger en binôme les règles de sécurité de la situation du jour ; révision des questions courtes.'],
    10: ['Connaître et appliquer le règlement d\'arbitrage.', 'Écrit, puis chacun arbitre et tient la table de marque.'],
    11: ['Démontrer et enseigner.', 'Démonstration technique évaluée ; interventions pédagogiques évaluées.'],
    12: ['Combattre, arbitrer, faire le bilan de sa formation.', 'Randori évalués, arbitrage ; bilan écrit de ce que l\'on retient pour enseigner le judo.'],
  },
  p24: {
    1: ['Identifier les risques d\'une activité de combat et les règles qui les maîtrisent.', 'Observer le test de positionnement d\'un camarade et relever les critères de sécurité des chutes.'],
    2: ['Analyser l\'équilibre : centre de gravité, polygone de sustentation, 8 directions.', 'Noter la direction de déséquilibre obtenue sur chaque tentative du binôme.'],
    3: ['Construire une situation au sol : but, consignes, critères de réalisation et de réussite.', 'Distinguer critères de réalisation et de réussite pour la situation « sortir en 30 s ».'],
    4: ['Concevoir une situation d\'opposition au sol adaptée à des débutants.', 'Un ou deux étudiants conduisent le jeu « retourner la tortue ».'],
    5: ['Comprendre le rôle du kumikata et des postures dans l\'opposition.', 'Deux étudiants conduisent l\'échauffement (jeux de saisie).'],
    6: ['Décomposer une projection en kuzushi, tsukuri, kake.', 'Filmer un camarade en o-soto-gari et repérer la phase qui pose problème.'],
    7: ['Différencier fauchage, accrochage et balayage (vocabulaire et mécanique).', 'Un étudiant conduit une situation sur o-uchi-gari ; retours des observateurs.'],
    8: ['Penser la continuité debout-sol dans une progression.', 'Conduire le jeu « projeter puis contrôler en 3 s » ; arbitrage du sol.'],
    9: ['Gérer le passage de la coopération à l\'opposition.', 'Fiche d\'observation du randori à thème ; arbitrage des débutants.'],
    10: ['Comprendre les projections de levier (centre de gravité, point d\'appui).', 'Un étudiant conduit une situation d\'apprentissage d\'o-goshi.'],
    11: ['Analyser l\'entrée sous le centre de gravité (seoi-nage) ; histoire du judo olympique.', 'Analyse vidéo comparée de deux entrées de seoi-nage.'],
    12: ['Évaluer de façon formative : observer, noter, faire un retour.', 'Chaque étudiant note un camarade avec la grille et lui fait un retour oral.'],
    13: ['Comprendre les projections de couple et le timing.', 'Conduire le jeu « marcher sur les pieds » et l\'adapter à deux niveaux.'],
    14: ['Relier action-réaction et combinaisons (3e loi de Newton).', 'Fiche d\'observation : attaques avant / arrière et enchaînements réussis.'],
    15: ['Comprendre les formes de l\'initiative (go no sen, sen no sen).', 'Conduire une situation de contre en faisant évoluer la vitesse d\'attaque.'],
    16: ['Gérer le risque avec les variables didactiques (tapis, niveau de uke, vitesse).', 'Justifier par écrit les conditions de sécurité des sacrifices.'],
    17: ['Prévenir les blessures articulaires.', 'Rédiger les règles de sécurité des clés et les faire appliquer à un groupe.'],
    18: ['Connaître la physiologie et les risques des étranglements.', 'Préparer une fiche de prévention ; révision des questions courtes.'],
    19: ['Analyser l\'activité en randori : profil intermittent, filières énergétiques.', 'Relever durées d\'effort et de pause d\'un randori de 3 min ; calculer le ratio.'],
    20: ['Connaître et appliquer le règlement d\'arbitrage FIJ.', 'Chacun arbitre et tient la table de marque.'],
    21: ['Préparer une intervention complète.', 'Rédiger la fiche de préparation de l\'intervention évaluée et la tester sur un binôme.'],
    22: ['Mobiliser les connaissances théoriques.', 'Écrit (questions de la fiche théorie et d\'approfondissement STAPS).'],
    23: ['Démontrer et enseigner.', 'Démonstration technique évaluée ; interventions pédagogiques évaluées.'],
    24: ['Combattre, arbitrer, faire le bilan de sa formation.', 'Randori évalués, arbitrage ; bilan de ce que l\'on retient pour enseigner le judo.'],
  },
};

// Compteurs de la fiche d'observation de randori
export const OBS_ITEMS = [
  ['atAv', 'Attaques vers l\'avant'], ['atAr', 'Attaques vers l\'arrière'], ['atCo', 'Attaques sur le côté / balayages'],
  ['proj', 'Projections réussies'], ['liai', 'Liaisons debout-sol'], ['immo', 'Immobilisations obtenues'],
  ['chute', 'Chutes subies'], ['shido', 'Comportements pénalisables (passivité, sortie…)'],
];

// Fiche de préparation d'une intervention
export const PREP_CHAMPS = [
  ['titre', 'Titre de la situation', 1], ['public', 'Public et niveau visés', 1], ['duree', 'Durée', 1],
  ['objectif', 'Objectif (ce que les élèves doivent apprendre)', 2], ['but', 'But pour les élèves (ce qu\'ils doivent obtenir)', 2],
  ['dispositif', 'Dispositif (espace, binômes, matériel, rotations)', 3], ['consignes', 'Consignes (autorisé / interdit, rôles)', 3],
  ['realisation', 'Critères de réalisation (comment faire)', 3], ['reussite', 'Critères de réussite (résultat attendu)', 2],
  ['variables', 'Variables pour simplifier / complexifier', 3], ['securite', 'Sécurité', 2], ['regulation', 'Observations et régulations prévues', 2],
];
