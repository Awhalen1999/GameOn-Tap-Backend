import { Context, Env } from 'hono';
import * as api from '../api/users';
import { SignupUserParameters, LoginInputParameters } from '../data/users';
import { SessionEnv } from '../types';

// Handler function to login a user
export async function loginUser(c: Context<SessionEnv, '/login'>) {
  const { email, password } = (await c.req.json()) as LoginInputParameters;

  try {
    const user = await api.LoginUser(email, password);

    // Get the session
    const session = c.get('session');

    // Set the user's ID in the session
    session.set('user_id', user.user_id);

    // Log the user ID
    console.log(`user is ${session.get('user_id')}`);

    return c.json(user);
  } catch (error: unknown) {
    c.status(401);
    return c.json({ message: (error as Error).message });
  }
}

// Handler function to signup a new user
export async function signupUser(c: Context<SessionEnv, '/signup'>) {
  const { username, email, password, theme } =
    (await c.req.json()) as SignupUserParameters;

  try {
    const user = await api.SignUpUser(username, email, password, theme);

    // Get the session
    const session = c.get('session');

    // Set the user's ID in the session
    session.set('user_id', user.user_id);

    // Log the user ID
    console.log(`user is ${session.get('user_id')}`);

    return c.json(user);
  } catch (error: unknown) {
    c.status(400);
    return c.json({ message: (error as Error).message });
  }
}
