import User from "../mongo/models/UserSchema.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const registerUser = async (
  req: { body: { username: string; email: string; password: string } },
  res: any
) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(500).json({ sucess: false, data: "some fields are missing" });
  }
  try {
    const newUser = await User.create({
      username,
      email,
      password: CryptoJS.AES.encrypt(
        password,
        process.env.SECRET_KEY
      ).toString(),
    });
    const decryptPassword = CryptoJS.AES.decrypt(
      newUser.password,
      process.env.SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);
    res.status(200).json({ success: true, data: { newUser, status: 200 } });
  } catch (error) {
    res.status(500).json({ success: false, data: error });
  }
};

const loginUser = async (
  req: { body: { email: any; password: any } },
  res: any
) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(500).json({ success: false, data: "somefileds are missing" });
  }
  try {
    const loggedInUser = await User.findOne({ email });
    !loggedInUser &&
      res.status(400).json({ sucess: true, data: "User does not exist" });

    const decryptPassword = CryptoJS.AES.decrypt(
      loggedInUser.password,
      process.env.SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);
   //case where we login with hashed password
    if (password.length > 25) {
      if (loggedInUser.password !== password) {
        res.status(500).json({ sucess: true, data: "Invalid Password" });
      }
    } else {
      if (decryptPassword !== password) {
        res.status(500).json({ sucess: true, data: "Invalid Password" });
      }
    }

    const accessToken = jwt.sign(
      {
        id: loggedInUser._id,
        isAdmin: loggedInUser.isAdmin,
      },
      process.env.JWTSECRET,
      { expiresIn: "3d" }
    );
    res
      .status(200)
      .json({ sucess: true, data: { loggedInUser, accessToken, status: 200 } });
  } catch (error) {
    res.status(500).json({ success: false, data: error });
  }
};

export { registerUser, loginUser };
