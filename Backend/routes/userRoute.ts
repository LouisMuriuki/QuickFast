import express from "express"
import { deleteUser, getUser,getUsers, updateUser } from "../controllers/userController.ts"

const router=express.Router()

router.get("/getuser",getUser)
router.get("/getusers",getUsers)
router.delete("/deleteuser",deleteUser)
router.put("/updateuser",updateUser)

export default router