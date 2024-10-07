import { Document, Schema, model } from "mongoose";

interface IDoctor extends Document {
  name: string;
  phone: string;
  userId: Schema.Types.ObjectId;
  specialization: string;
  experience: string;
  qualification: string;
  consultationFee: number;
  chamber: [
    {
      address: string;
      consultingHours: Date;
    },
  ];
}

const doctorSchema = new Schema<IDoctor>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    userId: {
      type: Schema.Types.ObjectId,
      unique: true,
      required: true,
    },
    specialization: { type: String, required: true },
    experience: { type: String, required: true },
    qualification: { type: String, required: true },
    consultationFee: { type: Number, required: true },
    chamber: [
      {
        address: String,
        consultingHours: Date,
      },
    ],
  },
  { timestamps: true },
);

export default model<IDoctor>("Doctor", doctorSchema);
