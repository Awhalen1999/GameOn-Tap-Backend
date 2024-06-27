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

export async function LoginUser(
  email: string,
  password: string
): Promise<User> {
  const user: User | null = await loginUserFromDB({ email });
  if (user && checkPassword(password, user.password)) {
    return user;
  } else {
    throw new Error('Invalid email or password');
  }
}

export async function SignUpUser(
  username: string,
  email: string,
  password: string,
  theme: string
): Promise<User> {
  const hashedPassword = hashPassword(password);
  try {
    const newUser = await signUpUserFromDB({
      username,
      email,
      password: hashedPassword,
      theme,
    });
    return newUser;
  } catch (error) {
    throw error;
  }
}
