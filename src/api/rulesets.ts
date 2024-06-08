import {
  getRulesets as getRulesetsFromDB,
  getRuleset as getRulesetFromDB,
  getActiveRuleset as getActiveRulesetFromDB,
  updateActiveRuleset as updateActiveRulesetInDB,
  createRuleset as createRulesetInDB,
  deleteRuleset as deleteRulesetFromDB,
} from '../data/rulesets';

// API function to get all rulesets for a specific game and user, including default rulesets
export async function getRulesets(user_id: number, game_id: string) {
  const rulesets = await getRulesetsFromDB(user_id, game_id);
  if (rulesets.length > 0) {
    return rulesets;
  } else {
    throw new Error('No rulesets found for this user and game');
  }
}

// API function to get a specific ruleset for a specific game and user
export async function getRuleset(
  user_id: number,
  game_id: string,
  ruleset_id: number
) {
  const ruleset = await getRulesetFromDB(user_id, game_id, ruleset_id);
  if (ruleset) {
    return ruleset;
  } else {
    throw new Error(
      'No ruleset found for this user and game with the provided ruleset_id'
    );
  }
}

// API function to get the active ruleset for a specific user and game
export async function getActiveRuleset(
  user_id: number,
  game_id: string
): Promise<{ ruleset_id: number }> {
  const ruleset_id = await getActiveRulesetFromDB(user_id, game_id);
  if (ruleset_id) {
    return { ruleset_id };
  } else {
    throw new Error('No active ruleset found for this user and game');
  }
}

// API function to update the active ruleset for a specific user and game
export async function updateActiveRuleset(
  user_id: number,
  game_id: string,
  ruleset_id: number
) {
  await updateActiveRulesetInDB(user_id, game_id, ruleset_id);
}

// API function to create a new ruleset for a specific user and game
export async function createRuleset(
  user_id: number,
  game_id: string,
  name: string,
  rules: any
) {
  const newRuleset = await createRulesetInDB({ user_id, game_id, name, rules });
  return newRuleset;
}

// API function to delete a specific ruleset for a specific user and game
export async function deleteRuleset(
  user_id: number,
  game_id: string,
  ruleset_id: number
) {
  await deleteRulesetFromDB(user_id, game_id, ruleset_id);
}
