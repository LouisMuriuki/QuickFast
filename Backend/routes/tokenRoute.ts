import express from "express"
import { generateRefreshToken } from "../controllers/tokenController.ts"
const router=express.Router()


router.post("/refreshToken",generateRefreshToken)