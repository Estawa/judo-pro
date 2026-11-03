# Judo Pro by C. Guilhem

Application web (PWA, hors connexion) pour préparer, conduire et évaluer un cycle de judo en L2 STAPS :
programmations de 24 et 12 séances en 4 niveaux, techniques avec schémas animés remplaçables par vos photos et vidéos,
théorie STAPS, arbitrage FIJ 2026, quiz et écrit, groupe, appel, binômes, évaluation.
Deux parcours (Réglages) : SUAPS / option notée, ou L2 STAPS (volet de formation, observation, intervention pédagogique notée).

Notice complète : `docs/Notice_Judo_Pro.pdf`.

## Mise en ligne (GitHub + Vercel)
1. Créer le dépôt GitHub `Estawa/judo-pro` (privé) et y envoyer tout le dossier.
2. Vercel > Add New > Project > importer `judo-pro`. Framework Preset : **Other**, pas de commande de build,
   Output Directory : `.` (racine). L'appli est déjà construite (`assets/app.js`, `assets/app.css`).
3. Chaque envoi sur GitHub redéploie l'appli ; le service worker met à jour les appareils à l'ouverture suivante.

Aucun projet Firebase n'est nécessaire : les données restent sur l'appareil (sauvegarde/restauration dans Réglages).

## Publier les photos et vidéos qui remplacent les dessins
Réglages > « Exporter mes illustrations (zip) » produit un dossier `media/` (fichiers + `manifest.json`).
Le copier à la racine du dépôt : les illustrations apparaissent alors sur tous les appareils (celles faites
sur un appareil restent prioritaires sur cet appareil).

## Modifier le code
Sources dans `src/` (React). Reconstruire : `cd tools && npm install && npm run build`.
Contenus : `src/data/` (séances, techniques, théorie, quiz, arbitrage, barèmes).
