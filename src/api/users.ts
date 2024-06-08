import { User } from '../types';
import {
  getUser as getUserFromDB,
  loginUser as loginUserFromDB,
  signupUser as signupUserFromDB,
} from './users'; // Make sure to import from the correct file

export async function getUser(user_id: number): Promise<User> {
  const user: User | null = await getUserFromDB(user_id);
  if (user) {
    return user;
  } else {
    throw new Error('User not found');
  }
}

export async function loginUser(
  email: string,
  password: string
): Promise<User> {
  const user: User | null = await loginUserFromDB(email, password);
  if (user) {
    return user;
  } else {
    throw new Error('Invalid email or password');
  }
}

export async function signupUser(
  username: string,
  email: string,
  password: string,
  theme: string
): Promise<User> {
  try {
    const newUser: User = await signupUserFromDB(
      username,
      email,
      password,
      theme
    );
    return newUser;
  } catch (error) {
    throw error;
  }
}
