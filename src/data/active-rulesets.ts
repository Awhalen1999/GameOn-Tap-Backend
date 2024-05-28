import { ActiveRuleset } from '../types';
import db from './db';

export async function getActiveRulesets(): Promise<ActiveRuleset[]> {
  const activeRulesets = await db`
    SELECT
      userId,
      gameId,
      rulesetId
    FROM activeRulesets
  `;
  return activeRulesets.map((activeRuleset) => ({
    userId: activeRuleset.userId as number,
    gameId: activeRuleset.gameId as string,
    rulesetId: activeRuleset.rulesetId as number,
  }));
}

export async function setActiveRuleset(
  activeRuleset: ActiveRuleset
): Promise<void> {
  await db`
    UPDATE activeRulesets
    SET rulesetId = ${activeRuleset.rulesetId}
    WHERE userId = ${activeRuleset.userId} AND gameId = ${activeRuleset.gameId}
  `;
}

export async function addActiveRuleset(
  activeRuleset: ActiveRuleset
): Promise<ActiveRuleset> {
  const activeRulesets = await db`
    INSERT INTO activeRulesets
      (userId, gameId, rulesetId)
    VALUES
      (${activeRuleset.userId}, ${activeRuleset.gameId}, ${activeRuleset.rulesetId})
    RETURNING userId, gameId, rulesetId
  `;
  return {
    userId: activeRulesets[0].userId as number,
    gameId: activeRulesets[0].gameId as string,
    rulesetId: activeRulesets[0].rulesetId as number,
  };
}
