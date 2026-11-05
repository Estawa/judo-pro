# Génère docs/Notice_Judo_Pro.pdf (noir et blanc, paragraphes et lignes de tableau jamais coupés).
# Usage : python3 tools/notice.py   (captures d'écran dans tools/notice-img/, en niveaux de gris)
import os, re, sys
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib import colors
from reportlab.platypus import (BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table, TableStyle,
                                KeepTogether, Image, CondPageBreak)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG = os.path.join(ROOT, 'tools', 'notice-img')
sys.path.insert(0, ROOT)
VERSION = re.search(r"VERSION = '([^']+)'", open(os.path.join(ROOT, 'src/version.js'), encoding='utf8').read()).group(1)
DATE = '5 novembre 2026'

F = '/usr/share/fonts/truetype/dejavu/'
pdfmetrics.registerFont(TTFont('DV', F + 'DejaVuSans.ttf'))
pdfmetrics.registerFont(TTFont('DVB', F + 'DejaVuSans-Bold.ttf'))
pdfmetrics.registerFont(TTFont('DVI', F + 'DejaVuSans-Oblique.ttf'))
pdfmetrics.registerFontFamily('DV', normal='DV', bold='DVB', italic='DVI', boldItalic='DVB')

K = colors.black
st_body = ParagraphStyle('b', fontName='DV', fontSize=9.6, leading=13.2, textColor=K, spaceAfter=3)
st_bul = ParagraphStyle('bu', parent=st_body, leftIndent=12, bulletIndent=2, spaceAfter=2.5)
st_h1 = ParagraphStyle('h1', fontName='DVB', fontSize=13.5, leading=17, textColor=K, spaceBefore=10, spaceAfter=5)
st_h2 = ParagraphStyle('h2', fontName='DVB', fontSize=10.6, leading=14, textColor=K, spaceBefore=6, spaceAfter=3)
st_title = ParagraphStyle('t', fontName='DVB', fontSize=24, leading=28, textColor=K)
st_sub = ParagraphStyle('s', parent=st_body, fontName='DVI', fontSize=10, spaceAfter=8)
st_cell = ParagraphStyle('c', parent=st_body, fontSize=8.8, leading=11.6, spaceAfter=0)
st_cap = ParagraphStyle('cap', parent=st_body, fontName='DVI', fontSize=8, alignment=1)

story = []
def P(t): story.append(Paragraph(t, st_body))
def H1(t): story.append(CondPageBreak(40 * mm)); story.append(Paragraph(t, st_h1))
def H2(t): story.append(CondPageBreak(25 * mm)); story.append(Paragraph(t, st_h2))
def B(*items): story.extend(KeepTogether([Paragraph(i, st_bul, bulletText='•')]) for i in items)
def T(rows, widths):
    data = [[Paragraph(c, st_cell) for c in r] for r in rows]
    t = Table(data, colWidths=widths, repeatRows=1)
    t.setStyle(TableStyle([('GRID', (0, 0), (-1, -1), 0.5, K), ('VALIGN', (0, 0), (-1, -1), 'TOP'),
                           ('FONTNAME', (0, 0), (-1, 0), 'DVB'), ('LEFTPADDING', (0, 0), (-1, -1), 4), ('RIGHTPADDING', (0, 0), (-1, -1), 4)]))
    for i in range(len(data[0])): data[0][i].style = ParagraphStyle('ch', parent=st_cell, fontName='DVB')
    story.append(t); story.append(Spacer(1, 6))
def IMGS(*pairs):
    cells, caps = [], []
    for f, cap in pairs:
        p = os.path.join(IMG, f)
        im = Image(p); r = im.imageHeight / im.imageWidth; w = 52 * mm
        im.drawWidth, im.drawHeight = w, min(w * r, 105 * mm)
        im._restrictSize(w, 105 * mm)
        cells.append(im); caps.append(Paragraph(cap, st_cap))
    t = Table([cells, caps], colWidths=[58 * mm] * len(cells))
    t.setStyle(TableStyle([('ALIGN', (0, 0), (-1, -1), 'CENTER'), ('BOX', (0, 0), (-1, 0), 0, colors.white)]))
    story.append(KeepTogether([t, Spacer(1, 6)]))

