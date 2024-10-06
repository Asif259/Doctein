import { Document } from "mongoose";
import mongoose = require("mongoose");

const { Schema } = mongoose;

interface IUser extends Document {
  email: string;
  password: string;
  role: "doctor" | "staff" | "patient";
  userId: mongoose.Schema.Types.ObjectId;
  reset: {
    otp: string | null;
    attempt: number;
    lastReset: Date | string | null;
  };
  
  active: boolean; 
}

const userSchema = new mongoose.Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["doctor", "staff", "patient"],
    },
    userId: {
      type: Schema.Types.ObjectId,
    },
    reset: {
      otp: { type: String, default: null },
      attempt: { type: Number, default: 0 },
      lastReset: { type: Date, default: null },
    },
    active: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export = mongoose.model<IUser>("User", userSchema);
