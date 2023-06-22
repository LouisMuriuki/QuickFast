import express from "express"
import { deleteUser, getUser,getUsers, updateUser } from "../controllers/userController.ts"
import { verifyTokenandAuthorization } from "../middleware/Verify.ts"

const router=express.Router()

router.get("/getuser",verifyTokenandAuthorization,getUser)
router.get("/getusers",verifyTokenandAuthorization,getUsers)
router.delete("/deleteuser",verifyTokenandAuthorization,deleteUser)
router.put("/updateuser",verifyTokenandAuthorization,updateUser)

export default router