# ---------------------------------------------------------------- contenu
story.append(Paragraph('Judo Pro', st_title))
story.append(Paragraph(f'by C. Guilhem — notice d\'utilisation · version {VERSION} · {DATE}', st_sub))
P('Judo Pro aide à préparer, conduire et évaluer un cycle de judo à l\'université : programmation, bibliothèque de techniques animée, '
  'théorie, arbitrage, quiz, suivi du groupe et notes. L\'appli s\'installe sur téléphone, tablette ou ordinateur et fonctionne hors connexion au dojo.')
P('<b>L\'appli prend trois formes</b>, selon le parcours choisi dans Réglages :')
T([['Parcours', 'Programmation', 'Évaluation', 'Ce qui change'],
   ['SUAPS / option notée', '24 ou 12 séances en 4 niveaux', 'Pratique /14 + écrit /6', 'Forme de base.'],
   ['L2 STAPS', '24 ou 12 séances en 4 niveaux', 'Pratique et intervention /14 + écrit /6', 'Volet de formation par séance, onglet Observer, intervention pédagogique notée.'],
   ['Prog Élèves', '15 séances, progression pour débutants', 'Pratique /12 + écrit /8', 'Séances construites comme pour des élèves débutants, point didactique dans chaque séance, cadre, fondamentaux, groupe et évaluation adaptés.']],
  [30 * mm, 42 * mm, 38 * mm, 64 * mm])
P('Les parties propres à un parcours sont signalées dans cette notice.')

H1('1. Installation et premier lancement')
H2('Installer l\'appli')
B('Ouvrir le lien Vercel de l\'appli dans le navigateur (Chrome sur Android, Safari sur iPhone/iPad).',
  'Android : menu (trois points) puis « Ajouter à l\'écran d\'accueil » / « Installer l\'application ».',
  'iPhone/iPad : bouton Partager puis « Sur l\'écran d\'accueil ».',
  'Après une première ouverture avec internet, l\'appli fonctionne sans réseau. Les mises à jour s\'installent seules à la connexion suivante.')
H2('Écran d\'accueil')
B('<b>Je suis étudiant</b> : accès libre aux onglets Programme, Fondamentaux, Techniques, Théorie, Arbitrage et Quiz (entraînement).',
  '<b>Tu es professeur ? Connexion ici</b> : saisir votre code professeur puis « Se connecter ». Ce code fonctionne sur tous les appareils ; un code personnel peut être ajouté sur un appareil dans Réglages.',
  '<b>Accès terminé</b> : après la date de fin d\'accès, ou si l\'accès a été fermé, l\'espace étudiant affiche ce message et ne fonctionne plus, même hors connexion. La connexion professeur reste possible.',
  'Le profil reste mémorisé : le bouton de sortie (flèche en haut à droite) ramène à l\'écran d\'accueil.')
H2('Barre du haut')
B('Sous le nom de l\'appli : espace (professeur ou étudiant) et parcours en cours (SUAPS, L2 STAPS ou Prog Élèves).',
  '<b>Chrono</b> (horloge) : ouvre le chrono de randori depuis n\'importe quel onglet.',
  '<b>Jour / nuit</b> (lune ou soleil) : change le thème d\'affichage.',
  '<b>Sortie</b> : déconnexion du professeur ou changement de profil. Les onglets défilent horizontalement sur téléphone.')

H1('2. Onglet Séances (Programme côté étudiant)')
IMGS(('seances.png', 'Liste des séances (SUAPS, 24 séances)'), ('fiche.png', 'Fiche d\'une séance'), ('prog-eleves.png', 'Liste des séances en Prog Élèves'))
H2('Liste des séances')
B('<b>24 séances / 12 séances</b> (parcours SUAPS et L2 STAPS) : choisit la programmation, reprise de vos documents « Programmation Judo universitaire ».',
  '<b>Prog Élèves</b> : la liste affiche les 15 séances de la progression pour débutants, groupées en 5 étapes (entrer dans l\'activité S1-S3, maîtriser le sol S4-S6, apprendre à projeter S7-S10, relier et s\'opposer S11-S13, évaluer S14-S15). Le choix 24/12 et le filtre par niveau disparaissent : la progression est commune à tout le groupe. Dans chaque séance, toutes les techniques prévues s\'affichent avec leur fiche (schéma animé, points clés, vidéos).',
  '<b>Cadre</b> : en SUAPS et L2 STAPS, principes, les 4 niveaux et structure type d\'une séance de 1 h 30. En Prog Élèves : public et finalité, contenus à acquérir, tableau de la progression générale, organisation type d\'une séance et règles de sécurité permanentes.',
  '<b>Voir le contenu du niveau</b> (Tous, Débutant, Inter., Confirmé, Avancé ; SUAPS et L2 STAPS) : met en avant le contenu du niveau choisi dans chaque fiche.',
  'Compteur et barre de progression des séances faites ; bouton <b>Prochaine séance</b> qui ouvre la première séance non faite.',
  'Cercle plein = séance faite ; cercle à bord marqué = séance d\'évaluation ou de bilan. Sous le titre : date prévue et nombre de présents.')
