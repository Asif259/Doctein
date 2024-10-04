import { Request, Response, NextFunction } from 'express';
import { generateAccessToken, verifyToken, refreshToken } from '../Helpers/tokenHelper'; 

const JWT_SECRET = process.env.JWT_SECRET || '';

const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.accessToken;
  const refreshTokenCookie = req.cookies.refreshToken;

  // Function to verify and refresh token
  const handleRefreshToken = async () => {
    const newAccessToken = refreshToken(refreshTokenCookie);
    if (!newAccessToken) {
      return null;
    }
    res.cookie('accessToken', newAccessToken, { httpOnly: true, sameSite: 'strict', maxAge: 20 * 1000, });
    return verifyToken(newAccessToken, JWT_SECRET); 
  };

  // Verify access token
  if (accessToken) {
    const decodedToken = verifyToken(accessToken, JWT_SECRET);
    if (decodedToken) {
      req.headers.user = decodedToken; 
      return next();
    }
  }

  // If access token is invalid, check refresh token
  if (refreshTokenCookie) {
    const decodedUser = await handleRefreshToken();
    if (decodedUser) {
      req.headers.user = decodedUser; 
      return next();
    }
  }

  return res.status(403).json({ success: false, message: 'Access and refresh tokens are invalid' });
};

export = authenticateToken;
