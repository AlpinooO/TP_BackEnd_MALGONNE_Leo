// ============= CLASSES MÉTIER =============

export class Attack {
  name: string;
  damage: number;
  usageLimit: number;
  usageCount: number;

  constructor(name: string, damage: number, usageLimit: number, usageCount: number = 0) {
    this.name = name;
    this.damage = damage;
    this.usageLimit = usageLimit;
    this.usageCount = usageCount;
  }

  getInfo(): string {
    return `${this.name} | Dégâts: ${this.damage} | Usage: ${this.usageCount}/${this.usageLimit}`;
  }

  isAvailable(): boolean {
    return this.usageCount < this.usageLimit;
  }

  reset(): void {
    this.usageCount = 0;
  }
}

export class Pokeman {
  name: string;
  maxLifePoint: number;
  lifePoint: number;
  attacks: Attack[];

  constructor(name: string, lifePoint: number, attacks: Attack[] = []) {
    this.name = name;
    this.maxLifePoint = lifePoint;
    this.lifePoint = lifePoint;
    this.attacks = attacks;
  }

  receiveDamage(damage: number): void {
    this.lifePoint -= damage;
    if (this.lifePoint < 0) {
      this.lifePoint = 0;
    }
  }

  learnAttack(attack: Attack): { success: boolean; message: string } {
    if (this.attacks.length >= 4) {
      return {
        success: false,
        message: "Ce Pokeman connaît déjà 4 attaques (maximum).",
      };
    }

    const alreadyKnown = this.attacks.some((a) => a.name === attack.name);
    if (alreadyKnown) {
      return {
        success: false,
        message: `${this.name} connaît déjà l'attaque ${attack.name}.`,
      };
    }

    this.attacks.push(attack);
    return { success: true, message: `${this.name} a appris ${attack.name} !` };
  }

  heal(): { success: boolean; message: string } {
    this.lifePoint = this.maxLifePoint;
    this.attacks.forEach((attack) => {
      attack.usageCount = 0;
    });
    return {
      success: true,
      message: `${this.name} est complètement soigné !`,
    };
  }

  getAvailableAttacks(): Attack[] {
    return this.attacks.filter((a) => a.usageCount < a.usageLimit);
  }

  attack(target: Pokeman): {
    success: boolean;
    message: string;
    attack?: string;
    damage?: number;
    targetRemainingLife?: number;
  } {
    if (this.attacks.length === 0) {
      return {
        success: false,
        message: `${this.name} ne connaît aucune attaque !`,
      };
    }

    const availableAttacks = this.getAvailableAttacks();

    if (availableAttacks.length === 0) {
      return {
        success: false,
        message: `${this.name} n'a plus d'attaques disponibles !`,
      };
    }

    const randomAttack = availableAttacks[Math.floor(Math.random() * availableAttacks.length)];

    randomAttack.usageCount++;
    target.receiveDamage(randomAttack.damage);

    return {
      success: true,
      message: `${this.name} attaque ${target.name} avec ${randomAttack.name} ! (-${randomAttack.damage} PV)`,
      attack: randomAttack.name,
      damage: randomAttack.damage,
      targetRemainingLife: target.lifePoint,
    };
  }

  clone(): Pokeman {
    const cloned = new Pokeman(this.name, this.maxLifePoint, []);
    this.attacks.forEach((attack) => {
      cloned.attacks.push(new Attack(attack.name, attack.damage, attack.usageLimit, 0));
    });
    return cloned;
  }

  isAlive(): boolean {
    return this.lifePoint > 0;
  }

  getStatus(): string {
    return `${this.name} | PV: ${this.lifePoint}/${this.maxLifePoint} | Attaques: ${this.attacks.length}/4`;
  }
}

export class Trainer {
  name: string;
  level: number;
  experience: number;
  pokemons: Pokeman[];

  constructor(name: string, level: number = 1, experience: number = 0, pokemons: Pokeman[] = []) {
    this.name = name;
    this.level = level;
    this.experience = experience;
    this.pokemons = pokemons;
  }

