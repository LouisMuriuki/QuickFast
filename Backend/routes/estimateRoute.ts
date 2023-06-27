import express from "express"
import { addEstimate, deleteEstimate, getEstimate, getEstimates, updateEstimate } from "../controllers/estimateController.ts"
import { verifyTokenandAuthorization } from "../middleware/Verify.ts"
const router=express.Router()

router.get("/getestimate",verifyTokenandAuthorization, getEstimate)
router.get("/getestimates",verifyTokenandAuthorization,getEstimates)
router.post("/createestimate",addEstimate)
router.put("/updateestimate",verifyTokenandAuthorization,updateEstimate)
router.delete("/deleteestimates",verifyTokenandAuthorization,deleteEstimate)

export default router