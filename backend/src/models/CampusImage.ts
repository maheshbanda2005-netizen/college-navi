import mongoose, { Schema, Document } from 'mongoose';

export interface ICampusImage extends Document {
  universityId: mongoose.Types.ObjectId;
  category: 'logo' | 'cover' | 'campus' | 'hostel' | 'library' | 'lab' | 'sports' | 'auditorium' | 'classroom' | 'other';
  url: string;
  caption?: string;
  isPrimary: boolean;
  width?: number;
  height?: number;
  altText?: string;
}

const campusImageSchema = new Schema<ICampusImage>({
  universityId: { type: Schema.Types.ObjectId, ref: 'University', required: true },
  category: {
    type: String,
    enum: ['logo', 'cover', 'campus', 'hostel', 'library', 'lab', 'sports', 'auditorium', 'classroom', 'other'],
    required: true,
  },
  url: { type: String, required: true },
  caption: { type: String },
  isPrimary: { type: Boolean, default: false },
  width: { type: Number },
  height: { type: Number },
  altText: { type: String },
}, { timestamps: true });

campusImageSchema.index({ universityId: 1, category: 1 });

export const CampusImage = mongoose.model<ICampusImage>('CampusImage', campusImageSchema);

