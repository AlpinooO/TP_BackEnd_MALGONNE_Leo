"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const apiRoutes_1 = __importDefault(require("./apiRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// ============= ROUTES PRINCIPALES =============
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "..", "view", "index.html"));
});
// ============= ROUTES API AVEC POSTGRESQL =============
// Toutes les routes /Pokemon/* utilisent maintenant PostgreSQL via apiRoutes
app.use("/Pokemon", apiRoutes_1.default);
// Alias pour /pokamon (compatibilité)
app.use("/pokamon", apiRoutes_1.default);
exports.default = app;
//# sourceMappingURL=router.js.map