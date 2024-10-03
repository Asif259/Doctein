import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || '';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || '';

let refreshTokens: string[] = [];

// Generate Access Token
export const generateAccessToken = (user: any) => {
  return jwt.sign({ email: user.email, user_id: user._id }, JWT_SECRET, { expiresIn: '15m' });
};

// Generate Refresh Token
export const generateRefreshToken = (user: any) => {
  const refreshToken = jwt.sign({ email: user.email, user_id: user._id }, REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken); // Store the refresh token
  return refreshToken;
};

// Validate Refresh Token (optional)
export const validateRefreshToken = (token: string): boolean => {
  return refreshTokens.includes(token);
};
