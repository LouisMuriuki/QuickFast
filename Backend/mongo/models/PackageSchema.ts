import mongoose from "mongoose";

const PackageSchema = new mongoose.Schema(
  {
    packageName: { type: String },
    features: [{ type: String }],
    price: { type: Number },
    maxInvoices: { type: Number },
    days: { type: Number, default: 30 },
  },
  { timestamps: true }
);

const Package = mongoose.model("Package", PackageSchema);
export default Package;
