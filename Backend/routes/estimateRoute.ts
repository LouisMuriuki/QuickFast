import express from "express";
import {
  addEstimate,
  deleteEstimate,
  getEstimate,
  getEstimates,
  updateEstimate,
} from "../controllers/estimateController.ts";
import { VerifyToken } from "../middleware/Verify.ts";
import { addClient } from "../controllers/clientController.ts";
const router = express.Router();

router.get("/getestimate", VerifyToken, getEstimate);
router.get("/getestimates", VerifyToken, getEstimates);
router.post("/createestimate", VerifyToken, addEstimate, addClient);
router.patch("/updateestimate/:id", VerifyToken, updateEstimate);
router.patch("/estimatemarkasclosed/:id", VerifyToken, updateEstimate);
router.delete("/deleteestimates/:id", VerifyToken, deleteEstimate);

export default router;
