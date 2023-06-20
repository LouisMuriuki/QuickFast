import express from "express"
import { loginUser, registerUser } from "../controllers/authControllers.ts"
const router=express.Router()

router.use("/login",loginUser)
router.use("/register",registerUser)


export default router