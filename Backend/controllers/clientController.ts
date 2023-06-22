import Client from "../mongo/models/ClientSchema.ts";

const addClient = async (req: any , res: any) => {
  try {
    const newClient = await Client.create(req.body);
    res.status(500).json({ success: true, data: newClient });
  } catch (error) {
    res.status(500).json({ success: true, data: error });
  }
};

const getClient = async (req: { params: { id: any } }, res: any) => {
  const { id } = req.params;
  try {
    const currentClient = await Client.findById(id);
    res.status(200).json({ success: true, data: currentClient });
  } catch (error) {
    res.status(500).json({ success: true, data: error });
  }
};
const getClients = async (req: { query: { page: number; limit: number; }; }, res: any) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const skip = (page - 1) * limit;

  try {
    if (req.query.page) {
      const doclength = await Client.countDocuments();
      if (skip >= doclength) {
        res.status(500).json({ success: true,data:"no such page"});
      }
    }
    const currentClients = Client.find({}).skip(skip).limit(limit);
    res.status(200).json({ success: true, data: {currentClients,status:200} });
  } catch (error) {
    res.status(500).json({ success: true, data: error });
  }
};

const updateClient = async (
  req: {
    params: { id: any };
    body: any;
  },
  res: any
) => {
  const { id } = req.params;
  try {
    const updatedClient = await Client.findByIdAndUpdate(id, req.body, {
      new: true,
      upsert: true, //important
      runValidators: true,
    });
    res.status(200).json({ success: true, data: updatedClient });
  } catch (error) {
    res.status(500).json({ success: false, data: error });
  }
};

const deleteClient = async (req: { params: { id: any } }, res: any) => {
  try {
    const { id } = req.params;
    const deletedClient = await Client.findByIdAndDelete(id);
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: true, data: error });
  }
};

export { addClient, getClient, getClients, updateClient, deleteClient };
