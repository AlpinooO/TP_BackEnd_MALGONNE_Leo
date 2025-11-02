import { Request, Response } from "express";
export declare const createTrainer: (req: Request, res: Response) => Promise<void>;
export declare const getAllTrainers: (req: Request, res: Response) => Promise<void>;
export declare const getTrainerById: (req: Request, res: Response) => Promise<void>;
export declare const createPokemon: (req: Request, res: Response) => Promise<void>;
export declare const addPokemonToTrainer: (req: Request, res: Response) => Promise<void>;
export declare const learnAttack: (req: Request, res: Response) => Promise<void>;
export declare const healPokemon: (req: Request, res: Response) => Promise<void>;
export declare const healAllAtTavern: (req: Request, res: Response) => Promise<void>;
export declare const gainExperience: (req: Request, res: Response) => Promise<void>;
export declare const randomChallenge: (req: Request, res: Response) => Promise<void>;
export declare const arena1: (req: Request, res: Response) => Promise<void>;
export declare const deterministicChallenge: (req: Request, res: Response) => Promise<void>;
export declare const arena2: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=battleController.d.ts.map