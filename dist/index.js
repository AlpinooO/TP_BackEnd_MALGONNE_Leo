"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const router_1 = __importDefault(require("./controller/router"));
const PORT = process.env.PORT || 3000;
router_1.default.listen(PORT, () => {
    console.log(`🚀 API Pokémon démarrée sur http://localhost:${PORT}`);
    console.log(`📚 Documentation des routes:`);
    console.log(`   Dresseurs:    http://localhost:${PORT}/api/trainers`);
    console.log(`   Pokémon:      http://localhost:${PORT}/api/pokemons`);
    console.log(`   Attaques:     http://localhost:${PORT}/api/attacks`);
    console.log(`   Santé:        http://localhost:${PORT}/api/health`);
    console.log(`   Interface:    http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map