import express from "express";

import gamesRoutes from "./src/routes/games.js";
import clientsRoutes from "./src/routes/clients.js";
import cors from "cors";

const app = express();

//Usar el cors para permitir peticiones desde el frontend
app.use(cors({
    origin: "https://remedial-monterrosa.vercel.app/", 
    credentials: true
}));

app.use(express.json());

app.use("/api/games", gamesRoutes);
app.use("/api/clients", clientsRoutes);

export default app;