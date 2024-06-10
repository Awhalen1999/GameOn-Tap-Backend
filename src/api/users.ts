import { User } from '../types';
import {
  LoginUser as loginUserFromDB,
  SignupUser as signupUserFromDB,
} from '../data/users';

export async function LoginUser(
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

export async function SignupUser(
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
