import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
interface AuthenticatedRequest extends Request {
  user?: any;
}
const VerifyToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  console.log(token)
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }
  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({message:"Token is not valid"});
      }
      console.log(user);
      req.user = user;

      next();
    });
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

export { VerifyToken,verifyTokenandAdmin,verifyTokenandAuthorization };
