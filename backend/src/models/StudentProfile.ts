import mongoose, { Schema, Document } from 'mongoose';

export interface IStudentProfile extends Document {
  userId: mongoose.Types.ObjectId;
  academicHistory: {
    tenthMarks: number; twelfthMarks: number; ugCGPA?: number;
    entranceScore?: number; entranceExam?: string;
    reservation?: string; category?: string; workExperience?: number;
  };
  gpa?: number;
  marks?: number;
  skills: string[];
  certificates: string[];
  projects: { title: string; description: string; technologies: string[]; link?: string }[];
  resume?: string;
  interests: string[];
  budget?: number;
  preferredCountries: string[];
  preferredStates: string[];
  preferredCities: string[];
  preferredCourses: string[];
  careerGoal?: string;
  languages: string[];
}

const studentProfileSchema = new Schema<IStudentProfile>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  academicHistory: {
    tenthMarks: { type: Number }, twelfthMarks: { type: Number },
    ugCGPA: { type: Number }, entranceScore: { type: Number },
    entranceExam: { type: String }, reservation: { type: String },
    category: { type: String }, workExperience: { type: Number },
  },
  gpa: { type: Number }, marks: { type: Number },
  skills: [{ type: String }],
  certificates: [{ type: String }],
  projects: [{
    title: { type: String }, description: { type: String },
    technologies: [{ type: String }], link: { type: String },
  }],
  resume: { type: String },
  interests: [{ type: String }],
  budget: { type: Number },
  preferredCountries: [{ type: String }],
  preferredStates: [{ type: String }],
  preferredCities: [{ type: String }],
  preferredCourses: [{ type: String }],
  careerGoal: { type: String },
  languages: [{ type: String }],
}, { timestamps: true });

export const StudentProfile = mongoose.model<IStudentProfile>('StudentProfile', studentProfileSchema);
