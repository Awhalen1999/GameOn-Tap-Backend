import { Context, Env } from 'hono';
import { BlankInput } from 'hono/types';
import * as api from '../api/users';
import { SignupUserParameters, LoginInputParameters } from '../data/users';

// Handler function to login a user
export async function loginUser(c: Context<Env, '/login'>) {
  const { email, password } = (await c.req.json()) as LoginInputParameters;

  try {
    const user = await api.LoginUser(email, password);
    return c.json(user);
  } catch (error: unknown) {
    c.status(401);
    return c.json({ message: (error as Error).message });
  }
}

// Handler function to signup a new user
export async function signupUser(c: Context<Env, '/signup'>) {
  const { username, email, password, theme } =
    (await c.req.json()) as SignupUserParameters;

  try {
    const user = await api.SignUpUser(username, email, password, theme);
    return c.json(user);
  } catch (error: unknown) {
    c.status(400);
    return c.json({ message: (error as Error).message });
  }
}
