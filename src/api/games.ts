import db from '../data/db';
import { Game } from '../types';

// API function to get all games
export async function getGames() {
  const games = await db`
    SELECT *
    FROM games
  `;
  return games;
}

// API function to get a specific game by its ID
export async function getGame(gameId: Game['id']) {
  const games = await db`
    SELECT *
    FROM games
    WHERE id = ${gameId}
  `;
  if (games.length > 0) {
    return games[0];
  } else {
    throw new Error('Game not found');
  }
}
