import { UpdateQuery } from "mongoose";
import Invoice from "../mongo/models/invoiceSchema.ts";

const addInvoice = async (req: { body: any }, res: any) => {
  try {
    const newInvoice = await Invoice.create(req.body);
    res.status(200).json({ success: true, data: newInvoice,status:200 });
  } catch (error) {
    res.status(500).json({ success: false, data: error });
  }
};

const getInvoice = async (req: { params: { id: any } }, res: any) => {
  const { id } = req.params;

  try {
    const currentInvoice = await Invoice.findById({ id });
    res.status(200).json({ success: true, data: currentInvoice,status:200 });
  } catch (error) {
    res.status(500).json({ success: false, data: error });
  }
};

const getInvoices = async (
  req: { query: { page: number; limit: number } },
  res: any
) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const skip = (page - 1) * limit;
  try {
    if (req.query.page) {
      const doclength = await Invoice.countDocuments();
      if (skip >= doclength) {
        res.status(500).json({ success: true, data: "no such page" });
      }
    }
    const AllInvoices = await Invoice.find({}).skip(skip).limit(limit);
    res.status(200).json({ success: true, data: AllInvoices,status:200 });
  } catch (error) {
    res.status(500).json({ success: false, data: error });
  }
};

const deleteInvoice = async (req: { params: { id: any } }, res: any) => {
  const { id } = req.params;
  try {
    const currentInvoice = await Invoice.findByIdAndDelete({ id });
    res.status(200).json({ success: true, data: currentInvoice,status:200 });
  } catch (error) {
    res.status(500).json({ success: false, data: error });
  }
};

const updateInvoice = async (
  req: {
    params: { id: any };
    body: UpdateQuery<
      { createdAt: NativeDate; updatedAt: NativeDate } & {
        clientId: string;
        ownerId: string;
        status: string;
        invoice: {
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
    const currentInvoice = await Invoice.findByIdAndUpdate(id, req.body, {
      new: true,
      upsert: true, //important
      runValidators: true,
    });
    res.status(200).json({ success: true, data: currentInvoice ,status:200});
  } catch (error) {
    res.status(500).json({ success: false, data: error });
  }
};

export { addInvoice, getInvoice, getInvoices, deleteInvoice, updateInvoice };
