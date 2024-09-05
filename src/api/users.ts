import { User } from '../types';
import {
  LoginUser as loginUserFromDB,
  SignupUser as signUpUserFromDB,
} from '../data/users';
import crypto from 'crypto';

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');
  return [salt, hash].join('$');
}

function checkPassword(password: string, hash: string): boolean {
  const [salt, originalHash] = hash.split('$');
  const passwordHash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');
  return passwordHash === originalHash;
}

export type UserWithoutPassword = Omit<User, 'password'>;

// API function to login a user, now returns UserWithoutPassword
export async function LoginUser(
  email: string,
  password: string
): Promise<UserWithoutPassword> {
  const user: User | null = await loginUserFromDB({ email });
  if (user && checkPassword(password, user.password)) {
    // Exclude the password field before returning the user after checking the password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword; // return UserWithoutPassword
  } else {
    throw new Error('Invalid email or password');
  }
}

// API function to signup a new user, now returns UserWithoutPassword
export async function SignUpUser(
  username: string,
  email: string,
  password: string
): Promise<UserWithoutPassword> {
  const hashedPassword = hashPassword(password);
  try {
    const newUser = await signUpUserFromDB({
      username,
      email,
      password: hashedPassword,
    });

    // Exclude the password field before returning the user
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword; // return UserWithoutPassword
  } catch (error) {
    throw error;
  }
}
