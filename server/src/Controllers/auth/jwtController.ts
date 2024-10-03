import { Request, Response } from 'express';
import * as jwt from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config();

const {
  generateAccessToken, generateRefreshToken, validateRefreshToken
} = require("../../Helpers/tokenHelper"); 
// Handle Token Refresh
export const refreshToken = (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  if (!token || !validateRefreshToken(token)) {
    return res.sendStatus(403); 
  }

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!, (err: any, user: any) => {
    if (err) return res.sendStatus(403);

    // Generate a new access token
    const newAccessToken = generateAccessToken({ email: user.email, user_id: user.user_id });
    res.json({ accessToken: newAccessToken });
  });
};
