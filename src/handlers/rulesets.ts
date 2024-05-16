import { Context, Env } from 'hono';
import { BlankInput } from 'hono/types';
import * as api from '../api/rulesets';

// Handler function to get all rulesets for a specific game and user
export async function getGameRulesets(
  c: Context<Env, '/:userId/:gameId/rulesets', BlankInput>
) {
  const userId = c.req.param('userId');
  const gameId = c.req.param('gameId');

  const userIdNum = parseInt(userId);

  try {
    const rulesets = await api.getRulesets(userIdNum, gameId);
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

  const userIdNum = parseInt(userId);

  try {
    const ruleset = await api.getRuleset(userIdNum, gameId, rulesetId);
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

  const userIdNum = parseInt(userId);

  try {
    // Get the active ruleset for the user and game
    const activeRuleset = await api.getActiveRuleset(userIdNum, gameId);

    // Get the specific ruleset using the rulesetId of the active ruleset
    const ruleset = await api.getRuleset(
      userIdNum,
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

  const userIdNum = parseInt(userId);

  try {
    const updatedActiveRuleset = await api.updateActiveRuleset(
      userIdNum,
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

  const userIdNum = parseInt(userId);

  try {
    const newRuleset = await api.createRuleset(userIdNum, gameId, name, rules);
    return c.json(newRuleset);
  } catch (error: unknown) {
    c.status(400);
    return c.json({ message: (error as Error).message });
  }
}

// Handler function to delete a specific ruleset for a specific user and game
export async function deleteRuleset(
  c: Context<Env, '/:userId/:gameId/rulesets/:rulesetId', BlankInput>
) {
  const userId = c.req.param('userId');
  const gameId = c.req.param('gameId');
  const rulesetId = c.req.param('rulesetId');

  const userIdNum = parseInt(userId);

  try {
    await api.deleteRuleset(userIdNum, gameId, rulesetId);
    return c.json({ message: 'Ruleset deleted successfully' });
  } catch (error: unknown) {
    c.status(404);
    return c.json({ message: (error as Error).message });
  }
}
