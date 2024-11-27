import { Document, Schema, model } from "mongoose";

interface IDoctor extends Document {
  profileImage?: string;
  name: string;
  degrees: string[];
  designation: string;
  specialization: string;
  phone: string[];
  bmdcNumber: string;
  digitalSignature: string;
}

const doctorSchema = new Schema<IDoctor>({
  profileImage: String,
  name: {
    type: String,
    required: true,
  },
  degrees: {
    type: [String], 
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  phone: {
    type: [String],
    required: true,  
  },
  bmdcNumber: {
    type: String,
    required: true,
  },
  digitalSignature: {
    type: String, 
    required: true,
  },
});

export default model<IDoctor>("Doctor", doctorSchema);
