import { UpdateQuery } from "mongoose";
import Estimate from "../mongo/models/estimateSchema.ts";

const addEstimate = async (req: { body: any }, res: any) => {
  try {
    const newEstimate = await Estimate.create(req.body);
    res.status(200).json({ success: true, data: newEstimate,status:200 });
  } catch (error) {
    res.status(500).json({ success: true, data: error });
  }
};


const getEstimate = async (req: { params: { id: any } }, res: any) => {
  const { id } = req.params;

  try {
    const currentEstimate = await Estimate.findById({ id });
    res.status(200).json({ success: true, data: currentEstimate,status:200 });
  } catch (error) {
    res.status(500).json({ success: true, data: error });
  }
};


const getEstimates = async (
  req: { query: { page: number; limit: number } },
  res: any
) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const skip = (page - 1) * limit;
  try {
    if (req.query.page) {
      const doclength = await Estimate.countDocuments();
      if (skip >= doclength) {
        res.status(500).json({ success: true, data: "no such page" });
      }
    }
    const AllEstimates = await Estimate.find({}).skip(skip).limit(limit);
    res.status(200).json({ success: true, data: AllEstimates,status:200 });
  } catch (error) {
    res.status(500).json({ success: true, data: error });
  }
};


const deleteEstimate = async (req: { params: { id: any } }, res: any) => {
  const { id } = req.params;
  try {
    const currentEstimate = await Estimate.findByIdAndDelete({ id });
    res.status(200).json({ success: true, data: currentEstimate ,status:200});
  } catch (error) {
    res.status(500).json({ success: true, data: error });
  }
};


const updateEstimate = async (
  req: {
    params: { id: any };
    body: UpdateQuery<
      { createdAt: NativeDate; updatedAt: NativeDate } & {
        clientId: string;
        ownerId: string;
        status: string;
        estimate: {
          fromdata?: {
            name: string;
            email: string;
            phone: string;
            address?: string;
            city?: string;
            zipcode?: string;
            country?: string;
            website?: string;
          };
          todata?: { createdAt: NativeDate; updatedAt: NativeDate } & {
            name: string;
            ownerId: string;
            email: string;
            address?: string;
            city?: string;
            zipcode?: string;
            country?: string;
            phone?: string;
            website?: string;
            total_billed?: number;
            total_paid?: number;
          };
          Forminfo?: {
            number?: string;
            date?: string;
            title?: string;
            logo?: string;
            terms?: string;
            notes?: string;
            discountType?: string;
            discount?: number;
            total?: number;
            subTotal?: number;
            taxLabel?: string;
            taxType?: string;
            mainTax?: number;
            currency?: string;
            locale?: string;
          };
          Description?: {
            description?: string;
            rate?: number;
            qty?: number;
            amount?: number;
            tax?: boolean;
            taxrate?: number;
            additional?: string;
          };
        }[];
      }
    >;
  },
  res: any
) => {
  const { id } = req.params;
  try {
    const currentEstimate = await Estimate.findByIdAndUpdate(id, req.body, {
      new: true,
      upsert: true, //important
      runValidators: true,
    });
    res.status(200).json({ success: true, data: currentEstimate,status:200 });
  } catch (error) {
    res.status(500).json({ success: true, data: error });
  }
};

export {
  addEstimate,
  getEstimate,
  getEstimates,
  deleteEstimate,
  updateEstimate,
};
