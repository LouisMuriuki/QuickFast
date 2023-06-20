import express from "express"
import { loginUser, registerUser } from "../controllers/authControllers.ts"
const router=express.Router()

router.get("/login",loginUser)
router.post("/register",registerUser)


export default router