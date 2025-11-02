import "dotenv/config";
import app from "./controller/router";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 API Pokémon démarrée sur http://localhost:${PORT}`);
  console.log(`📚 Documentation des routes:`);
  console.log(`   Dresseurs:    http://localhost:${PORT}/api/trainers`);
  console.log(`   Pokémon:      http://localhost:${PORT}/api/pokemons`);
  console.log(`   Attaques:     http://localhost:${PORT}/api/attacks`);
  console.log(`   Santé:        http://localhost:${PORT}/api/health`);
  console.log(`   Interface:    http://localhost:${PORT}`);
});
