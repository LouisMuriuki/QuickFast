import express from "express";
import {
  addInvoice,
  deleteInvoice,
  getInvoice,
  getInvoices,
  updateInvoice,
} from "../controllers/invoiceController.ts";
import { VerifyToken } from "../middleware/Verify.ts";
import { addClient } from "../controllers/clientController.ts";
const router = express.Router();

router.get("/getinvoice", VerifyToken, getInvoice);
router.get("/getinvoices", VerifyToken, getInvoices);
router.post("/createinvoice", VerifyToken, addInvoice, addClient);
router.patch("/updateinvoice/:id", VerifyToken, updateInvoice);
router.patch("/invoicemarkascompleted/:id", VerifyToken, updateInvoice);
router.delete("/deleteinvoices/:id", VerifyToken, deleteInvoice);

export default router;
