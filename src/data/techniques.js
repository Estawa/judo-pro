// Bibliothèque des techniques — Judo Pro by C. Guilhem
// Niveaux : D = Débutant, I = Intermédiaire, C = Confirmé, A = Avancé, X = culture (hors programme)
// kz = direction du kuzushi (déséquilibre) vue de uke, pour un tori droitier
//   av avant · avd avant-droit · d droite · ard arrière-droit · ar arrière · arg arrière-gauche · g gauche · avg avant-gauche
// anim = gabarit du schéma animé (placement des pieds ou position au sol)
// ijf = nom de la fiche officielle sur judo.ijf.org (vidéo / animation 3D)

export const FAMILLES = {
  ukemi: { label: 'Ukemi (brise-chutes)', cat: 'ukemi' },
  te: { label: 'Te-waza (techniques de bras)', cat: 'nage' },
  koshi: { label: 'Koshi-waza (techniques de hanche)', cat: 'nage' },
  ashi: { label: 'Ashi-waza (techniques de jambe)', cat: 'nage' },
  masutemi: { label: 'Ma-sutemi-waza (sacrifices dans l\'axe)', cat: 'nage' },
  yokosutemi: { label: 'Yoko-sutemi-waza (sacrifices sur le côté)', cat: 'nage' },
  osae: { label: 'Osae-komi-waza (immobilisations)', cat: 'katame' },
  shime: { label: 'Shime-waza (étranglements)', cat: 'katame' },
  kansetsu: { label: 'Kansetsu-waza (clés de bras)', cat: 'katame' },
  situation: { label: 'Retournements et sorties', cat: 'katame' },
};

export const NIVEAUX = {
  D: { label: 'Débutant', court: 'Déb.', grade: 'Ceinture blanche, jamais pratiqué' },
  I: { label: 'Intermédiaire', court: 'Inter.', grade: 'Ceinture jaune à verte' },
  C: { label: 'Confirmé', court: 'Conf.', grade: 'Ceinture bleue à marron' },
  A: { label: 'Avancé', court: 'Av.', grade: 'Ceinture noire, compétiteur' },
  X: { label: 'Culture (hors programme)', court: 'Culture', grade: '—' },
};

export const KUZUSHI = {
  av: 'vers l\'avant', avd: 'vers l\'avant-droit', d: 'vers la droite', ard: 'vers l\'arrière-droit',
  ar: 'vers l\'arrière', arg: 'vers l\'arrière-gauche', g: 'vers la gauche', avg: 'vers l\'avant-gauche',
};

