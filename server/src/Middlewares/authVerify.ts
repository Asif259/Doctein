import { Request, Response, NextFunction } from 'express';

export const setAuthCookies = (req: Request, res: Response, next: NextFunction) => {
  const { accessToken, refreshToken } = req.body;

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 60 * 1000)
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) 
  });

  next();

  return res.status(200).json({ data: 'Tokens set in cookies' });
};
