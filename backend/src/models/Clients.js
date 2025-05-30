/* 
   Collection name: clients
   name: String,
   Email (unique): String,
   Password: String,
   Age: String,
   Country of residence: String
*/

import { Schema, model } from "mongoose";

const clientSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    countryOfResidence: {
        type: String,
        required: true,
    },
    }, {
        timestamps: true,
        strict: true
    });

export default model("Client", clientSchema);