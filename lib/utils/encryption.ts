import CryptoJS from 'crypto-js';

// Environment variables check
if (!process.env.ENCRYPTION_KEY) {
  throw new Error('Missing environment variable: ENCRYPTION_KEY');
}

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

/**
 * Encrypts a string using AES-256 encryption
 * 
 * @param text - The string to encrypt
 * @returns The encrypted string
 */
export function encrypt(text: string): string {
  if (!text) return '';
  return CryptoJS.AES.encrypt(text, ENCRYPTION_KEY).toString();
}

/**
 * Decrypts an encrypted string using AES-256 encryption
 * 
 * @param encryptedText - The encrypted string to decrypt
 * @returns The decrypted string
 */
export function decrypt(encryptedText: string): string {
  if (!encryptedText) return '';
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedText, ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Decryption error:', error);
    return '';
  }
} 