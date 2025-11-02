"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
// Configuration de la connexion PostgreSQL
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL ||
        `postgresql://${process.env.DB_USER || 'postgres'}:${process.env.DB_PASS || 'postgres'}@${process.env.DB_HOST || 'localhost'}:5432/${process.env.DB_NAME || 'pokemon_db'}`,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});
// Test de connexion au démarrage
pool.on("connect", () => {
    console.log("✅ Connecté à PostgreSQL");
});
pool.on("error", (err) => {
    console.error("❌ Erreur PostgreSQL inattendue:", err);
    process.exit(-1);
});
exports.default = pool;
//# sourceMappingURL=db.js.map