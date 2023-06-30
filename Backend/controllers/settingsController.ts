import { UpdateQuery } from "mongoose";
import Settings from "../mongo/models/SettingsSchema.ts";

const getDefaultInvoiceSettings = async(req: { query: { id: any } }, res: any) => {
  const { id } = req.query;
  if (!id) {
    return res.status(500).json({ success: false, data: "Invalid request" });
  }
  try {
    const existingsettings = await Settings.findOne({ ownerId:id });
    if (!existingsettings) {
      return res.status(200).json({ success: true, data: [],status:200 });
    }
    return res
      .status(200)
      .json({ success: true, data: existingsettings, status: 200 });
  } catch (error) {
    return res.status(500).json({ success: false, data: error });
  }
};
const setDefaultSettings = async(req: { body: any;  }, res: any) => {
  console.log(req.body)
    const id  = req.body.ownerId;
    if (!id) {
      return res.status(500).json({ success: false, data: "Invalid request" });
    }
    const body = req.body;
  if (!body) {
    return res.status(500).json({ success: false, data: "Invalid request" });
  }
  try {
    const newSettings = await Settings.create(body);
    return res
      .status(200)
      .json({ success: true, data: newSettings, status: 200 });
  } catch (error) {
    return res.status(500).json({ success: false, data: error });
  }
};
const updateDefaultSettings = async (
  req: {
    query: { id: any };
    body: UpdateQuery<
      { createdAt: NativeDate; updatedAt: NativeDate } & {
        ownerId?: string;
        settings?: {
          bizinfo?: {
            name?: string;
            logo?: string;
            email?: string;
            phone?: string;
            address?: string;
            city?: string;
            zipcode?: string;
            website?: string;
            country?: string;
          };
          customizeinfo?: {
            invoicetitle?: string;
            estimatetitle?: string;
            currency?: string;
            invoicenotes?: string;
            estimatenotes?: string;
            emailmessage?: string;
            copytoemail?: boolean;
          };
        };
      }
    >;
  },
  res: any
) => {
  const { id } = req.query;
  if (!id) {
    return res.status(500).json({ success: false, data: "Invalid request" });
  }
  try {
    const updatedSettings = await Settings.findByIdAndUpdate(id, req.body, {
      new: true,
      upsert: true, //important
      runValidators: true,
    });
    res.status(200).json({ success: true, data: updatedSettings, status: 200 });
  } catch (error) {
    return res.status(500).json({ success: false, data: error });
  }
};

export { getDefaultInvoiceSettings, setDefaultSettings, updateDefaultSettings };
