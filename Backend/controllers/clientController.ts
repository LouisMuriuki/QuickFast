import Client from "../mongo/models/ClientSchema.ts";

const addClient = async (req: { body: any }, res: any) => {
  try {
    const { email, ownerId } = req.body;
    console.log(req.body)

    const currentClient = await Client.findOne({ email });
    if (currentClient.ownerId === ownerId) {
      return res
        .status(400)
        .json({ success: true, data: "client already exists", status: 200 });
    } else {
      const newClient = await Client.create(req.body);
      return res
        .status(200)
        .json({ success: true, data: newClient, status: 200 });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

const getClient = async (req: { params: { id: any } }, res: any) => {
  const { id } = req.params;
  try {
    const currentClient = await Client.findById(id);
    res.status(200).json({ success: true, data: currentClient, status: 200 });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
};
const getClients = async (
  req: { query: { page: number; limit: number; id: string } },
  res: any
) => {
  const ownerId = req.query.id;
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const skip = (page - 1) * limit;
  let doclength;

  try {
    if (req.query.page) {
      doclength = await Client.countDocuments();
      if (doclength === 0) {
        return res.status(200).json({
          success: true,
          data: [],
          status: 200,
          total: doclength,
          current: page,
        });
      }
      if (skip >= doclength) {
        return res.status(500).json({ success: false, error: "no such page" });
      }
    }
    const invoiceLength = await Client.find({ ownerId }).countDocuments();
    const currentClients = await Client.find({ ownerId })
      .skip(skip)
      .limit(limit);
    return res.status(200).json({
      success: true,
      data: currentClients,
      status: 200,
      total: invoiceLength,
      current: page,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
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
      upsert: true,
      runValidators: true,
    });
    res.status(200).json({ success: true, data: updatedClient, status: 200 });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
};

const deleteClient = async (req: { params: { id: any } }, res: any) => {
  try {
    const { id } = req.params;
    const deletedClient = await Client.findByIdAndDelete(id);
    res.status(201).json({ success: true, data: deletedClient, status: 200 });
  } catch (error) {
    res.status(500).json({ success: true, data: error });
  }
};

export { addClient, getClient, getClients, updateClient, deleteClient };
