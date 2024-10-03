import { Request, Response } from 'express';
import bcrypt = require("bcrypt")
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv'; 
import { generateAccessToken, generateRefreshToken } from '../../Middlewares/authVerify'; // Import token generation functions
import User from '../../Models/userModel';

dotenv.config(); 

const JWT_SECRET = process.env.JWT_SECRET || '';
const SALT_ROUNDS = process.env.SALT_ROUNDS || '10'; // Default to 10 if not provided

// Register User
export const registerUser = async (req: Request, res: Response): Promise<Response<any, Record<string, any>> | void> => {
  const { email, password, confirmPassword, role } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const saltRounds = parseInt(SALT_ROUNDS, 10); // Get salt rounds from environment variable
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({ email, password: hashedPassword, role });
    await user.save();

    return res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: 'Error registering user', error });
  }
};

// Login User
export const loginUser = async (req: Request, res: Response): Promise<Response<any, Record<string, any>> | void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie('refreshToken', refreshToken, { httpOnly: true });

    return res.status(200).json({ message: 'Login successful', accessToken, refreshToken, user });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
