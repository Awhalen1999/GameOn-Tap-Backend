import { Game } from '../types';
import db from './db';

export async function getGames(): Promise<Game[]> {
  const results = (await db`select * from games`) as Game[];

  return results;
}

export async function getGame(id: string): Promise<Game | null> {
  const results = await db`select * from games where id = ${id} limit 1`;

  return (results?.[0] as Game) ?? null;
}
