import { Request, Response, NextFunction } from "express";
import { verifyToken, refreshToken } from "../Helpers/tokenHelper";
import User, { IUser } from "../Models/userModel";

const JWT_SECRET = process.env.JWT_SECRET || "";

const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  const accessToken = req.cookies.accessToken;
  const refreshTokenCookie = req.cookies.refreshToken;

  // Function to verify and refresh token
  const handleRefreshToken = async () => {
    const newAccessToken = refreshToken(refreshTokenCookie);
    if (!newAccessToken) {
      return null;
    }
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 2 * 60 * 60 * 1000,
    });
    return verifyToken(newAccessToken, JWT_SECRET);
  };

  // Verify access token
  if (accessToken) {
    const decodedToken = verifyToken(accessToken, JWT_SECRET);
    console.log("Decoded Token: ", decodedToken);
    if (decodedToken) {
      const { userId, email } = decodedToken as {
        userId: string;
        email: string;
      };
      console.log("Decoded token:", decodedToken);
      const user = await User.findOne({ _id: userId, email });
      if (!user) {
        console.log(new Error("User not found"));
        return res
          .status(403)
          .json({ success: false, message: "Unauthorized" });
      }
      req.headers.user = decodedToken;
      req.body.user = user as IUser;
      return next();
    }
  }

  // If access token is invalid, check refresh token
  if (refreshTokenCookie) {
    const decodedUser = await handleRefreshToken();
    if (decodedUser) {
      req.headers.user = decodedUser;
      return next();
    }
  }

  return res
    .status(403)
    .json({ success: false, message: "Access and refresh tokens are invalid" });
};

export default authenticateToken;
