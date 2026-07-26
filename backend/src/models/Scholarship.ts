import mongoose, { Schema, Document } from 'mongoose';

export interface IScholarship extends Document {
  name: string; provider: string; amount: string; description: string;
  eligibility: {
    minIncome?: number; maxIncome?: number; category?: string;
    gender?: string; state?: string; minMarks?: number;
    disability?: boolean; sports?: boolean; minorityStatus?: boolean;
  };
  deadline: Date; documentChecklist: string[];
  category: string; isActive: boolean; applicationLink?: string;
}

const scholarshipSchema = new Schema<IScholarship>({
  name: { type: String, required: true }, provider: { type: String, required: true },
  amount: { type: String, required: true }, description: { type: String, required: true },
  eligibility: {
    minIncome: { type: Number }, maxIncome: { type: Number },
    category: { type: String }, gender: { type: String },
    state: { type: String }, minMarks: { type: Number },
    disability: { type: Boolean }, sports: { type: Boolean },
    minorityStatus: { type: Boolean },
  },
  deadline: { type: Date, required: true },
  documentChecklist: [{ type: String }],
  category: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  applicationLink: { type: String },
}, { timestamps: true });

export const Scholarship = mongoose.model<IScholarship>('Scholarship', scholarshipSchema);
