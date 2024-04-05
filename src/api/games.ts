import * as data from '../data/games';

export async function getGames() {
  return await data.getGames();
}

export async function getGame(gameId: string) {
  const games = await data.getGames();
  const game = games.find((game) => game.id === gameId);

  if (game) {
    return game;
  } else {
    throw new Error('Game not found');
  }
}

export async function getGameActiveRuleset(gameId: string, ruleset: string) {
  const games = await data.getGames();
  const game = games.find((game) => game.id === gameId);

  if (game) {
    game.activeRulesets = ruleset;
  } else {
    return new Error('Game not found');
  }
}