H2('Fiche d\'une séance')
B('Flèches ‹ › : séance précédente ou suivante.',
  '<b>Marquer comme faite</b> : coche la séance. <b>Appel</b> : P (présent), A (absent), D (dispensé) ; « Tous présents » remplit tout d\'un coup.',
  '<b>Chrono randori</b> ; <b>Imprimer</b> (noir et blanc) ; <b>Date</b> prévue (calculable dans Réglages).',
  '<b>Objectif, Déroulement, Critères de réussite</b> : contenu de la séance. En Prog Élèves, chaque étape du déroulé indique ses minutes (par exemple « Chutes (20-35 min) »).',
  '<b>Point didactique (pour enseigner à des débutants)</b> (Prog Élèves) : pourquoi cette situation, erreurs fréquentes, variables pour simplifier ou complexifier.',
  '<b>Déclinaison par niveau</b> (SUAPS et L2 STAPS) : travail des débutants, intermédiaires, confirmés et avancés.',
  '<b>Techniques de la séance</b> : touchez une technique pour ouvrir sa fiche animée.',
  '<b>Fondamentaux du cycle abordés</b> : fondamentaux travaillés ce jour-là.',
  '<b>Théorie en 5 minutes</b> : la phrase « à dire » et, en SUAPS et L2 STAPS, le mini-quiz oral (toucher une question affiche la réponse).',
  '<b>Pour aller plus loin (L2 STAPS)</b> : chapitres de théorie liés (programmations 24 et 12).',
  '<b>Volet L2 STAPS</b> (parcours STAPS) : objectif de formation, tâche des étudiants, désignation des étudiants qui conduisent l\'échauffement ou une situation.',
  '<b>Mes notes de séance</b> : notes libres, enregistrées automatiquement.')

H1('3. Partager l\'appli avec les étudiants et fermer leur accès')
H2('Partager')
B('Réglages › Partager avec les étudiants : « Partager » envoie le lien ; « Copier le lien » le place dans le presse-papiers. Pour projeter un QR code : dans Chrome, menu (trois points) › Partager › Code QR.',
  'Chaque étudiant ouvre le lien, touche « Je suis étudiant », puis installe l\'appli.')
H2('Ce que voient les étudiants')
B('Onglets Programme, Fondamentaux, Techniques, Théorie, Arbitrage, Quiz et, en parcours L2 STAPS, Observer. Le parcours se règle sur chaque appareil : par défaut, les étudiants voient la forme SUAPS.',
  'Ils ne voient pas : le groupe, les appels, les notes, l\'évaluation, les réglages, ni les boutons pour remplacer les dessins.',
  'Leurs traces (scores, observations, fiche de préparation) restent sur leur téléphone.',
  'Vos photos et vidéos qui remplacent les dessins n\'apparaissent chez eux qu\'après publication (Réglages › Exporter mes illustrations).')
H2('Fermer l\'accès à la fin du cycle')
B('Réglages › Accès des étudiants indique si l\'accès est ouvert et jusqu\'à quelle date.',
  'À la date de fin, l\'espace étudiant cesse de fonctionner tout seul, même hors connexion.',
  'Pour fermer plus tôt ou changer la date : le demander, ou modifier sur GitHub le fichier config/acces.json (« etudiants » à false, ou nouvelle date « fin »).')

H1('4. Onglet Fondamentaux')
B('Visible par le professeur et par les étudiants : ce que chaque étudiant doit avoir vu pendant le cycle.',
  '<b>Sol : immobilisations et retournements</b> : les 4 immobilisations de base (kesa-gatame, yoko-shiho-gatame, kami-shiho-gatame, tate-shiho-gatame), position de tori, contrôle, retournement qui y mène, sortie, passage ; circuit des immobilisations ; les 4 façons de renverser uke à quatre pattes ; les familles du sol.',
  '<b>Familles debout</b> : te-waza, koshi-waza, ashi-waza, ma-sutemi-waza et yoko-sutemi-waza, avec une technique de référence chacune.',
  '<b>Opposition sol et debout</b> : règles, étapes de la coopération vers l\'opposition, situations.',
  '<b>Où dans le cycle</b> : numéros des séances où chaque fondamental est travaillé, selon la programmation choisie (24, 12 ou 15 séances) ; les séances faites apparaissent en noir plein.')

