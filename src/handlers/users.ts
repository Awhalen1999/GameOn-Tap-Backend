import { Context, Env } from 'hono';
import { BlankInput } from 'hono/types';
import * as api from '../api/users';

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
