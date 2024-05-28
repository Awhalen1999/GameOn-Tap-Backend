import db from './db';
import { Ruleset } from '../types';

export async function getRulesets(
  userId: number,
  gameId: string
): Promise<Ruleset[]> {
  const rulesets = await db`
    SELECT
      id,
      userId,
      gameId,
      name,
      rules
    FROM rulesets
    WHERE userId = ${userId} AND gameId = ${gameId}
  `;
  return rulesets.map((ruleset) => ({
    id: ruleset.id as number,
    userId: ruleset.userId as number,
    gameId: ruleset.gameId as string,
    name: ruleset.name as string,
    rules: ruleset.rules as string,
  }));
}

export async function addRuleset(ruleset: Ruleset): Promise<Ruleset> {
  const rulesets = await db`
    INSERT INTO rulesets
      (userId, gameId, name, rules)
    VALUES
      (${ruleset.userId}, ${ruleset.gameId}, ${ruleset.name}, ${ruleset.rules})
    RETURNING id, userId, gameId, name, rules
  `;
  return {
    id: rulesets[0].id as number,
    userId: rulesets[0].userId as number,
    gameId: rulesets[0].gameId as string,
    name: rulesets[0].name as string,
    rules: rulesets[0].rules as string,
  };
}

export async function deleteRuleset(
  userId: number,
  gameId: string,
  rulesetId: number
): Promise<void> {
  await db`
    DELETE FROM rulesets
    WHERE id = ${rulesetId} AND userId = ${userId} AND gameId = ${gameId}
  `;
}
