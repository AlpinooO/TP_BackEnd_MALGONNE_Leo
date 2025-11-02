import { Request, Response } from "express";
import { Pokeman, Attack, Trainer } from "../model/utils";
import pool from "./db";


// Créer un dresseur
export const createTrainer = async (req: Request, res: Response): Promise<void> => {
  const { name, level = 1, experience = 0 } = req.body;

  if (!name) {
    res.status(400).json({ error: "Le nom du dresseur est requis" });
    return;
  }

  try {
    const result = await pool.query(
      "INSERT INTO Trainer(name, level, experience) VALUES($1, $2, $3) RETURNING *",
      [name, level, experience]
    );

    res.status(201).json({
      message: "Dresseur créé avec succès",
      trainer: {
        id: result.rows[0].trainer_id,
        name: result.rows[0].name,
        level: result.rows[0].level,
        experience: result.rows[0].experience,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la création du dresseur:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Obtenir tous les dresseurs
export const getAllTrainers = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query(`
      SELECT t.trainer_id, t.name, t.level, t.experience,
             COUNT(tp.pokeman_id) as pokemon_count
      FROM Trainer t
      LEFT JOIN Trainer_Pokeman tp ON t.trainer_id = tp.trainer_id
      GROUP BY t.trainer_id
    `);

    res.json({
      trainers: result.rows.map((row: any) => ({
        id: row.trainer_id,
        name: row.name,
        level: row.level,
        experience: row.experience,
        pokemonCount: parseInt(row.pokemon_count),
      })),
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des dresseurs:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Obtenir un dresseur par ID
export const getTrainerById = async (req: Request, res: Response): Promise<void> => {
  const trainerId = parseInt(req.params.id);

  try {
    const trainerResult = await pool.query(
      "SELECT * FROM Trainer WHERE trainer_id = $1",
      [trainerId]
    );

    if (trainerResult.rows.length === 0) {
      res.status(404).json({ error: "Dresseur non trouvé" });
      return;
    }

    const trainer = trainerResult.rows[0];

    // Récupérer les Pokémon du dresseur avec leurs attaques
    const pokemonsResult = await pool.query(
      `
      SELECT p.pokeman_id, p.name, p.max_life_point, p.life_point
      FROM Pokeman p
      JOIN Trainer_Pokeman tp ON p.pokeman_id = tp.pokeman_id
      WHERE tp.trainer_id = $1
    `,
      [trainerId]
    );

    const pokemons = await Promise.all(
      pokemonsResult.rows.map(async (poke: any) => {
        const attacksResult = await pool.query(
          "SELECT * FROM Attack WHERE pokeman_id = $1",
          [poke.pokeman_id]
        );

        return {
          id: poke.pokeman_id,
          name: poke.name,
          lifePoint: poke.life_point,
          maxLifePoint: poke.max_life_point,
          attacks: attacksResult.rows.map((a: any) => ({
            name: a.name,
            damage: a.damage,
            usageLimit: a.usage_limit,
            usageCount: a.usage_count,
          })),
        };
      })
    );

    res.json({
      id: trainer.trainer_id,
      name: trainer.name,
      level: trainer.level,
      experience: trainer.experience,
      pokemons,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération du dresseur:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};


// Créer un Pokémon
export const createPokemon = async (req: Request, res: Response): Promise<void> => {
  const { name, lifePoint } = req.body;

  if (!name || !lifePoint) {
    res.status(400).json({ error: "Le nom et les points de vie sont requis" });
    return;
  }

  try {
    const result = await pool.query(
      "INSERT INTO Pokeman(name, max_life_point, life_point) VALUES($1, $2, $2) RETURNING *",
      [name, lifePoint]
    );

    res.status(201).json({
      message: "Pokémon créé avec succès",
      pokemon: {
        id: result.rows[0].pokeman_id,
        name: result.rows[0].name,
        lifePoint: result.rows[0].life_point,
        maxLifePoint: result.rows[0].max_life_point,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la création du Pokémon:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Ajouter un Pokémon à un dresseur
export const addPokemonToTrainer = async (req: Request, res: Response): Promise<void> => {
  const trainerId = parseInt(req.params.trainerId);
  const pokemonId = parseInt(req.params.pokemonId);

  try {
    // Vérifier que le dresseur existe
    const trainerCheck = await pool.query(
      "SELECT * FROM Trainer WHERE trainer_id = $1",
      [trainerId]
    );
    if (trainerCheck.rows.length === 0) {
      res.status(404).json({ error: "Dresseur non trouvé" });
      return;
    }

    // Vérifier que le Pokémon existe
    const pokemonCheck = await pool.query(
      "SELECT * FROM Pokeman WHERE pokeman_id = $1",
      [pokemonId]
    );
    if (pokemonCheck.rows.length === 0) {
      res.status(404).json({ error: "Pokémon non trouvé" });
      return;
    }

    // Vérifier si le Pokémon n'est pas déjà dans l'équipe
    const existingLink = await pool.query(
      "SELECT * FROM Trainer_Pokeman WHERE trainer_id = $1 AND pokeman_id = $2",
      [trainerId, pokemonId]
    );

    if (existingLink.rows.length > 0) {
      res.status(400).json({ error: "Ce Pokémon est déjà dans l'équipe du dresseur" });
      return;
    }

    // Ajouter le Pokémon à l'équipe
    await pool.query(
      "INSERT INTO Trainer_Pokeman(trainer_id, pokeman_id) VALUES($1, $2)",
      [trainerId, pokemonId]
    );

    const pokemon = pokemonCheck.rows[0];
    res.json({
      success: true,
      message: `${pokemon.name} a été ajouté à l'équipe !`,
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout du Pokémon au dresseur:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Apprendre une attaque à un Pokémon
export const learnAttack = async (req: Request, res: Response): Promise<void> => {
  const pokemonId = parseInt(req.params.pokemonId);
  const { name, damage, usageLimit } = req.body;

  if (!name || !damage || !usageLimit) {
    res.status(400).json({
      error: "Le nom, les dégâts et la limite d'usage sont requis",
    });
    return;
  }

  try {
    // Vérifier que le Pokémon existe
    const pokemonCheck = await pool.query(
      "SELECT * FROM Pokeman WHERE pokeman_id = $1",
      [pokemonId]
    );
    if (pokemonCheck.rows.length === 0) {
      res.status(404).json({ error: "Pokémon non trouvé" });
      return;
    }

    // Vérifier le nombre d'attaques (max 4)
    const attackCount = await pool.query(
      "SELECT COUNT(*) as count FROM Attack WHERE pokeman_id = $1",
      [pokemonId]
    );

    if (parseInt(attackCount.rows[0].count) >= 4) {
      res.status(400).json({
        success: false,
        message: "Ce Pokémon connaît déjà 4 attaques (maximum).",
      });
      return;
    }

    // Vérifier les doublons
    const duplicateCheck = await pool.query(
      "SELECT * FROM Attack WHERE pokeman_id = $1 AND name = $2",
      [pokemonId, name]
    );

    if (duplicateCheck.rows.length > 0) {
      res.status(400).json({
        success: false,
        message: `Ce Pokémon connaît déjà l'attaque ${name}.`,
      });
      return;
    }

    // Ajouter l'attaque
    await pool.query(
      "INSERT INTO Attack(name, damage, usage_limit, pokeman_id) VALUES($1, $2, $3, $4)",
      [name, damage, usageLimit, pokemonId]
    );

    res.json({
      success: true,
      message: `${pokemonCheck.rows[0].name} a appris ${name} !`,
    });
  } catch (error) {
    console.error("Erreur lors de l'apprentissage de l'attaque:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Soigner un Pokémon
export const healPokemon = async (req: Request, res: Response): Promise<void> => {
  const pokemonId = parseInt(req.params.pokemonId);

  try {
    // Restaurer les PV au maximum
    const result = await pool.query(
      "UPDATE Pokeman SET life_point = max_life_point WHERE pokeman_id = $1 RETURNING *",
      [pokemonId]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Pokémon non trouvé" });
      return;
    }

    // Réinitialiser les compteurs d'usage des attaques
    await pool.query(
      "UPDATE Attack SET usage_count = 0 WHERE pokeman_id = $1",
      [pokemonId]
    );

    res.json({
      success: true,
      message: `${result.rows[0].name} est complètement soigné !`,
    });
  } catch (error) {
    console.error("Erreur lors du soin du Pokémon:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Soigner tous les Pokémon d'un dresseur à la taverne
export const healAllAtTavern = async (req: Request, res: Response): Promise<void> => {
  const trainerId = parseInt(req.params.trainerId);

  try {
    // Vérifier que le dresseur existe
    const trainerCheck = await pool.query(
      "SELECT * FROM Trainer WHERE trainer_id = $1",
      [trainerId]
    );
    if (trainerCheck.rows.length === 0) {
      res.status(404).json({ error: "Dresseur non trouvé" });
      return;
    }

    // Récupérer les Pokémon du dresseur
    const pokemonsResult = await pool.query(
      `
      SELECT p.pokeman_id
      FROM Pokeman p
      JOIN Trainer_Pokeman tp ON p.pokeman_id = tp.pokeman_id
      WHERE tp.trainer_id = $1
    `,
      [trainerId]
    );

    if (pokemonsResult.rows.length === 0) {
      res.json({
        success: false,
        message: `${trainerCheck.rows[0].name} n'a aucun Pokémon à soigner.`,
      });
      return;
    }

    // Soigner tous les Pokémon
    for (const poke of pokemonsResult.rows) {
      await pool.query(
        "UPDATE Pokeman SET life_point = max_life_point WHERE pokeman_id = $1",
        [poke.pokeman_id]
      );
      await pool.query(
        "UPDATE Attack SET usage_count = 0 WHERE pokeman_id = $1",
        [poke.pokeman_id]
      );
    }

    res.json({
      success: true,
      message: `Tous les Pokémon de ${trainerCheck.rows[0].name} ont été soignés à la taverne !`,
      healedCount: pokemonsResult.rows.length,
    });
  } catch (error) {
    console.error("Erreur lors du soin à la taverne:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Gagner de l'expérience
export const gainExperience = async (req: Request, res: Response): Promise<void> => {
  const trainerId = parseInt(req.params.trainerId);
  const { amount } = req.body;

  if (!amount) {
    res.status(400).json({ error: "Le montant d'expérience est requis" });
    return;
  }

  try {
    // Récupérer le dresseur
    const trainerResult = await pool.query(
      "SELECT * FROM Trainer WHERE trainer_id = $1",
      [trainerId]
    );

    if (trainerResult.rows.length === 0) {
      res.status(404).json({ error: "Dresseur non trouvé" });
      return;
    }

    const trainer = trainerResult.rows[0];
    let experience = trainer.experience + amount;
    let level = trainer.level;
    let leveledUp = false;
    let levelsGained = 0;

    // Montée de niveau tous les 10 XP
    while (experience >= 10) {
      experience -= 10;
      level++;
      leveledUp = true;
      levelsGained++;
    }

    // Mettre à jour la base de données
    await pool.query(
      "UPDATE Trainer SET level = $1, experience = $2 WHERE trainer_id = $3",
      [level, experience, trainerId]
    );

    if (leveledUp) {
      res.json({
        success: true,
        leveledUp: true,
        message: `${trainer.name} a gagné ${amount} XP et est monté au niveau ${level} !`,
        newLevel: level,
        levelsGained: levelsGained,
        remainingExperience: experience,
      });
    } else {
      res.json({
        success: true,
        leveledUp: false,
        message: `${trainer.name} a gagné ${amount} XP. (${experience}/10 pour le niveau suivant)`,
        currentLevel: level,
        remainingExperience: experience,
      });
    }
  } catch (error) {
    console.error("Erreur lors du gain d'expérience:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};


// Charger un dresseur avec tous ses Pokémon et attaques depuis la DB
async function loadTrainerForBattle(trainerId: number): Promise<Trainer | null> {
  const trainerResult = await pool.query(
    "SELECT * FROM Trainer WHERE trainer_id = $1",
    [trainerId]
  );
  if (trainerResult.rows.length === 0) return null;

  const trainerRow = trainerResult.rows[0];

  // Charger les Pokémon
  const pokemonsResult = await pool.query(
    `
    SELECT p.* FROM Pokeman p
    JOIN Trainer_Pokeman tp ON p.pokeman_id = tp.pokeman_id
    WHERE tp.trainer_id = $1
  `,
    [trainerId]
  );

  const pokemons = await Promise.all(
    pokemonsResult.rows.map(async (pokeRow: any) => {
      const attacksResult = await pool.query(
        "SELECT * FROM Attack WHERE pokeman_id = $1",
        [pokeRow.pokeman_id]
      );

      const attacks = attacksResult.rows.map(
        (a: any) => new Attack(a.name, a.damage, a.usage_limit, a.usage_count)
      );
      const pokemon = new Pokeman(
        pokeRow.name,
        pokeRow.max_life_point,
        attacks
      );
      pokemon.lifePoint = pokeRow.life_point;
      (pokemon as any).id = pokeRow.pokeman_id;

      return pokemon;
    })
  );

  const trainer = new Trainer(
    trainerRow.name,
    trainerRow.level,
    trainerRow.experience,
    pokemons
  );
  (trainer as any).id = trainerRow.trainer_id;

  return trainer;
}

// Sauvegarder l'état d'un dresseur après combat
async function saveTrainerAfterBattle(trainer: Trainer): Promise<void> {
  // Mettre à jour le dresseur
  await pool.query(
    "UPDATE Trainer SET level = $1, experience = $2 WHERE trainer_id = $3",
    [trainer.level, trainer.experience, (trainer as any).id]
  );

  // Mettre à jour les Pokémon
  for (const pokemon of trainer.pokemons) {
    await pool.query(
      "UPDATE Pokeman SET life_point = $1 WHERE pokeman_id = $2",
      [pokemon.lifePoint, (pokemon as any).id]
    );

    // Mettre à jour les attaques
    for (const attack of pokemon.attacks) {
      await pool.query(
        "UPDATE Attack SET usage_count = $1 WHERE pokeman_id = $2 AND name = $3",
        [attack.usageCount, (pokemon as any).id, attack.name]
      );
    }
  }
}


// Défi aléatoire
export const randomChallenge = async (req: Request, res: Response): Promise<void> => {
  const trainer1Id = parseInt(req.params.trainer1Id);
  const trainer2Id = parseInt(req.params.trainer2Id);

  try {
    const trainer1 = await loadTrainerForBattle(trainer1Id);
    const trainer2 = await loadTrainerForBattle(trainer2Id);

    if (!trainer1 || !trainer2) {
      res.status(404).json({ error: "Un ou plusieurs dresseurs non trouvés" });
      return;
    }

    const result = trainer1.randomChallenge(trainer2);

    // Sauvegarder les changements
    await saveTrainerAfterBattle(trainer1);
    await saveTrainerAfterBattle(trainer2);

    res.json(result);
  } catch (error) {
    console.error("Erreur lors du défi aléatoire:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Arène 1 : 100 combats aléatoires
export const arena1 = async (req: Request, res: Response): Promise<void> => {
  const trainer1Id = parseInt(req.params.trainer1Id);
  const trainer2Id = parseInt(req.params.trainer2Id);

  try {
    const trainer1 = await loadTrainerForBattle(trainer1Id);
    const trainer2 = await loadTrainerForBattle(trainer2Id);

    if (!trainer1 || !trainer2) {
      res.status(404).json({ error: "Un ou plusieurs dresseurs non trouvés" });
      return;
    }

    const result = trainer1.arena1(trainer2);

    // Sauvegarder les changements
    await saveTrainerAfterBattle(trainer1);
    await saveTrainerAfterBattle(trainer2);

    res.json(result);
  } catch (error) {
    console.error("Erreur lors de l'arène 1:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Défi déterministe
export const deterministicChallenge = async (req: Request, res: Response): Promise<void> => {
  const trainer1Id = parseInt(req.params.trainer1Id);
  const trainer2Id = parseInt(req.params.trainer2Id);

  try {
    const trainer1 = await loadTrainerForBattle(trainer1Id);
    const trainer2 = await loadTrainerForBattle(trainer2Id);

    if (!trainer1 || !trainer2) {
      res.status(404).json({ error: "Un ou plusieurs dresseurs non trouvés" });
      return;
    }

    const result = trainer1.deterministicChallenge(trainer2);

    // Sauvegarder les changements
    await saveTrainerAfterBattle(trainer1);
    await saveTrainerAfterBattle(trainer2);

    res.json(result);
  } catch (error) {
    console.error("Erreur lors du défi déterministe:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Arène 2 : 100 combats déterministes
export const arena2 = async (req: Request, res: Response): Promise<void> => {
  const trainer1Id = parseInt(req.params.trainer1Id);
  const trainer2Id = parseInt(req.params.trainer2Id);

  try {
    const trainer1 = await loadTrainerForBattle(trainer1Id);
    const trainer2 = await loadTrainerForBattle(trainer2Id);

    if (!trainer1 || !trainer2) {
      res.status(404).json({ error: "Un ou plusieurs dresseurs non trouvés" });
      return;
    }

    const result = trainer1.arena2(trainer2);

    // Sauvegarder les changements
    await saveTrainerAfterBattle(trainer1);
    await saveTrainerAfterBattle(trainer2);

    res.json(result);
  } catch (error) {
    console.error("Erreur lors de l'arène 2:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
