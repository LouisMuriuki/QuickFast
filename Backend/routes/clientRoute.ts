import express from "express"
import { addClient, deleteClient, getClient, getClients, updateClient } from "../controllers/clientController.ts"
import { VerifyToken } from "../middleware/Verify.ts"
const router=express.Router()

router.post("/addclient",VerifyToken,addClient)
router.get("/getclient",VerifyToken,getClient)
router.get("/getclients",VerifyToken, getClients)
router.patch("/updateclient/:id",VerifyToken,updateClient)
router.delete("/deleteclient/:id",VerifyToken,deleteClient)

export default router
