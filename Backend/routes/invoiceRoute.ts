import express from "express"
import { addInvoice, deleteInvoice, getInvoice, getInvoices, updateInvoice } from "../controllers/invoiceController.ts"
import { verifyTokenandAuthorization } from "../middleware/Verify.ts"
const router=express.Router()

router.get("/getinvoice",verifyTokenandAuthorization ,getInvoice)
router.get("/getinvoices",verifyTokenandAuthorization,getInvoices)
router.post("/createinvoice",verifyTokenandAuthorization,addInvoice)
router.put("/updateinvoice",verifyTokenandAuthorization,updateInvoice)
router.delete("/deleteinvoices",verifyTokenandAuthorization,deleteInvoice)

export default router