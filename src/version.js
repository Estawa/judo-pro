export const VERSION = '1.4.1';
export const CHANGELOG = [
  { v: '1.4.1', d: '5 novembre 2026', l: [
    'Séances : toutes les techniques prévues dans une séance s\'affichent désormais, quel que soit le niveau choisi (en Prog Élèves, tai-otoshi en séance 9 et la chute avant roulée étaient masqués par le filtre « Débutant »).',
  ] },
  { v: '1.4.0', d: '5 novembre 2026', l: [
    'Troisième parcours dans Réglages : « Prog Élèves ». L\'appli prend trois formes selon le choix : SUAPS / option notée, L2 STAPS, Prog Élèves.',
    'Prog Élèves : progression de 15 séances de 1 h 30 pour un groupe débutant, présentée aux étudiants comme on la ferait avec des élèves (sol S1 à S6, debout S7 à S10, liaison et arbitrage S11 à S13, évaluations S14 et S15).',
    'Chaque séance : objectif, déroulé minuté, critères de réussite, point didactique, techniques liées et théorie en 5 minutes.',
    'Pages adaptées en Prog Élèves : cadre de la progression (étapes, contenus, séance type, sécurité), fondamentaux par séance, bilan de l\'étape sol et démonstration attendue dans Groupe, grille pratique /12 (démonstration, combat arbitré, arbitrage), écrit /8 avec une question de didactique.',
    'Trois questions de didactique ajoutées à la banque (construire une séance pour débutants, justifier la progression).',
  ] },
  { v: '1.3.0', d: '4 novembre 2026', l: [
    'Fin d\'accès des étudiants : après la date de fin (ou dès que le professeur ferme l\'accès), l\'espace étudiant affiche « Accès terminé » et ne fonctionne plus, même sur un téléphone où l\'appli est installée et hors connexion.',
    'Code professeur commun à tous les appareils (le code 1234 ne fonctionne plus) ; code personnel possible en plus sur un appareil.',
    'Réglages : carte « Partager avec les étudiants » (lien, bouton Partager, Copier le lien) et état de l\'accès étudiant.',
  ] },
  { v: '1.2.1', d: '4 novembre 2026', l: [
    'Import de la liste des étudiants depuis un fichier Excel (.xlsx et .xls), LibreOffice (.ods) ou CSV, sans connexion.',
    'Import plus souple : ligne de titre au-dessus des en-têtes ignorée, colonne unique « Élève » (NOM Prénom) reconnue, niveaux écrits en toutes lettres acceptés, étudiants déjà présents non ajoutés deux fois.',
  ] },
  { v: '1.2.0', d: '4 novembre 2026', l: [
    'Nouvel onglet « Fondamentaux » : les 4 immobilisations de base (position, contrôle, retournement qui y mène, sortie, passage de l\'une à l\'autre), les retournements de uke à quatre pattes, les familles de techniques debout avec une technique de référence chacune, les familles du sol, l\'opposition au sol et debout (règles, étapes, situations) et la place de chaque fondamental dans le cycle.',
    'Trois retournements ajoutés (par la jambe, par la tête, en roulant avec crochet) avec leurs schémas.',
    'Séances de sol complétées : découverte des 4 immobilisations dès le début du cycle, quatre façons de renverser uke à quatre pattes.',
    'Encart « Fondamentaux du cycle abordés » dans chaque séance ; nouvelles questions de quiz.',
  ] },
  { v: '1.1.0', d: '3 novembre 2026', l: [
    'Choix du parcours dans Réglages : SUAPS / option notée ou L2 STAPS (barème d\'écrit conseillé et passage à 12 séances proposés).',
    'L2 STAPS : volet de formation dans chaque séance (objectif de formation, tâche des étudiants) et désignation des étudiants qui conduisent l\'échauffement ou une situation.',
    'Nouvel onglet « Observer » (L2 STAPS, étudiants et professeur) : fiche d\'observation de randori avec compteurs, chrono et efficacité ; fiche de préparation d\'intervention ; fiches vierges à imprimer.',
    'Évaluation L2 STAPS : démonstration /4, randori /3, intervention pédagogique /6, rôles sociaux /1, écrit /6 (fiche théorie + approfondissement STAPS).',
    'Nouveau chapitre « Préparer et conduire une intervention » et nouvelles questions de didactique.',
  ] },
  { v: '1.0.0', d: '3 novembre 2026', l: [
    'Première version de Judo Pro by C. Guilhem, pour les cours de judo en L2 STAPS.',
    'Programmations de 24 et 12 séances reprises des documents « Programmation Judo universitaire », déclinées en 4 niveaux, avec la théorie en 5 minutes et le mini-quiz de chaque séance.',
    'Bibliothèque de techniques : chutes, projections, immobilisations, étranglements, clés, retournements ; schémas animés (placement des pieds, positions au sol, chutes), direction du déséquilibre, points clés, erreurs, sécurité, éducatifs.',
    'Liens vers les fiches et animations 3D de la Fédération internationale de judo, recherche YouTube, vidéos YouTube choisies et médias personnels (photos, vidéos, GIF) stockés sur l\'appareil.',
    'Théorie L2 STAPS : histoire, principes, analyse technique, biomécanique, physiologie, didactique, grades et kata, sécurité ; lexique, cartes mémoire, décodeur des noms.',
    'Arbitrage FIJ 2026 : règles, annonces et gestes animés, quiz de situations, table de marque avec osae-komi et golden score.',
    'Quiz d\'entraînement, écrit sur l\'appareil corrigé automatiquement, sujet et corrigé imprimables, banque de questions.',
    'Groupe : import CSV, niveaux, appel, binômes, bilan de mi-parcours, programme de démonstration ; évaluation pratique /14 et théorique /6, export CSV.',
    'Tous les dessins (schémas des techniques, direction du déséquilibre, gestes de l\'arbitre) remplaçables par une photo ou une vidéo prise avec l\'appareil ou choisie dans l\'album, modifiables à tout moment, avec export pour publication sur tous les appareils.',
    'Chrono de randori avec rotations et bips, mode jour/nuit, code d\'accès professeur, sauvegarde et restauration, fonctionnement hors connexion.',
  ] },
];