  addPokemon(pokemon: Pokeman): { success: boolean; message: string } {
    this.pokemons.push(pokemon);
    return {
      success: true,
      message: `${pokemon.name} a été ajouté à l'équipe de ${this.name} !`,
    };
  }

  getAlivePokemons(): Pokeman[] {
    return this.pokemons.filter((p) => p.isAlive());
  }

  getRandomPokemon(): Pokeman | null {
    const alivePokemon = this.getAlivePokemons();
    if (alivePokemon.length === 0) return null;
    return alivePokemon[Math.floor(Math.random() * alivePokemon.length)];
  }

  getPokemonWithMostHP(): Pokeman | null {
    const alivePokemon = this.getAlivePokemons();
    if (alivePokemon.length === 0) return null;
    return alivePokemon.reduce((max, current) =>
      current.lifePoint > max.lifePoint ? current : max
    );
  }

  hasAlivePokemons(): boolean {
    return this.getAlivePokemons().length > 0;
  }

  healAllAtTavern(): { success: boolean; message: string; healedCount?: number } {
    if (this.pokemons.length === 0) {
      return {
        success: false,
        message: `${this.name} n'a aucun Pokémon à soigner.`,
      };
    }

    this.pokemons.forEach((pokemon) => {
      pokemon.heal();
    });

    return {
      success: true,
      message: `Tous les Pokémon de ${this.name} ont été soignés à la taverne !`,
      healedCount: this.pokemons.length,
    };
  }

  gainExperience(amount: number): {
    success: boolean;
    leveledUp: boolean;
    message: string;
    newLevel?: number;
    levelsGained?: number;
    remainingExperience?: number;
    currentLevel?: number;
  } {
    this.experience += amount;

    let leveledUp = false;
    let levelsGained = 0;

    while (this.experience >= 10) {
      this.experience -= 10;
      this.level++;
      leveledUp = true;
      levelsGained++;
    }

    if (leveledUp) {
      return {
        success: true,
        leveledUp: true,
        message: `${this.name} a gagné ${amount} XP et est monté au niveau ${this.level} !`,
        newLevel: this.level,
        levelsGained: levelsGained,
        remainingExperience: this.experience,
      };
    } else {
      return {
        success: true,
        leveledUp: false,
        message: `${this.name} a gagné ${amount} XP. (${this.experience}/10 pour le niveau suivant)`,
        currentLevel: this.level,
        remainingExperience: this.experience,
      };
    }
  }

  clone(): Trainer {
    const cloned = new Trainer(this.name, this.level, this.experience, []);
    this.pokemons.forEach((pokemon) => {
      cloned.pokemons.push(pokemon.clone());
    });
    return cloned;
  }

  getStatus(): string {
    const aliveCount = this.getAlivePokemons().length;
    const totalCount = this.pokemons.length;
    return `${this.name} | Niv: ${this.level} | Exp: ${this.experience}/10 | Pokémon: ${aliveCount}/${totalCount}`;
  }

  // Méthodes de combat (délégation vers BattleService)
  randomChallenge(opponent: Trainer): BattleResult {
    return BattleService.randomDuel(this, opponent);
  }

  arena1(opponent: Trainer): ArenaResult {
    return BattleService.arena1(this, opponent);
  }

  deterministicChallenge(opponent: Trainer): BattleResult {
    return BattleService.deterministicDuel(this, opponent);
  }

  arena2(opponent: Trainer): ArenaResult {
    return BattleService.arena2(this, opponent);
  }
}

// ============= SERVICES DE COMBAT =============

export interface BattleResult {
  success: boolean;
  winner?: { name: string; level: number; exp: number };
  loser?: { name: string; level: number };
  turns: number;
  battleLog: string[];
  message?: string;
}

export interface ArenaResult {
  success: boolean;
  winner?: { name: string; level: number; exp: number };
  stats?: Array<{
    name: string;
    level: number;
    exp: number;
    wins?: number;
    alive: number;
    total?: number;
  }>;
  totalBattles: number;
  battleLog: string[];
  message?: string;
}

