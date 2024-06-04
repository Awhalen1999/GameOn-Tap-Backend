//todo: add active rulesets to db

import { ActiveRuleset } from '../types';
import db from './db';

export async function getActiveRulesets(): Promise<ActiveRuleset[]> {
  const activeRulesets = await db`
    SELECT
      user_id,
      game_id,
      ruleset_id
    FROM active_rulesets
  `;
  return activeRulesets.map((activeRuleset) => ({
    user_id: activeRuleset.user_id as number,
    game_id: activeRuleset.game_id as string,
    ruleset_id: activeRuleset.ruleset_id as number,
  }));
}

export async function setActiveRuleset(
  activeRuleset: ActiveRuleset
): Promise<void> {
  await db`
    UPDATE active_rulesets
    SET ruleset_id = ${activeRuleset.ruleset_id}
    WHERE user_id = ${activeRuleset.user_id} AND game_id = ${activeRuleset.game_id}
  `;
}

export async function addActiveRuleset(
  activeRuleset: ActiveRuleset
): Promise<ActiveRuleset> {
  const activeRulesets = await db`
    INSERT INTO active_rulesets
      (user_id, game_id, ruleset_id)
    VALUES
      (${activeRuleset.user_id}, ${activeRuleset.game_id}, ${activeRuleset.ruleset_id})
    RETURNING user_id, game_id, ruleset_id
  `;
  return {
    user_id: activeRulesets[0].user_id as number,
    game_id: activeRulesets[0].game_id as string,
    ruleset_id: activeRulesets[0].ruleset_id as number,
  };
}
