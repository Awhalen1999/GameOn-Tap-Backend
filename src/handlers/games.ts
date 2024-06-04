import { Context, Env } from 'hono';
import { BlankInput } from 'hono/types';
import * as api from '../api/games';

// Handler function to get all games
export async function getAllGames(c: Context<Env, '/', BlankInput>) {
  const games = await api.getGames();
  return c.json(games);
}

// Handler function to get a specific game by its ID
export async function getGame(c: Context<Env, '/:game_id', BlankInput>) {
  const game_id = c.req.param('game_id');

  try {
    const game = await api.getGame(game_id);
    return c.json(game);
  } catch (error: unknown) {
    c.status(404);
    return c.json({ message: (error as Error).message });
  }
}
