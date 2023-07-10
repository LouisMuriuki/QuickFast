import express from "express";
import { getPackages,savePackages } from "../controllers/packageController.ts";
const router = express.Router();
router.get("/getpackages", getPackages);
router.post("/savepackages", savePackages);

export default router;
