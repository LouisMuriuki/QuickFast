import express from "express"
import { recievePaymentRequest } from "../controllers/stripeController.ts"
const router=express.Router()

router.post("/payment",recievePaymentRequest)
export default router