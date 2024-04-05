import { Context, Env } from 'hono';
import { BlankInput } from 'hono/types';
import * as api from '../api/games';

export async function getAllGames(c: Context<Env, '/', BlankInput>) {
  const games = await api.getGames();
  return c.json(games);
}

export async function getGame(c: Context<Env, '/:gameid', BlankInput>) {
  const gameId = c.req.param('gameid');

  try {
    const game = await api.getGame(gameId);

    return c.json(game);
  } catch (error: unknown) {
    c.status(404);

    return c.json({ message: (error as Error).message });
  }
}

export async function getActiveRuleset(
  c: Context<Env, '/:gameid/rulesets/:activeRulesets', BlankInput>
) {
  const gameId = c.req.param('gameid');
  const activeRulesets = c.req.param('activeRulesets');

  try {
    await api.getGameActiveRuleset(gameId, activeRulesets);
    return c.json({ message: 'Updated' });
  } catch (error: unknown) {
    c.status(404);

    return c.json({ message: (error as Error).message });
  }
}
