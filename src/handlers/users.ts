import { Context } from 'hono';
import { LoginUser, SignUpUser } from '../api/users';
import { SessionEnv } from '../types';

// Handler function to login a user
export async function loginUser(c: Context<SessionEnv, '/login'>) {
  const { email, password } = (await c.req.json()) as {
    email: string;
    password: string;
  };

  try {
    const user = await LoginUser(email, password);

    // Set user data in session
    const session = c.get('session');
    session.set('user', {
      user_id: user.user_id,
      email: user.email,
      username: user.username,
      theme: user.theme,
    });

    console.log(`User logged in: ${JSON.stringify(session.get('user'))}`);

    return c.json(user);
  } catch (error) {
    console.log(`Login error: ${(error as Error).message}`);
    c.status(401);
    return c.json({ message: 'Invalid email or password' });
  }
}

// Handler function to signup a new user
export async function signupUser(c: Context<SessionEnv, '/signup'>) {
  const { username, email, password, theme } = (await c.req.json()) as {
    username: string;
    email: string;
    password: string;
    theme: string;
  };

  try {
    const user = await SignUpUser(username, email, password, theme);

    // Set user data in session
    const session = c.get('session');
    session.set('user', {
      user_id: user.user_id,
      email: user.email,
      username: user.username,
      theme: user.theme,
    });

    console.log(`User signed up: ${JSON.stringify(session.get('user'))}`);

    return c.json(user);
  } catch (error) {
    console.log(`Signup error: ${(error as Error).message}`);
    c.status(400);
    return c.json({ message: (error as Error).message });
  }
}

// Handler function to logout a user
export async function logoutUser(c: Context<SessionEnv, '/logout'>) {
  const session = c.get('session');
  session.deleteSession();

  console.log('User logged out, session cleared');

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
