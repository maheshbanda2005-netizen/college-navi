import mongoose, { Schema, Document } from 'mongoose';

export interface ICutoff extends Document {
  universityId: mongoose.Types.ObjectId;
  courseId?: mongoose.Types.ObjectId;
  course: string;
  degree: string;
  department: string;
  year: number;
  round: number;
  quota: 'General' | 'Home State' | 'All India' | 'Other State';
  category: 'General' | 'OBC' | 'SC' | 'ST' | 'EWS' | 'PWD';
  gender: 'Male' | 'Female' | 'All';
  closingRank: number;
  openingRank?: number;
  examName: string;
}

const cutoffSchema = new Schema<ICutoff>({
  universityId: { type: Schema.Types.ObjectId, ref: 'University', required: true },
  courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
  course: { type: String, required: true },
  degree: { type: String, required: true },
  department: { type: String, required: true },
  year: { type: Number, required: true },
  round: { type: Number, required: true },
  quota: { type: String, enum: ['General', 'Home State', 'All India', 'Other State'], default: 'General' },
  category: {
    type: String,
    enum: ['General', 'OBC', 'SC', 'ST', 'EWS', 'PWD'],
    required: true,
  },
  gender: { type: String, enum: ['Male', 'Female', 'All'], default: 'All' },
  closingRank: { type: Number, required: true },
  openingRank: { type: Number },
  examName: { type: String, required: true },
}, { timestamps: true });

cutoffSchema.index({ universityId: 1, course: 1, year: -1, round: 1 });
cutoffSchema.index({ examName: 1, year: -1, category: 1 });

export const Cutoff = mongoose.model<ICutoff>('Cutoff', cutoffSchema);

