import mongoose, { Schema, Document } from 'mongoose';

export interface IRanking {
  nirf?: number;
  qs?: number;
  naacGrade?: string;
  nbaAccreditation?: boolean;
}

export interface ICollegeScore {
  overall?: number;
  placement?: number;
  roi?: number;
  research?: number;
  infrastructure?: number;
  studentSatisfaction?: number;
}

export interface ISocialLinks {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  youtube?: string;
}

export interface IUniversity extends Document {
  name: string;
  shortName?: string;
  collegeCode?: string;
  aicteInstituteId?: string;
  ugcId?: string;
  logo?: string;
  coverImage?: string;
  description: string;
  establishmentYear: number;
  collegeType: string;
  ownership: string;
  accreditation: string;
  ranking: IRanking;
  aiScore: ICollegeScore;
  campusArea?: string;
  country: string;
  state: string;
  city: string;
  district?: string;
  mandal?: string;
  village?: string;
  address?: string;
  pinCode?: string;
  googleMapsCoordinates?: { lat: number; lng: number };
  googleMapsUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
  admissionCell?: string;
  website?: string;
  socialLinks: ISocialLinks;
  isoCertification?: string;
  affiliatedUniversity?: string;
  facilities: string[];
  isVerified: boolean;
  createdBy?: mongoose.Types.ObjectId;
}

const universitySchema = new Schema<IUniversity>({
  name: { type: String, required: true, trim: true },
  shortName: { type: String },
  collegeCode: { type: String },
  aicteInstituteId: { type: String },
  ugcId: { type: String },
  logo: { type: String },
  coverImage: { type: String },
  description: { type: String, required: true },
  establishmentYear: { type: Number },
  collegeType: {
    type: String,
    enum: ['Engineering', 'University', 'Pharmacy', 'MBA/MCA', 'Polytechnic', 'Degree', 'Medical', 'Law', 'Architecture', 'Agriculture'],
  },
  ownership: {
    type: String,
    enum: ['Government', 'Private', 'Public-Private', 'Deemed', 'Autonomous', 'Central University', 'State University'],
  },
  accreditation: { type: String },
  ranking: {
    nirf: { type: Number },
    qs: { type: Number },
    naacGrade: { type: String },
    nbaAccreditation: { type: Boolean, default: false },
  },
  aiScore: {
    overall: { type: Number, default: 0 },
    placement: { type: Number, default: 0 },
    roi: { type: Number, default: 0 },
    research: { type: Number, default: 0 },
    infrastructure: { type: Number, default: 0 },
    studentSatisfaction: { type: Number, default: 0 },
  },
  campusArea: { type: String },
  country: { type: String, default: 'India' },
  state: { type: String },
  city: { type: String },
  district: { type: String },
  mandal: { type: String },
  village: { type: String },
  address: { type: String },
  pinCode: { type: String },
  googleMapsCoordinates: {
    lat: { type: Number },
    lng: { type: Number },
  },
  googleMapsUrl: { type: String },
  contactEmail: { type: String },
  contactPhone: { type: String },
  admissionCell: { type: String },
  website: { type: String },
  socialLinks: {
    facebook: { type: String },
    twitter: { type: String },
    linkedin: { type: String },
    instagram: { type: String },
    youtube: { type: String },
  },
  isoCertification: { type: String },
  affiliatedUniversity: { type: String },
  facilities: [{ type: String }],
  isVerified: { type: Boolean, default: false },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

universitySchema.index({ name: 'text', description: 'text', country: 1, state: 1, city: 1, district: 1, collegeType: 1 });

export const University = mongoose.model<IUniversity>('University', universitySchema);
