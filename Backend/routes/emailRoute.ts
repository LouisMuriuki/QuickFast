import express from "express"
import { sendEmail } from "../controllers/emailController.ts"
const router=express.Router()

router.post('/sendemail',sendEmail)

export default router
