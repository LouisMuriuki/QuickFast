import jwt from "jsonwebtoken";
import RefreshToken from "../mongo/models/refreshTokenSchema.ts";
const generateRefreshToken = async (req: any, res: any) => {
  console.log(req);
  const { refreshToken } = req.params;
  if (!refreshToken) {
    return res.status(400).json({ error: "Refresh token not provided" });
  }

  const storedToken = await RefreshToken.findOne(refreshToken);

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
    userid: storedToken._id,
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
