import bcrypt from 'bcryptjs';
import User, { IUser } from '@/lib/models/User';
import { connectToDatabase } from '@/lib/db/mongoose';
import { decrypt } from '@/lib/utils/encryption';

// Connect to MongoDB
connectToDatabase();

/**
 * Get a user by email
 */
export async function getUserByEmail(email: string) {
  try {
    // Find a user with the encrypted email
    const users = await User.find({});
    
    // We need to decrypt and compare emails manually due to encryption
    for (const user of users) {
      if (decrypt(user.email) === email.toLowerCase()) {
        return user.toObject();
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error getting user by email:', error);
    throw error;
  }
}

/**
 * Get a user by ID
 */
export async function getUserById(id: string) {
  try {
    const user = await User.findById(id);
    return user ? user.toObject() : null;
  } catch (error) {
    console.error('Error getting user by ID:', error);
    throw error;
  }
}

/**
 * Create a new user
 */
export async function createUser(userData: Partial<IUser>) {
  try {
    // Check if user with email already exists
    const existingUser = await getUserByEmail(userData.email || '');
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(userData.password || '', 10);

    // Create the user
    const newUser = await User.create({
      ...userData,
      password: hashedPassword,
    });

    // Return user without sensitive information
    const { password, ...userWithoutPassword } = newUser.toObject();
    return userWithoutPassword;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

/**
 * Update a user
 */
export async function updateUser(id: string, userData: Partial<IUser>) {
  try {
    // Don't allow password updates through this function
    const { password, ...dataWithoutPassword } = userData;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { ...dataWithoutPassword },
      { new: true, runValidators: true }
    );

    return updatedUser ? updatedUser.toObject() : null;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

/**
 * Change a user's password
 */
export async function changePassword(id: string, newPassword: string) {
  try {
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true }
    );

    return updatedUser ? true : false;
  } catch (error) {
    console.error('Error changing password:', error);
    throw error;
  }
} 