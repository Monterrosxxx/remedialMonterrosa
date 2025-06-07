import express from "express";

const router = express.Router();

import clientsController from "../controllers/clientsController.js";

router.route("/")
    .get(clientsController.getClients)
    .post(clientsController.createClient);

router.route("/:id")
    .delete(clientsController.deleteClient)
    .put(clientsController.updateClient);

export default router;    