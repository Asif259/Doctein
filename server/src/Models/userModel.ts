import { Document } from 'mongoose';
import mongoose = require('mongoose');

const { Schema, Model } = mongoose;

interface IUser extends Document {
  email: string;
  password: string;
  role: 'Doctor' | 'Staff' | 'Patient';
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
      enum: ['Doctor', 'Staff', 'Patient'],
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
