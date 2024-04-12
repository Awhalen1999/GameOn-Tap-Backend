import { Context, Env } from 'hono';
import { BlankInput } from 'hono/types';
import * as api from '../api/rulesets';

// Handler function to get all rulesets for a specific game
export async function getUserGameRulesets(
  c: Context<Env, '/:userId/:gameId/rulesets', BlankInput>
) {
  const gameId = c.req.param('gameId');

  try {
    const rulesets = await api.getRulesets(gameId);
    return c.json(rulesets);
  } catch (error: unknown) {
    c.status(404);
    return c.json({ message: (error as Error).message });
  }
}
