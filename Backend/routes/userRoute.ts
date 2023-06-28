import express from "express"
import { deleteUser, getUser,getUsers, updateUser } from "../controllers/userController.ts"
import { VerifyToken, verifyTokenandAuthorization } from "../middleware/Verify.ts"

const router=express.Router()

router.get("/getuser",VerifyToken,getUser)
router.get("/getusers",VerifyToken,getUsers)
router.delete("/deleteuser",VerifyToken,deleteUser)
router.put("/updateuser",VerifyToken,updateUser)

export default router