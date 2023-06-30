import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    ownerId: { type: String, unique: true },
    settings: {
      bizinfo: {
        logo: { type: String },
        name: { type: String },
        email: { type: String },
        phone: { type: String },
        address: { type: String },
        city: { type: String },
        zipcode: { type: String },
        website: { type: String },
        country: { type: String },
      },
      customizeinfo: {
        invoicetitle: { type: String },
        estimatetitle: { type: String },
        currency: { type: String },
        invoicenotes: { type: String },
        estimatenotes: { type: String },
        emailmessage: { type: String },
        copytoemail: { type: Boolean },
      },
    },
  },
  { timestamps:true }
);

const Settings = mongoose.model("Settings", settingsSchema);

export default Settings;
