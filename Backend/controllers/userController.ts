import Package from "../mongo/models/PackageSchema.ts";
import User from "../mongo/models/UserSchema.ts";

const getUser = async (req: { query: { id: any } }, res: any) => {
  const { id } = req.query;
  console.log(id);
  try {
    const currentUser = await User.findById(id);
    let packageType;
    if (currentUser.packageId) {
      packageType = await Package.findById(currentUser.packageId);
      console.log(packageType)
    }
    const data = {packageType,currentUser };
    res.status(200).json({ success: true, data: data, status: 200 });
  } catch (error) {
    res.status(500).json({ success: true, data: error });
  }
};
const getUsers = async (req: any, res: any) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const skip = (page - 1) * limit;
  let doclength;
  try {
    if (req.query.page) {
      doclength = await User.countDocuments();
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
        console.log("no such page");
      }
    }
    const currentUsers = await User.find({}).skip(skip).limit(limit);

    res.status(200).json({
      success: true,
      data: currentUsers,
      status: 200,
      total: doclength,
      current: page,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
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
    res.status(200).json({ success: true, data: updatedUser, status: 200 });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
};

const deleteUser = async (req: { params: { id: any } }, res: any) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    res.status(201).json({ success: true, status: 200 });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
};

export { getUser, getUsers, updateUser, deleteUser };
