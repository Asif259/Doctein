import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../Helpers/tokenHelper";
import User, { IUser } from "../Models/userModel";
import { getDoctorId } from "../Helpers/userRole";

const JWT_SECRET = process.env.JWT_SECRET || "";

const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  const accessToken = req.cookies.accessToken;
  // const refreshTokenCookie = req.cookies.refreshToken;

  // Function to verify and refresh token
  // const handleRefreshToken = async () => {
  //   const newAccessToken = refreshToken(refreshTokenCookie);
  //   if (!newAccessToken) {
  //     return null;
  //   }
  //   res.cookie("accessToken", newAccessToken, {
  //     httpOnly: true,
  //     sameSite: "strict",
  //     maxAge: 2 * 60 * 60 * 1000,
  //   });
  //   return verifyToken(newAccessToken, JWT_SECRET);
  // };

  if (!accessToken) {
    return res
      .status(403)
      .json({ success: false, message: "Access token is missing" });
  }

  // Verify access token
  const decodedToken = verifyToken(accessToken, JWT_SECRET);
  if (!decodedToken) {
    console.log(new Error("Invalid access token"));
    return res.status(403).json({ success: false, message: "Unauthorized" });
  }

  const { email } = decodedToken as {
    userId: string;
    email: string;
  };
  const user = await User.findOne({ email });
  if (!user) {
    console.log(new Error("User not found"));
    return res.status(403).json({ success: false, message: "Unauthorized" });
  }
  const doctorId = await getDoctorId(user);
  req.body.user = user as IUser;
  req.body.doctorId = doctorId?.toString();
  req.headers.doctorId = doctorId?.toString();
  req.headers.user = JSON.parse(JSON.stringify(user));
  return next();

  // If access token is invalid, check refresh token
  // if (refreshTokenCookie) {
  //   const decodedUser = await handleRefreshToken();
  //   if (decodedUser) {
  //     req.headers.user = decodedUser;
  //     return next();
  //   }
  // }
};

export default authenticateToken;
