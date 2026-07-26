import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  universityId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  pros?: string;
  cons?: string;
  isVerified: boolean;
}

const reviewSchema = new Schema<IReview>({
  universityId: { type: Schema.Types.ObjectId, ref: 'University', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  pros: { type: String },
  cons: { type: String },
  isVerified: { type: Boolean, default: false },
}, { timestamps: true });

reviewSchema.index({ universityId: 1, userId: 1 }, { unique: true });

export const Review = mongoose.model<IReview>('Review', reviewSchema);
