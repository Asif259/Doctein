import { Request, Response } from "express";
import {refreshToken, verifyToken} from "../../Helpers/tokenHelper";
const JWT_SECRET = process.env.JWT_SECRET || "";


// Route to refresh access token
export const refreshAccessToken = (req: Request, res: Response): any => {
  const refreshTokenCookie = req.cookies.refreshToken;
  if (!refreshTokenCookie) return res.sendStatus(401);

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
