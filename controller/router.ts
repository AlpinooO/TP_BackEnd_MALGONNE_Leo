import express, { Express, Request, Response } from "express";
import path from "path";
import apiRoutes from "./apiRoutes";

const app: Express = express();

app.use(express.json());

// ============= ROUTES PRINCIPALES =============

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "view", "index.html"));
});

// ============= ROUTES API AVEC POSTGRESQL =============
// Toutes les routes /Pokemon/* utilisent maintenant PostgreSQL via apiRoutes
app.use("/Pokemon", apiRoutes);
// Alias pour /pokamon (compatibilité)
app.use("/pokamon", apiRoutes);

export default app;
