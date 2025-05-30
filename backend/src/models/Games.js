/*
    Collection name: games

    gameName: String, 
    category: String,
    minimumBet: String,
    maximumBet: String
 */ 

import {Schema, model} from "mongoose";

const gameSchema = new Schema({
    gameName: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    minimumBet: {
        type: String,
        required: true
    },
    maximumBet: {
        type: String,
        required: true
    }
}, {
    timestamps: true,   
    strict: false
});

export default model("Games", gameSchema);