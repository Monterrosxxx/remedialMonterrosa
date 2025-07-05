/* 
   ten en cuenta:

   Collection name: clients
   name: String,
   email (unique): String,
   password: String,
   age: String,
   country of residence: String
*/

import clientsModel from "../models/Clients.js";
import bcrypt from "bcryptjs";

const clientsController = {};

clientsController.getClients = async (req, res) => {
    const clients = await clientsModel.find();
    res.json(clients);
};

clientsController.createClient = async (req, res) => {
    const { name, email, password, age, countryOfResidence } = req.body;

    try {
        // Encriptar la contraseña antes de guardarla
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newClient = new clientsModel({
            name,
            email,
            password: hashedPassword, // Guardar la contraseña encriptada
            age,
            countryOfResidence
        });
        
        await newClient.save();
        res.json({message: "Client created successfully"});
    } catch (error) {
        console.error("Error creating client:", error);
        res.status(500).json({message: "Error creating client"});
    }
};

clientsController.deleteClient = async (req, res) => {
    try {
        const deleteClient = await clientsModel.findByIdAndDelete(req.params.id);
        res.json({message: "Client deleted successfully"});
    } catch (error) {
        console.error("Error deleting client:", error);
        res.status(500).json({message: "Error deleting client"});
    }
};

clientsController.updateClient = async (req, res) => {
    const { name, email, password, age, countryOfResidence } = req.body;

    try {
        let updateData = { name, email, age, countryOfResidence };

        // Solo encriptar la contraseña si se está actualizando
        if (password && password.trim() !== '') {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            updateData.password = hashedPassword;
        }

        const updateClient = await clientsModel.findByIdAndUpdate(
            req.params.id, 
            updateData, 
            { new: true }
        );

        res.json({message: "Client updated successfully"});
    } catch (error) {
        console.error("Error updating client:", error);
        res.status(500).json({message: "Error updating client"});
    }
};

export default clientsController;