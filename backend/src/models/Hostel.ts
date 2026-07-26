import mongoose, { Schema, Document } from 'mongoose';

export interface IHostel extends Document {
  universityId: mongoose.Types.ObjectId;
  name: string;
  type: 'boys' | 'girls' | 'co-ed';
  capacity: number;
  roomsAvailable: number;
  feesPerYear: number;
  facilities: string[];
  messAvailable: boolean;
  wifiAvailable: boolean;
  acAvailable: boolean;
  rating?: number;
  contactNumber?: string;
  wardenName?: string;
  description?: string;
}

const hostelSchema = new Schema<IHostel>({
  universityId: { type: Schema.Types.ObjectId, ref: 'University', required: true },
  name: { type: String, required: true },
  type: { type: String, enum: ['boys', 'girls', 'co-ed'], required: true },
  capacity: { type: Number, required: true },
  roomsAvailable: { type: Number },
  feesPerYear: { type: Number, required: true },
  facilities: [{ type: String }],
  messAvailable: { type: Boolean, default: true },
  wifiAvailable: { type: Boolean, default: false },
  acAvailable: { type: Boolean, default: false },
  rating: { type: Number, min: 1, max: 5 },
  contactNumber: { type: String },
  wardenName: { type: String },
  description: { type: String },
}, { timestamps: true });

hostelSchema.index({ universityId: 1 });

export const Hostel = mongoose.model<IHostel>('Hostel', hostelSchema);

