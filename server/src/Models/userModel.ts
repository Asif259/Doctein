import { Document } from 'mongoose';
import mongoose = require('mongoose');

const { Schema, Model } = mongoose;

interface IUser extends Document {
  email: string;
  password: string;
  role: 'doctor' | 'staff' | 'patient';
  userId: mongoose.Schema.Types.ObjectId;
  reset: {
    otp: string;
    attempt: number;
    lastReset: Date;
  };
}

const userSchema = new mongoose.Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ['doctor', 'staff', 'patient'],
    },
    userId: {
      type: Schema.Types.ObjectId,
    },
    reset: {
      otp: { type: String },
      attempt: { type: Number, default: 0 },
      lastReset: { type: Date },
    },
  },
  { timestamps: true }
);

export = mongoose.model<IUser>('User', userSchema);
