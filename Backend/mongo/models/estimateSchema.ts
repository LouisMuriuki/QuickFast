import mongoose from "mongoose";
import { ClientSchema } from "./ClientSchema.ts";

const estimateSchema = new mongoose.Schema({
  clientId: { type: String, required: true, unique: true },
  ownerId: { type: String, required: true, unique: true },
  status:{type:String,default:"Open"},
  estimate: [
    {
      fromdata: {
        name: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true, unique: true },
        address: { type: String },
        city: { type: String },
        zipcode: { type: String },
        website: { type: String },
        country: { type: String },
      },
      todata: { type: ClientSchema },
      Forminfo: {
        title: { type: String },
        logo: { type: String },
        number: { type: String },
        date: { type: String },
        terms: { type: String },
        notes: { type: String },
        discountType: { type: String },
        discount: { type: Number },
        total: { type: Number },
        subTotal: { type: Number },
        taxLabel: { type: String },
        taxType: { type: String },
        mainTax: { type: Number },
        currency: { type: String },
        locale: { type: String },
      },
      Description: {
        description: { type: String },
        rate: { type: Number },
        qty: { type: Number },
        amount: { type: Number },
        tax: { type: Boolean },
        taxrate: { type: Number },
        additional: { type: String },
      },
    },

  ],
}, { timestamps: true });

const Estimate = mongoose.model("Estimate", estimateSchema);

export default Estimate