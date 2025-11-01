import { Request, Response } from "express";
import { generateAccessToken } from "./tokenHelper";
import { IUser } from "../Models/userModel";

// Parse token expiration days for cookie maxAge calculation
const parseTokenExpirationDays = (): number => {
  const tokenExpiration = process.env.TOKEN_EXPIRATION || "30"; // Default to 30 days

  // If format is like "7d", extract the number
  if (tokenExpiration.includes("d")) {
    const days = parseInt(tokenExpiration.replace("d", ""), 10);
    if (!isNaN(days) && days > 0) return days;
  }

  // If format is like "24h", convert to days
  if (tokenExpiration.includes("h")) {
    const hours = parseInt(tokenExpiration.replace("h", ""), 10);
    if (!isNaN(hours) && hours > 0) return Math.ceil(hours / 24);
  }

  // Otherwise, treat as days
  const days = parseInt(tokenExpiration, 10);
  if (!isNaN(days) && days > 0) return days;

  // Default fallback
  console.warn(
    `Invalid TOKEN_EXPIRATION value: ${tokenExpiration}. Using default 30 days.`
  );
  return 30;
};

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
  const expirationDays = parseTokenExpirationDays();
  const maxAge = expirationDays * 24 * 60 * 60 * 1000; // Convert days to milliseconds

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use secure in production
    sameSite: "lax",
    maxAge: maxAge,
  });

  console.log(
    `Cookie set with expiration: ${expirationDays} days (${maxAge}ms)`
  );
  return res.json({ status: "success", data: "Login successful" });
};
