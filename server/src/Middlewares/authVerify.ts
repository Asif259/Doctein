import { Request, Response, NextFunction } from 'express';
import {generateAccessToken, generateRefreshToken} from "../Helpers/tokenHelper";

export const setAuthCookies = (req: Request, res: Response) => {
  const { user } = req.body;
  const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.cookie('accessToken', accessToken, {
          httpOnly: true,
          sameSite: 'strict',
          maxAge: 15 * 60 * 1000, // 15 minutes
      });
      res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          sameSite: 'strict',
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return res.json({ message: 'Login successful' });
};
