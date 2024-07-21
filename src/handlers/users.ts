import { Context } from 'hono';
import * as api from '../api/users';
import { SignupUserParameters, LoginInputParameters } from '../data/users';
import { SessionEnv } from '../types';

// Handler function to login a user
export async function loginUser(c: Context<SessionEnv, '/login'>) {
  const { email, password } = (await c.req.json()) as LoginInputParameters;
  console.log('Login handler called');

  try {
    const user = await api.LoginUser(email, password);

    // Get the session
    const session = c.get('session');

    // Set the user's ID in the session
    session.set('user', user);

    // Log the user ID and session details for debugging
    console.log(`User logged in: ${JSON.stringify(user)}`);
    console.log(`Session data: ${JSON.stringify(session)}`);

    return c.json(user);
  } catch (error: unknown) {
    console.log(JSON.stringify(error));
    c.status(401);
    return c.json({ message: (error as Error).message });
  }
}

// Handler function to signup a new user
export async function signupUser(c: Context<SessionEnv, '/signup'>) {
  const { username, email, password, theme } =
    (await c.req.json()) as SignupUserParameters;
  console.log('Signup handler called');

  try {
    const user = await api.SignUpUser(username, email, password, theme);

    // Get the session
    const session = c.get('session');

    // Set the user's ID in the session
    session.set('user', user);

    // Log the user ID and session details for debugging
    console.log(`User signed up: ${JSON.stringify(user)}`);
    console.log(`Session data: ${JSON.stringify(session)}`);

    return c.json(user);
  } catch (error: unknown) {
    c.status(400);
    return c.json({ message: (error as Error).message });
  }
}

// Handler function to logout a user
export async function logoutUser(c: Context<SessionEnv, '/logout'>) {
  console.log('Logout handler called');
  const session = c.get('session');

  session.deleteSession();

  console.log('User logged out');

  return c.json({ message: 'Logged out' });
}

// Handler function to check user authentication
export async function authUser(c: Context<SessionEnv, '/auth'>) {
  console.log('Auth check handler called');
  const session = c.get('session');

  const user = session.get('user');

  console.log(`Auth check. User in session: ${JSON.stringify(user)}`);

  if (!user) {
    c.status(401);
    return c.json({ message: 'User not authenticated' });
  }

  return c.json(user);
}
