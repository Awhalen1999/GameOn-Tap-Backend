import * as data from '../data/rulesets';

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