export const TECHNIQUES_BASE = [
  // ───────────── UKEMI ─────────────
  {
    id: 'ushiro-ukemi', nom: 'Ushiro ukemi', trad: 'Chute arrière', fam: 'ukemi', niv: 'D', anim: 'chute-ar',
    desc: 'Première chute apprise : elle protège la tête et la colonne lors d\'une projection vers l\'arrière.',
    etapes: ['Départ assis, jambes tendues, bras tendus devant', 'Rentrer le menton sur la poitrine (regarder la ceinture)', 'Rouler sur le dos arrondi, sans que la tête touche', 'Frapper le tapis avec les deux bras tendus à 45° du corps, paumes vers le sol, au moment où le dos arrive'],
    erreurs: ['Menton non rentré : la tête heurte le tapis', 'Frappe avec les coudes pliés (douleur aux coudes)', 'Frappe trop tard, après l\'arrivée du dos', 'Mains posées en arrière pour se rattraper (risque pour les poignets)'],
    secu: 'Progression obligatoire : assis → accroupi → debout → en marchant → sur projection réelle.',
    educ: ['Assis : se balancer en arrière en frappant', 'Accroupi : se laisser rouler en arrière', 'Debout : fléchir puis rouler', 'Jeu : un partenaire pousse doucement, on chute'],
  },
  {
    id: 'yoko-ukemi', nom: 'Yoko ukemi', trad: 'Chute latérale', fam: 'ukemi', niv: 'D', anim: 'chute-cote',
    desc: 'Chute sur le côté, la plus fréquente en randori : elle amortit la majorité des projections.',
    etapes: ['Lancer une jambe en diagonale devant soi', 'Fléchir la jambe d\'appui et descendre près du sol', 'Rentrer le menton, regarder la ceinture', 'Frapper le tapis avec un bras tendu à 45°, côté de la chute, au contact du côté du corps'],
    erreurs: ['Atterrir sur l\'épaule ou le coude', 'Jambes croisées au sol (genoux qui se cognent)', 'Tête qui part en arrière'],
    secu: 'Au sol, pieds décalés : la jambe du dessous légèrement en avant pour ne pas se cogner les chevilles.',
    educ: ['Couché sur le dos : balancer d\'un côté à l\'autre en frappant', 'Accroupi : jambe glissée en avant puis chute', 'Sur balayage lent d\'un partenaire'],
  },
  {
    id: 'mae-ukemi', nom: 'Mae ukemi', trad: 'Chute avant (face au sol)', fam: 'ukemi', niv: 'D', anim: 'chute-av',
    desc: 'Chute vers l\'avant sur les avant-bras, utile quand on part face au tapis.',
    etapes: ['Départ à genoux, puis debout', 'Bras pliés devant le visage, paumes vers le sol, en triangle', 'Recevoir sur les avant-bras et les paumes en même temps', 'Visage tourné sur le côté, corps gainé, pointes de pieds au sol'],
    erreurs: ['Recevoir sur les mains bras tendus (risque poignet, coude, clavicule)', 'Ventre qui touche en premier (corps non gainé)'],
    secu: 'Jamais sur bras tendus : c\'est la cause la plus fréquente de blessure au coude et à la clavicule.',
    educ: ['À genoux, tomber vers l\'avant sur les avant-bras', 'Debout, en se laissant tomber comme une planche'],
  },
  {
    id: 'mae-mawari-ukemi', nom: 'Mae mawari ukemi', trad: 'Chute avant roulée', fam: 'ukemi', niv: 'I', anim: 'chute-roulee',
    desc: 'Roulade sur l\'épaule terminée en chute latérale. Indispensable pour les projections avant et les sacrifices.',
    etapes: ['Pied droit devant, main droite posée devant en arc de cercle (doigts vers l\'intérieur)', 'Rouler sur le bras arrondi puis l\'épaule droite, en diagonale du dos jusqu\'à la hanche gauche', 'La tête ne touche jamais : regarder sous l\'aisselle gauche', 'Finir sur le côté gauche en frappant du bras gauche (ou se relever)'],
    erreurs: ['Rouler sur la tête ou la nuque (roulade de gymnastique)', 'Bras droit qui plie et s\'écrase', 'Rouler dans l\'axe de la colonne au lieu de la diagonale'],
    secu: 'Commencer à genoux, très lentement ; la diagonale épaule-hanche opposée protège la colonne.',
    educ: ['À genoux, rouler sur l\'épaule', 'Debout, en partant bas', 'Au-dessus d\'un partenaire à quatre pattes (bloc 3)', 'Des deux côtés'],
  },

  // ───────────── TE-WAZA ─────────────
  {
    id: 'ippon-seoi-nage', nom: 'Ippon-seoi-nage', trad: 'Projection par-dessus l\'épaule à un bras', fam: 'te', gokyo: '1 (seoi-nage)', niv: 'D', kz: 'av', anim: 'epaule', ijf: 'Ippon-seoi-nage',
    desc: 'Tori entre en pivot sous le centre de gravité de uke, bloque le bras de uke sous son aisselle et le charge sur le dos.',
    kuzushi: 'Tirer la manche de uke vers l\'avant et vers le haut (hikite) pour le mettre sur la pointe des pieds.',
    tsukuri: 'Pied droit devant le pied droit de uke, pivot sur ce pied, pied gauche ramené : dos collé à uke, genoux fléchis, bassin sous celui de uke. Le bras droit vient bloquer le bras droit de uke sous l\'aisselle.',
    kake: 'Extension des jambes, tirer vers l\'avant-bas, rotation des épaules : uke passe par-dessus l\'épaule droite.',
    erreurs: ['Entrer trop haut, jambes tendues', 'Laisser de l\'espace entre son dos et uke', 'Tirer seulement avec les bras, sans kuzushi', 'Se pencher en avant au lieu d\'entrer sous uke'],
    secu: 'Débutants : d\'abord à genoux, puis debout ; tori garde la manche pour freiner la chute. Le seoi-nage inversé (« drop » à l\'envers) est interdit chez les moins de 18 ans.',
    educ: ['Entrée en 3 temps puis en 1 temps', 'Uchi-komi à 3 (un partenaire tient uke par la ceinture)', 'Entrée sur uke qui avance', 'Version à genoux (seoi-otoshi) pour les débutants hésitants'],
    liaisons: 'Ko-uchi-gari → ippon-seoi-nage ; feinte seoi-nage → ko-uchi-gari.',
  },
  {
    id: 'morote-seoi-nage', nom: 'Morote-seoi-nage', trad: 'Projection par l\'épaule à deux mains', fam: 'te', gokyo: '1 (seoi-nage)', niv: 'I', kz: 'av', anim: 'epaule', ijf: 'Seoi-nage',
    desc: 'Même entrée que l\'ippon-seoi-nage, mais la main droite garde la saisie du revers ; le coude droit vient sous l\'aisselle de uke.',
    kuzushi: 'Tirer la manche vers l\'avant-haut, le revers vers l\'avant pour coller uke à soi.',
    tsukuri: 'Pivot sur le pied droit, coude droit sous l\'aisselle droite de uke, dos collé, bassin bas.',
    kake: 'Extension des jambes et rotation des épaules vers la gauche-bas.',
    erreurs: ['Coude droit qui reste à l\'extérieur', 'Entrée trop lente, uke se raidit', 'Regard vers le sol (on part en avant à genoux)'],
    secu: 'Contrôle de la manche jusqu\'à la fin de la chute.',
    educ: ['Uchi-komi sur place puis en déplacement', 'Entrée sur uke qui recule puis revient'],
    liaisons: 'O-uchi-gari → morote-seoi-nage.',
  },
  {
    id: 'eri-seoi-nage', nom: 'Eri-seoi-nage', trad: 'Projection par l\'épaule par le revers', fam: 'te', gokyo: 'Variante de seoi-nage', niv: 'C', kz: 'av', anim: 'epaule', ijf: 'Seoi-nage',
    desc: 'Les deux mains tiennent le même revers (ou le revers et le col) ; très utilisée contre un adversaire de garde opposée.',
    kuzushi: 'Tirer le revers vers le haut et l\'avant pour fermer uke sur lui-même.',
    tsukuri: 'Pivot profond, l\'avant-bras droit vient contre la poitrine de uke, dos collé.',
    kake: 'Rotation et extension des jambes.',
    erreurs: ['Mains qui se séparent', 'Entrée sans déséquilibre préalable'],
    secu: 'Uke garde la tête rentrée ; chute contrôlée en yoko ukemi.',
    educ: ['Prise de garde revers-revers en statique', 'Entrées rapides sur ouverture'],
  },
  {
    id: 'seoi-otoshi', nom: 'Seoi-otoshi', trad: 'Renversement par l\'épaule, genou au sol', fam: 'te', gokyo: 'Shinmeisho no waza', niv: 'A', kz: 'av', anim: 'epaule-genou', ijf: 'Seoi-otoshi',
    desc: 'Forme basse du seoi-nage : tori pose un ou deux genoux au sol et fait passer uke par-dessus son dos.',
    kuzushi: 'Tirer fort vers l\'avant-bas.',
    tsukuri: 'Entrée en pivot, puis descente sur les genoux en restant dans l\'axe, dos droit.',
    kake: 'Rotation des épaules vers l\'avant-bas.',
    erreurs: ['Plonger tête en avant', 'Genoux qui tapent violemment le tapis'],
    secu: 'Tori ne plonge jamais la tête la première (hansoku-make en compétition).',
    educ: ['Depuis les genoux, sur uke debout incliné', 'Entrées rapides en déplacement'],
  },
  {
    id: 'tai-otoshi', nom: 'Tai-otoshi', trad: 'Renversement du corps', fam: 'te', gokyo: '2', niv: 'I', kz: 'avd', anim: 'tai-otoshi', ijf: 'Tai-otoshi',
    desc: 'Tori barre la jambe droite de uke avec sa jambe droite tendue et le fait basculer par-dessus avec les mains.',
    kuzushi: 'Tirer uke vers son avant-droit, sur la pointe du pied droit.',
    tsukuri: 'Pivot : pied gauche en arrière, jambe droite tendue placée devant la cheville/le tibia droit de uke, genou légèrement fléchi.',
    kake: 'Rotation du buste vers la gauche, traction en cercle des deux mains : uke bascule par-dessus la jambe-barrage.',
    erreurs: ['Faucher avec la jambe au lieu de barrer', 'Hanches trop collées (devient un o-goshi raté)', 'Mains qui tirent vers le bas sans rotation'],
    secu: 'Uke chute en yoko ukemi ; tori garde la manche.',
    educ: ['Placement des pieds au ralenti', 'Uchi-komi en reculant', 'Sur uke qui avance la jambe droite'],
    liaisons: 'Ko-uchi-gari → tai-otoshi ; o-uchi-gari → tai-otoshi.',
  },
  {
    id: 'kata-guruma', nom: 'Kata-guruma', trad: 'Roue autour des épaules', fam: 'te', gokyo: '3', niv: 'X', kz: 'avd', anim: 'epaule', ijf: 'Kata-Guruma',
    desc: 'Tori charge uke en travers des épaules et le fait tourner. La saisie directe des jambes est interdite en compétition : à présenter seulement comme forme de kata (nage-no-kata).',
    kuzushi: 'Tirer la manche vers l\'avant-droit.', tsukuri: 'Descendre sous uke, épaules sous son ventre.', kake: 'Se relever et faire tourner uke par-dessus les épaules.',
    erreurs: ['Dos rond en se relevant'], secu: 'Forme de kata seulement, uke léger, tapis épais.', educ: ['Nage-no-kata, 1re série'],
  },
  {
    id: 'uki-otoshi', nom: 'Uki-otoshi', trad: 'Renversement flottant', fam: 'te', gokyo: '4', niv: 'X', kz: 'av', anim: 'genou-sol',
    ijf: 'Uki-otoshi',
    desc: 'Technique de bras pure : tori pose un genou au sol et projette uke par une traction circulaire. Première technique du nage-no-kata.',
    kuzushi: 'Traction continue vers l\'avant pendant que uke avance.', tsukuri: 'Genou gauche au sol, hors de la trajectoire.', kake: 'Traction en cercle vers le bas.',
    erreurs: ['Tirer sans profiter du déplacement de uke'], secu: 'Uke chute en mae mawari ukemi.', educ: ['Nage-no-kata, 1re série'],
  },
  {
    id: 'sukui-nage', nom: 'Sukui-nage', trad: 'Projection en cuillère', fam: 'te', gokyo: '4', niv: 'X', kz: 'ar', anim: 'leve-ar', ijf: 'Sukui-nage',
    desc: 'Projection en soulevant uke par l\'arrière. La saisie directe des jambes est interdite en compétition.',
    kuzushi: 'Vers l\'arrière.', tsukuri: 'Entrer derrière uke.', kake: 'Soulever et renverser.', erreurs: [], secu: 'Hors programme : culture.', educ: [],
  },

  // ───────────── KOSHI-WAZA ─────────────
  {
    id: 'o-goshi', nom: 'O-goshi', trad: 'Grande bascule de hanche', fam: 'koshi', gokyo: '1', niv: 'D', kz: 'av', anim: 'hanche', ijf: 'O-goshi',
    desc: 'Technique de hanche de base : tori passe le bras droit autour de la taille de uke et le charge sur sa hanche.',
    kuzushi: 'Tirer la manche vers l\'avant-haut, uke monte sur la pointe des pieds.',
    tsukuri: 'Pied droit devant le pied droit de uke, pivot, pied gauche entre les pieds de uke ; bras droit autour de la taille, bassin plus bas que celui de uke et dépassant légèrement à droite.',
    kake: 'Tendre les jambes, tourner les épaules vers la gauche et tirer la manche : uke roule par-dessus la hanche.',
    erreurs: ['Bassin pas assez bas ni assez engagé', 'Jambes tendues à l\'entrée', 'Tirer uniquement avec les bras'],
    secu: 'Tori retient la manche pour que uke chute en yoko ukemi.',
    educ: ['Entrée en 3 temps puis en 1 temps', 'Porter uke sur le dos (échauffement)', 'Uchi-komi à 3'],
    liaisons: 'Feinte o-uchi-gari → o-goshi ; o-goshi → kesa-gatame.',
  },
  {
    id: 'uki-goshi', nom: 'Uki-goshi', trad: 'Hanche flottante', fam: 'koshi', gokyo: '1', niv: 'I', kz: 'avd', anim: 'hanche', ijf: 'Uki-goshi',
    desc: 'Proche d\'o-goshi, mais la hanche n\'est engagée qu\'à moitié : uke « flotte » et tourne autour de la hanche par la rotation du buste.',
    kuzushi: 'Vers l\'avant-droit de uke.', tsukuri: 'Hanche droite contre le ventre de uke, bras droit autour de la taille, moins de profondeur qu\'o-goshi.', kake: 'Rotation rapide du buste vers la gauche, sans soulever.',
    erreurs: ['Vouloir soulever uke', 'Hanche trop engagée (devient o-goshi)'], secu: 'Chute latérale contrôlée.', educ: ['Comparer o-goshi et uki-goshi', 'Uchi-komi en rotation'],
  },
  {
    id: 'tsuri-komi-goshi', nom: 'Tsuri-komi-goshi', trad: 'Hanche en pêchant et en soulevant', fam: 'koshi', gokyo: '2', niv: 'X', kz: 'av', anim: 'hanche', ijf: 'Tsurikomi-goshi',
    desc: 'Hanche avec saisie revers-manche classique : la main de revers soulève (tsuri) et attire (komi).',
    kuzushi: 'Vers l\'avant-haut.', tsukuri: 'Bassin très bas, sous celui de uke.', kake: 'Extension des jambes et rotation.', erreurs: ['Bassin trop haut'], secu: 'Chute latérale.', educ: [],
  },
  {
    id: 'harai-goshi', nom: 'Harai-goshi', trad: 'Hanche balayée', fam: 'koshi', gokyo: '2', niv: 'C', kz: 'avd', anim: 'hanche-balaye', ijf: 'Harai-goshi',
    desc: 'Tori charge uke sur sa hanche et balaye ses jambes avec la jambe droite tendue.',
    kuzushi: 'Tirer uke vers l\'avant-droit, sur la pointe du pied droit.',
    tsukuri: 'Pivot sur le pied gauche, hanche droite contre uke, buste collé.',
    kake: 'Balayer l\'extérieur de la cuisse droite de uke avec l\'arrière de la jambe droite tendue, en tournant les épaules.',
    erreurs: ['Balayer trop bas (au mollet)', 'Jambe d\'appui tendue', 'Se pencher en avant et tomber avec uke sans contrôle'],
    secu: 'Uke chute en yoko ukemi ; tori reste debout.',
    educ: ['Balayage en équilibre sur une jambe', 'Uchi-komi en déplacement circulaire'],
    liaisons: 'O-uchi-gari → harai-goshi ; harai-goshi → yoko-shiho-gatame.',
  },
  {
    id: 'hane-goshi', nom: 'Hane-goshi', trad: 'Hanche ressort', fam: 'koshi', gokyo: '3', niv: 'A', kz: 'avd', anim: 'hanche-balaye', ijf: 'Hane-goshi',
    desc: 'La jambe droite fléchie soulève l\'intérieur de la jambe droite de uke comme un ressort, la hanche étant engagée.',
    kuzushi: 'Vers l\'avant-droit et le haut.', tsukuri: 'Pivot, jambe droite fléchie, genou contre l\'intérieur de la cuisse droite de uke.', kake: 'Détente de la jambe vers le haut et rotation des épaules.',
    erreurs: ['Confusion avec harai-goshi (jambe tendue)', 'Manque de rotation'], secu: 'Chute latérale.', educ: ['Uchi-komi sur place puis en déplacement'],
  },
  {
    id: 'utsuri-goshi', nom: 'Utsuri-goshi', trad: 'Changement de hanche', fam: 'koshi', gokyo: '4', niv: 'A', kz: 'ar', anim: 'leve-ar', ijf: 'Utsuri-goshi', contre: true,
    desc: 'Contre d\'une attaque de hanche : tori soulève uke qui attaque, puis glisse sa propre hanche dessous et le projette.',
    kuzushi: 'Soulever uke vers l\'arrière au moment de son attaque.', tsukuri: 'Bassin bas, bras autour de la taille, puis rotation pour placer la hanche sous uke.', kake: 'Uke retombe sur la hanche de tori et chute vers l\'avant.',
    erreurs: ['Soulever avec le dos au lieu des jambes'], secu: 'Uke de même gabarit, tapis épais.', educ: ['Uke attaque o-goshi à 50 %'],
  },
  {
    id: 'ushiro-goshi', nom: 'Ushiro-goshi', trad: 'Hanche arrière', fam: 'koshi', gokyo: '5', niv: 'X', kz: 'ar', anim: 'leve-ar', ijf: 'Ushiro-goshi', contre: true,
    desc: 'Contre d\'une attaque de hanche : tori soulève uke et le fait retomber devant lui.', kuzushi: 'Arrière-haut.', tsukuri: 'Bassin sous uke.', kake: 'Soulever puis laisser retomber.', erreurs: [], secu: 'Culture.', educ: [],
  },

  // ───────────── ASHI-WAZA ─────────────
  {
    id: 'o-soto-gari', nom: 'O-soto-gari', trad: 'Grand fauchage extérieur', fam: 'ashi', gokyo: '1', niv: 'D', kz: 'ard', anim: 'osoto', ijf: 'O-soto-gari',
    desc: 'Tori fauche la jambe droite de uke par l\'extérieur, d\'avant en arrière, après l\'avoir déséquilibré sur son talon droit.',
    kuzushi: 'Pousser avec la main de revers et tirer la manche vers le bas : le poids de uke passe sur son talon droit (arrière-droit).',
    tsukuri: 'Pied gauche posé à côté du pied droit de uke, poitrine contre poitrine, jambe droite qui passe devant puis derrière la jambe droite de uke.',
    kake: 'Faucher la jambe droite de uke d\'avant en arrière avec l\'arrière de la cuisse, la pointe du pied tendue, le buste vers l\'avant.',
    erreurs: ['Faucher sans avoir déséquilibré', 'Buste qui recule (tori tombe en arrière)', 'Pied d\'appui trop loin de uke', 'Faucher avec le pied et non avec la cuisse'],
    secu: 'Uke rentre le menton (risque pour la tête). Débutants : tori garde la manche pour retenir ; tapis épais au début.',
    educ: ['Équilibre sur une jambe, balancer la jambe', 'Placement sans faucher', 'Uchi-komi 3 × 10, puis 5 nage-komi', 'Sur uke qui recule'],
    liaisons: 'O-soto-gari → kesa-gatame ; o-uchi-gari → o-soto-gari ; feinte o-soto-gari → harai-goshi.',
    contres: 'O-soto-gaeshi (uke contre-fauche).',
  },
  {
    id: 'o-uchi-gari', nom: 'O-uchi-gari', trad: 'Grand fauchage intérieur', fam: 'ashi', gokyo: '1', niv: 'D', kz: 'arg', anim: 'ouchi', ijf: 'O-uchi-gari',
    desc: 'Tori fauche la jambe gauche de uke par l\'intérieur avec sa jambe droite en traçant un grand arc.',
    kuzushi: 'Pousser uke vers son arrière-gauche, poids sur le talon gauche.',
    tsukuri: 'Pied gauche ramené derrière le pied droit, poitrine proche, jambe droite entre les jambes de uke.',
    kake: 'Accrocher l\'intérieur de la jambe gauche de uke (mollet) et la faucher en arc de cercle vers l\'arrière, en poussant avec les mains.',
    erreurs: ['Rester trop loin', 'Faucher vers le côté au lieu de l\'arrière', 'Pousser sans engager le corps'],
    secu: 'Uke en ushiro ukemi, menton rentré.',
    educ: ['Tracer un arc de cercle au sol avec le pied', 'Sur uke qui recule d\'un pas', 'En combinaison avant'],
    liaisons: 'O-uchi-gari → o-goshi / seoi-nage / uchi-mata (uke résiste vers l\'avant).',
    contres: 'O-uchi-gaeshi.',
  },
  {
    id: 'ko-uchi-gari', nom: 'Ko-uchi-gari', trad: 'Petit fauchage intérieur', fam: 'ashi', gokyo: '2', niv: 'I', kz: 'ard', anim: 'kouchi', ijf: 'Ko-uchi-gari',
    desc: 'Tori fauche le talon droit de uke par l\'intérieur avec la plante de son pied droit.',
    kuzushi: 'Vers l\'arrière-droit, quand uke avance ou pose son pied droit.',
    tsukuri: 'Rapprocher les hanches, pied droit derrière le talon droit de uke, à l\'intérieur.',
    kake: 'Faucher le talon dans le sens des orteils de uke, en poussant vers le bas avec les mains.',
    erreurs: ['Faucher avec la jambe tendue au lieu du pied', 'Pousser vers l\'arrière sans descendre'],
    secu: 'Chute arrière contrôlée.', educ: ['« Marcher sur les pieds » : timing du pas', 'Sur uke qui avance'],
    liaisons: 'Ko-uchi-gari → ippon-seoi-nage ; ko-uchi-gari → o-uchi-gari.',
  },
  {
    id: 'ko-soto-gari', nom: 'Ko-soto-gari', trad: 'Petit fauchage extérieur', fam: 'ashi', gokyo: '2', niv: 'I', kz: 'ard', anim: 'kosoto', ijf: 'Ko-soto-gari',
    desc: 'Tori fauche le talon droit de uke par l\'extérieur avec la plante de son pied gauche.',
    kuzushi: 'Vers l\'arrière-droit, poids sur le talon droit.',
    tsukuri: 'Avancer le pied droit sur le côté, pied gauche derrière le talon droit de uke.',
    kake: 'Faucher le talon dans la direction des orteils de uke et tirer-pousser en cercle.',
    erreurs: ['Pied qui frappe au lieu de faucher', 'Pas de rotation des mains'], secu: 'Chute arrière.', educ: ['Sur uke qui recule le pied droit'],
  },
  {
    id: 'ko-soto-gake', nom: 'Ko-soto-gake', trad: 'Petit accrochage extérieur', fam: 'ashi', gokyo: '3', niv: 'C', kz: 'ard', anim: 'kosoto', ijf: 'Ko-soto-gake',
    desc: 'Tori accroche (gake) la jambe droite de uke de l\'extérieur avec sa jambe gauche, puis le renverse vers l\'arrière.',
    kuzushi: 'Vers l\'arrière-droit.', tsukuri: 'Corps collé, jambe gauche accrochée derrière le genou ou le mollet droit de uke.', kake: 'Pousser avec le buste vers l\'arrière en gardant l\'accrochage.',
    erreurs: ['Confondre accrochage (gake) et fauchage (gari)'], secu: 'Chute arrière.', educ: ['Comparer gari / gake / barai'],
  },
  {
    id: 'de-ashi-barai', nom: 'De-ashi-barai', trad: 'Balayage du pied avancé', fam: 'ashi', gokyo: '1', niv: 'D', kz: 'd', anim: 'deashi', ijf: 'De-ashi-harai',
    desc: 'Tori balaie le pied droit de uke au moment où celui-ci avance et va recevoir le poids du corps.',
    kuzushi: 'Accompagner le pas de uke et le faire basculer sur le côté droit.',
    tsukuri: 'Reculer en entraînant uke ; plante du pied gauche orientée vers l\'extérieur de la cheville droite de uke.',
    kake: 'Balayer le pied juste avant qu\'il ne se pose, dans la direction du pas, avec une rotation des mains (comme tourner un volant).',
    erreurs: ['Balayer trop tôt ou trop tard', 'Frapper le tibia (coup de pied)', 'Jambe pliée'],
    secu: 'Balayer la cheville, jamais le tibia ; chute latérale.',
    educ: ['Jeu « marcher sur les pieds »', 'Déplacements en tsugi-ashi avec balayage léger', 'Timing sur le transfert de poids'],
  },
  {
    id: 'okuri-ashi-barai', nom: 'Okuri-ashi-barai', trad: 'Balayage des deux pieds', fam: 'ashi', gokyo: '2', niv: 'A', kz: 'g', anim: 'okuri', ijf: 'Okuri-ashi-harai',
    desc: 'Pendant un déplacement latéral de uke, tori balaie ses deux pieds réunis dans la direction du déplacement.',
    kuzushi: 'Accompagner et accélérer le déplacement latéral de uke en le soulevant.', tsukuri: 'Suivre en pas chassés, la plante du pied contre la cheville du pied qui suit.', kake: 'Balayer les deux pieds réunis vers le côté, en soulevant avec les mains.',
    erreurs: ['Balayer quand les pieds sont écartés', 'Manque de soulevé des mains'], secu: 'Chute latérale.', educ: ['Pas chassés à deux en miroir', 'Balayage au rythme du déplacement'],
  },
  {
    id: 'sasae-tsuri-komi-ashi', nom: 'Sasae-tsuri-komi-ashi', trad: 'Blocage du pied en tirant et soulevant', fam: 'ashi', gokyo: '1', niv: 'C', kz: 'avd', anim: 'sasae', ijf: 'Sasae-tsurikomi-ashi',
    desc: 'Tori bloque la cheville droite de uke avec la plante du pied gauche et le fait tourner par-dessus ce blocage.',
    kuzushi: 'Tirer uke vers l\'avant-droit (tsuri-komi : soulever et attirer).', tsukuri: 'Pivot sur le pied droit, plante du pied gauche contre le devant de la cheville droite de uke.', kake: 'Rotation des mains et du buste vers la gauche.',
    erreurs: ['Bloquer le genou (c\'est hiza-guruma)', 'Pousser avec la jambe'], secu: 'Bloquer, ne pas frapper.', educ: ['Comparer sasae / hiza-guruma'],
  },
  {
    id: 'hiza-guruma', nom: 'Hiza-guruma', trad: 'Roue autour du genou', fam: 'ashi', gokyo: '1', niv: 'I', kz: 'avd', anim: 'sasae', ijf: 'Hiza-guruma',
    desc: 'Tori bloque le genou droit de uke avec la plante du pied gauche et le fait tourner autour de ce point.',
    kuzushi: 'Vers l\'avant-droit, quand uke avance la jambe droite.', tsukuri: 'Plante du pied gauche sur l\'extérieur-avant du genou droit de uke.', kake: 'Rotation des mains comme un volant.',
    erreurs: ['Frapper le genou', 'Bloquer trop bas'], secu: 'Bloquer sans frapper (articulation fragile).', educ: ['Sur uke qui avance en diagonale'],
  },
  {
    id: 'uchi-mata', nom: 'Uchi-mata', trad: 'Fauchage intérieur de la cuisse', fam: 'ashi', gokyo: '2', niv: 'C', kz: 'av', anim: 'uchimata', ijf: 'Uchi-mata',
    desc: 'Tori fauche l\'intérieur de la cuisse gauche de uke vers le haut avec l\'arrière de sa cuisse droite, après un pivot.',
    kuzushi: 'Tirer uke vers l\'avant (avant-droit), sur la pointe des pieds.',
    tsukuri: 'Pivot sur le pied gauche placé entre les pieds de uke, buste qui tourne et descend.',
    kake: 'Faucher l\'intérieur de la cuisse gauche de uke vers le haut et l\'arrière, buste qui plonge et tourne.',
    erreurs: ['Pied d\'appui trop loin', 'Faucher entre les jambes sans contact de cuisse', 'Tête qui plonge vers le tapis'],
    secu: 'Tori ne plonge pas la tête la première ; uke chute en mae mawari ou yoko ukemi.',
    educ: ['Équilibre sur une jambe, jambe arrière qui monte', 'Uchi-komi en cercle', 'Sur uke qui recule puis revient'],
    liaisons: 'O-uchi-gari → uchi-mata ; uchi-mata → ko-uchi-gari si uke se raidit en arrière.',
    contres: 'Uchi-mata-sukashi (esquive), uchi-mata-gaeshi.',
  },
  {
    id: 'ashi-guruma', nom: 'Ashi-guruma', trad: 'Roue autour de la jambe', fam: 'ashi', gokyo: '3', niv: 'X', kz: 'avd', anim: 'tai-otoshi', ijf: 'Ashi-guruma',
    desc: 'Comme tai-otoshi, mais la jambe barre au niveau du genou de uke.', kuzushi: 'Avant-droit.', tsukuri: 'Jambe tendue contre le genou de uke.', kake: 'Rotation.', erreurs: [], secu: 'Chute latérale.', educ: [],
  },
  {
    id: 'harai-tsuri-komi-ashi', nom: 'Harai-tsuri-komi-ashi', trad: 'Balayage du pied en tirant et soulevant', fam: 'ashi', gokyo: '3', niv: 'X', kz: 'av', anim: 'sasae', ijf: 'Harai-tsurikomi-ashi',
    desc: 'Variante balayée de sasae-tsuri-komi-ashi.', kuzushi: 'Avant.', tsukuri: 'Plante du pied sur la cheville.', kake: 'Balayer en tirant.', erreurs: [], secu: '', educ: [],
  },
  {
    id: 'o-guruma', nom: 'O-guruma', trad: 'Grande roue', fam: 'ashi', gokyo: '4', niv: 'X', kz: 'avd', anim: 'tai-otoshi', ijf: 'O-guruma',
    desc: 'La jambe droite barre la hanche ou le haut de la cuisse de uke, qui tourne autour.', kuzushi: 'Avant-droit.', tsukuri: 'Jambe tendue en travers de la cuisse.', kake: 'Rotation.', erreurs: [], secu: '', educ: [],
  },
  {
    id: 'o-soto-gaeshi', nom: 'O-soto-gaeshi', trad: 'Contre du grand fauchage extérieur', fam: 'ashi', gokyo: 'Shinmeisho no waza', niv: 'I', kz: 'ar', anim: 'contre', ijf: 'O-soto-gaeshi', contre: true,
    desc: 'Quand uke attaque en o-soto-gari, tori absorbe l\'attaque puis fauche à son tour la jambe d\'appui de uke.',
    kuzushi: 'Laisser venir l\'attaque, garder son centre bas, puis renverser uke vers l\'arrière.', tsukuri: 'Soustraire sa jambe attaquée, se placer de face.', kake: 'Faucher la jambe d\'appui de uke en o-soto-gari.',
    erreurs: ['Contrer avant que l\'attaque soit engagée', 'Reculer le buste'], secu: 'Uke attaque à 50 % de vitesse.', educ: ['Bloquer, esquiver, contrer : 3 réponses'],
  },
  {
    id: 'o-uchi-gaeshi', nom: 'O-uchi-gaeshi', trad: 'Contre du grand fauchage intérieur', fam: 'ashi', gokyo: 'Shinmeisho no waza', niv: 'C', kz: 'ar', anim: 'contre', ijf: 'O-uchi-gaeshi', contre: true,
    desc: 'Tori retire sa jambe fauchée en o-uchi-gari et fait tourner uke en tirant, souvent en pivotant.',
    kuzushi: 'Utiliser l\'élan de uke vers l\'avant.', tsukuri: 'Retirer la jambe attaquée en arc de cercle.', kake: 'Rotation des épaules et traction : uke tombe sur le côté.',
    erreurs: ['Retirer la jambe trop tard'], secu: 'Vitesse réduite.', educ: ['Uke attaque o-uchi-gari à 50 %'],
  },
  {
    id: 'tsubame-gaeshi', nom: 'Tsubame-gaeshi', trad: 'Contre de l\'hirondelle', fam: 'ashi', gokyo: 'Shinmeisho no waza', niv: 'C', kz: 'd', anim: 'contre', ijf: 'Tsubame-gaeshi', contre: true,
    desc: 'Contre d\'un balayage (de-ashi-barai) : tori esquive le balayage en levant le pied, puis balaie à son tour.',
    kuzushi: 'Profiter du déséquilibre de uke qui a balayé dans le vide.', tsukuri: 'Esquiver en levant le pied attaqué.', kake: 'Balayer le pied d\'appui de uke (de-ashi-barai).',
    erreurs: ['Esquiver sans enchaîner immédiatement'], secu: '', educ: ['Uke balaie lentement, tori esquive et balaie'],
  },
  {
    id: 'uchi-mata-sukashi', nom: 'Uchi-mata-sukashi', trad: 'Esquive de l\'uchi-mata', fam: 'te', gokyo: 'Shinmeisho no waza', niv: 'X', kz: 'av', anim: 'contre', ijf: 'Uchi-mata-sukashi', contre: true,
    desc: 'Tori esquive le fauchage en fermant les jambes et fait passer uke dans le vide.', kuzushi: 'Élan de uke.', tsukuri: 'Esquive.', kake: 'Rotation.', erreurs: [], secu: '', educ: [],
  },

  // ───────────── SUTEMI-WAZA ─────────────
  {
    id: 'tomoe-nage', nom: 'Tomoe-nage', trad: 'Projection en cercle', fam: 'masutemi', gokyo: '3', niv: 'I', kz: 'av', anim: 'sutemi-av', ijf: 'Tomoe-nage',
    desc: 'Tori se laisse tomber sur le dos, place un pied dans le ventre (ceinture) de uke et le fait passer au-dessus de lui.',
    kuzushi: 'Tirer uke fortement vers l\'avant (il avance pour résister).', tsukuri: 'Glisser le pied gauche entre les pieds de uke, s\'asseoir près de ses talons, pied droit sur la ceinture.', kake: 'Tirer avec les mains et tendre la jambe vers le haut : uke passe au-dessus.',
    erreurs: ['S\'asseoir trop loin de uke', 'Pied sur la poitrine ou dans le bas-ventre', 'Lâcher les mains'],
    secu: 'Tapis épais obligatoire ; uke de même niveau ou plus ; uke chute en mae mawari ukemi.', educ: ['Uke à genoux d\'abord', 'Roulades arrière', 'Vitesse réduite'],
  },
  {
    id: 'sumi-gaeshi', nom: 'Sumi-gaeshi', trad: 'Renversement dans l\'angle', fam: 'masutemi', gokyo: '4', niv: 'C', kz: 'avd', anim: 'sutemi-av', ijf: 'Sumi-gaeshi',
    desc: 'Tori se laisse tomber et soulève l\'intérieur de la cuisse de uke avec le cou-de-pied pour le projeter dans l\'angle avant.',
    kuzushi: 'Vers l\'avant-droit, souvent sur un uke penché en avant (jigo-tai).', tsukuri: 'Pied gauche près de uke, s\'asseoir sous lui, cou-de-pied droit contre l\'intérieur de sa cuisse gauche.', kake: 'Soulever avec la jambe et tirer avec les mains par-dessus son épaule.',
    erreurs: ['S\'asseoir loin de uke'], secu: 'Tapis épais ; uke chute en roulée.', educ: ['Sur uke en posture défensive'],
  },
  {
    id: 'tani-otoshi', nom: 'Tani-otoshi', trad: 'Chute dans la vallée', fam: 'yokosutemi', gokyo: '4', niv: 'A', kz: 'ar', anim: 'sutemi-cote', ijf: 'Tani-otoshi',
    desc: 'Tori se laisse glisser derrière uke, une jambe tendue derrière ses deux talons, et le fait tomber vers l\'arrière.',
    kuzushi: 'Vers l\'arrière (arrière-gauche de uke).', tsukuri: 'Glisser la jambe gauche tendue derrière les talons de uke.', kake: 'S\'asseoir en entraînant uke vers l\'arrière.',
    erreurs: ['Tomber sur uke de tout son poids'], secu: 'Tori ne tombe jamais sur les jambes de uke (risque genou).', educ: ['Souvent en contre d\'un harai-goshi ou d\'un uchi-mata'],
  },
  {
    id: 'ura-nage', nom: 'Ura-nage', trad: 'Projection vers l\'arrière en soulevant', fam: 'masutemi', gokyo: '5', niv: 'A', kz: 'ar', anim: 'leve-ar', ijf: 'Ura-nage', contre: true,
    desc: 'Contre d\'une attaque avant : tori enlace la taille de uke, le soulève et le projette par-dessus lui en tombant en arrière.',
    kuzushi: 'Bloquer l\'attaque et soulever uke.', tsukuri: 'Bassin sous celui de uke, bras autour de la taille.', kake: 'Cambrer et tourner en tombant : uke passe par-dessus l\'épaule.',
    erreurs: ['Tomber droit en arrière sans tourner'], secu: 'Forme avancée uniquement ; uke maîtrise sa chute.', educ: ['Uke attaque lentement en seoi-nage'],
  },
  {
    id: 'yoko-otoshi', nom: 'Yoko-otoshi', trad: 'Renversement sur le côté', fam: 'yokosutemi', gokyo: '3', niv: 'X', kz: 'd', anim: 'sutemi-cote', ijf: 'Yoko-otoshi',
    desc: 'Tori se laisse tomber sur le côté en barrant le pied de uke.', kuzushi: 'Côté droit.', tsukuri: 'Jambe tendue contre le pied de uke.', kake: 'Chute latérale de tori.', erreurs: [], secu: '', educ: [],
  },
  {
    id: 'soto-makikomi', nom: 'Soto-makikomi', trad: 'Enroulement extérieur', fam: 'yokosutemi', gokyo: '4', niv: 'X', kz: 'avd', anim: 'hanche', ijf: 'Soto-makikomi',
    desc: 'Tori enroule le bras de uke et tombe en emportant uke avec lui.', kuzushi: 'Avant-droit.', tsukuri: 'Pivot, bras de uke enroulé.', kake: 'Chute vers l\'avant.', erreurs: [], secu: 'Tori ne plonge pas la tête.', educ: [],
  },

  // ───────────── OSAE-KOMI-WAZA ─────────────
  {
    id: 'kesa-gatame', nom: 'Kesa-gatame', trad: 'Contrôle en écharpe', fam: 'osae', niv: 'D', anim: 'sol-kesa', ijf: 'Kesa-gatame',
    desc: 'Tori, assis à côté de uke, contrôle sa tête et son bras droit comme une écharpe portée en travers du corps.',
    points: ['Bras droit de uke coincé sous l\'aisselle gauche de tori (saisie de la manche)', 'Bras droit de tori autour du cou de uke', 'Hanche droite de tori contre l\'aisselle de uke', 'Jambes écartées : la droite fléchie devant, la gauche tendue derrière', 'Poids sur la poitrine de uke, tête basse'],
    erreurs: ['Jambes serrées : uke fait basculer tori', 'Bras de uke libre', 'Dos droit (poids non transmis)'],
    sorties: 'Pont et rotation vers l\'épaule de tori ; récupérer son bras ; rouler tori par-dessus soi.',
    secu: 'Ne pas tirer sur la nuque de uke ; pas de pression sur la gorge.', educ: ['Jeu « tortue »', 'Uke a 30 s pour sortir'],
    liaisons: 'O-soto-gari → kesa-gatame ; kesa-gatame → kuzure-kesa-gatame si uke pousse.',
  },
  {
    id: 'kuzure-kesa-gatame', nom: 'Kuzure-kesa-gatame', trad: 'Contrôle en écharpe modifiée', fam: 'osae', niv: 'A', anim: 'sol-kesa', ijf: 'Kuzure-kesa-gatame',
    desc: 'Comme kesa-gatame, mais le bras droit de tori passe sous l\'aisselle gauche de uke (et non autour du cou).',
    points: ['Bras droit sous l\'aisselle gauche de uke, main au col ou au tapis', 'Bras droit de uke contrôlé', 'Jambes larges'],
    erreurs: ['Poids en arrière'], sorties: 'Pont et rotation ; dégager le bras.', secu: '', educ: ['Passage kesa → kuzure-kesa quand uke pousse la tête'],
  },
  {
    id: 'kata-gatame', nom: 'Kata-gatame', trad: 'Contrôle de l\'épaule', fam: 'osae', niv: 'C', anim: 'sol-kesa', ijf: 'Kata-gatame',
    desc: 'Tori contrôle la tête et le bras droit de uke ensemble entre sa tête et son bras droit.',
    points: ['Bras droit de uke plaqué contre son propre visage', 'Mains de tori jointes', 'Genou droit contre le flanc de uke, jambe gauche tendue'],
    erreurs: ['Laisser un espace entre la tête de tori et le bras de uke'], sorties: 'Ramener le bras libre ; pont.', secu: 'Peut devenir un étranglement : pression progressive.', educ: [],
  },
  {
    id: 'yoko-shiho-gatame', nom: 'Yoko-shiho-gatame', trad: 'Contrôle latéral par les quatre points', fam: 'osae', niv: 'D', anim: 'sol-yoko', ijf: 'Yoko-shiho-gatame',
    desc: 'Tori est en travers de uke, perpendiculaire à lui, et contrôle la tête et une jambe.',
    points: ['Tori à genoux sur le côté de uke, perpendiculaire', 'Bras gauche sous la nuque de uke (saisie du col)', 'Bras droit entre les jambes de uke (saisie de la ceinture ou du pantalon)', 'Poitrine sur la poitrine, hanches basses'],
    erreurs: ['Hanches hautes', 'Genoux écartés du corps de uke (uke glisse un genou)'],
    sorties: 'Glisser un genou entre soi et tori (crevette), récupérer la garde.', secu: '', educ: ['Passage kesa → yoko-shiho'],
  },
  {
    id: 'kami-shiho-gatame', nom: 'Kami-shiho-gatame', trad: 'Contrôle par le haut des quatre points', fam: 'osae', niv: 'I', anim: 'sol-kami', ijf: 'Kami-shiho-gatame',
    desc: 'Tori est placé à la tête de uke, dans l\'axe, et le contrôle en saisissant sa ceinture des deux côtés.',
    points: ['Bras passés sous les épaules de uke, mains à la ceinture', 'Poitrine sur la poitrine, tête sur le côté', 'Genoux écartés ou jambes tendues, hanches basses'],
    erreurs: ['Hanches hautes', 'Bras de uke libres'], sorties: 'Pont et rotation sur le côté ; faire glisser tori.', secu: 'Ne pas écraser le visage de uke.', educ: [],
  },
  {
    id: 'kuzure-kami-shiho-gatame', nom: 'Kuzure-kami-shiho-gatame', trad: 'Contrôle par le haut modifié', fam: 'osae', niv: 'C', anim: 'sol-kami', ijf: 'Kuzure-kami-shiho-gatame',
    desc: 'Variante de kami-shiho-gatame : tori est légèrement en diagonale et contrôle un bras de uke.', points: ['Un bras passe sous l\'aisselle de uke et saisit le col', 'Diagonale de 30 à 45°'], erreurs: [], sorties: 'Pont et rotation.', secu: '', educ: [],
  },
  {
    id: 'tate-shiho-gatame', nom: 'Tate-shiho-gatame', trad: 'Contrôle à cheval des quatre points', fam: 'osae', niv: 'I', anim: 'sol-tate', ijf: 'Tate-shiho-gatame',
    desc: 'Tori est à cheval sur uke, dans le même axe, et contrôle sa tête et un bras.',
    points: ['À cheval sur le ventre de uke', 'Pieds crochetés sous les jambes de uke ou genoux serrés contre ses flancs', 'Bras contrôlant la tête et un bras de uke', 'Poids bas, buste sur la poitrine'],
    erreurs: ['Buste trop haut (uke fait le pont)'], sorties: 'Pont et rotation du côté du bras non contrôlé.', secu: '', educ: [],
  },
  {
    id: 'ushiro-kesa-gatame', nom: 'Ushiro-kesa-gatame', trad: 'Contrôle en écharpe inversée', fam: 'osae', niv: 'X', anim: 'sol-kesa', ijf: 'Ushiro-kesa-gatame',
    desc: 'Tori est assis à côté de uke, face aux jambes de uke.', points: ['Contrôle du bras gauche de uke'], erreurs: [], sorties: '', secu: '', educ: [],
  },

  // ───────────── SHIME-WAZA ─────────────
  {
    id: 'hadaka-jime', nom: 'Hadaka-jime', trad: 'Étranglement à mains nues', fam: 'shime', niv: 'I', anim: 'sol-dos', ijf: 'Hadaka-jime',
    desc: 'Depuis le dos de uke, l\'avant-bras de tori passe devant le cou et les mains se rejoignent sans saisir le judogi.',
    points: ['Tori derrière uke, poitrine contre son dos', 'Avant-bras droit sur le côté du cou (jamais sur la trachée)', 'Mains jointes, tête de tori contre celle de uke', 'Pression lente et progressive'],
    erreurs: ['Appuyer sur la trachée', 'Serrer brutalement'], sorties: 'Rentrer le menton, saisir l\'avant-bras de tori, tourner vers le coude.',
    secu: 'Réservé à partir du niveau intermédiaire ; forme statique sans serrer au début ; abandon par 2 tapes ou « maitta », lâcher immédiat.', educ: ['Défense du cou pour tous les niveaux'],
  },
  {
    id: 'okuri-eri-jime', nom: 'Okuri-eri-jime', trad: 'Étranglement par le revers glissé', fam: 'shime', niv: 'C', anim: 'sol-dos', ijf: 'Okuri-eri-jime',
    desc: 'Depuis le dos, une main saisit profondément le revers opposé de uke, l\'autre main tire l\'autre revers vers le bas.',
    points: ['Main droite profonde dans le revers gauche de uke', 'Main gauche sous l\'aisselle saisit le revers droit', 'Pression des tranchants du revers sur les côtés du cou'], erreurs: ['Saisie pas assez profonde'], sorties: 'Protéger son col, menton rentré.',
    secu: 'Pression lente ; abandon par 2 tapes ; lâcher immédiat. Jamais sur la trachée.', educ: [],
  },
  {
    id: 'kata-ha-jime', nom: 'Kata-ha-jime', trad: 'Étranglement en contrôlant une épaule', fam: 'shime', niv: 'C', anim: 'sol-dos', ijf: 'Kataha-jime',
    desc: 'Comme okuri-eri-jime, mais la main gauche de tori passe sous l\'aisselle de uke et pousse sa nuque en contrôlant l\'épaule.', points: ['Bras de uke levé et contrôlé', 'Main gauche derrière la nuque'], erreurs: [], sorties: '', secu: 'Pression progressive ; abandon par 2 tapes.', educ: [],
  },
  {
    id: 'nami-juji-jime', nom: 'Nami-juji-jime', trad: 'Étranglement croisé normal', fam: 'shime', niv: 'X', anim: 'sol-tate', ijf: 'Nami-juji-jime',
    desc: 'De face, mains croisées dans les revers, paumes vers le haut (pouces à l\'intérieur).', points: ['Mains profondes dans le col', 'Coudes écartés puis rapprochés'], erreurs: [], sorties: '', secu: 'Abandon par 2 tapes.', educ: [],
  },
  {
    id: 'kata-juji-jime', nom: 'Kata-juji-jime', trad: 'Étranglement croisé mixte', fam: 'shime', niv: 'C', anim: 'sol-tate', ijf: 'Kata-juji-jime',
    desc: 'De face, une main paume en haut, l\'autre paume en bas, croisées dans le col. Classique depuis la position à cheval ou la garde.', points: ['Première main profonde (pouce dedans)', 'Seconde main pouce dehors'], erreurs: [], sorties: '', secu: 'Abandon par 2 tapes.', educ: [],
  },
  {
    id: 'sankaku-jime', nom: 'Sankaku-jime', trad: 'Étranglement en triangle', fam: 'shime', niv: 'X', anim: 'sol-tate', ijf: 'Sankaku-jime',
    desc: 'Les jambes de tori forment un triangle autour du cou et d\'un bras de uke.', points: [], erreurs: [], sorties: '', secu: 'Avancés uniquement.', educ: [],
  },

  // ───────────── KANSETSU-WAZA ─────────────
  {
    id: 'ude-garami', nom: 'Ude-garami', trad: 'Clé de bras en torsion', fam: 'kansetsu', niv: 'I', anim: 'sol-yoko', ijf: 'Ude-garami',
    desc: 'Tori, en travers de uke, plie le bras de uke à 90° et le fait tourner (en « figure 4 ») en levant le coude.',
    points: ['Bras gauche de uke plié, main au sol près de sa tête', 'Main gauche de tori saisit le poignet, bras droit passe sous le bras de uke et saisit son propre poignet', 'Lever légèrement le coude de uke en faisant glisser sa main vers ses hanches'],
    erreurs: ['Torsion rapide', 'Tordre le poignet au lieu du coude'], sorties: 'Garder les bras collés au corps, coude serré.',
    secu: 'Intermédiaires et plus ; vitesse lente ; abandon par 2 tapes ; clé sur le coude uniquement.', educ: ['Forme statique, à vitesse lente'],
  },
  {
    id: 'juji-gatame', nom: 'Juji-gatame', trad: 'Clé de bras en croix', fam: 'kansetsu', niv: 'C', anim: 'sol-juji', ijf: 'Juji-gatame',
    desc: 'Tori, perpendiculaire à uke (en croix), tend le bras de uke contre son bassin, pouce de uke vers le haut, jambes sur la poitrine.',
    points: ['Bassin collé contre l\'épaule de uke', 'Jambes croisées sur la poitrine et la tête, genoux serrés', 'Bras de uke serré contre la poitrine de tori, pouce vers le haut', 'Lever doucement le bassin'],
    erreurs: ['Espace entre le bassin et l\'épaule', 'Genoux écartés', 'Pouce de uke vers le bas'],
    sorties: 'Joindre ses mains, tourner le pouce vers le bas, ramener le coude.',
    secu: 'Confirmés et plus en randori ; pression progressive ; abandon par 2 tapes ; lâcher immédiat. Interdit debout.', educ: ['Après retournement', 'Liaison debout-sol (avancés)'],
  },
  {
    id: 'ude-gatame', nom: 'Ude-gatame', trad: 'Clé de bras tendu', fam: 'kansetsu', niv: 'X', anim: 'sol-yoko', ijf: 'Ude-gatame',
    desc: 'Le bras tendu de uke est maintenu contre l\'épaule ou la poitrine de tori, qui presse sur le coude.', points: [], erreurs: [], sorties: '', secu: 'Clé sur le coude uniquement.', educ: [],
  },
  {
    id: 'waki-gatame', nom: 'Waki-gatame', trad: 'Clé de bras sous l\'aisselle', fam: 'kansetsu', niv: 'X', anim: 'sol-juji', ijf: 'Waki-gatame',
    desc: 'Le bras tendu de uke est coincé sous l\'aisselle de tori. Interdit d\'enchaîner en projection (hansoku-make).', points: [], erreurs: [], sorties: '', secu: 'Interdit en projetant.', educ: [],
  },

  // ───────────── SITUATIONS AU SOL ─────────────
  {
    id: 'retournement-bras-ceinture', nom: 'Retournement bras-ceinture', trad: 'Retourner uke à quatre pattes', fam: 'situation', niv: 'D', anim: 'sol-tortue',
    desc: 'Uke est à quatre pattes (en « tortue »). Tori, sur le côté, saisit un bras et la ceinture et le fait rouler sur le dos avant d\'immobiliser.',
    points: ['Tori sur le côté de uke, poitrine sur son dos', 'Saisir le bras le plus proche (au coude) et la ceinture opposée', 'Tirer le bras sous uke et pousser avec la poitrine pour le faire rouler', 'Suivre directement en kesa-gatame'],
    erreurs: ['Rester au-dessus sans contrôler un bras', 'Lâcher après le retournement'], sorties: 'Uke reste compact, coudes aux genoux.', secu: 'Ne pas tordre le bras.', educ: ['Jeu « retourner la tortue »'],
  },
  {
    id: 'retournement-jambe', nom: 'Retournement par la jambe', trad: 'Renverser uke à quatre pattes en saisissant sa jambe', fam: 'situation', niv: 'D', anim: 'sol-tortue',
    desc: 'Uke est à quatre pattes. Tori, sur le côté, saisit le bras le plus proche et le genou (ou le pantalon) le plus éloigné, puis pousse avec la poitrine pour faire basculer uke sur le dos ; il s\'installe en yoko-shiho-gatame.',
    points: ['Tori sur le côté de uke, poitrine sur son dos, genoux au sol', 'Main droite sous le ventre de uke, saisit le genou ou le pantalon côté opposé', 'Main gauche contrôle le bras le plus proche (au coude)', 'Tirer la jambe vers soi et pousser avec la poitrine : uke bascule sur le côté opposé', 'Suivre en restant collé : yoko-shiho-gatame (contrôle latéral)'],
    erreurs: ['Tirer avec les bras sans pousser avec le corps', 'Laisser un espace pendant la bascule : uke se remet à plat ventre'], sorties: 'Uke écarte ses appuis et garde les coudes collés aux genoux.', secu: 'Ne pas tordre le genou de uke : saisir le pantalon ou l\'arrière du genou, sans torsion.', educ: ['Jeu « retourner la tortue » (30 s)', 'Enchaîner retournement puis immobilisation tenue 20 s'],
    liaisons: 'Retournement par la jambe → yoko-shiho-gatame → kami-shiho-gatame.',
  },
  {
    id: 'retournement-tete', nom: 'Retournement par la tête', trad: 'Renverser uke à quatre pattes en se plaçant devant lui', fam: 'situation', niv: 'I', anim: 'sol-tortue-tete',
    desc: 'Tori est placé devant la tête de uke à quatre pattes. Il passe un bras sous l\'aisselle de uke, saisit la ceinture, bloque l\'autre bras et roule sur le côté en entraînant uke sur le dos ; il s\'installe en kami-shiho-gatame.',
    points: ['Tori face à la tête de uke, poitrine sur ses épaules', 'Un bras passe sous l\'aisselle de uke et saisit sa ceinture', 'L\'autre main bloque le bras opposé de uke contre son corps', 'Rouler sur le côté du bras bloqué : uke ne peut pas mettre la main pour se rattraper', 'Revenir sur uke dans l\'axe : kami-shiho-gatame'],
    erreurs: ['Rouler du mauvais côté (celui du bras libre de uke)', 'Appuyer sur la nuque de uke'], sorties: 'Uke garde les bras serrés et recule ses hanches.', secu: 'Aucune pression sur la nuque ou la tête de uke.', educ: ['Travail à vitesse lente, puis contre résistance progressive'],
    liaisons: 'Retournement par la tête → kami-shiho-gatame → yoko-shiho-gatame.',
  },
  {
    id: 'retournement-crochet', nom: 'Retournement en roulant (crochet de jambe)', trad: 'Renverser uke à quatre pattes en roulant avec lui', fam: 'situation', niv: 'I', anim: 'sol-tortue-dos',
    desc: 'Tori est sur le côté arrière de uke. Il crochète l\'intérieur de la cuisse de uke avec son pied, saisit le revers ou le bras opposé, puis roule sur le dos en entraînant uke ; il termine au-dessus en tate-shiho-gatame ou dans le dos de uke.',
    points: ['Tori derrière et sur le côté de uke, poitrine sur son dos', 'Le cou-de-pied crochète l\'intérieur de la cuisse de uke (côté éloigné)', 'Une main saisit le revers ou le bras opposé, l\'autre la ceinture', 'Rouler sur l\'épaule (et non sur la tête) en entraînant uke', 'Finir au-dessus : tate-shiho-gatame (contrôle à cheval)'],
    erreurs: ['Rouler sans crochet : uke ne suit pas', 'Rouler sur la nuque'], sorties: 'Uke serre les genoux et bloque le pied qui crochète.', secu: 'Rouler sur l\'épaule, jamais sur la tête ; pas de do-jime (serrer le tronc avec les jambes), interdit.', educ: ['Décomposer : crochet seul, puis roulade seule, puis l\'ensemble'],
    liaisons: 'Retournement en roulant → tate-shiho-gatame ; si uke se retourne : contrôle du dos.',
  },
  {
    id: 'sortie-pont', nom: 'Sortie par pont et rotation', trad: 'Sortir de kesa-gatame', fam: 'situation', niv: 'D', anim: 'sol-kesa',
    desc: 'Uke libère son bras, fait un pont puissant et roule vers l\'épaule de tori pour le renverser.',
    points: ['Récupérer son bras coincé', 'Coller son corps à tori', 'Pont sur les pieds (talons près des fesses)', 'Rotation vers l\'épaule de tori (là où il n\'a pas d\'appui)'],
    erreurs: ['Pousser avec les bras tendus', 'Pont sans rotation'], sorties: '', secu: '', educ: ['Uke a 30 s pour sortir'],
  },
  {
    id: 'passage-jambes', nom: 'Passage de jambes', trad: 'Sortir de la garde de uke', fam: 'situation', niv: 'I', anim: 'sol-tate',
    desc: 'Uke est sur le dos et contrôle tori avec ses jambes. Tori contrôle les jambes, les écarte ou les contourne, puis s\'installe en yoko-shiho-gatame.',
    points: ['Contrôler les genoux ou le pantalon', 'Écarter les jambes et passer sur le côté', 'Poitrine sur poitrine immédiatement'], erreurs: ['Passer une main entre les jambes (risque de clé ou triangle)'], sorties: '', secu: '', educ: [],
  },
];

