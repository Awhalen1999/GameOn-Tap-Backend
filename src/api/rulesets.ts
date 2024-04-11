import * as data from '../data/rulesets';

// API function to get all rulesets for a specific game
export async function getRulesets(gameId: string) {
  const rulesets: any[] = await data.getRulesets();
  const ruleset = rulesets.find((ruleset) => ruleset.gameId === gameId);

  if (ruleset) {
    return ruleset.rules;
  } else {
    throw new Error('Ruleset not found');
  }
}
