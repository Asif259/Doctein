import { Request, Response } from 'express';
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

/**
 * 
 * response: {success: true, data: ...}
 * 
 */

// Generate Refresh Token
export const generateRefreshToken = (user: any) => {
  const refreshToken = jwt.sign({ email: user.email, user_id: user._id }, REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken); // Store the refresh token
  return refreshToken;
};

// Handle Token Refresh
export const refreshToken = (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  if (!token || !refreshTokens.includes(token)) {
    return res.sendStatus(403); 
  }

  jwt.verify(token, REFRESH_TOKEN_SECRET, (err: any, user: any) => {
    if (err) return res.sendStatus(403); // Forbidden

    // Generate a new access token
    const newAccessToken = generateAccessToken({ email: user.email, user_id: user.user_id });
    res.json({ accessToken: newAccessToken });
  });
};
