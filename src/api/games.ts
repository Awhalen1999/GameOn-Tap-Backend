import { Game } from '../types';
import { getGames as getGamesFromDB, getGame as getGameFromDB } from './games';

export async function getGames() {
  return await getGamesFromDB();
}

export async function getGame(game_id: Game['game_id']) {
  return await getGameFromDB(game_id);
}
