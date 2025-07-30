// models/User.ts
import Joi from 'joi';
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  role: string;
  bio?: string;
  firstName: string;
  lastName: string;
  fullName: string;
  profileImage?: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: mongoose.Types.ObjectId;
  updatedBy?: mongoose.Types.ObjectId;
}

export const ValidateUpdateUserProfile = Joi.object({
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
  role: Joi.string().valid('admin', 'user').optional(),
  bio: Joi.string().optional(),
  fullName: Joi.string().optional(),
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  profileImage: Joi.string().uri().optional(),
  phone: Joi.string().optional(),
  updatedBy: Joi.string().optional(),
  updatedAt: Joi.date().optional(),
});

const UserSchema = new Schema<IUser>({
  email: { type: String, unique: true },
  password: { type: String, select: true },
  role: { type: String, required: true },
  bio: { type: String, default: '' },
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  fullName: { type: String, default: '' },
  profileImage: { type: String, default: '' },
  phone: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now(), select: true },
  updatedAt: { type: Date, default: Date.now(), select: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: false },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'User', required: false },
});

UserSchema.set("collection", "users");

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

