import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const User = require('../Models/userModel'); 

const JWT_SECRET = process.env.JWT_SECRET || '';

const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.accessToken ;

  if (!token) {
    return res.status(401).json({success: true, message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, async (err: any, decodedToken: any) => {
    if (err) {
      return res.status(403).json({success: false, message: 'Invalid or expired token' });
    }

    try {
      const userId = decodedToken.user_id;
      const user = await User.findOne({ _id: userId });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      req.headers.user = decodedToken;

      next();
    } catch (error) {
      console.error('Error checking user:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
};

export = authenticateToken;
