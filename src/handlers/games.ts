import { Context, Env } from 'hono';
import { BlankInput } from 'hono/types';
import * as api from '../api/games';

// Handler function to get all games
export async function getAllGames(c: Context<Env, '/', BlankInput>) {
  const games = await api.getGames();
  return c.json(games);
}

// Handler function to get a specific game by its ID
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

// Handler function to get all rulesets for a specific game
export async function getRulesets(
  c: Context<Env, '/:gameid/rulesets', BlankInput>
) {
  const gameId = c.req.param('gameid');

  try {
    const rulesets = await api.getRulesets(gameId);
    return c.json(rulesets);
  } catch (error: unknown) {
    c.status(404);
    return c.json({ message: (error as Error).message });
  }
}

// Handler function to get the active ruleset for a specific game
export async function getActiveRuleset(
  c: Context<Env, '/:gameid/rulesets/activeRuleset', BlankInput>
) {
  const gameId = c.req.param('gameid');

  try {
    const activeRulesetName = await api.getGameActiveRuleset(gameId);
    const rulesets = await api.getRulesets(gameId);
    const activeRuleset = rulesets[activeRulesetName];

    if (!activeRuleset) {
      throw new Error('Active ruleset not found in rulesets');
    }

    return c.json(activeRuleset);
  } catch (error: unknown) {
    c.status(404);
    return c.json({ message: '404 error' });
  }
}
