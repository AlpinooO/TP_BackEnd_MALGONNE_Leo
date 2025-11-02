# 🎮 Pokémon Battle API - TypeScript + PostgreSQLnpm install router



> API REST complète pour gérer un système de combats Pokémon avec TypeScript, Express et PostgreSQLnpm install express



## 🚀 Technologiesnpm install pg

- **TypeScript 5.3** - Typage statique et POO
- **Express 5.1** - Framework web
- **PostgreSQL** - Base de données relationnelle
- **pg 8.16** - Client PostgreSQL pour Node.js

## 📁 Structure du projet

```
├── controller/
│   ├── db.ts                    # Configuration PostgreSQL Pool
│   ├── apiRoutes.ts             # Définition des routes API
│   ├── battleController.ts      # Contrôleurs pour tous les endpoints
│   └── router.ts                # Configuration Express
├── model/
│   └── utils.ts                 # Classes métier (Pokeman, Attack, Trainer)
├── view/
│   └── index.html               # Interface web interactive
├── init.sql                     # Schéma de base de données
├── index.ts                     # Point d'entrée du serveur
├── tsconfig.json                # Configuration TypeScript
└── package.json                 # Dépendances et scripts
```

## 🛠️ Installation

### 1. Installer les dépendances
```bash
npm install
```

### 2. Configurer PostgreSQL

**Créer la base de données :**
```bash
createdb pokemon_db
# OU avec psql :
psql -U postgres -c "CREATE DATABASE pokemon_db;"
```

**Initialiser le schéma :**
```bash
psql -U postgres -d pokemon_db -f init.sql
```

**Configuration de connexion (optionnel) :**
```powershell
# Windows PowerShell
$env:DATABASE_URL = "postgresql://user:password@localhost:5432/pokemon_db"
```

Par défaut : `postgresql://postgres:postgres@localhost:5432/pokemon_db`

### 3. Démarrer le serveur

```bash
# Compiler et démarrer
npm start

# Mode développement avec ts-node
npm run dev
```

Le serveur démarre sur **http://localhost:3000** ✅

## 📊 Schéma de base de données

### Tables

**Trainer** - Dresseurs
- `trainer_id` (PK) - `name` - `level` - `experience`

**Pokeman** - Pokémon
- `pokeman_id` (PK) - `name` - `max_life_point` - `life_point`

**Attack** - Attaques
- `attack_id` (PK) - `name` - `damage` - `usage_limit` - `usage_count` - `pokeman_id` (FK)

**Trainer_Pokeman** - Association (many-to-many)
- `trainer_id` (FK) - `pokeman_id` (FK)

## 🎯 Endpoints API

### 👤 Dresseurs

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/api/trainers` | Créer un dresseur |
| GET | `/api/trainers` | Liste tous les dresseurs |
| GET | `/api/trainers/:id` | Détails d'un dresseur |
| POST | `/api/trainers/:id/experience` | Gagner de l'expérience |
| POST | `/api/trainers/:id/heal` | Soigner tous les Pokémon |

### 🐾 Pokémon

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/api/pokemons` | Créer un Pokémon |
| POST | `/api/trainers/:trainerId/pokemons/:pokemonId` | Ajouter à l'équipe |
| POST | `/api/pokemons/:id/learn` | Apprendre une attaque |
| POST | `/api/pokemons/:id/heal` | Soigner un Pokémon |

### ⚔️ Combats

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/api/battle/random/:t1/:t2` | Combat aléatoire |
| POST | `/api/battle/arena1/:t1/:t2` | Arène 1 (100 combats aléatoires) |
| POST | `/api/battle/deterministic/:t1/:t2` | Combat déterministe |
| POST | `/api/battle/arena2/:t1/:t2` | Arène 2 (100 combats déterministes) |

## 📝 Exemples curl

```bash
# Créer un dresseur
curl -X POST http://localhost:3000/api/trainers \
  -H "Content-Type: application/json" \
  -d '{"name": "Sacha"}'

# Créer un Pokémon
curl -X POST http://localhost:3000/api/pokemons \
  -H "Content-Type: application/json" \
  -d '{"name": "Pikachu", "lifePoint": 100}'

# Ajouter Pokémon à un dresseur
curl -X POST http://localhost:3000/api/trainers/1/pokemons/1

# Apprendre une attaque
curl -X POST http://localhost:3000/api/pokemons/1/learn \
  -H "Content-Type: application/json" \
  -d '{"name": "Tonnerre", "damage": 40, "usageLimit": 15}'

# Combat aléatoire
curl -X POST http://localhost:3000/api/battle/random/1/2
```

## 🏗️ Architecture POO

### Classes TypeScript

**Attack**
```typescript
class Attack {
  name: string
  damage: number
  usageLimit: number
  usageCount: number
  
  getInfo(): string
  isAvailable(): boolean
  reset(): void
}
```

**Pokeman**
```typescript
class Pokeman {
  name: string
  maxLifePoint: number
  lifePoint: number
  attacks: Attack[]
  
  learnAttack(attack: Attack)  // Max 4, pas de doublons
  heal()                        // Restaure PV et compteurs
  attack(target: Pokeman)       // Attaque aléatoire
  receiveDamage(damage: number)
  clone(): Pokeman
}
```

**Trainer**
```typescript
class Trainer {
  name: string
  level: number
  experience: number
  pokemons: Pokeman[]
  
  addPokemon(pokemon: Pokeman)
  healAllAtTavern()
  gainExperience(amount: number)  // 10 XP = 1 niveau
  
  // Méthodes de combat
  randomChallenge(opponent: Trainer)
  arena1(opponent: Trainer)
  deterministicChallenge(opponent: Trainer)
  arena2(opponent: Trainer)
}
```

## 🎨 Interface Web

Ouvrez **http://localhost:3000** pour accéder à :

- 🎴 Cartes Pokémon avec barres de vie animées
- 👤 Carte dresseur avec barre d'XP
- ⚔️ Boutons de combat interactifs
- 📜 Console de logs en temps réel
- 🎯 Gestion complète via interface

## 🧪 Scripts npm

```bash
npm run build    # Compile TypeScript → dist/
npm start        # Compile + démarre le serveur
npm run dev      # Mode développement (ts-node)
npm run watch    # Compilation continue
```

## 🔧 Configuration TypeScript

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2020",
    "module": "commonjs",
    "esModuleInterop": true,
    "sourceMap": true,
    "declaration": true
  }
}
```

## 🚨 Dépannage

### PostgreSQL non connecté
```bash
# Windows
Get-Service postgresql*

# Vérifier la connexion
psql -U postgres -d pokemon_db -c "SELECT 1;"
```

### Port 3000 occupé
Modifiez dans `index.ts` :
```typescript
const port = process.env.PORT || 3001;
```

### Erreur de compilation
```bash
Remove-Item -Recurse dist
npm run build
```

## ✨ Fonctionnalités

✅ **TypeScript complet** - Tout le code est typé  
✅ **PostgreSQL intégré** - Persistance des données  
✅ **Architecture MVC** - Séparation des responsabilités  
✅ **POO avancée** - Classes, héritage, interfaces  
✅ **API REST complète** - Tous les endpoints CRUD  
✅ **Interface web** - UI interactive HTML/CSS/JS  
✅ **Combats Pokémon** - 4 modes de combat différents  
✅ **Système d'XP** - Montée de niveau automatique  

## 📄 Auteur

**MALGONNE Léo** - Efrei Paris - Conception Backend 2024-2025

---

🎮 **Attrapez-les tous avec TypeScript !** ⚡
