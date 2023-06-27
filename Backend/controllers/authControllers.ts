import User from "../mongo/models/UserSchema.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import RefreshToken from "../mongo/models/refreshTokenSchema.ts";
dotenv.config();

const registerUser = async (
  req: { body: { username: string; email: string; password: string } },
  res: any
) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res
      .status(500)
      .json({ sucess: false, data: "some fields are missing" });
  }
  try {
    const existinguser = await User.findOne({ email });

    if (existinguser) {
      return res
        .status(409)
        .json({ success: false, data: "User already exists" });
    }

    const newUser = await User.create({
      username,
      email,
      password: CryptoJS.AES.encrypt(
        password,
        process.env.PASSWORD_SECRET_KEY
      ).toString(),
    });

    return res.status(200).json({ success: true, data: newUser, status: 200 });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: "An error occurred while registering the user",
    });
  }
};

const loginUser = async (
  req: { body: { email: string; password: string } },
  res: any
) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(500)
      .json({ success: false, data: "somefileds are missing" });
  }

  try {
    const loggedInUser = await User.findOne({ email });
    if (!loggedInUser) {
      return res
        .status(400)
        .json({ success: true, data: "User does not exist" });
    }

    const decryptPassword = CryptoJS.AES.decrypt(
      loggedInUser.password,
      process.env.PASSWORD_SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);
    //case where we login with hashed password

    if (decryptPassword !== password) {
      return res.status(500).json({ sucess: true, data: "Invalid Password" });
    }

    const accessToken = jwt.sign(
      {
        id: loggedInUser._id,
        email: loggedInUser.email,
      },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: "3d" }
    );

    const refreshToken = jwt.sign(
      {
        id: loggedInUser._id,
        email: loggedInUser.email,
      },
      process.env.REFRESH_TOKEN_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
    RefreshToken.create({
      userid: loggedInUser._id,
      refreshToken: refreshToken,
    });
    return res.status(200).json({
      success: true,
      data: loggedInUser,
      accessToken,
      refreshToken,
      status: 200,
    });
  } catch (error) {
    return res.status(500).json({ success: false, data: error });
  }
};

export { registerUser, loginUser };