// ─────────── Fiches modifiées ou créées par le professeur ───────────
// surcharges = { id: { champs modifiés…, cree?: true (nouvelle fiche), masquee?: true, seances?: { p24: [n…], p12: […], p15: […] } } }
// Elles viennent de l'appareil (Réglages > données) et de la publication avec l'appli (media/fiches.json).
export const CHAMPS_FICHE = ['nom', 'trad', 'fam', 'niv', 'desc', 'anim', 'kz', 'kuzushi', 'tsukuri', 'kake', 'etapes', 'points', 'erreurs', 'secu', 'educ', 'liaisons', 'contres', 'sorties'];
let SURCH = {};
let TOUTES = {};
let PUBLIEES = new Set();
export let TECHNIQUES = TECHNIQUES_BASE;
const vide = (o) => !o || !Object.keys(o).length;
export function appliquerFiches(surcharges, publiees) {
  SURCH = surcharges || {};
  PUBLIEES = new Set(Object.keys(publiees || {}).filter((k) => !vide(publiees[k])));
  TOUTES = {};
  for (const t of TECHNIQUES_BASE) TOUTES[t.id] = !vide(SURCH[t.id]) ? { ...t, ...SURCH[t.id], id: t.id, modifiee: true } : t;
  for (const [id, f] of Object.entries(SURCH)) if (f && f.cree) TOUTES[id] = { fam: 'te', niv: 'D', nom: 'Nouvelle fiche', ...f, id, perso: true };
  TECHNIQUES = Object.values(TOUTES).filter((t) => !t.masquee && FAMILLES[t.fam]);
}
appliquerFiches({});
export const tech = (id) => TOUTES[id] || null;
export const ficheOrigine = (id) => TECHNIQUES_BASE.find((t) => t.id === id) || null;
export const fichesMasquees = () => Object.values(TOUTES).filter((t) => t.masquee);
export const estPubliee = (id) => PUBLIEES.has(id);

