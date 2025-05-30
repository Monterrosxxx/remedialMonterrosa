/*
    Collection name: games

    gameName: String, 
    category: String,
    minimumBet: String,
    maximumBet: String
 */ 

import gamesModel from "../models/Games.js";

const gamesController = {};

gamesController.getGames = async (req, res) => {
    const games = await gamesModel.find();
    res.json(games);
};

gamesController.createGame = async (req, res) => {
    const { gameName, category, minimumBet, maximumBet } = req.body;
    const newGame = new gamesModel({ gameName, category, minimumBet, maximumBet });
    await newGame.save();
    res.json({ message: "Game created successfully"});
};

gamesController.deleteGame = async (req, res) => {
    const deleteGame = await gamesModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Game deleted successfully"});
};

gamesController.updateGame = async (req, res) => {
    const { gameName, category, minimumBet, maximumBet } = req.body;
    const updatedGame = await gamesModel.findByIdAndUpdate(req.params.id, { gameName, category, minimumBet, maximumBet }, { new: true });
    res.json({ message: "Game updated successfully"});
};

export default gamesController;