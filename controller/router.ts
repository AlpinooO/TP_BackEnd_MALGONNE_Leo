import express, { Express, Request, Response } from "express";
import path from "path";
import apiRoutes from "./apiRoutes";

const app: Express = express();

app.use(express.json());


app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "view", "index.html"));
});



app.use("/pokamon", apiRoutes);

export default app;
