import express from "express"
import { addClient, deleteClient, getClient, getClients, updateClient } from "../controllers/clientController.ts"
const router=express.Router()

router.post("/addclient",addClient)
router.get("/getclient",getClient)
router.get("/getclient",getClients)
router.put("/updateclient",updateClient)
router.delete("/getclient",deleteClient)

export default router
