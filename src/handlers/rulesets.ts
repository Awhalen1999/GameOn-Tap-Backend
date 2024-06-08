import { Context, Env } from 'hono';
import { BlankInput } from 'hono/types';
import * as api from '../api/rulesets';

// Handler function to get all rulesets for a specific game and user
export async function getGameRulesets(
  c: Context<Env, '/:user_id/:game_id/rulesets', BlankInput>
) {
  const user_id = c.req.param('user_id');
  const game_id = c.req.param('game_id');

  const user_id_num = parseInt(user_id);

  try {
    const rulesets = await api.getRulesets(user_id_num, game_id);
    return c.json(rulesets);
  } catch (error: unknown) {
    c.status(404);
    return c.json({ message: (error as Error).message });
  }
}

// Handler function to get a specific ruleset for a specific game and user
export async function getGameRuleset(
  c: Context<Env, '/:user_id/:game_id/rulesets/:ruleset_id', BlankInput>
) {
  const user_id = c.req.param('user_id');
  const game_id = c.req.param('game_id');
  const ruleset_id = c.req.param('ruleset_id');

  const user_id_num = parseInt(user_id);
  const ruleset_id_num = parseInt(ruleset_id);

  try {
    const ruleset = await api.getRuleset(user_id_num, game_id, ruleset_id_num);
    return c.json(ruleset);
  } catch (error: unknown) {
    c.status(404);
    return c.json({ message: (error as Error).message });
  }
}

// Handler function to get the active ruleset ID for a specific user and game
export async function getActiveRuleset(
  c: Context<Env, '/:user_id/:game_id/active_ruleset', BlankInput>
) {
  const user_id = c.req.param('user_id');
  const game_id = c.req.param('game_id');

  const user_id_num = parseInt(user_id);

  try {
    // Get the active ruleset ID for the user and game
    const active_ruleset = await api.getActiveRuleset(user_id_num, game_id);

    return c.json({ ruleset_id: active_ruleset.ruleset_id });
  } catch (error: unknown) {
    c.status(404);
    return c.json({ message: (error as Error).message });
  }
}

// Handler function to update the active ruleset for a specific user and game
export async function updateActiveRuleset(
  c: Context<Env, '/:user_id/:game_id/active_ruleset'>
) {
  const user_id = c.req.param('user_id');
  const game_id = c.req.param('game_id');
  const { ruleset_id } = (await c.req.json()) as { ruleset_id: string };

  const user_id_num = parseInt(user_id);
  const ruleset_id_num = parseInt(ruleset_id);

  try {
    await api.updateActiveRuleset(user_id_num, game_id, ruleset_id_num);
    return c.json({ message: 'Active ruleset updated successfully' });
  } catch (error: unknown) {
    c.status(400);
    return c.json({ message: (error as Error).message });
  }
}

// Handler function to create a new ruleset for a specific user and game
export async function createRuleset(
  c: Context<Env, '/:user_id/:game_id/rulesets'>
) {
  const user_id = c.req.param('user_id');
  const game_id = c.req.param('game_id');
  const { name, rules } = (await c.req.json()) as { name: string; rules: any };

  const user_id_num = parseInt(user_id);

  try {
    const new_ruleset = await api.createRuleset(
      user_id_num,
      game_id,
      name,
      rules
    );
    return c.json(new_ruleset);
  } catch (error: unknown) {
    c.status(400);
    return c.json({ message: (error as Error).message });
  }
}

// Handler function to delete a specific ruleset for a specific user and game
export async function deleteRuleset(
  c: Context<Env, '/:user_id/:game_id/rulesets/:ruleset_id', BlankInput>
) {
  const user_id = c.req.param('user_id');
  const game_id = c.req.param('game_id');
  const ruleset_id = c.req.param('ruleset_id');

  const user_id_num = parseInt(user_id);
  const ruleset_id_num = parseInt(ruleset_id);

  try {
    await api.deleteRuleset(user_id_num, game_id, ruleset_id_num);
    return c.json({ message: 'Ruleset deleted successfully' });
  } catch (error: unknown) {
    c.status(404);
    return c.json({ message: (error as Error).message });
  }
}
