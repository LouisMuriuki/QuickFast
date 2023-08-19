import express from "express"
import { successfulCheckout } from "../controllers/stripeController.ts"
const router=express.Router()

router.post(
  "/successfulpayment",
  express.raw({ type: "application/json" }),
  successfulCheckout
);

export default router
