import { Request, Response, NextFunction } from "express";
import { verifyToken, refreshToken } from "../Helpers/tokenHelper";
import User, { IUser } from "../Models/userModel";
import { getDoctorId } from "../Helpers/userRole";

const JWT_SECRET = process.env.JWT_SECRET || "";

const authenticateToken = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<any> => {
  const accessToken = req.cookies.accessToken;
  const refreshTokenCookie = req.cookies.refreshToken;

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

  if (accessToken) {
    const decodedToken = verifyToken(accessToken, JWT_SECRET);
    console.log("Decoded Token:", decodedToken);

    if (decodedToken) {
      const { email, userId } = decodedToken as {
        userId: string;
        email: string;
      };

      console.log("Email from token:", email);
      console.log("UserId from token:", userId);

      const user = await User.findOne({ email });

      if (!user) {
        console.error(`User not found for email: ${email}`);
        return res.status(403).json({ success: false, message: "Unauthorized, User not found" });
      }

      // Fetch doctorId from user
      const doctorId = await getDoctorId(user);
      console.log("Doctor ID:", doctorId);

      req.body.user = user;
      req.body.doctorId = doctorId;

      return next();
    } else {
      console.log("Invalid token.");
      return res.status(403).json({ success: false, message: "Unauthorized, Invalid token" });
    }
  }

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
