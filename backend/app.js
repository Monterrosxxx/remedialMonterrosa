import express from "express";

import gamesRoutes from "./src/routes/games.js";
import clientsRoutes from "./src/routes/clients.js";

const app = express();

app.use(express.json());

app.use("/api/games", gamesRoutes);
app.use("/api/clients", clientsRoutes);

export default app;