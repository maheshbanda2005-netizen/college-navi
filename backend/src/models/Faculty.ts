import mongoose, { Schema, Document } from 'mongoose';

export interface IFaculty extends Document {
  universityId: mongoose.Types.ObjectId;
  name: string;
  department: string;
  designation: string;
  qualification: string;
  specialization?: string;
  experience: number;
  email?: string;
  phone?: string;
  photoUrl?: string;
  isHod: boolean;
  joiningYear?: number;
}

const facultySchema = new Schema<IFaculty>({
  universityId: { type: Schema.Types.ObjectId, ref: 'University', required: true },
  name: { type: String, required: true },
  department: { type: String, required: true },
  designation: {
    type: String,
    enum: ['Professor', 'Associate Professor', 'Assistant Professor', 'Lecturer', 'Teaching Assistant', 'Dean', 'HOD', 'Director'],
    required: true,
  },
  qualification: { type: String, required: true },
  specialization: { type: String },
  experience: { type: Number, required: true },
  email: { type: String },
  phone: { type: String },
  photoUrl: { type: String },
  isHod: { type: Boolean, default: false },
  joiningYear: { type: Number },
}, { timestamps: true });

facultySchema.index({ universityId: 1, department: 1 });

export const Faculty = mongoose.model<IFaculty>('Faculty', facultySchema);

