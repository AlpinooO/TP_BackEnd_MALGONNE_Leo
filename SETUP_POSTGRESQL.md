# Pokémon API - Configuration PostgreSQL

## 📋 Prérequis

- Node.js (v14 ou supérieur)
- PostgreSQL installé et en cours d'exécution
- npm

## 🚀 Installation

### 1. Installer les dépendances

```bash
npm install
```

### 2. Créer la base de données PostgreSQL

```bash
# Créer la base de données
createdb pokemon_db

# OU avec psql :
psql -U postgres -c "CREATE DATABASE pokemon_db;"
```

### 3. Initialiser le schéma de la base de données

```bash
# Exécuter le script d'initialisation
psql -U postgres -d pokemon_db -f init.sql
```

### 4. Configurer la connexion à la base de données

Par défaut, l'application se connecte à :
```
postgresql://postgres:postgres@localhost:5432/pokemon_db
```

Pour utiliser une autre configuration, définissez la variable d'environnement `DATABASE_URL` :

**Windows (PowerShell):**
```powershell
$env:DATABASE_URL = "postgresql://votre_user:votre_password@localhost:5432/pokemon_db"
```

**Linux/Mac:**
```bash
export DATABASE_URL="postgresql://votre_user:votre_password@localhost:5432/pokemon_db"
```

### 5. Démarrer le serveur

**Avec JavaScript :**
```bash
node index.js
```

**Avec TypeScript :**
```bash
npm start
# OU pour le mode développement :
npm run dev
```

Le serveur démarre sur `http://localhost:3000`

## 📊 Structure de la base de données

### Tables

- **Trainer** : Dresseurs avec niveau et expérience
  - `trainer_id` (PK)
  - `name`
  - `level`
  - `experience`

- **Pokeman** : Pokémon avec points de vie
  - `pokeman_id` (PK)
  - `name`
  - `max_life_point`
  - `life_point`

- **Attack** : Attaques des Pokémon
  - `attack_id` (PK)
  - `name`
  - `damage`
  - `usage_limit`
  - `usage_count`
  - `pokeman_id` (FK → Pokeman)

- **Trainer_Pokeman** : Table de jonction dresseur-pokémon
  - `trainer_id` (FK → Trainer)
  - `pokeman_id` (FK → Pokeman)

## 🎮 API Endpoints

### Dresseurs

- `POST /api/trainers` - Créer un dresseur
- `GET /api/trainers` - Liste tous les dresseurs
- `GET /api/trainers/:id` - Détails d'un dresseur
- `POST /api/trainers/:trainerId/experience` - Gagner de l'expérience
- `POST /api/trainers/:trainerId/tavern` - Soigner tous les Pokémon

### Pokémon

- `POST /api/pokemons` - Créer un Pokémon
- `POST /api/trainers/:trainerId/pokemons/:pokemonId` - Ajouter un Pokémon à un dresseur
- `POST /api/pokemons/:pokemonId/attacks` - Apprendre une attaque
- `POST /api/pokemons/:pokemonId/heal` - Soigner un Pokémon

### Combats

- `GET /api/battle/random/:trainer1Id/:trainer2Id` - Combat aléatoire
- `GET /api/battle/arena1/:trainer1Id/:trainer2Id` - Arène 1 (100 combats aléatoires)
- `GET /api/battle/deterministic/:trainer1Id/:trainer2Id` - Combat déterministe
- `GET /api/battle/arena2/:trainer1Id/:trainer2Id` - Arène 2 (100 combats déterministes)

## 🧪 Exemples de requêtes

### Créer un dresseur

```bash
curl -X POST http://localhost:3000/api/trainers \
  -H "Content-Type: application/json" \
  -d '{"name": "Sacha", "level": 1, "experience": 0}'
```

### Créer un Pokémon

```bash
curl -X POST http://localhost:3000/api/pokemons \
  -H "Content-Type: application/json" \
  -d '{"name": "Pikachu", "lifePoint": 100}'
```

### Ajouter un Pokémon à un dresseur

```bash
curl -X POST http://localhost:3000/api/trainers/1/pokemons/1
```

### Apprendre une attaque

```bash
curl -X POST http://localhost:3000/api/pokemons/1/attacks \
  -H "Content-Type: application/json" \
  -d '{"name": "Tonnerre", "damage": 40, "usageLimit": 15}'
```

### Lancer un combat

```bash
curl http://localhost:3000/api/battle/random/1/2
```

## 🔧 Dépannage

### Erreur de connexion PostgreSQL

Vérifiez que PostgreSQL est en cours d'exécution :
```bash
# Windows
Get-Service postgresql*

# Linux
sudo systemctl status postgresql
```

### Base de données non trouvée

Assurez-vous d'avoir créé la base de données `pokemon_db` et exécuté `init.sql`.

### Port 3000 déjà utilisé

Modifiez le port dans `index.js` ou `index.ts` :
```javascript
const port = process.env.PORT || 3000;
```

## 🌐 Interface Web

Ouvrez `http://localhost:3000` dans votre navigateur pour accéder à l'interface interactive.

## 📚 Technologies utilisées

- **Express.js** - Framework web
- **PostgreSQL** - Base de données relationnelle
- **pg** - Client PostgreSQL pour Node.js
- **TypeScript** - Typage statique (optionnel)