export class BattleService {
  /**
   * Défi aléatoire : Deux dresseurs soignent leurs Pokémon,
   * choisissent un Pokémon aléatoire et combattent jusqu'à KO
   */
  static randomDuel(trainer1: Trainer, trainer2: Trainer): BattleResult {
    const t1 = trainer1.clone();
    const t2 = trainer2.clone();

    t1.healAllAtTavern();
    t2.healAllAtTavern();

    const battleLog: string[] = [];
    let turns = 0;

    let pokemon1 = t1.getRandomPokemon();
    let pokemon2 = t2.getRandomPokemon();

    if (!pokemon1 || !pokemon2) {
      return {
        success: false,
        message: "Pokémon insuffisants pour le combat",
        turns: 0,
        battleLog: [],
      };
    }

    battleLog.push(`⚔️ Combat aléatoire: ${t1.name} vs ${t2.name}`);
    battleLog.push(
      `${t1.name} envoie ${pokemon1.name} (${pokemon1.lifePoint}/${pokemon1.maxLifePoint} PV)`
    );
    battleLog.push(
      `${t2.name} envoie ${pokemon2.name} (${pokemon2.lifePoint}/${pokemon2.maxLifePoint} PV)`
    );

    while (pokemon1.lifePoint > 0 && pokemon2.lifePoint > 0) {
      turns++;

      const attack1 = pokemon1.attack(pokemon2);
      if (attack1.success) {
        battleLog.push(`[T${turns}] ${pokemon1.name} attaque avec ${attack1.attack} (-${attack1.damage} PV)`);
      }

      if (pokemon2.lifePoint <= 0) break;

      const attack2 = pokemon2.attack(pokemon1);
      if (attack2.success) {
        battleLog.push(`[T${turns}] ${pokemon2.name} attaque avec ${attack2.attack} (-${attack2.damage} PV)`);
      }
    }

    const winner = pokemon1.lifePoint > 0 ? t1 : t2;
    const loser = pokemon1.lifePoint > 0 ? t2 : t1;

    battleLog.push(`🏆 ${winner.name} remporte la victoire!`);
    winner.gainExperience(10);

    return {
      success: true,
      winner: { name: winner.name, level: winner.level, exp: winner.experience },
      loser: { name: loser.name, level: loser.level },
      turns,
      battleLog,
    };
  }

  /**
   * Arène 1 : 100 combats aléatoires
   * Gagnant = niveau plus élevé (ou exp en cas d'égalité)
   */
  static arena1(trainer1: Trainer, trainer2: Trainer): ArenaResult {
    const t1 = trainer1.clone();
    const t2 = trainer2.clone();

    const battleLog: string[] = [];
    let t1Wins = 0;
    let t2Wins = 0;

    for (let i = 0; i < 100; i++) {
      const result = this.randomDuel(t1, t2);
      if (!result.success) break;

      if (result.winner?.name === t1.name) {
        t1Wins++;
      } else {
        t2Wins++;
      }
    }

    let winner = t1;
    if (t2.level > t1.level) {
      winner = t2;
    } else if (t2.level === t1.level && t2.experience > t1.experience) {
      winner = t2;
    }

    battleLog.push(`🏆 Arène 1: ${winner.name} (Niv ${winner.level}) remporte le tournoi!`);
    battleLog.push(`${t1.name} (Niv ${t1.level}): ${t1Wins} victoires`);
    battleLog.push(`${t2.name} (Niv ${t2.level}): ${t2Wins} victoires`);

    return {
      success: true,
      winner: { name: winner.name, level: winner.level, exp: winner.experience },
      stats: [
        {
          name: t1.name,
          level: t1.level,
          exp: t1.experience,
          wins: t1Wins,
          alive: t1.getAlivePokemons().length,
        },
        {
          name: t2.name,
          level: t2.level,
          exp: t2.experience,
          wins: t2Wins,
          alive: t2.getAlivePokemons().length,
        },
      ],
      totalBattles: 100,
      battleLog,
    };
  }

