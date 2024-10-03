import { Request, Response } from 'express';
import { generateAccessToken, refreshToken } from '../../Helpers/tokenHelper'; 

// Route to refresh access token
export const refreshAccessToken = (req: Request, res: Response) => {
    const refreshTokenFromCookie = req.cookies.refreshToken; 
    if (!refreshTokenFromCookie) return res.sendStatus(401); 

    const newAccessToken = refreshToken(refreshTokenFromCookie);
    if (!newAccessToken) return res.sendStatus(403); 

    res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000, 
    });

    return res.json({ message: 'Access token refreshed', accessToken: newAccessToken }); // Respond with success message
};