// ─────────── Variantes (bis, ter, quater…) ───────────
// Une variante garde dans « variante_de » la fiche de tête de sa famille ; la tête peut porter un nom de famille (« groupe »).
export const SUFFIXES = ['bis', 'ter', 'quater', 'quinquies', 'sexies', 'septies', 'octies', 'nonies', 'decies'];
const RE_SUFFIXE = new RegExp('\\s+(' + SUFFIXES.join('|') + ')$', 'i');
export const teteDe = (id) => { const t = TOUTES[id]; return t && t.variante_de && TOUTES[t.variante_de] ? t.variante_de : id; };
export function variantes(id) {
  const tete = teteDe(id);
  const membres = Object.values(TOUTES).filter((t) => t.id === tete || t.variante_de === tete);
  return membres.length > 1 ? membres : [];
}
export function familleVariantes(id) {
  const tete = TOUTES[teteDe(id)];
  return tete ? (tete.groupe || `${tete.nom.replace(RE_SUFFIXE, '')} et ses variantes`) : '';
}
export function famillesVariantes() {
  const tetes = new Set(Object.values(TOUTES).filter((t) => t.variante_de && TOUTES[t.variante_de]).map((t) => t.variante_de));
  return [...tetes].map((id) => ({ tete: id, nom: familleVariantes(id), membres: variantes(id) })).sort((a, b) => a.nom.localeCompare(b.nom));
}
// Nom proposé pour une nouvelle variante : « Seoi-nage bis », puis « ter », « quater »…
export function nomVariante(id) {
  const tete = TOUTES[teteDe(id)];
  const racine = (tete ? tete.nom : TOUTES[id].nom).replace(RE_SUFFIXE, '');
  const pris = new Set(variantes(id).map((t) => t.nom.toLowerCase()));
  for (const s of SUFFIXES) if (!pris.has(`${racine} ${s}`.toLowerCase())) return `${racine} ${s}`;
  return `${racine} (variante)`;
}

