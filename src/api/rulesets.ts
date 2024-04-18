import * as data from '../data/rulesets';
import * as activeData from '../data/active-rulesets';

// API function to get all rulesets for a specific game and user
export async function getRulesets(userId: string, gameId: string) {
  const rulesets: any[] = await data.getRulesets();
  const userGameRulesets = rulesets.filter(
    (ruleset) => ruleset.gameId === gameId && ruleset.userId === userId
  );

  if (userGameRulesets.length > 0) {
    return userGameRulesets;
  } else {
    throw new Error('No rulesets found for this user and game');
  }
}

// API function to get a specific ruleset for a specific game and user
export async function getRuleset(
  userId: string,
  gameId: string,
  rulesetId: string
) {
  const rulesets: any[] = await data.getRulesets();
  const userGameRuleset = rulesets.find(
    (ruleset) =>
      ruleset.gameId === gameId &&
      ruleset.userId === userId &&
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

export async function getActiveRuleset(userId: string, gameId: string) {
  // Get the active rulesets data
  const activeRulesets = await activeData.getActiveRulesets();

  // Find the active ruleset for the user and game
  const activeRuleset = activeRulesets.find(
    (ruleset) => ruleset.userId === userId && ruleset.gameId === gameId
  );

  if (!activeRuleset) {
    throw new Error('No active ruleset found for this user and game');
  }

  return activeRuleset;
}