H1('5. Chrono randori')
B('Régler la durée (1 min 30, 2, 3 ou 4 min), la pause entre partenaires et le nombre de rotations ; Démarrer / Pause / Reprendre / Remettre à zéro.',
  'Signaux sonores : long bip au hajime, bip 10 s avant la fin, deux bips au matte, trois bips à la fin. Monter le volume de l\'appareil.')

H1('6. Onglet Techniques')
IMGS(('technique.png', 'Fiche o-soto-gari'), ('groupe.png', 'Onglet Groupe'))
B('Recherche (nom japonais ou traduction), filtres Tout / Chutes / Debout / Sol, par famille et par niveau.',
  '<b>Schéma animé</b> : projections = placement des pieds vu de dessus en 4 temps ; sol = positions vues de dessus ; chutes = bonhomme animé. Rose des déséquilibres.',
  'Kuzushi / tsukuri / kake, points clés, erreurs, sécurité, éducatifs, enchaînements, contres, sorties.',
  'Vidéos : animation 3D et fiche FIJ, recherche YouTube ; <b>Ajouter une vidéo YouTube</b> (professeur).',
  '<b>Remplacer un dessin</b> (professeur) : « Photo / vidéo » ouvre l\'appareil photo, « Album » la galerie ou les fichiers ; « Dessin » remet le schéma d\'origine. Même principe pour la direction du déséquilibre et les gestes de l\'arbitre.',
  '<b>Mes photos, vidéos et GIF</b> (professeur) : stockés sur l\'appareil, hors ligne.')

H1('7. Onglet Théorie')
B('Chapitres : fiche théorie ou approfondissement STAPS (histoire, principes et code moral, analyse technique, biomécanique, physiologie, didactique, grades et kata, sécurité).',
  'Lexique avec recherche ; cartes mémoire ; décodeur des noms de techniques.')

H1('8. Onglet Arbitrage')
B('Règles (règlement FIJ), annonces et gestes dessinés, quiz des gestes, 25 situations de combat.',
  '<b>Table de marque</b> : durée 2, 3 ou 4 min ; Hajime / Matte ; Ippon, Waza-ari, Yuko, Shido, Osae-komi, « Annuler un score ». Toketa attribue le score selon le temps (5 à 9 s yuko, 10 à 19 s waza-ari, 20 s ippon). Deux waza-ari = ippon, trois shido = hansoku-make, égalité = golden score.')

H1('9. Onglet Quiz')
B('<b>S\'entraîner</b> : contenu, thèmes, nombre de questions ; corrections expliquées ; questions à revoir.',
  '<b>Passer l\'écrit sur l\'appareil</b> (professeur) : l\'étudiant répond aux QCM et aux questions courtes puis « Rendre ma copie » ; le QCM est noté tout de suite.',
  '<b>Sujet à imprimer</b> : tirage selon le barème, Autre tirage, Afficher le corrigé, Imprimer. La durée indiquée suit la programmation (25, 30 ou 40 min).',
  '<b>Prog Élèves</b> : la partie 2 de l\'écrit tire une <b>question de didactique</b> (construire une séance d\'1 h pour des débutants, ou justifier l\'ordre de la progression), notée sur 4 avec ses éléments de corrigé.',
  '<b>Banque de questions</b> : toutes les questions avec réponses ; étiquette Fiche, STAPS ou Didactique.')

H1('10. Onglet Observer (parcours L2 STAPS)')
B('Fiche d\'observation de randori : chrono, compteurs d\'attaques, projections, liaisons, immobilisations ; efficacité et fréquence calculées ; enregistrement et export CSV (professeur).',
  'Préparer une intervention : fiche à remplir et à imprimer ; fiches vierges en noir et blanc.')

