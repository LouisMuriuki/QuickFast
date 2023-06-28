import jwt from "jsonwebtoken";
import RefreshToken from "../mongo/models/refreshTokenSchema.ts";
import * as dotenv from "dotenv";
dotenv.config();

const generateRefreshToken = async (req: any, res: any) => {
  const { refreshToken } = req.query;
  if (!refreshToken || refreshToken === null || refreshToken === undefined) {
    return res.status(400).json({ error: "Refresh token not provided" });
  }

  const storedToken = await RefreshToken.findOne({ refreshToken });
  console.log(storedToken)
  if (!storedToken) {
    return res.status(400).json({ error: "Not found" });
  }

  const accessToken = jwt.sign(
    {
      id: storedToken._id,
    },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    { expiresIn: "3d" }
  );

  const refreshTokenInformation = jwt.sign(
    {
      id: storedToken._id,
    },
    process.env.REFRESH_TOKEN_SECRET_KEY,
    {
      expiresIn: "30d",
    }
  );

  const tokenInformation = await RefreshToken.create({
    userid: storedToken.userid,
    refreshToken: refreshTokenInformation,
  });

  res.status(200).json({
    status: 200,
    message: "Token generated successfully",
    accessToken: accessToken,
    refreshToken: tokenInformation.refreshToken,
    userId: tokenInformation.userid,
  });
};

export { generateRefreshToken };
