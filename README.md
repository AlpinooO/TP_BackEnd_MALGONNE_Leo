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
- GET /pokamon/health — état du service
- GET /pokamon/trainers — lister les dresseurs
- POST /pokamon/trainers — créer un dresseur { name }
- GET /pokamon/pokemons — lister les pokémons
- POST /pokamon/pokemons — créer un pokémon { name, maxLifePoints }
- GET /pokamon/attacks — lister les attaques
- POST /pokamon/attacks — créer une attaque { name, damage, usageLimit }
- POST /pokamon/trainers/:trainerId/pokemons/:pokemonId — ajouter un pokémon à un dresseur
- POST /pokamon/battles/random-duel — lancer un combat aléatoire { trainer1Id, trainer2Id }

Base de données
- Si vous utilisez PostgreSQL, exécutez `init.sql` pour créer les tables.

