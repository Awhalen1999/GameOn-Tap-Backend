import db from './db';
import { Ruleset } from '../types';

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
    WHERE user_id = ${user_id} AND game_id = ${game_id}
  `;
  return rulesets.map((ruleset) => ({
    ruleset_id: ruleset.ruleset_id as number,
    game_id: ruleset.game_id as string,
    user_id: ruleset.user_id as number,
    name: ruleset.name as string,
    rules: ruleset.rules as any,
  }));
}

export async function addRuleset(ruleset: Ruleset): Promise<Ruleset> {
  const rulesets = await db`
    INSERT INTO rulesets
      (game_id, user_id, name, rules)
    VALUES
      (${ruleset.game_id}, ${ruleset.user_id}, ${ruleset.name}, ${ruleset.rules})
    RETURNING ruleset_id, game_id, user_id, name, rules
  `;
  return {
    ruleset_id: rulesets[0].ruleset_id as number,
    game_id: rulesets[0].game_id as string,
    user_id: rulesets[0].user_id as number,
    name: rulesets[0].name as string,
    rules: rulesets[0].rules as any,
  };
}

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
