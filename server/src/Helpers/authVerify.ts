import { Request, Response } from "express";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../Helpers/tokenHelper";

export const setAuthCookies = (req: Request, res: Response) => {
  const { user } = req.body;
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // Set the access token as an HTTP-only cookie
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 15 * 60 * 1000, // 20sec
  });

  // Set the refresh token as an HTTP-only cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return res.json({ status: "success", data: "Login successful" });
};