"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const battleController = __importStar(require("./battleController"));
const router = express_1.default.Router();
//Route dresseurs
router.post("/trainers", battleController.createTrainer);
router.get("/trainers", battleController.getAllTrainers);
router.get("/trainers/:id", battleController.getTrainerById);
router.post("/trainers/:trainerId/heal", battleController.healAllAtTavern);
router.post("/trainers/:trainerId/experience", battleController.gainExperience);
// Route Pokémon
router.post("/pokemons", battleController.createPokemon);
router.post("/trainers/:trainerId/pokemons/:pokemonId", battleController.addPokemonToTrainer);
router.post("/pokemons/:pokemonId/learn", battleController.learnAttack);
router.post("/pokemons/:pokemonId/heal", battleController.healPokemon);
//routes combats
router.post("/battle/random/:trainer1Id/:trainer2Id", battleController.randomChallenge);
router.post("/battle/arena1/:trainer1Id/:trainer2Id", battleController.arena1);
router.post("/battle/deterministic/:trainer1Id/:trainer2Id", battleController.deterministicChallenge);
router.post("/battle/arena2/:trainer1Id/:trainer2Id", battleController.arena2);
exports.default = router;
//# sourceMappingURL=apiRoutes.js.map