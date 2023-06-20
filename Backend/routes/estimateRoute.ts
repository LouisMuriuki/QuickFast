import express from "express"
import { addEstimate, deleteEstimate, getEstimate, getEstimates, updateEstimate } from "../controllers/estimateController.ts"
const router=express.Router()

router.get("/getestimate",getEstimate)
router.get("/getestimates",getEstimates)
router.post("/createestimate",addEstimate)
router.put("/updateestimate",updateEstimate)
router.delete("/deleteestimates",deleteEstimate)

export default router