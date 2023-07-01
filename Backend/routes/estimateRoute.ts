import express from "express";
import {
  addEstimate,
  deleteEstimate,
  getEstimate,
  getEstimates,
  updateEstimate,
} from "../controllers/estimateController.ts";
import {
  VerifyToken,
  verifyTokenandAuthorization,
} from "../middleware/Verify.ts";
const router = express.Router();

router.get("/getestimate", VerifyToken, getEstimate);
router.get("/getestimates", VerifyToken, getEstimates);
router.post("/createestimate", addEstimate);
router.patch("/estimatemarkasclosed/:id", VerifyToken, updateEstimate);
router.delete("/deleteestimates/:id", VerifyToken, deleteEstimate);

export default router;
