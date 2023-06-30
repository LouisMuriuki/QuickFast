import express from "express"
import {VerifyToken } from "../middleware/Verify.ts"
import { getDefaultInvoiceSettings, setDefaultSettings, updateDefaultSettings } from "../controllers/settingsController.ts"
const router=express.Router()

router.get("/getdefaultsettings",VerifyToken,getDefaultInvoiceSettings)
router.post("/setdefaultsettings",VerifyToken,setDefaultSettings)
router.put("/updatedefaultsettings",VerifyToken,updateDefaultSettings)

export default router