import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  email: string;
  password: string;
  role: 'Doctor' | 'Staff' | 'Patient';
  userId: Schema.Types.ObjectId;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    required: true, 
    enum: ['Doctor', 'Staff', 'Patient']  
  },
  userId: {
    type: Schema.Types.ObjectId,
  }
}, { timestamps: true });

export default model<IUser>('User', userSchema);
