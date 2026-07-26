import mongoose, { Schema, Document } from 'mongoose';

export interface ISalaryTrend {
  year: number;
  averagePackage: number;
  highestPackage: number;
}

export interface IPlacement extends Document {
  universityId: mongoose.Types.ObjectId;
  highestPackage: number;
  averagePackage: number;
  medianPackage?: number;
  placementRate: number;
  batchYear: number;
  totalStudents: number;
  studentsPlaced: number;
  topRecruiters: string[];
  internshipPartners: string[];
  salaryTrends: ISalaryTrend[];
  placementHighlights?: string;
}

const placementSchema = new Schema<IPlacement>({
  universityId: { type: Schema.Types.ObjectId, ref: 'University', required: true },
  highestPackage: { type: Number, required: true },
  averagePackage: { type: Number, required: true },
  medianPackage: { type: Number },
  placementRate: { type: Number, required: true },
  batchYear: { type: Number, required: true },
  totalStudents: { type: Number },
  studentsPlaced: { type: Number },
  topRecruiters: [{ type: String }],
  internshipPartners: [{ type: String }],
  salaryTrends: [{
    year: { type: Number },
    averagePackage: { type: Number },
    highestPackage: { type: Number },
  }],
  placementHighlights: { type: String },
}, { timestamps: true });

placementSchema.index({ universityId: 1, batchYear: -1 });

export const Placement = mongoose.model<IPlacement>('Placement', placementSchema);

