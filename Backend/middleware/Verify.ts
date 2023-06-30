import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
interface AuthenticatedRequest extends Request {
  user?: any;
}
const VerifyToken = (req: any, res: any, next: any) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }
  try {
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET_KEY,
      (err: any, user: any) => {
        if (err) {
          console.log("Verification error:", err);
          return res.status(403).json({ message: "Token is not valid" });
        }
        req.user = user;
        next();
      }
    );
  } catch (err) {
    return res.status(401).json({ message: "Invalid token." });
  }
};

//admin and anyone else
const verifyTokenandAuthorization = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  VerifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("Unauthorised");
    }
  });
};

//only admin
const verifyTokenandAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  VerifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("Unauthorised");
    }
  });
};

export { VerifyToken, verifyTokenandAdmin, verifyTokenandAuthorization };
