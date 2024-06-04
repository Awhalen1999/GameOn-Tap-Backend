import db from '../data/db';

// API function to get all rulesets for a specific game and user
export async function getRulesets(user_id: number, game_id: string) {
  const rulesets = await db`
    SELECT *
    FROM rulesets
    WHERE game_id = ${game_id} AND user_id = ${user_id}
  `;
  if (rulesets.length > 0) {
    return rulesets;
  } else {
    throw new Error('No rulesets found for this user and game');
  }
}

// New function to copy default rulesets to new user
export async function copyDefaultRulesets(new_user_id: number): Promise<void> {
  const defaultRulesets = await db`
    SELECT game_id, name, rules
    FROM rulesets
    WHERE user_id = 1
  `;

  for (const ruleset of defaultRulesets) {
    await db`
      INSERT INTO rulesets
        (user_id, game_id, name, rules)
      VALUES
        (${new_user_id}, ${ruleset.game_id}, ${ruleset.name}, ${ruleset.rules})
    `;
  }
}

// API function to get a specific ruleset for a specific game and user
export async function getRuleset(
  user_id: number,
  game_id: string,
  ruleset_id: number
) {
  const ruleset = await db`
    SELECT *
    FROM rulesets
    WHERE user_id = ${user_id} AND game_id = ${game_id} AND id = ${ruleset_id}
  `;
  if (ruleset.length > 0) {
    return ruleset[0];
  } else {
    throw new Error(
      'No ruleset found for this user and game with the provided ruleset_id'
    );
  }
}

// API function to get the active ruleset for a specific user and game
export async function getActiveRuleset(user_id: number, game_id: string) {
  const activeRuleset = await db`
    SELECT *
    FROM active_rulesets
    WHERE user_id = ${user_id} AND game_id = ${game_id}
  `;
  if (activeRuleset.length > 0) {
    return activeRuleset[0];
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
  const updatedActiveRuleset = await db`
    UPDATE active_rulesets
    SET ruleset_id = ${ruleset_id}
    WHERE user_id = ${user_id} AND game_id = ${game_id}
    RETURNING *
  `;
  if (updatedActiveRuleset.length > 0) {
    return updatedActiveRuleset[0];
  } else {
    throw new Error('No active ruleset found for this user and game');
  }
}

// API function to create a new ruleset for a specific user and game
export async function createRuleset(
  user_id: number,
  game_id: string,
  name: string,
  rules: any
) {
  const newRuleset = await db`
    INSERT INTO rulesets
      (user_id, game_id, name, rules)
    VALUES
      (${user_id}, ${game_id}, ${name}, ${JSON.stringify(rules)})
    RETURNING *
  `;
  return newRuleset[0];
}

// API function to delete a specific ruleset for a specific user and game
export async function deleteRuleset(
  user_id: number,
  game_id: string,
  ruleset_id: number
) {
  const deletedRuleset = await db`
    DELETE FROM rulesets
    WHERE user_id = ${user_id} AND game_id = ${game_id} AND id = ${ruleset_id}
    RETURNING *
  `;
  if (deletedRuleset.length > 0) {
    return deletedRuleset[0];
  } else {
    throw new Error(
      'No ruleset found for this user and game with the provided ruleset_id'
    );
  }
}
