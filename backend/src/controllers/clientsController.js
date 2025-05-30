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

const clientsController = {};

clientsController.getClients = async (req, res) => {
    const clients = await clientsModel.find();
    res.json(clients);
};

clientsController.createClient = async (req, res) => {
    const { name, email, password, age, countryOfResidence } = req.body;

    const newClient = new clientsModel({
        name,
        email,
        password,
        age,
        countryOfResidence
    });
    await newClient.save();
    res.json({message: "Client created successfully"});
};

clientsController.deleteClient = async (req, res) => {
    const deleteClient = await clientsModel.findByIdAndDelete(req.params.id);
    res.json({message: "Client deleted successfully"});
};

clientsController.updateClient = async (req, res) => {
    const { name, email, password, age, countryOfResidence } = req.body;

    const updateClient = await clientsModel.findByIdAndUpdate(req.params.id, { name, email, password, age, countryOfResidence }, { new: true});

    res.json({message: "Client updated successfully"});
};

export default clientsController;