H1('11. Onglet Groupe')
B('<b>Ajouter</b> : nom, prénom, groupe, niveau. <b>Importer</b> : .xlsx, .xls, .ods ou .csv (colonnes Nom, Prénom, Classe, Niveau ; ligne de titre ignorée ; colonne « Élève » NOM Prénom reconnue ; doublons ignorés).',
  '<b>Exporter</b> : CSV du groupe (niveaux, présences, notes sur le barème du parcours).',
  '<b>Binômes</b> : même niveau ou tutorat, limité aux présents du dernier appel.',
  'Fiche d\'un étudiant : identité, niveau, tokui-waza, bilan de mi-parcours, programme de démonstration, interventions (L2 STAPS), notes, historique des appels.',
  '<b>Prog Élèves</b> : le bilan se fait à la fin de l\'étape sol (S6) avec l\'exigence « 3 chutes, les 4 immobilisations, 1 retournement et 1 renversement enchaînés » ; la démonstration attendue est celle de la séance 14.')

H1('12. Onglet Évaluation')
B('<b>SUAPS : pratique /14</b> : A. démonstration (kuzushi-tsukuri /3, chute de uke /2, liaison /2), B. randori (/2, /2, /1), C. rôles sociaux (arbitrage /1, uke /1).',
  '<b>L2 STAPS : pratique et intervention /14</b> : A. démonstration /4, B. randori /3, C. intervention pédagogique /6, D. rôles sociaux /1.',
  '<b>Prog Élèves : pratique /12</b> (S14) : A. démonstration /6 (chutes /1, immobilisations /1,5, retournement et renversement /1, projections /2, liaison debout-sol /0,5), B. combat arbitré /4 (engagement /1,5, efficacité /1,5, respect des règles /1), C. arbitrage /2. Rappel de la démonstration attendue et des 2 combats de 2 min.',
  'Chaque critère se note par demi-point ; flèches pour passer à l\'étudiant suivant ; commentaire.',
  '<b>Théorie</b> : nombre de bonnes réponses au QCM ou copie sur l\'appareil ; questions courtes notées à côté du corrigé.',
  '<b>Récapitulatif</b> : tableau par épreuve, total, moyennes ; Imprimer ; Exporter CSV.')

H1('13. Onglet Réglages')
IMGS(('reglages.png', 'Choix du parcours'), ('cadre-p15.png', 'Cadre de la progression Prog Élèves'))
B('<b>Parcours</b> : SUAPS / option notée, L2 STAPS ou Prog Élèves. En changeant, l\'appli propose le barème d\'écrit conseillé : SUAPS 8 QCM à 0,5 + 2 questions courtes à 1 (= 6) ; STAPS 6 QCM à 0,5 + 3 questions à 1 (= 6) ; Prog Élèves 16 QCM à 0,25 + 1 question de didactique à 4 (= 8).',
  'Choisir Prog Élèves passe automatiquement à la programmation de 15 séances ; revenir à SUAPS ou L2 STAPS repasse en 24 ou 12 séances. Les appels, dates, notes de séance et séances faites sont gardés séparément pour chaque programmation.',
  'Nom du groupe ; programmation 24 ou 12 séances (SUAPS, L2 STAPS).',
  '<b>Calendrier</b> : date de la première séance et semaines sans cours, puis Calculer les dates (une séance par semaine).',
  '<b>Barème de l\'écrit</b> : nombre de QCM, points par QCM, nombre de questions courtes, points par question.',
  'Code personnel ; thème jour / nuit ; Partager avec les étudiants ; Accès des étudiants.',
  '<b>Mes illustrations</b> : Exporter mes illustrations (zip) pour publier vos photos et vidéos.',
  '<b>Sauvegarder / Restaurer</b> ; journal des versions, notice PDF, Tout effacer.')

H1('14. Procédure conseillée')
H2('SUAPS et L2 STAPS (24 séances ; 12 séances entre parenthèses)')
T([['Moment', 'Dans l\'appli'],
   ['Avant S1', 'Réglages : parcours, groupe, programmation, calendrier ; partager le lien. Groupe : importer la liste.'],
   ['S1', 'Appel ; test de positionnement ; niveau de chacun dans Groupe ; fiche théorie.'],
   ['Chaque séance', 'Prochaine séance → théorie en 5 min → contenu par niveau → chrono randori → appel → notes → Marquer comme faite. L2 STAPS : intervenants dans le volet STAPS, fiches d\'observation.'],
   ['S12 (S4)', 'Bilan : réajuster les niveaux, points forts et axes de travail.'],
   ['S22 (S10)', 'Écrit : sujet imprimé ou sur l\'appareil ; corriger dans Évaluation > Théorie.'],
   ['S23-S24 (S11-S12)', 'Évaluation > Pratique ; Récapitulatif ; Exporter CSV ; Sauvegarder.']], [35 * mm, 139 * mm])
