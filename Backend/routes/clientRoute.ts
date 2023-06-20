import express from "express"
import { deleteClient, getClient, getClients, updateClient } from "../controllers/clientController.ts"
const router=express.Router()

router.get("/getclient",getClient)
router.get("/getclient",getClients)
router.put("/updateclient",updateClient)
router.delete("/getclient",deleteClient)

export default router
