import express from "express";
import * as battleController from "./battleController";

const router = express.Router();

//Route dresseurs
router.post("/trainers", battleController.createTrainer);
router.get("/trainers", battleController.getAllTrainers);
router.get("/trainers/:id", battleController.getTrainerById);
router.post("/trainers/:trainerId/heal", battleController.healAllAtTavern);
router.post("/trainers/:trainerId/experience", battleController.gainExperience);

// Route Pokémon
router.post("/pokemons", battleController.createPokemon);
router.post(
  "/trainers/:trainerId/pokemons/:pokemonId",
  battleController.addPokemonToTrainer
);
router.post("/pokemons/:pokemonId/learn", battleController.learnAttack);
router.post("/pokemons/:pokemonId/heal", battleController.healPokemon);

//routes combats
router.post(
  "/battle/random/:trainer1Id/:trainer2Id",
  battleController.randomChallenge
);
router.post("/battle/arena1/:trainer1Id/:trainer2Id", battleController.arena1);
router.post(
  "/battle/deterministic/:trainer1Id/:trainer2Id",
  battleController.deterministicChallenge
);
router.post("/battle/arena2/:trainer1Id/:trainer2Id", battleController.arena2);

export default router;
