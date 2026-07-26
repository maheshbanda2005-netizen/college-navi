import mongoose, { Schema, Document } from 'mongoose';

export interface IApplication extends Document {
  userId: mongoose.Types.ObjectId;
  universityId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  status: 'submitted' | 'document_verification' | 'review' | 'interview' | 'selected' | 'admitted' | 'rejected';
  documents: { name: string; url: string; verified: boolean }[];
  feePaid: boolean;
  feeAmount?: number;
  offerLetter?: string;
  remarks?: string;
  reviewedBy?: mongoose.Types.ObjectId;
}

const applicationSchema = new Schema<IApplication>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  universityId: { type: Schema.Types.ObjectId, ref: 'University', required: true },
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  status: {
    type: String,
    enum: ['submitted', 'document_verification', 'review', 'interview', 'selected', 'admitted', 'rejected'],
    default: 'submitted',
  },
  documents: [{ name: { type: String }, url: { type: String }, verified: { type: Boolean, default: false } }],
  feePaid: { type: Boolean, default: false },
  feeAmount: { type: Number },
  offerLetter: { type: String },
  remarks: { type: String },
  reviewedBy: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export const Application = mongoose.model<IApplication>('Application', applicationSchema);
