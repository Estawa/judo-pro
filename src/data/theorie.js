// Contenus théoriques — niveau L2 STAPS
// base = contenu de la fiche théorie étudiant (évaluation /6) ; staps = approfondissement universitaire
// Chaque section : { t: titre, p: [paragraphes], l: [liste], tab: { h: [entêtes], r: [[lignes]] } }

export const CHAPITRES = [
  {
    id: 'histoire', titre: 'Histoire et institutions', niveau: 'base',
    resume: 'De Jigoro Kano au judo olympique : les dates et les acteurs à connaître.',
    sections: [
      { t: 'Jigoro Kano et la naissance du judo', p: [
        'Jigoro Kano (1860-1938) étudie plusieurs écoles de jujitsu (notamment Tenjin Shin\'yo-ryu et Kito-ryu). En 1882, il fonde à Tokyo le Kodokan (école où l\'on étudie la voie), dans une petite salle du temple Eisho-ji.',
        'Son projet est éducatif : il retire du jujitsu les techniques les plus dangereuses, ajoute les ukemi (brise-chutes) et le randori (exercice d\'opposition libre), et fait du judo (voie de la souplesse) une méthode d\'éducation physique, intellectuelle et morale.',
        'Kano crée aussi le système des grades : les kyu (grades d\'élèves) puis les dan (degrés de la ceinture noire). En 1909, il devient le premier membre asiatique du Comité international olympique.',
      ] },
      { t: 'Le judo en France', p: [
        'Le maître japonais Mikinosuke Kawaishi s\'installe à Paris au milieu des années 1930 ; le Jiu-Jitsu Club de France est fondé en 1936, avec Moshé Feldenkrais. Kawaishi popularise en Europe une pédagogie fondée sur la progression par ceintures de couleur.',
        'La Fédération française de judo et jiu-jitsu est créée en 1946. Elle est devenue France Judo (judo, jujitsu, kendo et disciplines associées) et compte parmi les fédérations olympiques françaises les plus importantes en nombre de licenciés.',
        'Le sport universitaire relève de la FFSU (Fédération française du sport universitaire) ; à l\'université, les cours sont organisés par les UFR STAPS et les SUAPS.',
      ] },
      { t: 'Repères chronologiques', tab: { h: ['Date', 'Événement'], r: [
        ['1860', 'Naissance de Jigoro Kano'], ['1882', 'Fondation du Kodokan à Tokyo'], ['1909', 'Kano, premier membre asiatique du CIO'],
        ['1936', 'Fondation du Jiu-Jitsu Club de France (Kawaishi, Feldenkrais)'], ['1946', 'Création de la fédération française'], ['1951', 'Création de la Fédération internationale de judo (FIJ)'],
        ['1956', 'Premiers championnats du monde (Tokyo)'], ['1961', 'Anton Geesink (Pays-Bas), premier champion du monde non japonais, à Paris'],
        ['1964', 'Le judo masculin devient olympique (Tokyo)'], ['1980', 'Premiers championnats du monde féminins'], ['1988', 'Judo féminin en démonstration aux Jeux de Séoul'],
        ['1992', 'Le judo féminin devient olympique (Barcelone)'], ['2021', 'Première épreuve olympique par équipes mixtes (Jeux de Tokyo 2020), gagnée par la France, qui conserve le titre à Paris en 2024'],
      ] } },
      { t: 'Quelques grandes figures françaises', l: [
        'David Douillet : champion olympique des lourds en 1996 et 2000.',
        'Teddy Riner : triple champion olympique individuel des +100 kg (2012, 2016, 2024) et plus de dix fois champion du monde.',
        'Lucie Décosse, Marie-Claire Restoux, Clarisse Agbégnénou : championnes olympiques.',
      ] },
    ],
    retenir: ['Judo = voie de la souplesse', 'Jigoro Kano, Kodokan, 1882', 'Olympique : 1964 (hommes, Tokyo), 1992 (femmes, Barcelone)', 'FIJ créée en 1951'],
  },
  {
    id: 'principes', titre: 'Principes, valeurs et code moral', niveau: 'base',
    resume: 'Les deux principes de Kano, le code moral et le sens des rituels.',
    sections: [
      { t: 'Les deux principes de Jigoro Kano', l: [
        'Seiryoku zen\'yo (meilleure utilisation de l\'énergie) : obtenir le maximum d\'efficacité avec le minimum d\'effort, en utilisant la force et le mouvement du partenaire plutôt que sa propre force. On le retrouve dans le kuzushi (déséquilibre), les combinaisons et les contres.',
        'Jita kyoei (entraide et prospérité mutuelle) : on progresse ensemble. Le partenaire n\'est pas un adversaire à abîmer : sans uke, tori ne peut pas apprendre.',
      ] },
      { t: 'Le principe de souplesse (ju)', p: [
        'Le « ju » de judo désigne la souplesse : céder pour vaincre. Face à une poussée, au lieu de résister, on accompagne et on utilise cette force pour déséquilibrer. C\'est l\'origine du nom et de la logique technique du judo.',
        'On résume souvent la formation du judoka par shin-gi-tai : l\'esprit (shin), la technique (gi) et le corps (tai), à développer ensemble.',
      ] },
      { t: 'Le code moral du judo', p: ['Formulé en France, il compte huit valeurs : politesse, courage, sincérité, honneur, modestie, respect, contrôle de soi, amitié.'],
        tab: { h: ['Valeur', 'Exemple au dojo'], r: [
          ['Politesse', 'Saluer son partenaire, même après avoir perdu'], ['Courage', 'Continuer à attaquer face à plus fort que soi'], ['Sincérité', 'S\'exprimer sans déguiser sa pensée ; ne pas tricher en randori'],
          ['Honneur', 'Être fidèle à la parole donnée'], ['Modestie', 'Parler de soi sans orgueil, après une victoire'], ['Respect', 'Accepter un partenaire débutant ou d\'un autre gabarit'],
          ['Contrôle de soi', 'Ne jamais projeter pour faire mal ; lâcher dès l\'abandon'], ['Amitié', 'Aider un débutant à progresser (rôle de uke)'],
        ] } },
      { t: 'Les rituels', l: [
        'Rei (salut) : au début et à la fin de la séance, avant et après chaque exercice. Ritsu-rei (salut debout), za-rei (salut à genoux).',
        'Le salut n\'est pas un geste religieux : c\'est une marque de respect et de confiance envers le partenaire et le lieu.',
        'Dojo (lieu d\'étude de la voie), tatami (tapis), judogi (tenue), zori (sandales jusqu\'au bord du tapis).',
      ] },
    ],
    retenir: ['Seiryoku zen\'yo = meilleure utilisation de l\'énergie', 'Jita kyoei = entraide et prospérité mutuelle', '8 valeurs du code moral'],
  },
  {
    id: 'technique', titre: 'Analyse technique et classification', niveau: 'base',
    resume: 'Kuzushi-tsukuri-kake, familles de techniques, gokyo, saisies, postures et déplacements.',
    sections: [
      { t: 'Les trois phases d\'une projection', tab: { h: ['Phase', 'Traduction', 'Exemple sur o-soto-gari (grand fauchage extérieur)'], r: [
        ['Kuzushi', 'Déséquilibre', 'Pousser le revers et tirer la manche : uke recule son poids sur le talon droit'],
        ['Tsukuri', 'Placement, construction', 'Pied gauche à côté du pied droit de uke, poitrine contre poitrine, jambe droite qui passe derrière la sienne'],
        ['Kake', 'Exécution', 'Faucher la jambe droite de uke d\'avant en arrière avec la cuisse ; uke chute sur le dos'],
      ] }, p: ['Si l\'une des trois phases manque, la technique ne passe pas ou demande beaucoup de force. Kuzushi et tsukuri se font en même temps chez le judoka expert.'] },
      { t: 'Happo no kuzushi (les huit directions de déséquilibre)', p: ['On peut déséquilibrer uke vers l\'avant, l\'arrière, la droite, la gauche et les quatre diagonales. Chaque technique correspond à une direction privilégiée : vers l\'avant pour seoi-nage ou o-goshi, vers l\'arrière-droit pour o-soto-gari, vers l\'arrière-gauche pour o-uchi-gari, sur le côté pour de-ashi-barai.'] },
      { t: 'La classification du Kodokan', tab: { h: ['Grande famille', 'Sous-famille', 'Exemples'], r: [
        ['Nage-waza (projections) — tachi-waza (debout)', 'Te-waza (bras)', 'Seoi-nage, tai-otoshi'],
        ['', 'Koshi-waza (hanche)', 'O-goshi, harai-goshi'],
        ['', 'Ashi-waza (jambe)', 'O-soto-gari, de-ashi-barai, uchi-mata'],
        ['Nage-waza — sutemi-waza (sacrifices)', 'Ma-sutemi-waza (dans l\'axe)', 'Tomoe-nage, sumi-gaeshi, ura-nage'],
        ['', 'Yoko-sutemi-waza (sur le côté)', 'Tani-otoshi, yoko-otoshi'],
        ['Katame-waza (contrôles au sol)', 'Osae-komi-waza (immobilisations)', 'Kesa-gatame, yoko-shiho-gatame'],
        ['', 'Shime-waza (étranglements)', 'Hadaka-jime, okuri-eri-jime'],
        ['', 'Kansetsu-waza (clés articulaires)', 'Juji-gatame, ude-garami'],
      ] }, p: ['Le gokyo no waza est la liste pédagogique du Kodokan : 40 projections réparties en 5 groupes de 8, du plus simple au plus difficile (1895, révisé en 1920). Le Kodokan y a ajouté en 1982 les 8 techniques qui en avaient été retirées, puis les shinmeisho no waza (« techniques nouvellement reconnues »), dont beaucoup de contres.'] },
      { t: 'Kumikata (saisie) et postures', l: [
        'Garde de base pour un droitier : main droite au revers (tsurite, main qui soulève et contrôle), main gauche à la manche (hikite, main qui tire).',
        'Ai-yotsu : gardes identiques (droitier contre droitier). Kenka-yotsu : gardes opposées (droitier contre gaucher).',
        'Shizen-tai (posture naturelle) : droite et mobile, permet d\'attaquer. Jigo-tai (posture défensive) : basse et fléchie, utile pour bloquer mais elle empêche d\'attaquer.',
      ] },
      { t: 'Shintai (déplacements) et tai-sabaki (rotations)', l: [
        'Ayumi-ashi : pas marché, un pied après l\'autre.',
        'Tsugi-ashi : pas chassés, un pied suit l\'autre sans jamais le dépasser ; pieds jamais croisés.',
        'Okuri-ashi : pas accompagnés sur le côté.',
        'Tai-sabaki : rotations du corps (pivots) pour entrer en projection avant ou esquiver.',
      ] },
      { t: 'Les formes de l\'initiative (STAPS)', l: [
        'Go no sen : réagir après l\'attaque de l\'adversaire (contre-prise, kaeshi-waza).',
        'Sen no sen : agir en même temps que l\'adversaire, au début de son attaque.',
        'Sen sen no sen : anticiper l\'intention de l\'adversaire et attaquer avant qu\'il ne déclenche.',
      ] },
    ],
    retenir: ['Kuzushi, tsukuri, kake', 'Nage-waza / katame-waza (osae-komi, shime, kansetsu)', 'Gokyo : 5 groupes de 8 projections'],
  },
  {
    id: 'biomeca', titre: 'Biomécanique du judo', niveau: 'staps',
    resume: 'Équilibre, polygone de sustentation, couple et levier, physique de la chute.',
    sections: [
      { t: 'Équilibre et déséquilibre', p: [
        'Un corps debout est en équilibre tant que la projection verticale de son centre de gravité (CG) reste à l\'intérieur de son polygone de sustentation, c\'est-à-dire la surface délimitée par ses appuis au sol.',
        'Le kuzushi agit sur les deux paramètres : il déplace le CG de uke et réduit son polygone (uke sur la pointe des pieds, sur les talons, pieds alignés ou en appui sur un seul pied). Plus le polygone est petit et le CG haut, plus l\'équilibre est précaire.',
        'À l\'inverse, tori abaisse son propre CG (genoux fléchis) et élargit ses appuis pour rester stable pendant l\'exécution.',
      ] },
      { t: 'Deux mécanismes de projection : couple et levier', p: [
        'Le chercheur italien Attilio Sacripanti a proposé de classer les projections selon le mécanisme physique utilisé, plutôt que selon la partie du corps.',
      ], tab: { h: ['Mécanisme', 'Principe', 'Exemples', 'Conséquences pédagogiques'], r: [
        ['Couple de forces', 'Deux forces de sens opposé appliquées en deux points du corps de uke le font tourner autour de son CG (ex. : les mains poussent le haut du corps, la jambe fauche le bas).', 'De-ashi-barai, okuri-ashi-barai, o-soto-gari, o-uchi-gari, ko-uchi-gari, uchi-mata', 'Peu dépendant de la taille relative ; exige un timing précis et peu de force'],
        ['Levier', 'Tori crée un point d\'appui (hanche, dos, jambe tendue) sous ou contre uke et applique une force à distance de ce point.', 'Seoi-nage, o-goshi, tai-otoshi, kata-guruma, tomoe-nage', 'Plus le point d\'appui est bas sous le CG de uke, plus le bras de levier est efficace ; demande de bien entrer sous uke'],
      ] } },
      { t: 'Action-réaction et quantité de mouvement', p: [
        'Selon la troisième loi de Newton, toute action entraîne une réaction égale et opposée. Quand tori pousse, uke résiste en poussant vers l\'avant : c\'est le moment d\'attaquer vers l\'avant. C\'est la base mécanique des renraku-waza (combinaisons).',
        'Un uke en mouvement possède une quantité de mouvement (masse × vitesse). Tori l\'utilise et la prolonge plutôt que de s\'y opposer : c\'est la traduction mécanique de seiryoku zen\'yo.',
      ] },
      { t: 'Le moment d\'une force', p: ['Le moment d\'une force par rapport à un axe vaut M = F × d (force multipliée par la distance à l\'axe). Dans un tai-otoshi, la traction circulaire des mains, loin du point de blocage (la cheville), produit un grand moment de rotation avec peu de force. Dans un o-goshi, un bassin placé bas et dépassant sous uke augmente la distance utile.'] },
      { t: 'Physique de la chute (ukemi)', l: [
        'L\'énergie de la chute doit être dissipée. Pour une même variation de quantité de mouvement, augmenter la durée du contact (rouler) et la surface d\'appui réduit la force maximale subie (F × Δt = Δ(m × v)).',
        'La frappe du ou des bras tendus à environ 45° du corps absorbe une partie de l\'énergie et limite la rotation du tronc.',
        'Rentrer le menton empêche le « coup du lapin » : la tête n\'accélère pas vers le tapis.',
        'Dans la chute roulée (mae mawari ukemi), le trajet en diagonale épaule-hanche opposée évite l\'appui sur la colonne cervicale.',
      ] },
      { t: 'Chaînes musculaires', p: ['Les projections de hanche et d\'épaule reposent sur la triple extension cheville-genou-hanche (comme en haltérophilie) associée à une rotation du tronc. Les fauchages mobilisent les ischio-jambiers et les fessiers de la jambe qui fauche, et le gainage de la jambe d\'appui.'] },
    ],
    retenir: ['CG hors du polygone de sustentation = chute', 'Couple (fauchages, balayages) vs levier (hanche, épaule)', 'Ukemi : augmenter le temps et la surface de contact'],
  },
  {
    id: 'physio', titre: 'Physiologie et préparation physique', niveau: 'staps',
    resume: 'Un effort intermittent de haute intensité : filières énergétiques, qualités physiques, tests spécifiques.',
    sections: [
      { t: 'Le profil de l\'activité', p: [
        'Un combat senior dure 4 minutes de temps effectif (le chrono s\'arrête au matte), plus un éventuel golden score sans limite de temps. Il se compose de séquences d\'effort intense d\'environ 20 à 30 secondes entrecoupées de pauses de 5 à 10 secondes : le rapport effort-récupération est d\'environ 2 pour 1 à 3 pour 1.',
        'Dans un tournoi, le judoka peut faire 5 à 7 combats dans la journée : la récupération entre les combats compte autant que l\'effort lui-même.',
      ] },
      { t: 'Les filières énergétiques', tab: { h: ['Filière', 'Rôle en judo'], r: [
        ['Anaérobie alactique (phosphocréatine)', 'Attaques explosives, projections, accélérations de quelques secondes'],
        ['Anaérobie lactique (glycolyse)', 'Séquences prolongées de lutte pour la garde et de ne-waza ; la lactatémie après un combat est élevée (souvent supérieure à 10 mmol/L)'],
        ['Aérobie', 'Récupération pendant les pauses et entre les combats, resynthèse de la phosphocréatine, maintien de l\'intensité en fin de combat'],
      ] }, p: ['Le judo est donc une activité mixte : une bonne capacité aérobie permet de mieux récupérer et de répéter des efforts anaérobies.'] },
      { t: 'Les qualités physiques sollicitées', l: [
        'Force maximale et puissance : projections, soulevés (hanche, ura-nage).',
        'Endurance de force et force isométrique : lutte pour la garde, maintien d\'une immobilisation.',
        'Force de préhension : kumikata ; elle diminue au fil des combats et limite la performance.',
        'Souplesse et mobilité : hanches (uchi-mata), épaules, colonne.',
        'Coordination, vitesse de réaction, proprioception : timing des balayages, équilibre sur une jambe.',
      ] },
      { t: 'Le Special Judo Fitness Test (SJFT)', p: [
        'Test spécifique (Sterkowicz, 1995). Deux uke de même gabarit que tori sont placés à 6 m l\'un de l\'autre. Tori court de l\'un à l\'autre et les projette en ippon-seoi-nage le plus de fois possible pendant 3 séries : 15 s, puis 30 s, puis 30 s, avec 10 s de récupération entre les séries.',
        'On relève le nombre total de projections (N), la fréquence cardiaque juste après le test (FC1) et une minute après (FC2). Indice = (FC1 + FC2) / N. Plus l\'indice est faible, meilleure est la condition physique spécifique.',
      ] },
      { t: 'Autres tests utiles', l: [
        'Dynamométrie manuelle (force de préhension).',
        'Tests de suspension au judogi (bras fléchis, temps de maintien ou nombre de tractions sur une veste de judo).',
        'Tests de terrain intermittents (type 30-15 IFT) pour la capacité aérobie.',
      ] },
      { t: 'Échauffement et prévention', l: [
        'Échauffement progressif : articulaire (nuque, épaules, poignets, doigts, genoux), cardio, ukemi, puis situations d\'opposition.',
        'Zones les plus exposées : genou, épaule, coude, doigts, et tête lors des chutes.',
        'Toute perte de connaissance (étranglement, choc) entraîne l\'arrêt immédiat et un protocole de retour encadré.',
        'Les pertes de poids rapides avant une pesée (déshydratation) diminuent la performance et augmentent les risques : à déconseiller.',
      ] },
    ],
    retenir: ['Effort intermittent : 20-30 s d\'effort / 5-10 s de pause', 'Activité mixte anaérobie-aérobie', 'SJFT : 15 s + 30 s + 30 s, indice (FC1 + FC2) / N'],
  },
  {
    id: 'didactique', titre: 'Didactique et pédagogie', niveau: 'staps',
    resume: 'Formes de travail, progression, construction de situations d\'apprentissage, rôles sociaux.',
    sections: [
      { t: 'Les formes de travail', tab: { h: ['Forme', 'Traduction', 'But'], r: [
        ['Kata', 'Forme codifiée', 'Étudier les principes techniques dans un ordre fixé (ex. nage-no-kata)'],
        ['Uchi-komi', 'Répétition d\'entrées sans projeter', 'Automatiser le placement, beaucoup de répétitions sans fatiguer uke'],
        ['Nage-komi', 'Répétition de projections', 'Sentir la technique complète, travailler la chute de uke'],
        ['Yakusoku-geiko', 'Travail convenu', 'Attaques en déplacement, uke ne s\'oppose pas'],
        ['Kakari-geiko', 'Exercice d\'attaques', 'Tori attaque sans arrêt, uke se contente de défendre'],
        ['Randori', 'Exercice d\'opposition libre', 'Appliquer ses techniques face à un partenaire qui s\'oppose, debout ou au sol, libre ou à thème'],
        ['Shiai', 'Compétition', 'Combat arbitré avec enjeu'],
      ] } },
      { t: 'Principes de progression', l: [
        'Du sol vers le debout : le ne-waza (travail au sol) permet de s\'opposer tout de suite sans risque de chute.',
        'Les chutes avant les projections, et des chutes maîtrisées avant tout randori debout.',
        'De la coopération à l\'opposition : uke passif, puis coopérant, puis résistance progressive, puis opposition libre.',
        'Du statique au déplacement, du lent au rapide, du côté préféré aux deux côtés.',
        'D\'une famille autorisée (randori à thème) à toutes les techniques.',
        'Clés, étranglements et sacrifices seulement quand les bases de sécurité sont acquises.',
      ] },
      { t: 'Les étapes de l\'apprentissage moteur', p: ['Selon le modèle de Fitts et Posner : étape cognitive (comprendre ce qu\'il faut faire, gestes lents et décomposés), étape associative (affiner, corriger, enchaîner), étape autonome (geste automatisé, attention disponible pour l\'adversaire). En judo, l\'uchi-komi aide au passage vers l\'automatisation ; le randori teste l\'autonomie.'] },
      { t: 'Construire une situation d\'apprentissage', l: [
        'But : ce que l\'élève doit obtenir (ex. « immobiliser son partenaire 20 secondes »).',
        'Dispositif : espace, binômes, matériel, durée, rotations.',
        'Consignes : ce qui est autorisé et interdit, rôle de chacun.',
        'Critères de réalisation : comment faire (ex. « hanches basses, jambes écartées »).',
        'Critères de réussite : le résultat attendu (ex. « 3 réussites sur 5 »).',
        'Variables didactiques pour faire évoluer la difficulté : degré d\'opposition de uke, vitesse, temps, nombre de techniques autorisées, position de départ, handicap (une main), gabarit du partenaire.',
        'Sécurité : appariement par gabarit et par niveau, surveillance des bords, consignes d\'arrêt.',
      ] },
      { t: 'Exemples de situations', tab: { h: ['Situation', 'Déroulement', 'Objectif'], r: [
        ['Retourner la tortue', 'Uke à quatre pattes, tori a 30 s pour le mettre sur le dos', 'Retournements, gainage de uke'],
        ['Sortir en 30 s', 'Tori en osae-komi, uke doit sortir', 'Maintien et sorties d\'immobilisation'],
        ['Sumo à genoux', 'Faire sortir le partenaire d\'un cercle ou le déséquilibrer à genoux', 'Kuzushi, gainage, opposition sans chute'],
        ['Arracher la manche', 'Garder sa saisie, faire lâcher l\'autre', 'Kumikata, force de préhension'],
        ['Marcher sur les pieds', 'Toucher le pied du partenaire avec le sien en déplacement', 'Timing des balayages'],
        ['Projeter-contrôler en 3 s', 'Après une projection, immobiliser en moins de 3 s', 'Liaison debout-sol'],
      ] } },
      { t: 'Les rôles sociaux', l: [
        'Tori : exécute la technique.',
        'Uke : subit et chute ; un bon uke offre la bonne réaction et rend le travail sûr.',
        'Arbitre : fait respecter les règles avec les annonces et les gestes.',
        'Observateur ou coach : relève des données (nombre d\'attaques, directions, réussites) et conseille.',
        'Chronométreur et marqueur : tiennent la table.',
      ] },
      { t: 'Gérer un groupe hétérogène', l: [
        'Thème commun pour tous, contenu adapté par niveau (comme dans la programmation de l\'appli).',
        'Binômes de même niveau pour apprendre ; binômes gradé-débutant pour le tutorat, le gradé étant uke et conseiller.',
        'Randori à handicap : le plus fort n\'a droit qu\'à une famille de techniques, ou part en position défavorable.',
      ] },
    ],
    retenir: ['Uchi-komi / nage-komi / randori', 'Progression : sol → debout, coopération → opposition', 'Critères de réalisation ≠ critères de réussite'],
  },
  {
    id: 'grades', titre: 'Grades, kata et organisation', niveau: 'base',
    resume: 'Ceintures, dan, les kata du Kodokan et les catégories de poids.',
    sections: [
      { t: 'Les ceintures chez les adultes (France)', tab: { h: ['Grade', 'Ceinture'], r: [
        ['Kyu (grades d\'élève)', 'Blanche, jaune, orange, verte, bleue, marron'], ['1er au 5e dan', 'Noire'], ['6e au 8e dan', 'Rouge et blanche'], ['9e et 10e dan', 'Rouge'],
      ] }, p: ['La ceinture noire n\'est pas une fin : c\'est le début de la maîtrise. L\'examen du 1er dan évalue notamment le kata, les connaissances techniques et l\'efficacité en combat (règlement des grades de France Judo, à vérifier chaque saison).'] },
      { t: 'Le nage-no-kata (kata des projections)', tab: { h: ['Série', 'Techniques'], r: [
        ['1. Te-waza', 'Uki-otoshi, seoi-nage, kata-guruma'], ['2. Koshi-waza', 'Uki-goshi, harai-goshi, tsuri-komi-goshi'], ['3. Ashi-waza', 'Okuri-ashi-barai, sasae-tsuri-komi-ashi, uchi-mata'],
        ['4. Ma-sutemi-waza', 'Tomoe-nage, ura-nage, sumi-gaeshi'], ['5. Yoko-sutemi-waza', 'Yoko-gake, yoko-guruma, uki-waza'],
      ] }, p: ['Chaque technique est exécutée à droite puis à gauche. Autres kata : katame-no-kata (immobilisations, étranglements, clés), kime-no-kata, ju-no-kata, kodokan goshin-jutsu.'] },
      { t: 'Les catégories de poids seniors', tab: { h: ['', 'Catégories'], r: [
        ['Hommes', '−60, −66, −73, −81, −90, −100, +100 kg'], ['Femmes', '−48, −52, −57, −63, −70, −78, +78 kg'],
      ] } },
      { t: 'Les institutions', l: ['FIJ (Fédération internationale de judo, 1951) : règlement international et circuit mondial.', 'EJU : union européenne de judo.', 'France Judo : fédération française, grades, arbitrage national.', 'FFSU : compétitions universitaires.'] },
    ],
    retenir: ['Blanche → jaune → orange → verte → bleue → marron → noire', 'Degrés de la ceinture noire = dan', 'Nage-no-kata : 5 séries de 3 techniques'],
  },
  {
    id: 'securite', titre: 'Sécurité, hygiène et règles du dojo', niveau: 'base',
    resume: 'Les règles non négociables, à rappeler à chaque séance.',
    sections: [
      { t: 'Abandon et arrêt', l: [
        'Pour abandonner : taper 2 fois (sur le partenaire ou le tapis) ou dire « maitta » (j\'abandonne). Le partenaire lâche immédiatement.',
        'Si un partenaire ne tape pas mais semble en difficulté, on lâche quand même et on prévient l\'enseignant.',
        'Au matte (stop), tout s\'arrête. Deux combattants près du bord sont arrêtés par l\'enseignant.',
      ] },
      { t: 'Clés, étranglements, sacrifices', l: [
        'Kansetsu-waza (clés articulaires) et shime-waza (étranglements) : uniquement à partir du niveau intermédiaire.',
        'Clés uniquement sur le coude ; clés et étranglements interdits debout.',
        'Étranglements : pression lente, jamais sur la trachée.',
        'Sutemi-waza (sacrifices) : appris sur tapis épais, avec un uke de même niveau ou plus.',
      ] },
      { t: 'Techniques et gestes interdits', l: [
        'Kani-basami (ciseau de crabe), do-jime (étranglement du tronc avec les jambes).',
        'Plonger tête la première, clé sur une articulation autre que le coude.',
        'Clé ou étranglement associés à une projection quand uke ne peut pas l\'éviter.',
      ] },
      { t: 'Hygiène et appariement', l: [
        'Judogi propre, ongles courts, aucun bijou ni piercing, cheveux attachés, zori jusqu\'au bord du tatami.',
        'Gabarits proches en randori ; un débutant ne fait jamais de randori debout contre un avancé sans consigne de contrôle.',
        'Vérifier avec le service des sports les exigences de certificat médical et d\'assurance pour un sport de combat.',
      ] },
    ],
    retenir: ['2 tapes ou « maitta » = lâcher tout de suite', 'Clés sur le coude uniquement, jamais debout', 'Pas de pression sur la trachée'],
  },
];

