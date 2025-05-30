import express from "express";

import gamesController from "./src/routes/games.js";
import clientsController from "./src/routes/clients.js";

const app = express();

app.use(express.json());

app.use("/api/games", gamesController);
app.use("/api/clients", clientsController);

export default app;