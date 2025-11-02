export declare class Attack {
    name: string;
    damage: number;
    usageLimit: number;
    usageCount: number;
    constructor(name: string, damage: number, usageLimit: number, usageCount?: number);
    getInfo(): string;
    isAvailable(): boolean;
    reset(): void;
}
export declare class Pokeman {
    name: string;
    maxLifePoint: number;
    lifePoint: number;
    attacks: Attack[];
    constructor(name: string, lifePoint: number, attacks?: Attack[]);
    receiveDamage(damage: number): void;
    learnAttack(attack: Attack): {
        success: boolean;
        message: string;
    };
    heal(): {
        success: boolean;
        message: string;
    };
    getAvailableAttacks(): Attack[];
    attack(target: Pokeman): {
        success: boolean;
        message: string;
        attack?: string;
        damage?: number;
        targetRemainingLife?: number;
    };
    clone(): Pokeman;
    isAlive(): boolean;
    getStatus(): string;
}
export declare class Trainer {
    name: string;
    level: number;
    experience: number;
    pokemons: Pokeman[];
    constructor(name: string, level?: number, experience?: number, pokemons?: Pokeman[]);
    addPokemon(pokemon: Pokeman): {
        success: boolean;
        message: string;
    };
    getAlivePokemons(): Pokeman[];
    getRandomPokemon(): Pokeman | null;
    getPokemonWithMostHP(): Pokeman | null;
    hasAlivePokemons(): boolean;
    healAllAtTavern(): {
        success: boolean;
        message: string;
        healedCount?: number;
    };
    gainExperience(amount: number): {
        success: boolean;
        leveledUp: boolean;
        message: string;
        newLevel?: number;
        levelsGained?: number;
        remainingExperience?: number;
        currentLevel?: number;
    };
    clone(): Trainer;
    getStatus(): string;
    randomChallenge(opponent: Trainer): BattleResult;
    arena1(opponent: Trainer): ArenaResult;
    deterministicChallenge(opponent: Trainer): BattleResult;
    arena2(opponent: Trainer): ArenaResult;
}
export interface BattleResult {
    success: boolean;
    winner?: {
        name: string;
        level: number;
        exp: number;
    };
    loser?: {
        name: string;
        level: number;
    };
    turns: number;
    battleLog: string[];
    message?: string;
}
export interface ArenaResult {
    success: boolean;
    winner?: {
        name: string;
        level: number;
        exp: number;
    };
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
export declare class BattleService {
    /**
     * Défi aléatoire : Deux dresseurs soignent leurs Pokémon,
     * choisissent un Pokémon aléatoire et combattent jusqu'à KO
     */
    static randomDuel(trainer1: Trainer, trainer2: Trainer): BattleResult;
    /**
     * Arène 1 : 100 combats aléatoires
     * Gagnant = niveau plus élevé (ou exp en cas d'égalité)
     */
    static arena1(trainer1: Trainer, trainer2: Trainer): ArenaResult;
    /**
     * Défi déterministe : Chaque dresseur choisit le Pokémon avec le plus de PV
     */
    static deterministicDuel(trainer1: Trainer, trainer2: Trainer): BattleResult;
    /**
     * Arène 2 : 100 combats déterministes
     * Arrêt si un dresseur perd tous ses Pokémon
     */
    static arena2(trainer1: Trainer, trainer2: Trainer): ArenaResult;
}
//# sourceMappingURL=utils.d.ts.map