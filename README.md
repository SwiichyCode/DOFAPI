# API Archimonstres

L'API Archimonstres est un service permettant de récupérer des informations sur les archimonstres du jeu Dofus. Elle facilite l'échange d'archimonstres entre les joueurs ainsi que la vente d'items rares. L'API est construite avec Node.js et Express, et utilise MongoDB comme base de données pour stocker les données des archimonstres.

## Fonctionnalités principales

- Récupération de la liste complète des archimonstres
- Recherche d'archimonstres par étape
- Recherche d'archimonstres par nom (partiel)
- Pagination des résultats pour une meilleure performance
- Sécurité renforcée avec authentification basée sur JWT (JSON Web Tokens)
- Limitation du taux de requêtes pour éviter les abus
- Gestion des erreurs et réponses appropriées aux clients

## Routes de l'API

L'API Archimonstres offre les routes suivantes pour accéder aux données des Archimonstres :

- GET /api/archimonstres : Récupère tous les Archimonstres disponibles.

- GET /api/archimonstres/etape/:step : Récupère les Archimonstres selon l'étape spécifiée. Remplacez :step par le numéro de l'étape souhaitée.

- GET /api/archimonstres/nom/:name : Récupère les Archimonstres selon le nom partiel. Remplacez :name par une partie du nom recherché.

## Technologies utilisées

- Node.js
- Express
- MongoDB
- Mongoose (ODM pour MongoDB)
- JSON Web Tokens (JWT) pour l'authentification
- Rate Limiting pour la limitation du taux de requêtes
- Pagination des résultats pour une meilleure performance

## Installation et utilisation

1. Cloner le repository : `git clone https://github.com/votre-utilisateur/mon-api-archimonstres.git`
2. Installer les dépendances : `npm install`
3. Configurer les variables d'environnement dans le fichier `.env`
4. Lancer le serveur : `npm start`

## Contribuer

Les contributions sont les bienvenues ! Si vous souhaitez améliorer cette API, vous pouvez ouvrir une issue pour discuter des fonctionnalités proposées ou soumettre une pull request pour proposer des modifications.
