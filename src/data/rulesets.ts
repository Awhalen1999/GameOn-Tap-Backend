import db from './db';
import { Ruleset } from '../types';

// Function to get all rulesets for a specific game and user
export async function getRulesets(
  user_id: number,
  game_id: string
): Promise<Ruleset[]> {
  const rulesets = await db`
    SELECT
      ruleset_id,
      game_id,
      user_id,
      name,
      rules
    FROM rulesets
    WHERE (user_id = ${user_id} OR user_id = 1) AND game_id = ${game_id}
  `;
  return rulesets.map((ruleset) => ({
    ruleset_id: ruleset.ruleset_id as number,
    game_id: ruleset.game_id as string,
    user_id: ruleset.user_id as number,
    name: ruleset.name as string,
    rules: ruleset.rules as any,
  }));
}

// Function to get a specific ruleset for a specific game and user
export async function getRuleset(
  user_id: number,
  game_id: string,
  ruleset_id: number
): Promise<Ruleset> {
  const rulesets = await db`
    SELECT *
    FROM rulesets
    WHERE (user_id = ${user_id} OR user_id = 1) AND game_id = ${game_id} AND ruleset_id = ${ruleset_id}
  `;
  if (rulesets.length > 0) {
    return {
      ruleset_id: rulesets[0].ruleset_id as number,
      game_id: rulesets[0].game_id as string,
      user_id: rulesets[0].user_id as number,
      name: rulesets[0].name as string,
      rules: rulesets[0].rules as any,
    };
  } else {
    throw new Error(
      'No ruleset found for this user and game with the provided ruleset_id'
    );
  }
}

// Function to get the active ruleset for a specific user and game
export async function getActiveRuleset(
  user_id: number,
  game_id: string
): Promise<number> {
  const activeRuleset = await db`
    SELECT ruleset_id
    FROM active_rulesets
    WHERE user_id = ${user_id} AND game_id = ${game_id}
  `;
  if (activeRuleset.length > 0) {
    return activeRuleset[0].ruleset_id as number;
  } else {
    throw new Error('No active ruleset found for this user and game');
  }
}

// Function to update the active ruleset for a specific user and game
export async function updateActiveRuleset(
  user_id: number,
  game_id: string,
  ruleset_id: number
): Promise<void> {
  await db`
    UPDATE active_rulesets
    SET ruleset_id = ${ruleset_id}
    WHERE user_id = ${user_id} AND game_id = ${game_id}
  `;
}

// Function to create a new ruleset for a specific user and game

export type NewRuleset = Omit<Ruleset, 'ruleset_id'>;

export async function createRuleset(ruleset: NewRuleset): Promise<Ruleset> {
  const newRuleset = await db`
    INSERT INTO rulesets
      (game_id, user_id, name, rules)
    VALUES
      (${ruleset.game_id}, ${ruleset.user_id}, ${ruleset.name}, ${ruleset.rules})
    RETURNING ruleset_id, game_id, user_id, name, rules
  `;
  return {
    ruleset_id: newRuleset[0].ruleset_id as number,
    game_id: newRuleset[0].game_id as string,
    user_id: newRuleset[0].user_id as number,
    name: newRuleset[0].name as string,
    rules: newRuleset[0].rules as any,
  };
}

// Function to delete a specific ruleset for a specific user and game
export async function deleteRuleset(
  user_id: number,
  game_id: string,
  ruleset_id: number
): Promise<void> {
  await db`
    DELETE FROM rulesets
    WHERE ruleset_id = ${ruleset_id} AND user_id = ${user_id} AND game_id = ${game_id}
  `;
}
