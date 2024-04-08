import * as data from '../data/games';

// API function to get all games
export async function getGames() {
  return await data.getGames();
}

// API function to get a specific game by its ID
export async function getGame(gameId: string) {
  const games = await data.getGames();
  const game = games.find((game) => game.id === gameId);

  if (game) {
    return game;
  } else {
    throw new Error('Game not found');
  }
}

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

// API function to get the active ruleset for a specific game
export async function getGameActiveRuleset(gameId: string) {
  const activeRulesets: { gameId: string; activeRuleset: string }[] =
    await data.getActiveRulesets();
  const activeRulesetData = activeRulesets.find(
    (ruleset) => ruleset.gameId === gameId
  );

  if (!activeRulesetData) {
    throw new Error(`No active ruleset data found for game ${gameId}`);
  }

  const activeRulesetTitle = activeRulesetData.activeRuleset;

  const gameRulesets = await getRulesets(gameId);

  const activeRuleset = gameRulesets[activeRulesetTitle];

  if (!activeRuleset) {
    throw new Error(
      `Active ruleset ${activeRulesetTitle} not found in game ${gameId}'s rulesets`
    );
  }

  return activeRuleset;
}
