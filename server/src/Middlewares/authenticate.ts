import { Request, Response, NextFunction } from "express";
import { verifyToken, generateAccessToken } from "../Helpers/tokenHelper";
import { setAuthCookies } from "../Helpers/authVerify";
import User, { IUser } from "../Models/userModel";
import { getDoctorId } from "../Helpers/userRole";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";

const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
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
  let decodedToken = verifyToken(accessToken, JWT_SECRET);

  // If token is invalid, check if it's expired
  if (!decodedToken) {
    try {
      jwt.verify(accessToken, JWT_SECRET);
    } catch (err: any) {
      if (err.name === "TokenExpiredError") {
        console.log("Token expired, attempting to refresh...");
        // Try to decode the expired token to get user info
        try {
          const decoded = jwt.decode(accessToken) as {
            email?: string;
            userId?: string;
          };
          if (decoded && decoded.email) {
            // Find user and generate new token
            const user = await User.findOne({ email: decoded.email });
            if (user) {
              // Generate new token and update cookie
              const newToken = generateAccessToken(user);
              const tokenExpiration = process.env.TOKEN_EXPIRATION || "30";

              // Parse expiration days for cookie maxAge
              let expirationDays = 30; // Default
              if (tokenExpiration.includes("d")) {
                const days = parseInt(tokenExpiration.replace("d", ""), 10);
                if (!isNaN(days) && days > 0) expirationDays = days;
              } else if (tokenExpiration.includes("h")) {
                const hours = parseInt(tokenExpiration.replace("h", ""), 10);
                if (!isNaN(hours) && hours > 0)
                  expirationDays = Math.ceil(hours / 24);
              } else {
                const days = parseInt(tokenExpiration, 10);
                if (!isNaN(days) && days > 0) expirationDays = days;
              }

              res.cookie("accessToken", newToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: expirationDays * 24 * 60 * 60 * 1000,
              });

              // Continue with authentication using new token
              decodedToken = verifyToken(newToken, JWT_SECRET);
              if (decodedToken) {
                // Token refreshed successfully, continue
                console.log("Token refreshed successfully");
              }
            }
          }
        } catch (decodeError) {
          console.log("Failed to decode expired token", decodeError);
        }
      }

      // If still no valid token after refresh attempt
      if (!decodedToken) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({
            success: false,
            message: "Token expired and could not be refreshed",
            expired: true,
          });
        }
        console.log(new Error("Invalid access token"));
        return res
          .status(403)
          .json({ success: false, message: "Unauthorized" });
      }
    }
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
