# 🎮 API Pokémon - Backend TypeScript# 🎮 Pokémon Battle API - TypeScript + PostgreSQLnpm install router



## 📋 Description

API REST complète pour un jeu Pokémon avec système de combat, gestion de dresseurs et persistance PostgreSQL.  

Développée avec **Node.js**, **Express**, **TypeScript** et **PostgreSQL**.> API REST complète pour gérer un système de combats Pokémon avec TypeScript, Express et PostgreSQLnpm install express



---



## 🔧 Prérequis## 🚀 Technologiesnpm install pg



Avant de commencer, assurez-vous d'avoir installé :- **TypeScript 5.3** - Typage statique et POO

- **Express 5.1** - Framework web

- **Node.js** v18+ ([Télécharger](https://nodejs.org/))- **PostgreSQL** - Base de données relationnelle

- **PostgreSQL** v12+ ([Télécharger](https://www.postgresql.org/download/))- **pg 8.16** - Client PostgreSQL pour Node.js

- **npm** (inclus avec Node.js)

## 📁 Structure du projet

---

```

## 🚀 Installation et Configuration├── controller/

│   ├── db.ts                    # Configuration PostgreSQL Pool

### 1️⃣ Cloner le projet│   ├── apiRoutes.ts             # Définition des routes API

```bash│   ├── battleController.ts      # Contrôleurs pour tous les endpoints

git clone https://github.com/AlpinooO/TP_BackEnd_MALGONNE_Leo.git│   └── router.ts                # Configuration Express

cd TP_BackEnd_MALGONNE_Leo├── model/

```│   └── utils.ts                 # Classes métier (Pokeman, Attack, Trainer)

├── view/

### 2️⃣ Installer les dépendances│   └── index.html               # Interface web interactive

```bash├── init.sql                     # Schéma de base de données

npm install├── index.ts                     # Point d'entrée du serveur

```├── tsconfig.json                # Configuration TypeScript

└── package.json                 # Dépendances et scripts

### 3️⃣ Configurer PostgreSQL```



#### Créer la base de données## 🛠️ Installation

Ouvre **pgAdmin** ou **psql** et exécute :

### 1. Installer les dépendances

```sql```bash

CREATE DATABASE Pokamon;npm install

``````



#### Initialiser les tables### 2. Configurer PostgreSQL

Exécute le fichier `init.sql` pour créer les tables :

**Créer la base de données :**

**Option 1 - Depuis la ligne de commande :**```bash

```bashcreatedb pokemon_db

psql -U postgres -d Pokamon -f init.sql# OU avec psql :

```psql -U postgres -c "CREATE DATABASE pokemon_db;"

```

**Option 2 - Dans psql :**

```sql**Initialiser le schéma :**

\c Pokamon```bash

\i 'C:/Users/agent/OneDrive/Efrei/3eme année/1er Semestre/Conception BackEnd/TP/init.sql'psql -U postgres -d pokemon_db -f init.sql

``````



**Option 3 - Copier-coller le contenu de init.sql dans pgAdmin****Configuration de connexion (optionnel) :**

```powershell

### 4️⃣ Configurer les variables d'environnement# Windows PowerShell

$env:DATABASE_URL = "postgresql://user:password@localhost:5432/pokemon_db"

Crée un fichier `.env` à la racine du projet avec ce contenu :```



```envPar défaut : `postgresql://postgres:postgres@localhost:5432/pokemon_db`

DB_HOST=localhost

DB_USER=postgres### 3. Démarrer le serveur

DB_PASS=VotreMotDePasse

DB_NAME=Pokamon```bash

PORT=3000# Compiler et démarrer

```npm start



⚠️ **IMPORTANT : Remplace `VotreMotDePasse`** par ton vrai mot de passe PostgreSQL !# Mode développement avec ts-node

npm run dev

### 5️⃣ Compiler et lancer le serveur```



```bashLe serveur démarre sur **http://localhost:3000** ✅

npm run build

npm start## 📊 Schéma de base de données

```

### Tables

✅ Le serveur démarre sur **http://localhost:3000**

**Trainer** - Dresseurs

---- `trainer_id` (PK) - `name` - `level` - `experience`



## 🎯 Utilisation de l'API**Pokeman** - Pokémon

- `pokeman_id` (PK) - `name` - `max_life_point` - `life_point`

### 📡 Routes disponibles

**Attack** - Attaques

#### **Dresseurs (Trainers)**- `attack_id` (PK) - `name` - `damage` - `usage_limit` - `usage_count` - `pokeman_id` (FK)

| Méthode | Route | Description | Body JSON |

|---------|-------|-------------|-----------|**Trainer_Pokeman** - Association (many-to-many)

| `POST` | `/Pokemon/trainers` | Créer un dresseur | `{"name": "Sacha"}` |- `trainer_id` (FK) - `pokeman_id` (FK)

| `POST` | `/pokamon/trainers` | (Alias) Créer un dresseur | `{"name": "Sacha"}` |

| `GET` | `/Pokemon/trainers` | Liste tous les dresseurs | - |## 🎯 Endpoints API

| `GET` | `/Pokemon/trainers/:id` | Détails d'un dresseur | - |

| `POST` | `/Pokemon/trainers/:id/heal` | Soigner tous les Pokémon | - |### 👤 Dresseurs

| `POST` | `/Pokemon/trainers/:id/experience` | Gagner de l'expérience | `{"amount": 100}` |

| Méthode | Route | Description |

#### **Pokémon**|---------|-------|-------------|

| Méthode | Route | Description | Body JSON || POST | `/api/trainers` | Créer un dresseur |

|---------|-------|-------------|-----------|| GET | `/api/trainers` | Liste tous les dresseurs |

| `POST` | `/Pokemon/pokemons` | Créer un Pokémon | `{"name": "Pikachu", "maxLifePoints": 100}` || GET | `/api/trainers/:id` | Détails d'un dresseur |

| `POST` | `/Pokemon/trainers/:trainerId/pokemons/:pokemonId` | Ajouter un Pokémon à un dresseur | - || POST | `/api/trainers/:id/experience` | Gagner de l'expérience |

| `POST` | `/Pokemon/pokemons/:pokemonId/learn` | Apprendre une attaque | `{"name": "Tonnerre", "damage": 40, "usageLimit": 10}` || POST | `/api/trainers/:id/heal` | Soigner tous les Pokémon |

| `POST` | `/Pokemon/pokemons/:pokemonId/heal` | Soigner un Pokémon | - |

### 🐾 Pokémon

#### **Combats (Battles)**

| Méthode | Route | Description || Méthode | Route | Description |

|---------|-------|-------------||---------|-------|-------------|

| `POST` | `/Pokemon/battle/random/:trainer1Id/:trainer2Id` | Combat aléatoire || POST | `/api/pokemons` | Créer un Pokémon |

| `POST` | `/Pokemon/battle/arena1/:trainer1Id/:trainer2Id` | Arène 1 || POST | `/api/trainers/:trainerId/pokemons/:pokemonId` | Ajouter à l'équipe |

| `POST` | `/Pokemon/battle/deterministic/:trainer1Id/:trainer2Id` | Combat déterministe || POST | `/api/pokemons/:id/learn` | Apprendre une attaque |

| `POST` | `/Pokemon/battle/arena2/:trainer1Id/:trainer2Id` | Arène 2 || POST | `/api/pokemons/:id/heal` | Soigner un Pokémon |



> **Note :** Les routes `/Pokemon/*` et `/pokamon/*` fonctionnent toutes les deux (alias).### ⚔️ Combats



---| Méthode | Route | Description |

|---------|-------|-------------|

## 💡 Exemples de requêtes| POST | `/api/battle/random/:t1/:t2` | Combat aléatoire |

| POST | `/api/battle/arena1/:t1/:t2` | Arène 1 (100 combats aléatoires) |

### Avec curl (PowerShell)| POST | `/api/battle/deterministic/:t1/:t2` | Combat déterministe |

| POST | `/api/battle/arena2/:t1/:t2` | Arène 2 (100 combats déterministes) |

#### Créer un dresseur

```powershell## 📝 Exemples curl

curl -X POST http://localhost:3000/Pokemon/trainers -H "Content-Type: application/json" -d '{\"name\": \"Sacha\"}'

``````bash

# Créer un dresseur

**Réponse :**curl -X POST http://localhost:3000/api/trainers \

```json  -H "Content-Type: application/json" \

{  -d '{"name": "Sacha"}'

  "success": true,

  "data": {# Créer un Pokémon

    "id": 1,curl -X POST http://localhost:3000/api/pokemons \

    "name": "Sacha",  -H "Content-Type: application/json" \

    "level": 1,  -d '{"name": "Pikachu", "lifePoint": 100}'

    "experience": 0

  }# Ajouter Pokémon à un dresseur

}curl -X POST http://localhost:3000/api/trainers/1/pokemons/1

```

# Apprendre une attaque

#### Créer un Pokémoncurl -X POST http://localhost:3000/api/pokemons/1/learn \

```powershell  -H "Content-Type: application/json" \

curl -X POST http://localhost:3000/Pokemon/pokemons -H "Content-Type: application/json" -d '{\"name\": \"Pikachu\", \"maxLifePoints\": 100}'  -d '{"name": "Tonnerre", "damage": 40, "usageLimit": 15}'

```

# Combat aléatoire

#### Lister tous les dresseurscurl -X POST http://localhost:3000/api/battle/random/1/2

```powershell```

curl http://localhost:3000/Pokemon/trainers

```## 🏗️ Architecture POO



#### Ajouter Pikachu (id=1) à Sacha (id=1)### Classes TypeScript

```powershell

curl -X POST http://localhost:3000/Pokemon/trainers/1/pokemons/1**Attack**

``````typescript

class Attack {

#### Lancer un combat aléatoire entre dresseur 1 et 2  name: string

```powershell  damage: number

curl -X POST http://localhost:3000/Pokemon/battle/random/1/2  usageLimit: number

```  usageCount: number

  

### Avec Postman  getInfo(): string

  isAvailable(): boolean

1. **Créer un dresseur :**  reset(): void

   - Méthode : `POST`}

   - URL : `http://localhost:3000/Pokemon/trainers````

   - Headers : `Content-Type: application/json`

   - Body (raw) : `{"name": "Sacha"}`**Pokeman**

```typescript

2. **Lister les dresseurs :**class Pokeman {

   - Méthode : `GET`  name: string

   - URL : `http://localhost:3000/Pokemon/trainers`  maxLifePoint: number

  lifePoint: number

---  attacks: Attack[]

  

## 📁 Architecture du projet  learnAttack(attack: Attack)  // Max 4, pas de doublons

  heal()                        // Restaure PV et compteurs

```  attack(target: Pokeman)       // Attaque aléatoire

.  receiveDamage(damage: number)

├── controller/  clone(): Pokeman

│   ├── db.ts                 # Configuration PostgreSQL Pool}

│   ├── battleController.ts   # Logique métier (handlers async/await)```

│   ├── apiRoutes.ts          # Définition des routes Express

│   └── router.ts             # Configuration Express + middleware**Trainer**

├── model/```typescript

│   └── utils.ts              # Classes POO (Pokeman, Trainer, Attack, BattleService)class Trainer {

├── view/  name: string

│   └── index.html            # Interface web  level: number

├── dist/                     # Code JavaScript compilé (généré par tsc)  experience: number

├── init.sql                  # Script de création des tables PostgreSQL  pokemons: Pokeman[]

├── .env                      # Variables d'environnement (à créer)  

├── index.ts                  # Point d'entrée du serveur  addPokemon(pokemon: Pokeman)

├── tsconfig.json             # Configuration TypeScript  healAllAtTavern()

└── package.json              # Dépendances npm  gainExperience(amount: number)  // 10 XP = 1 niveau

```  

  // Méthodes de combat

---  randomChallenge(opponent: Trainer)

  arena1(opponent: Trainer)

## 🛠️ Scripts NPM  deterministicChallenge(opponent: Trainer)

  arena2(opponent: Trainer)

```bash}

npm run build   # Compile TypeScript → JavaScript (dist/)```

npm start       # Compile + Lance le serveur

npm run dev     # Mode développement avec ts-node## 🎨 Interface Web

npm run watch   # Compilation en temps réel (auto-recompile)

```Ouvrez **http://localhost:3000** pour accéder à :



---- 🎴 Cartes Pokémon avec barres de vie animées

- 👤 Carte dresseur avec barre d'XP

## 🗃️ Base de données PostgreSQL- ⚔️ Boutons de combat interactifs

- 📜 Console de logs en temps réel

### Schéma des tables- 🎯 Gestion complète via interface



#### **Trainer** (Dresseurs)## 🧪 Scripts npm

```sql

CREATE TABLE Trainer (```bash

  id SERIAL PRIMARY KEY,npm run build    # Compile TypeScript → dist/

  name VARCHAR(100) NOT NULL,npm start        # Compile + démarre le serveur

  level INT DEFAULT 1,npm run dev      # Mode développement (ts-node)

  experience INT DEFAULT 0npm run watch    # Compilation continue

);```

```

## 🔧 Configuration TypeScript

#### **Pokeman** (Pokémon)

```sql```json

CREATE TABLE Pokeman ({

  id SERIAL PRIMARY KEY,  "compilerOptions": {

  name VARCHAR(100) NOT NULL,    "strict": true,

  max_life_point INT NOT NULL,    "target": "ES2020",

  life_point INT NOT NULL    "module": "commonjs",

);    "esModuleInterop": true,

```    "sourceMap": true,

    "declaration": true

#### **Attack** (Attaques)  }

```sql}

CREATE TABLE Attack (```

  id SERIAL PRIMARY KEY,

  name VARCHAR(100) NOT NULL,## 🚨 Dépannage

  damage INT NOT NULL,

  usage_limit INT NOT NULL,### PostgreSQL non connecté

  usage_count INT DEFAULT 0,```bash

  pokeman_id INT REFERENCES Pokeman(id) ON DELETE CASCADE# Windows

);Get-Service postgresql*

```

# Vérifier la connexion

#### **Trainer_Pokeman** (Relation N-N)psql -U postgres -d pokemon_db -c "SELECT 1;"

```sql```

CREATE TABLE Trainer_Pokeman (

  trainer_id INT REFERENCES Trainer(id) ON DELETE CASCADE,### Port 3000 occupé

  pokeman_id INT REFERENCES Pokeman(id) ON DELETE CASCADE,Modifiez dans `index.ts` :

  PRIMARY KEY (trainer_id, pokeman_id)```typescript

);const port = process.env.PORT || 3001;

``````



### Vérifier la connexion à la base de données### Erreur de compilation

```bash

```sqlRemove-Item -Recurse dist

-- Dans psql ou pgAdmin, connecte-toi à la base Pokamonnpm run build

\c Pokamon```



-- Vérifie les tables créées## ✨ Fonctionnalités

\dt

✅ **TypeScript complet** - Tout le code est typé  

-- Vérifie les données✅ **PostgreSQL intégré** - Persistance des données  

SELECT * FROM Trainer;✅ **Architecture MVC** - Séparation des responsabilités  

SELECT * FROM Pokeman;✅ **POO avancée** - Classes, héritage, interfaces  

```✅ **API REST complète** - Tous les endpoints CRUD  

✅ **Interface web** - UI interactive HTML/CSS/JS  

---✅ **Combats Pokémon** - 4 modes de combat différents  

✅ **Système d'XP** - Montée de niveau automatique  

## 🐛 Résolution de problèmes

## 📄 Auteur

### ❌ Erreur : "Cannot POST /Pokemon/trainers"

**Cause :** Le serveur n'a pas été recompilé après modification.  **MALGONNE Léo** - Efrei Paris - Conception Backend 2024-2025

**Solution :**

```bash---

npm run build

npm start🎮 **Attrapez-les tous avec TypeScript !** ⚡

```

### ❌ Erreur : "Connection refused" PostgreSQL
**Cause :** PostgreSQL n'est pas démarré ou les credentials sont incorrects.  
**Solution :**
1. Vérifie que PostgreSQL est démarré (Services Windows ou `pg_ctl status`)
2. Vérifie les credentials dans `.env`
3. Teste la connexion :
```bash
psql -U postgres -d Pokamon
```

### ❌ Erreur : "error: Erreur serveur"
**Cause :** Problème de connexion à la base de données ou erreur SQL.  
**Solution :**
1. Vérifie les logs du serveur dans le terminal
2. Vérifie que `init.sql` a été exécuté correctement
3. Vérifie que la table existe :
```sql
SELECT * FROM Trainer;
```

### ❌ Les données ne persistent pas après redémarrage
**Cause :** Le code utilise encore des `Map` en mémoire au lieu de PostgreSQL.  
**Solution :** Vérifie que `router.ts` utilise bien `apiRoutes` :
```typescript
// ✅ Correct :
app.use("/Pokemon", apiRoutes);

// ❌ Incorrect :
const trainers = new Map(); // Ne doit PAS exister
```

### ❌ Erreur de compilation TypeScript
**Solution :**
```bash
# Supprime le dossier dist et recompile
Remove-Item -Recurse -Force dist
npm run build
```

### ❌ Module 'pg' not found
**Solution :**
```bash
npm install pg @types/pg
```

---

## 🎨 Interface Web

Une interface HTML est disponible à la racine : **http://localhost:3000**

Elle permet de :
- Visualiser les routes disponibles
- Tester l'API directement depuis le navigateur
- Voir la documentation interactive

---

## 📦 Dépendances

### Production
- `express` ^5.1.0 - Framework web Node.js
- `pg` ^8.16.3 - Client PostgreSQL pour Node.js
- `dotenv` ^17.2.3 - Gestion des variables d'environnement

### Développement
- `typescript` ^5.3.3 - Compilateur TypeScript
- `ts-node` ^10.9.2 - Exécution TypeScript directe
- `@types/express` - Types TypeScript pour Express
- `@types/node` - Types TypeScript pour Node.js
- `@types/pg` - Types TypeScript pour pg

---

## 🔒 Sécurité

⚠️ **IMPORTANT :** Ne commit JAMAIS le fichier `.env` sur Git !

Le fichier `.gitignore` contient déjà :
```
.env
node_modules/
dist/
```

---

## 📚 Documentation API complète

### Créer un dresseur
**Endpoint :** `POST /Pokemon/trainers`  
**Body :**
```json
{
  "name": "Sacha"
}
```
**Réponse :**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Sacha",
    "level": 1,
    "experience": 0
  }
}
```

### Créer un Pokémon
**Endpoint :** `POST /Pokemon/pokemons`  
**Body :**
```json
{
  "name": "Pikachu",
  "maxLifePoints": 100
}
```

### Ajouter un Pokémon à un dresseur
**Endpoint :** `POST /Pokemon/trainers/:trainerId/pokemons/:pokemonId`  
**Exemple :** `POST /Pokemon/trainers/1/pokemons/1`

### Apprendre une attaque à un Pokémon
**Endpoint :** `POST /Pokemon/pokemons/:pokemonId/learn`  
**Body :**
```json
{
  "name": "Tonnerre",
  "damage": 40,
  "usageLimit": 10
}
```

### Lancer un combat
**Endpoint :** `POST /Pokemon/battle/random/:trainer1Id/:trainer2Id`  
**Exemple :** `POST /Pokemon/battle/random/1/2`

---

## 🧪 Tests

### Test complet de l'API

```powershell
# 1. Créer deux dresseurs
curl -X POST http://localhost:3000/Pokemon/trainers -H "Content-Type: application/json" -d '{\"name\": \"Sacha\"}'
curl -X POST http://localhost:3000/Pokemon/trainers -H "Content-Type: application/json" -d '{\"name\": \"Pierre\"}'

# 2. Créer deux Pokémon
curl -X POST http://localhost:3000/Pokemon/pokemons -H "Content-Type: application/json" -d '{\"name\": \"Pikachu\", \"maxLifePoints\": 100}'
curl -X POST http://localhost:3000/Pokemon/pokemons -H "Content-Type: application/json" -d '{\"name\": \"Carapuce\", \"maxLifePoints\": 120}'

# 3. Donner Pikachu à Sacha
curl -X POST http://localhost:3000/Pokemon/trainers/1/pokemons/1

# 4. Donner Carapuce à Pierre
curl -X POST http://localhost:3000/Pokemon/trainers/2/pokemons/2

# 5. Pikachu apprend Tonnerre
curl -X POST http://localhost:3000/Pokemon/pokemons/1/learn -H "Content-Type: application/json" -d '{\"name\": \"Tonnerre\", \"damage\": 40, \"usageLimit\": 10}'

# 6. Combat entre Sacha et Pierre
curl -X POST http://localhost:3000/Pokemon/battle/random/1/2

# 7. Vérifier que les données persistent
# Redémarre le serveur (Ctrl+C puis npm start)
curl http://localhost:3000/Pokemon/trainers
# Les dresseurs doivent toujours être là !
```

---

## 👨‍💻 Auteur

**Léo MALGONNE**  
📧 GitHub : [@AlpinooO](https://github.com/AlpinooO)  
🎓 **Efrei Paris** - Backend 3ème année

---

## 📝 Licence

Ce projet est un TP académique réalisé dans le cadre du cours de **Conception Backend** à l'Efrei Paris.

---

## 🆘 Support

En cas de problème :
1. Vérifie que PostgreSQL est bien démarré
2. Vérifie le fichier `.env`
3. Regarde les logs du serveur dans le terminal
4. Vérifie que les tables existent dans la base `Pokamon`

**Commande de diagnostic :**
```bash
# Vérifie la connexion PostgreSQL
psql -U postgres -d Pokamon -c "SELECT * FROM Trainer;"
```

---

✨ **Bon code !** ✨
