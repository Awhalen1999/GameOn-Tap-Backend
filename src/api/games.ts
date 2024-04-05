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
  const games = await data.getGames();
  const game = games.find((game) => game.id === gameId);

  if (game) {
    return game.rulesets;
  } else {
    throw new Error('Game not found');
  }
}

// API function to get the active ruleset for a specific game
export async function getGameActiveRuleset(gameId: string) {
  const games = await data.getGames();
  const game = games.find((game) => game.id === gameId);

  if (game) {
    return game.activeRuleset;
  } else {
    throw new Error('Game not found');
  }
}
