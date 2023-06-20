import User from "../mongo/models/UserSchema.ts";

const getUser = async (req: { params: { id: any } }, res: any) => {
  const { id } = req.params;
  try {
    const currentUser = await User.findById(id);
    res.status(200).json({ success: true, data: currentUser });
  } catch (error) {
    res.status(500).json({ success: true, data: error });
  }
};
const getUsers = async (req: any, res: any) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const skip = (page - 1) * limit;

  try {
    if (req.query.page) {
      const doclength = await User.countDocuments();
      if (skip >= doclength) {
        console.log("no such page");
      }
    }
    const currentUsers = User.find({}).skip(skip).limit(limit);
    res.status(200).json({ success: true, data: currentUsers });
  } catch (error) {
    res.status(500).json({ success: true, data: error });
  }
};

const updateUser = async (
  req: {
    params: { id: any };
    body: { username: string; email: string; password: string };
  },
  res: any
) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      upsert: true, //important
      runValidators: true,
    });
    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, data: error });
  }
};

const deleteUser = async (req: { params: { id: any } }, res: any) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: true, data: error });
  }
};

export { getUser, getUsers, updateUser, deleteUser };
