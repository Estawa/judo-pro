// Règlement d'arbitrage — FIJ, version 2026 (yuko réintroduit en 2025, ajustements du 21 février 2026)
export const COMBAT = [
  'Durée : 4 min de temps effectif (seniors) ; le chrono s\'arrête à chaque matte (stop).',
  'Golden score (prolongation) : en cas d\'égalité, sans limite de temps ; scores et pénalités du temps réglementaire restent au tableau ; le premier qui marque gagne.',
  'Aire de combat : surface de 8 × 8 m à 10 × 10 m, entourée d\'une zone de sécurité.',
  'Au golden score, une osae-komi (immobilisation) tenue 5 s donne yuko et termine le combat.',
];

export const SCORES = [
  { nom: 'Ippon', trad: 'Point complet, fin du combat', debout: 'Projection largement sur le dos, avec contrôle, force et vitesse ; la chute en pont reste ippon.', sol: 'Osae-komi de 20 s ; abandon sur clé ou étranglement ; perte de connaissance.' },
  { nom: 'Waza-ari', trad: 'Avantage technique', debout: 'Chute en partie sur le dos (au-delà d\'une réception sur le côté vers l\'arrière).', sol: 'Osae-komi de 10 à 19 s.' },
  { nom: 'Yuko', trad: 'Petit avantage', debout: 'Chute sur le côté, sur une fesse, sur les fesses tronc à 90° ou plus, avec ou sans appui de la main ou du coude.', sol: 'Osae-komi de 5 à 9 s.' },
  { nom: 'Pas de score', trad: '', debout: 'Premier contact sur les deux genoux, les deux hanches ou le ventre.', sol: 'Contrôle de moins de 5 s.' },
];

export const REGLES_SCORES = [
  'Waza-ari awasete ippon : deux waza-ari donnent la victoire.',
  'Le yuko ne s\'additionne pas : un waza-ari bat n\'importe quel nombre de yuko ; les yuko départagent seulement à égalité de waza-ari.',
  'Le shido ne donne pas de point à l\'adversaire ; le 3e shido entraîne hansoku-make.',
];

export const ANNONCES = [
  { nom: 'Hajime', trad: 'Commencez', geste: 'Pas de geste particulier', g: 'none' },
  { nom: 'Matte', trad: 'Attendez, stop', geste: 'Bras levé à hauteur d\'épaule, paume vers le chronométreur', g: 'matte' },
  { nom: 'Sono-mama', trad: 'Ne bougez plus', geste: 'Mains posées sur les deux combattants', g: 'sonomama' },
  { nom: 'Yoshi', trad: 'Reprenez', geste: 'Pression des mains sur les deux combattants', g: 'sonomama' },
  { nom: 'Ippon', trad: 'Point complet', geste: 'Bras tendu au-dessus de la tête, paume en avant', g: 'ippon' },
  { nom: 'Waza-ari', trad: 'Avantage technique', geste: 'Bras tendu sur le côté à hauteur d\'épaule, paume vers le bas', g: 'wazaari' },
  { nom: 'Yuko', trad: 'Petit avantage', geste: 'Bras tendu sur le côté, à 45° vers le bas', g: 'yuko' },
  { nom: 'Osae-komi', trad: 'Immobilisation', geste: 'Bras tendu vers les combattants, corps penché vers eux', g: 'osaekomi' },
  { nom: 'Toketa', trad: 'Sortie d\'immobilisation', geste: 'Bras tendu vers les combattants, agité de droite à gauche', g: 'toketa' },
  { nom: 'Shido', trad: 'Pénalité', geste: 'Index pointé vers le combattant pénalisé', g: 'shido' },
  { nom: 'Hansoku-make', trad: 'Disqualification', geste: 'Index pointé vers le combattant, après une main au-dessus de la tête', g: 'hansoku' },
  { nom: 'Sore-made', trad: 'C\'est fini', geste: 'Pas de geste particulier', g: 'none' },
];

export const PENALITES = {
  shido: [
    'Ne pas attaquer dans les 30 s environ après avoir pris sa garde classique (hikite et tsurite) — la passivité s\'apprécie en tachi-waza et en ne-waza',
    'Fausse attaque (attaque sans intention de projeter)', 'Attitude défensive excessive (jigo-tai prolongé, bras tendus)', 'Sortir volontairement de la surface de combat ou y pousser l\'adversaire',
    'Casser la garde à deux mains sans garder de saisie', 'Prise de l\'ours avec mains ou bras joints en cercle (autorisée si tori tient au moins une saisie)',
    'Perte de temps (2026) : ne pas se relever, tarder à revenir à sa place, refaire sa ceinture ou sa coiffure trop longtemps — 1re fois avertissement, puis shido',
  ],
  hansoku: [
    'Kani-basami (ciseau de crabe)', 'Do-jime (étranglement du tronc avec les jambes)', 'Plonger tête la première', 'Clé sur une articulation autre que le coude',
    'Clé ou étranglement associé à une projection quand uke ne peut pas l\'éviter', 'Ushiro-sankaku au sol avec risque pour la nuque ou la colonne (2026)', 'Comportement contraire à l\'esprit du judo',
  ],
  divers: [
    'Kansetsu-waza et shime-waza sont interdits en tachi-waza (debout).',
    'Seoi-nage inversé et usage de la tête pour projeter ou défendre : sanctionnés chez les cadets et moins de 18 ans.',
    'Un combattant ne peut recevoir des soins que deux fois par combat ; à la troisième, il perd par kiken-gachi (2026).',
    'Toute perte de connaissance entraîne le retrait du combat (2026).',
  ],
};

