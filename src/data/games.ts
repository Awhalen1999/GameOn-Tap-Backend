import { Game } from '../types';
import { getSql } from './db';

export async function getGames(): Promise<Game[]> {
  const db = await getSql();
  const results = (await db`SELECT * FROM games`) as Game[];

  return results;
}

export async function getGame(game_id: string): Promise<Game | null> {
  const db = await getSql();
  const results =
    await db`SELECT * FROM games WHERE game_id = ${game_id} LIMIT 1`;

  return (results?.[0] as Game) ?? null;
}
