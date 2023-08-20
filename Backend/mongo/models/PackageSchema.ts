import mongoose from "mongoose";

const PackageSchema = new mongoose.Schema(
  {
    packageName: { type: String },
    features: [{ type: String }],
    price: { type: Number },
    maxInvoices: { type: Number },
  },
  { timestamps: true }
);

const Package = mongoose.model("Package", PackageSchema);
export default Package;
