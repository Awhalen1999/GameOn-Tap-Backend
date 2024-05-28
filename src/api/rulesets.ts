import db from '../data/db';

// API function to get all rulesets for a specific game and user
export async function getRulesets(userId: number, gameId: string) {
  const rulesets = await db`
    SELECT *
    FROM rulesets
    WHERE userId = ${userId} AND gameId = ${gameId}
  `;
  if (rulesets.length > 0) {
    return rulesets;
  } else {
    throw new Error('No rulesets found for this user and game');
  }
}

// API function to get a specific ruleset for a specific game and user
export async function getRuleset(
  userId: number,
  gameId: string,
  rulesetId: number
) {
  const ruleset = await db`
    SELECT *
    FROM rulesets
    WHERE userId = ${userId} AND gameId = ${gameId} AND id = ${rulesetId}
  `;
  if (ruleset.length > 0) {
    return ruleset[0];
  } else {
    throw new Error(
      'No ruleset found for this user and game with the provided rulesetId'
    );
  }
}

// API function to get the active ruleset for a specific user and game
export async function getActiveRuleset(userId: number, gameId: string) {
  const activeRuleset = await db`
    SELECT *
    FROM active_rulesets
    WHERE userId = ${userId} AND gameId = ${gameId}
  `;
  if (activeRuleset.length > 0) {
    return activeRuleset[0];
  } else {
    throw new Error('No active ruleset found for this user and game');
  }
}

// API function to update the active ruleset for a specific user and game
export async function updateActiveRuleset(
  userId: number,
  gameId: string,
  rulesetId: number
) {
  const updatedActiveRuleset = await db`
    UPDATE active_rulesets
    SET rulesetId = ${rulesetId}
    WHERE userId = ${userId} AND gameId = ${gameId}
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
  userId: number,
  gameId: string,
  name: string,
  rules: any
) {
  const newRuleset = await db`
    INSERT INTO rulesets
      (userId, gameId, name, rules)
    VALUES
      (${userId}, ${gameId}, ${name}, ${JSON.stringify(rules)})
    RETURNING *
  `;
  return newRuleset[0];
}

// API function to delete a specific ruleset for a specific user and game
export async function deleteRuleset(
  userId: number,
  gameId: string,
  rulesetId: number
) {
  const deletedRuleset = await db`
    DELETE FROM rulesets
    WHERE userId = ${userId} AND gameId = ${gameId} AND id = ${rulesetId}
    RETURNING *
  `;
  if (deletedRuleset.length > 0) {
    return deletedRuleset[0];
  } else {
    throw new Error(
      'No ruleset found for this user and game with the provided rulesetId'
    );
  }
}
