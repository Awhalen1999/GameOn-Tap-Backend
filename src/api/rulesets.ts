import * as data from '../data/rulesets';
import * as activeData from '../data/active-rulesets';

const DEFAULT_ID = 0;

// API function to get all rulesets for a specific game and user
export async function getRulesets(userId: number, gameId: string) {
  const rulesets: any[] = await data.getRulesets(userId, gameId);

  if (rulesets.length > 0) {
    return rulesets;
  } else {
    throw new Error('No rulesets found for this user and game');
  }
}

// getRulesets(1, 'KingsCup').then((res) => console.log(res));

// API function to get a specific ruleset for a specific game and user
export async function getRuleset(
  userId: number,
  gameId: string,
  rulesetId: number
) {
  const rulesets: any[] = await data.getRulesets();
  const userGameRuleset = rulesets.find(
    (ruleset) =>
      ruleset.gameId === gameId &&
      (ruleset.userId === DEFAULT_ID || ruleset.userId === userId) &&
      ruleset.id === rulesetId
  );

  if (userGameRuleset) {
    return userGameRuleset;
  } else {
    throw new Error(
      'No ruleset found for this user and game with the provided rulesetId'
    );
  }
}

// API function to get the active ruleset for a specific user and game
export async function getActiveRuleset(userId: number, gameId: string) {
  const activeRulesets = await activeData.getActiveRulesets();

  const activeRuleset = activeRulesets.find(
    (ruleset) =>
      ruleset.gameId === gameId &&
      (ruleset.userId === DEFAULT_ID || ruleset.userId === userId)
  );

  if (!activeRuleset) {
    throw new Error('No active ruleset found for this user and game');
  }

  return activeRuleset;
}

// API function to update the active ruleset for a specific user and game
export async function updateActiveRuleset(
  userId: number,
  gameId: string,
  rulesetId: number
) {
  // Get the active rulesets data
  const activeRulesets = await activeData.getActiveRulesets();

  // Find the active ruleset for the user and game
  const activeRuleset = activeRulesets.find(
    (ruleset) =>
      ruleset.gameId === gameId &&
      (ruleset.userId === DEFAULT_ID || ruleset.userId === userId)
  );

  if (!activeRuleset) {
    throw new Error('No active ruleset found for this user and game');
  }

  // Update the active ruleset with the new rulesetId
  activeRuleset.rulesetId = rulesetId;

  return activeRuleset;
}

// API function to create a new ruleset for a specific user and game
export async function createRuleset(
  userId: number,
  gameId: string,
  name: string,
  rules: any
) {
  // Get the rulesets for the user and game
  const rulesets: any[] = await data.getRulesets();
  const userGameRulesets = rulesets.filter(
    (ruleset) => ruleset.gameId === gameId && ruleset.userId === userId
  );

  // Find the highest id
  const highestId =
    userGameRulesets.length > 0
      ? Math.max(...userGameRulesets.map((ruleset) => Number(ruleset.id)))
      : 0;

  // Increment the highest id to get the id for the new ruleset
  const newId = highestId + 1;

  const newRuleset = {
    id: newId,
    userId,
    gameId,
    name,
    rules,
  };

  // Save the new ruleset to your data store
  await data.addRuleset(newRuleset);

  return newRuleset;
}

// API function to delete a specific ruleset for a specific user and game
export async function deleteRuleset(
  userId: number,
  gameId: string,
  rulesetId: number
) {
  const rulesets: any[] = await data.getRulesets();
  const userGameRulesetIndex = rulesets.findIndex(
    (ruleset) =>
      ruleset.gameId === gameId &&
      ruleset.userId === userId &&
      ruleset.id === rulesetId
  );

  if (userGameRulesetIndex === -1) {
    throw new Error(
      'No ruleset found for this user and game with the provided rulesetId'
    );
  }

  // Remove the ruleset from the array
  const deletedRuleset = rulesets.splice(userGameRulesetIndex, 1)[0];

  // Save the updated rulesets array to your data store
  await data.saveRulesets(rulesets);

  return deletedRuleset;
}