H2('Prog Élèves (15 séances)')
T([['Moment', 'Dans l\'appli'],
   ['Avant S1', 'Réglages : parcours Prog Élèves (accepter le barème /8), groupe, calendrier ; Groupe : importer la liste. Lire le Cadre (sécurité, progression).'],
   ['S1 à S13', 'Prochaine séance → déroulé minuté → point didactique à discuter avec les étudiants → appel → notes → Marquer comme faite.'],
   ['S6', 'Fin de l\'étape sol : bilan dans chaque fiche étudiant (exigence affichée).'],
   ['S12 et S13', 'Arbitrage complet (table de marque) ; simulation de l\'épreuve avec la grille ; quiz oral.'],
   ['S14', 'Évaluation > Pratique /12 pour chaque étudiant (démonstration, 2 combats arbitrés, arbitrage).'],
   ['S15', 'Écrit /8 : Quiz > Sujet à imprimer (QCM + question de didactique) ; corriger dans Évaluation > Théorie ; Récapitulatif ; Sauvegarder.']], [35 * mm, 139 * mm])

H1('15. Données')
P('Toutes les données restent sur l\'appareil utilisé (aucun compte, aucun envoi en ligne). Pour passer sur un autre appareil : Sauvegarder puis Restaurer. '
  'Les photos et vidéos qui remplacent les dessins restent sur l\'appareil jusqu\'à leur publication. Les liens vers les vidéos externes demandent une connexion internet.')

H1('16. Chronologie des versions')
T([['Version', 'Date', 'Contenu'],
   ['1.4.1', '5 novembre 2026', 'Séances : toutes les techniques prévues dans une séance s\'affichent, quel que soit le niveau choisi (tai-otoshi en séance 9 de Prog Élèves et la chute avant roulée étaient masqués).'],
   ['1.4.0', '5 novembre 2026', 'Troisième parcours « Prog Élèves » : l\'appli prend trois formes (SUAPS, L2 STAPS, Prog Élèves). Progression de 15 séances pour débutants avec déroulé minuté et point didactique ; cadre, fondamentaux, groupe, évaluation pratique /12 et écrit /8 adaptés ; questions de didactique.'],
   ['1.3.0', '4 novembre 2026', 'Fin d\'accès des étudiants à une date choisie ou sur demande, même hors connexion ; code professeur commun ; partage du lien depuis Réglages.'],
   ['1.2.1', '4 novembre 2026', 'Import des étudiants depuis Excel (.xlsx, .xls), LibreOffice (.ods) ou CSV ; ligne de titre ignorée, colonne « Élève » reconnue, doublons ignorés.'],
   ['1.2.0', '4 novembre 2026', 'Onglet Fondamentaux : 4 immobilisations avec retournements, sorties et passages ; 4 retournements de uke à quatre pattes ; familles debout et sol ; opposition ; place dans le cycle.'],
   ['1.1.0', '3 novembre 2026', 'Parcours L2 STAPS : volet de formation, onglet Observer, grille avec intervention pédagogique, chapitre « Préparer et conduire une intervention ».'],
   ['1.0.0', '3 novembre 2026', 'Première version : programmations 24 et 12 séances en 4 niveaux, techniques animées, théorie, arbitrage, quiz, groupe, évaluation, dessins remplaçables, chrono, hors connexion.']],
  [18 * mm, 30 * mm, 126 * mm])

# ---------------------------------------------------------------- mise en page
def deco(c, d):
    c.saveState(); c.setFont('DV', 8); c.setFillColor(K)
    c.drawString(18 * mm, A4[1] - 11 * mm, f'Judo Pro by C. Guilhem — notice v{VERSION}')
    c.drawRightString(A4[0] - 18 * mm, A4[1] - 11 * mm, f'page {d.page}')
    c.setLineWidth(0.4); c.line(18 * mm, A4[1] - 13 * mm, A4[0] - 18 * mm, A4[1] - 13 * mm)
    c.restoreState()

out = os.path.join(ROOT, 'docs', 'Notice_Judo_Pro.pdf')
doc = BaseDocTemplate(out, pagesize=A4, leftMargin=18 * mm, rightMargin=18 * mm, topMargin=18 * mm, bottomMargin=15 * mm,
                      title='Notice Judo Pro', author='C. Guilhem')
doc.addPageTemplates([PageTemplate(frames=[Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id='f')], onPage=deco)])
doc.build(story)
print('Notice OK', out)
