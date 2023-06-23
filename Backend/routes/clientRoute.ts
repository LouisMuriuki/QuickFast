import express from "express"
import { addClient, deleteClient, getClient, getClients, updateClient } from "../controllers/clientController.ts"
import { VerifyToken, verifyTokenandAuthorization } from "../middleware/Verify.ts"
const router=express.Router()

router.post("/addclient", addClient)
router.get("/getclient",verifyTokenandAuthorization,getClient)
router.get("/getclients",verifyTokenandAuthorization,getClients)
router.put("/updateclient",verifyTokenandAuthorization,updateClient)
router.delete("/getclient",verifyTokenandAuthorization,deleteClient)

export default router
