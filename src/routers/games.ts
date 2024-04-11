import { Hono } from 'hono';
import * as gameHandlers from '../handlers/games';

const GamesRouter = new Hono();

// Endpoint to get all games
GamesRouter.get('/', gameHandlers.getAllGames);

// Endpoint to get a specific game by ID
GamesRouter.get('/:gameid', gameHandlers.getGame);

export default GamesRouter;
