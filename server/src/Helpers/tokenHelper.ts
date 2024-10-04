import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || '';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || '';


// Generate Access Token
export const generateAccessToken = (user: any) => {
  const accessToken = jwt.sign({ email: user.email, user_id: user._id }, JWT_SECRET);
  return accessToken; 
};

// Generate Refresh Token
export const generateRefreshToken = (user: any) => {
  const refreshToken = jwt.sign({ email: user.email, user_id: user._id }, REFRESH_TOKEN_SECRET);
  return refreshToken;
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

  return generateAccessToken({ email: user.email, user_id: user.user_id });
};