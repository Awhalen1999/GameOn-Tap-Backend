import { Game } from '../types';
import db from './db';

export async function getGames(): Promise<Game[]> {
  if (!db) {
    
  }
  const results = (await db`SELECT * FROM games`) as Game[];

  return results;
}

export async function getGame(game_id: string): Promise<Game | null> {
  const results =
    await db`SELECT * FROM games WHERE game_id = ${game_id} LIMIT 1`;

  return (results?.[0] as Game) ?? null;
}
