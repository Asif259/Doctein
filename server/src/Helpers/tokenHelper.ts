import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "";

// Generate Access Token
export const generateAccessToken = (user: any) => {
  const payload = { email: user.email, userId: user._id };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "2h" });
};

// Generate Refresh Token
export const generateRefreshToken = (user: any) => {
  const payload = { email: user.email, userId: user._id };
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

// Verify Token and Generate New Access Token
export const verifyToken = (token: string, secret: string): any => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
};

export const refreshToken = (refreshToken: string): string | null => {
  const user = verifyToken(refreshToken, REFRESH_TOKEN_SECRET);
  if (!user) return null;

  return generateAccessToken({ email: user.email, userId: user._id });
};
