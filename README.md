# Pokémon API

Une API REST minimale pour gérer un jeu Pokémon (dresseurs, pokémons, attaques) et lancer des combats.

Prérequis
- Node.js et npm

Installation
1. Installer les dépendances :
   npm install
2. Lancer le serveur (dev) :
   npm run dev

Endpoints principaux
- GET /api/health — état du service
- GET /api/trainers — lister les dresseurs
- POST /api/trainers — créer un dresseur { name }
- GET /api/pokemons — lister les pokémons
- POST /api/pokemons — créer un pokémon { name, maxLifePoints }
- GET /api/attacks — lister les attaques
- POST /api/attacks — créer une attaque { name, damage, usageLimit }
- POST /api/trainers/:trainerId/pokemons/:pokemonId — ajouter un pokémon à un dresseur
- POST /api/battles/random-duel — lancer un combat aléatoire { trainer1Id, trainer2Id }

Base de données
- Si vous utilisez PostgreSQL, exécutez `init.sql` pour créer les tables.

