import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
  universityId: mongoose.Types.ObjectId; name: string; degree: string;
  department: string; specialization?: string; eligibility: string;
  duration: string; seats: number; feeStructure: {
    tuitionFee: number; hostelFee?: number; livingCost?: number;
    otherFees?: number; totalFee?: number;
  };
  curriculum?: string; syllabusPdf?: string; credits?: number;
  isActive: boolean;
}

const courseSchema = new Schema<ICourse>({
  universityId: { type: Schema.Types.ObjectId, ref: 'University', required: true },
  name: { type: String, required: true },
  degree: { type: String, required: true },
  department: { type: String, required: true },
  specialization: { type: String },
  eligibility: { type: String, required: true },
  duration: { type: String, required: true },
  seats: { type: Number, required: true },
  feeStructure: {
    tuitionFee: { type: Number, required: true },
    hostelFee: { type: Number }, livingCost: { type: Number },
    otherFees: { type: Number }, totalFee: { type: Number },
  },
  curriculum: { type: String }, syllabusPdf: { type: String },
  credits: { type: Number },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const Course = mongoose.model<ICourse>('Course', courseSchema);
