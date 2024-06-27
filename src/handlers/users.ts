import { Context, Env } from 'hono';
import * as api from '../api/users';
import { SignupUserParameters, LoginInputParameters } from '../data/users';
import { SessionEnv } from '../types';

// Handler function to login a user
export async function loginUser(c: Context<SessionEnv, '/login'>) {
  const { email, password } = (await c.req.json()) as LoginInputParameters;

  const session = c.get('session');

  session.get('user_id');

  console.log(`user is ${session.get('user_id')}`);

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