  /**
   * Défi déterministe : Chaque dresseur choisit le Pokémon avec le plus de PV
   */
  static deterministicDuel(trainer1: Trainer, trainer2: Trainer): BattleResult {
    const t1 = trainer1.clone();
    const t2 = trainer2.clone();

    const battleLog: string[] = [];
    let turns = 0;

    let pokemon1 = t1.getPokemonWithMostHP();
    let pokemon2 = t2.getPokemonWithMostHP();

    if (!pokemon1 || !pokemon2) {
      return {
        success: false,
        message: "Pokémon insuffisants pour le combat",
        turns: 0,
        battleLog: [],
      };
    }

    battleLog.push(`⚔️ Combat déterministe: ${t1.name} vs ${t2.name}`);
    battleLog.push(`${t1.name} envoie ${pokemon1.name} (${pokemon1.lifePoint}/${pokemon1.maxLifePoint} PV)`);
    battleLog.push(`${t2.name} envoie ${pokemon2.name} (${pokemon2.lifePoint}/${pokemon2.maxLifePoint} PV)`);

    while (pokemon1.lifePoint > 0 && pokemon2.lifePoint > 0) {
      turns++;

      const attack1 = pokemon1.attack(pokemon2);
      if (attack1.success) {
        battleLog.push(`[T${turns}] ${pokemon1.name} attaque avec ${attack1.attack} (-${attack1.damage} PV)`);
      }

      if (pokemon2.lifePoint <= 0) break;

      const attack2 = pokemon2.attack(pokemon1);
      if (attack2.success) {
        battleLog.push(`[T${turns}] ${pokemon2.name} attaque avec ${attack2.attack} (-${attack2.damage} PV)`);
      }
    }

    const winner = pokemon1.lifePoint > 0 ? t1 : t2;
    const loser = pokemon1.lifePoint > 0 ? t2 : t1;

    battleLog.push(`🏆 ${winner.name} remporte la victoire!`);
    winner.gainExperience(10);

    return {
      success: true,
      winner: { name: winner.name, level: winner.level, exp: winner.experience },
      loser: { name: loser.name, level: loser.level },
      turns,
      battleLog,
    };
  }

  /**
   * Arène 2 : 100 combats déterministes
   * Arrêt si un dresseur perd tous ses Pokémon
   */
  static arena2(trainer1: Trainer, trainer2: Trainer): ArenaResult {
    const t1 = trainer1.clone();
    const t2 = trainer2.clone();

    const battleLog: string[] = [];
    let battleCount = 0;

    for (let i = 0; i < 100; i++) {
      if (!t1.hasAlivePokemons() || !t2.hasAlivePokemons()) {
        break;
      }

      battleCount++;
      const result = this.deterministicDuel(t1, t2);
      if (!result.success) break;
    }

    let winner = t1;
    if (!t1.hasAlivePokemons() && t2.hasAlivePokemons()) {
      winner = t2;
    } else if (!t1.hasAlivePokemons() && !t2.hasAlivePokemons()) {
      if (t2.level > t1.level) {
        winner = t2;
      } else if (t2.level === t1.level && t2.experience > t1.experience) {
        winner = t2;
      }
    }

    battleLog.push(
      `🏆 Arène 2: ${winner.name} remporte le tournoi (${battleCount} combats)!`
    );
    battleLog.push(`${t1.name} - Pokémon vivants: ${t1.getAlivePokemons().length}/${t1.pokemons.length}`);
    battleLog.push(`${t2.name} - Pokémon vivants: ${t2.getAlivePokemons().length}/${t2.pokemons.length}`);

    return {
      success: true,
      winner: { name: winner.name, level: winner.level, exp: winner.experience },
      stats: [
        {
          name: t1.name,
          level: t1.level,
          exp: t1.experience,
          alive: t1.getAlivePokemons().length,
          total: t1.pokemons.length,
        },
        {
          name: t2.name,
          level: t2.level,
          exp: t2.experience,
          alive: t2.getAlivePokemons().length,
          total: t2.pokemons.length,
        },
      ],
      totalBattles: battleCount,
      battleLog,
    };
  }
}
