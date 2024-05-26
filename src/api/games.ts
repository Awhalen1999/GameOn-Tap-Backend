import * as data from '../data/games';
import { Game } from '../types';

// API function to get all games
export async function getGames() {
  return await data.getGames();
}

// API function to get a specific game by its ID
export async function getGame(gameId: Game['id']) {
  const game = await data.getGame(gameId);

  if (game) {
    return game;
  } else {
    throw new Error('Game not found');
  }
}
