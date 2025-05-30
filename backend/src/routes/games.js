import express from "express";
import gamesController from "../controllers/gamesController.js";

const router = express.Router();

router.route("/")
    .get(gamesController.getGames)
    .post(gamesController.createGame);

router.route("/:id")
    .delete(gamesController.deleteGame)
    .put(gamesController.updateGame);

export default router;