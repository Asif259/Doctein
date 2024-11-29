import { Request, Response } from "express";
import { generateAccessToken } from "./tokenHelper";
import { IUser } from "../Models/userModel";

export const setAuthCookies = (req: Request, res: Response) => {
  const user = req.headers.user as unknown as IUser;
  if (!user) {
    return res
      .status(401)
      .json({ success: false, data: "User not authenticated" });
  }
  const accessToken = generateAccessToken(user);
  // const refreshToken = generateRefreshToken(user);

  // Set the access token as an HTTP-only cookie
  const expiration = parseInt(process.env.TOKEN_EXPIRATION || "3");
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: expiration * 24 * 60 * 60 * 1000, // 20sec
  });

  return res.json({ status: "success", data: "Login successful" });
};
