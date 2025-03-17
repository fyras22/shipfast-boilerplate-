import mongoose, { Schema, Document, Model } from 'mongoose';
import { encrypt, decrypt } from '@/lib/utils/encryption';

export interface IUser extends Document {
  name: string;
  email: string;
  emailVerified?: Date;
  password: string;
  image?: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

// Create a schema that defines the structure of User
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [60, 'Name cannot be more than 60 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      // Simple email regex
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
      // Use the encryption methods for sensitive fields
      set: function(email: string) {
        return encrypt(email);
      },
      get: function(email: string) {
        return decrypt(email);
      },
    },
    emailVerified: {
      type: Date,
      default: null,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
    },
    image: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
    // Make Mongoose use virtuals
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true },
  }
);

// Indexes for faster query processing
userSchema.index({ email: 1 });

// Prevent re-creating the model if it already exists
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User; 