import { Request, Response } from 'express';
import { User } from '../models/User';
import { generateToken, generateRefreshToken, AuthRequest } from '../middleware/auth';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }
    const user = await User.create({ name, email, password, role });
    const token = generateToken({ id: user._id.toString(), email: user.email, role: user.role });
    const refreshToken = generateRefreshToken({ id: user._id.toString(), email: user.email, role: user.role });
    user.refreshToken = refreshToken;
    await user.save();
    res.status(201).json({
      success: true,
      message: 'Registration successful. Please verify your email.',
      data: { user: { id: user._id, name: user.name, email: user.email, role: user.role }, token, refreshToken },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    if (!user.isActive) {
      return res.status(403).json({ success: false, message: 'Account deactivated' });
    }
    const token = generateToken({ id: user._id.toString(), email: user.email, role: user.role });
    const refreshToken = generateRefreshToken({ id: user._id.toString(), email: user.email, role: user.role });
    user.refreshToken = refreshToken;
    user.lastLogin = new Date();
    await user.save();
    res.json({
      success: true,
      data: {
        user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar, isVerified: user.isVerified },
        token, refreshToken,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, data: user });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const allowedFields = ['name', 'phone', 'avatar'];
    const updates: any = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    }
    const user = await User.findByIdAndUpdate(req.user?.id, updates, { new: true });
    res.json({ success: true, data: user });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
