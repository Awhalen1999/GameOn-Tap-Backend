import { Context, Env } from 'hono';
import { BlankInput } from 'hono/types';
import * as api from '../api/users';
import { LoginInput, SignupInput } from '../types';

// Handler function to get a specific user by its ID
export async function getUser(c: Context<Env, '/:user_id'>) {
  const user_id = c.req.param('user_id');

  const userIdNum = parseInt(user_id);

  try {
    const user = await api.getUser(userIdNum);
    return c.json(user);
  } catch (error: unknown) {
    c.status(404);
    return c.json({ message: (error as Error).message });
  }
}

// Handler function to login a user
export async function loginUser(c: Context<Env, '/login'>) {
  const { email, password } = (await c.req.json()) as LoginInput;

  try {
    const user = await api.loginUser(email, password);
    return c.json(user);
  } catch (error: unknown) {
    c.status(401);
    return c.json({ message: (error as Error).message });
  }
}

// Handler function to signup a new user
export async function signupUser(c: Context<Env, '/signup'>) {
  const { username, email, password, theme } =
    (await c.req.json()) as SignupInput;

  try {
    const user = await api.signupUser(username, email, password, theme);
    return c.json(user);
  } catch (error: unknown) {
    c.status(400);
    return c.json({ message: (error as Error).message });
  }
}
