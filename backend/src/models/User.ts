import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  password?: string;
  name: string;
  role: 'student' | 'parent' | 'university' | 'counselor' | 'admin';
  avatar?: string;
  phone?: string;
  isVerified: boolean;
  isActive: boolean;
  twoFactorEnabled: boolean;
  googleId?: string;
  microsoftId?: string;
  linkedinId?: string;
  refreshToken?: string;
  lastLogin?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, minlength: 8, select: false },
  name: { type: String, required: true, trim: true },
  role: { type: String, enum: ['student', 'parent', 'university', 'counselor', 'admin'], default: 'student' },
  avatar: { type: String },
  phone: { type: String },
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  twoFactorEnabled: { type: Boolean, default: false },
  googleId: { type: String },
  microsoftId: { type: String },
  linkedinId: { type: String },
  refreshToken: { type: String },
  lastLogin: { type: Date },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser>('User', userSchema);