// Techniques d'une séance : celles prévues, sauf si la fiche a été déplacée, plus celles que vous y avez placées.
export function techsSeance(prog, n, prevues) {
  const ids = (prevues || []).filter((id) => {
    const t = TOUTES[id];
    if (!t || t.masquee) return false;
    const sp = SURCH[id] && SURCH[id].seances && SURCH[id].seances[prog];
    return Array.isArray(sp) ? sp.includes(n) : true;
  });
  for (const [id, f] of Object.entries(SURCH)) {
    const sp = f && f.seances && f.seances[prog];
    if (Array.isArray(sp) && sp.includes(n) && !ids.includes(id) && TOUTES[id] && !TOUTES[id].masquee) ids.push(id);
  }
  return ids.map((id) => TOUTES[id]);
}

export const ijfUrl = (t) => (t.ijf ? `https://judo.ijf.org/techniques/${t.ijf}` : null);
export const ijfAnim = (t) => (t.ijf ? `https://judo.ijf.org/techniques/${t.ijf}/animation` : null);
export const ytUrl = (t) => `https://www.youtube.com/results?search_query=${encodeURIComponent(t.nom + ' judo technique')}`;

// Lexique pour décoder les noms
export const DECODEUR = [
  ['o', 'grand'], ['ko', 'petit'], ['soto', 'extérieur'], ['uchi', 'intérieur'], ['gari', 'fauchage'], ['gake', 'accrochage'],
  ['barai / harai', 'balayage'], ['ashi', 'pied, jambe'], ['goshi / koshi', 'hanche'], ['nage', 'projection'], ['otoshi', 'renversement, chute'],
  ['guruma', 'roue'], ['gaeshi / kaeshi', 'contre, renversement'], ['gatame', 'contrôle'], ['jime / shime', 'étranglement'], ['seoi', 'charger sur le dos'],
  ['tsuri', 'soulever (pêcher)'], ['komi', 'attirer vers soi'], ['sutemi', 'sacrifice'], ['makikomi', 'enroulement'], ['juji', 'croix'], ['kesa', 'écharpe'],
  ['shiho', 'quatre points'], ['yoko', 'côté'], ['tate', 'vertical, à cheval'], ['kami', 'haut (tête)'], ['ushiro', 'arrière'], ['mae', 'avant'], ['ude', 'bras'], ['hiza', 'genou'], ['tai', 'corps'], ['uki', 'flottant'], ['kuzure', 'modifié'],
];
