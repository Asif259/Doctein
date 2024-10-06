import { Schema, Document, model } from "mongoose";

interface IStaff extends Document {
  doctorId: string | Schema.Types.ObjectId;
  name: string;
  phone: string;
  userId: Schema.Types.ObjectId;
}

const staffSchema = new Schema<IStaff>({
  doctorId: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  userId: {
    type: Schema.Types.ObjectId,
    unique: true,
    required: true,
  },
});

export default model<IStaff>("Staff", staffSchema);