// Liens entre séances (programme 24) et chapitres de théorie à approfondir en L2 STAPS
export const LIENS_STAPS_24 = {
  1: ['histoire', 'securite'], 2: ['biomeca', 'principes'], 3: ['didactique'], 4: ['technique'], 5: ['technique'], 6: ['biomeca', 'technique'],
  7: ['technique'], 8: ['didactique'], 9: ['physio'], 10: ['biomeca'], 11: ['biomeca', 'histoire'], 12: ['didactique'], 13: ['biomeca', 'grades'],
  14: ['biomeca', 'technique'], 15: ['technique'], 16: ['securite'], 17: ['securite'], 18: ['securite', 'physio'], 19: ['physio'], 20: ['grades'], 21: ['didactique'],
};
export const LIENS_STAPS_12 = {
  1: ['histoire', 'securite'], 2: ['biomeca', 'principes'], 3: ['technique', 'didactique'], 4: ['biomeca', 'technique'], 5: ['didactique'], 6: ['biomeca'],
  7: ['biomeca', 'didactique'], 8: ['technique', 'securite'], 9: ['securite', 'physio'], 10: ['grades'],
};

export const GLOSSAIRE = [
  ['Ai-yotsu', 'Gardes identiques (droitier contre droitier)'], ['Ashi-waza', 'Techniques de jambe'], ['Ayumi-ashi', 'Pas marché'], ['Dan', 'Degré de la ceinture noire'],
  ['Dojo', 'Lieu d\'étude de la voie'], ['Golden score', 'Prolongation : le premier qui marque gagne'], ['Hajime', 'Commencez'], ['Hansoku-make', 'Disqualification'],
  ['Hikite', 'Main de manche (qui tire)'], ['Ippon', 'Point complet, fin du combat'], ['Jigo-tai', 'Posture défensive'], ['Jita kyoei', 'Entraide et prospérité mutuelle'],
  ['Judo', 'Voie de la souplesse'], ['Judogi', 'Tenue de judo'], ['Kaeshi-waza', 'Contre-prises'], ['Kake', 'Exécution'], ['Kakari-geiko', 'Exercice d\'attaques répétées'],
  ['Kansetsu-waza', 'Clés articulaires (coude uniquement)'], ['Kata', 'Forme codifiée'], ['Katame-waza', 'Techniques de contrôle au sol'], ['Kenka-yotsu', 'Gardes opposées'],
  ['Kiken-gachi', 'Victoire par abandon de l\'adversaire'], ['Kodokan', 'École où l\'on étudie la voie (fondée en 1882)'], ['Koshi-waza', 'Techniques de hanche'], ['Kumikata', 'Façon de saisir (la garde)'],
  ['Kuzushi', 'Déséquilibre'], ['Kyu', 'Grade d\'élève (avant la ceinture noire)'], ['Maitta', 'J\'abandonne'], ['Matte', 'Attendez, stop'], ['Nage-komi', 'Répétition de projections'],
  ['Nage-waza', 'Techniques de projection'], ['Ne-waza', 'Travail au sol'], ['Osae-komi', 'Immobilisation (annonce de l\'arbitre)'], ['Osae-komi-waza', 'Techniques d\'immobilisation'],
  ['Randori', 'Exercice d\'opposition libre'], ['Rei', 'Salut'], ['Renraku-waza', 'Combinaisons (enchaîner deux attaques)'], ['Ritsu-rei', 'Salut debout'],
  ['Seiryoku zen\'yo', 'Meilleure utilisation de l\'énergie'], ['Shiai', 'Compétition'], ['Shido', 'Pénalité'], ['Shime-waza', 'Étranglements'], ['Shintai', 'Déplacements'],
  ['Shizen-tai', 'Posture naturelle'], ['Sono-mama', 'Ne bougez plus'], ['Sore-made', 'C\'est fini'], ['Sutemi-waza', 'Techniques de sacrifice'], ['Tachi-waza', 'Travail debout'],
  ['Tai-sabaki', 'Rotation du corps'], ['Tatami', 'Tapis'], ['Te-waza', 'Techniques de bras'], ['Toketa', 'Sortie d\'immobilisation'], ['Tokui-waza', 'Technique spéciale, préférée'],
  ['Tori', 'Celui qui exécute la technique'], ['Tsugi-ashi', 'Pas chassés'], ['Tsukuri', 'Placement, construction'], ['Tsurite', 'Main de revers (qui soulève)'], ['Uchi-komi', 'Répétition d\'entrées sans projeter'],
  ['Uke', 'Celui qui subit la technique et chute'], ['Ukemi', 'Brise-chute'], ['Waza-ari', 'Avantage technique'], ['Waza-ari awasete ippon', 'Deux waza-ari font ippon'],
  ['Yakusoku-geiko', 'Travail convenu, sans opposition'], ['Yoshi', 'Reprenez'], ['Yuko', 'Petit avantage'], ['Za-rei', 'Salut à genoux'], ['Zori', 'Sandales'],
];