export const NOUVEAUTES_2026 = [
  'Yuko élargi : chute sur une fesse ou sur le côté, avec ou sans appui des coudes ou des bras.',
  'Casser la garde : autorisé à une ou deux mains si on garde au moins une saisie ; seul le cassage à deux mains sans saisie est shido.',
  'Nouvelle pénalité pour perte de temps.',
  'Seoi-nage inversé et usage de la tête : sanctionnés seulement chez les cadets et moins de 18 ans.',
  'Soins limités à deux fois par combat ; perte de connaissance = retrait.',
];

// Situations d'arbitrage pour l'entraînement (quiz "Arbitre")
export const SITUATIONS = [
  { s: 'Uke est projeté largement sur le dos, avec vitesse et contrôle.', r: 'Ippon', choix: ['Ippon', 'Waza-ari', 'Yuko', 'Pas de score'] },
  { s: 'Uke tombe sur une fesse.', r: 'Yuko', choix: ['Ippon', 'Waza-ari', 'Yuko', 'Pas de score'] },
  { s: 'Uke tombe en partie sur le dos, réception sur le côté vers l\'arrière.', r: 'Waza-ari', choix: ['Ippon', 'Waza-ari', 'Yuko', 'Pas de score'] },
  { s: 'Uke tombe sur les deux genoux.', r: 'Pas de score', choix: ['Ippon', 'Waza-ari', 'Yuko', 'Pas de score'] },
  { s: 'Uke tombe sur le ventre.', r: 'Pas de score', choix: ['Ippon', 'Waza-ari', 'Yuko', 'Pas de score'] },
  { s: 'Uke tombe sur le côté en posant le coude.', r: 'Yuko', choix: ['Ippon', 'Waza-ari', 'Yuko', 'Pas de score'] },
  { s: 'Uke est projeté sur le dos mais se réceptionne en pont (tête et pieds).', r: 'Ippon', choix: ['Ippon', 'Waza-ari', 'Yuko', 'Pas de score'] },
  { s: 'Osae-komi tenue 7 secondes avant toketa.', r: 'Yuko', choix: ['Ippon', 'Waza-ari', 'Yuko', 'Pas de score'] },
  { s: 'Osae-komi tenue 15 secondes avant toketa.', r: 'Waza-ari', choix: ['Ippon', 'Waza-ari', 'Yuko', 'Pas de score'] },
  { s: 'Osae-komi tenue 20 secondes.', r: 'Ippon', choix: ['Ippon', 'Waza-ari', 'Yuko', 'Pas de score'] },
  { s: 'Osae-komi tenue 3 secondes avant toketa.', r: 'Pas de score', choix: ['Ippon', 'Waza-ari', 'Yuko', 'Pas de score'] },
  { s: 'Au golden score, un combattant tient une osae-komi 5 secondes.', r: 'Yuko : fin du combat', choix: ['Rien, on continue', 'Yuko : fin du combat', 'Waza-ari', 'Shido à l\'autre'] },
  { s: 'Un combattant marque son 2e waza-ari.', r: 'Ippon (waza-ari awasete ippon)', choix: ['Ippon (waza-ari awasete ippon)', 'Waza-ari seulement', 'Yuko', 'Golden score'] },
  { s: 'Fin du temps : A a 3 yuko, B a 1 waza-ari.', r: 'B gagne', choix: ['A gagne', 'B gagne', 'Golden score', 'Hantei (décision)'] },
  { s: 'Fin du temps : A et B ont chacun 1 waza-ari ; A a 1 yuko de plus.', r: 'A gagne', choix: ['A gagne', 'B gagne', 'Golden score', 'Égalité, A et B qualifiés'] },
  { s: 'Fin du temps : A a 2 shido, B en a 0, aucun score.', r: 'Golden score', choix: ['B gagne', 'Golden score', 'A est disqualifié', 'A gagne'] },
  { s: 'Un combattant reçoit son 3e shido.', r: 'Hansoku-make', choix: ['Shido simple', 'Hansoku-make', 'Waza-ari à l\'adversaire', 'Matte et avertissement'] },
  { s: 'Un combattant plonge la tête la première en attaquant.', r: 'Hansoku-make', choix: ['Shido', 'Hansoku-make', 'Rien', 'Matte'] },
  { s: 'Un combattant applique une clé de bras debout.', r: 'Matte, technique interdite (sanction)', choix: ['Ippon si abandon', 'Matte, technique interdite (sanction)', 'On laisse continuer', 'Yuko'] },
  { s: 'Un combattant casse la garde adverse à deux mains sans garder de saisie.', r: 'Shido', choix: ['Rien', 'Shido', 'Hansoku-make', 'Avertissement verbal'] },
  { s: 'Un combattant fait une prise de l\'ours (bras joints autour du tronc) sans avoir de saisie.', r: 'Shido', choix: ['Autorisé', 'Shido', 'Hansoku-make', 'Waza-ari à l\'adversaire'] },
  { s: 'Un combattant sort volontairement de la surface de combat.', r: 'Shido', choix: ['Rien', 'Shido', 'Hansoku-make', 'Yuko à l\'adversaire'] },
  { s: 'Les deux combattants sont immobiles au sol, sans progression.', r: 'Matte', choix: ['Matte', 'Sono-mama', 'Shido aux deux', 'Osae-komi'] },
  { s: 'L\'arbitre veut figer les combattants pour vérifier une blessure sans changer leur position.', r: 'Sono-mama', choix: ['Matte', 'Sono-mama', 'Sore-made', 'Toketa'] },
  { s: 'Uke tape deux fois sur une clé de coude au sol.', r: 'Ippon', choix: ['Ippon', 'Waza-ari', 'Matte sans score', 'Shido à tori'] },
];
