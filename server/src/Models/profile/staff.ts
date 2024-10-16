import mongoose, { Schema, Document, model } from "mongoose";

interface IStaff extends Document {
    name: string;
    phone: string;
    address: string;
    status: "active" | "inactive" | "vacation";
    doctorId: mongoose.Types.ObjectId;
}

const staffSchema = new Schema<IStaff>(
    {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        status: { type: String, required: true, enum: ["active", "inactive", "vacation"] },
        doctorId: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
    },
    { timestamps: true }
);

export default model<IStaff>("Staff", staffSchema);
