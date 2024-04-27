import { Context, Env } from 'hono';
import { BlankInput } from 'hono/types';
import * as api from '../api/rulesets';

// Handler function to get all rulesets for a specific game and user
export async function getGameRulesets(
  c: Context<Env, '/:userId/:gameId/rulesets', BlankInput>
) {
  const userId = c.req.param('userId');
  const gameId = c.req.param('gameId');

  try {
    const rulesets = await api.getRulesets(userId, gameId);
    return c.json(rulesets);
  } catch (error: unknown) {
    c.status(404);
    return c.json({ message: (error as Error).message });
  }
}

// Handler function to get a specific ruleset for a specific game and user
export async function getGameRuleset(
  c: Context<Env, '/:userId/:gameId/rulesets/:rulesetId', BlankInput>
) {
  const userId = c.req.param('userId');
  const gameId = c.req.param('gameId');
  const rulesetId = c.req.param('rulesetId');

  try {
    const ruleset = await api.getRuleset(userId, gameId, rulesetId);
    return c.json(ruleset);
  } catch (error: unknown) {
    c.status(404);
    return c.json({ message: (error as Error).message });
  }
}

// Handler function to get the active ruleset for a specific user and game
export async function getActiveRuleset(
  c: Context<Env, '/:userId/:gameId/activeRuleset', BlankInput>
) {
  const userId = c.req.param('userId');
  const gameId = c.req.param('gameId');

  try {
    // Get the active ruleset for the user and game
    const activeRuleset = await api.getActiveRuleset(userId, gameId);

    // Get the specific ruleset using the rulesetId of the active ruleset
    const ruleset = await api.getRuleset(
      userId,
      gameId,
      activeRuleset.rulesetId
    );

    return c.json(ruleset);
  } catch (error: unknown) {
    c.status(404);
    return c.json({ message: (error as Error).message });
  }
}

// Handler function to update the active ruleset for a specific user and game
export async function updateActiveRuleset(
  c: Context<Env, '/:userId/:gameId/activeRuleset'>
) {
  const userId = c.req.param('userId');
  const gameId = c.req.param('gameId');
  const { rulesetId } = (await c.req.json()) as { rulesetId: string };

  try {
    const updatedActiveRuleset = await api.updateActiveRuleset(
      userId,
      gameId,
      rulesetId
    );
    return c.json(updatedActiveRuleset);
  } catch (error: unknown) {
    c.status(400);
    return c.json({ message: (error as Error).message });
  }
}

// Handler function to create a new ruleset for a specific user and game
export async function createRuleset(
  c: Context<Env, '/:userId/:gameId/rulesets'>
) {
  const userId = c.req.param('userId');
  const gameId = c.req.param('gameId');
  const { name, rules } = (await c.req.json()) as { name: string; rules: any };

  try {
    const newRuleset = await api.createRuleset(userId, gameId, name, rules);
    return c.json(newRuleset);
  } catch (error: unknown) {
    c.status(400);
    return c.json({ message: (error as Error).message });
  }
}
