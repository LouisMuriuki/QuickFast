import express from "express"
import { addInvoice, deleteInvoice, getInvoice, getInvoices, updateInvoice } from "../controllers/invoiceController.ts"
const router=express.Router()

router.get("/getinvoice",getInvoice)
router.get("/getinvoices",getInvoices)
router.post("/createinvoice",addInvoice)
router.put("/updateinvoice",updateInvoice)
router.delete("/deleteinvoices",deleteInvoice)

export default router