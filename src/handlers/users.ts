import { Context, Env } from 'hono';
import { BlankInput } from 'hono/types';
import * as api from '../api/users';
import { LoginInput, SignupInput } from '../types';

// Handler function to get a specific user by its ID
export async function getUser(c: Context<Env, '/:userId', BlankInput>) {
  const userId = c.req.param('userId');

  try {
    const user = await api.getUser(userId);
    return c.json(user);
  } catch (error: unknown) {
    c.status(404);
    return c.json({ message: (error as Error).message });
  }
}

// Handler function to login a user
export async function loginUser(c: Context<Env, '/login', LoginInput>) {
  const { email, password } = c.req.body;

  try {
    const user = await api.loginUser(email, password);
    return c.json(user);
  } catch (error: unknown) {
    c.status(401);
    return c.json({ message: (error as Error).message });
  }
}

// Handler function to signup a new user
export async function signupUser(c: Context<Env, '/signup', SignupInput>) {
  const { username, email, password } = c.req.body;

  try {
    const user = await api.signupUser(username, email, password);
    return c.json(user);
  } catch (error: unknown) {
    c.status(400);
    return c.json({ message: (error as Error).message });
  }
}
