import { Hono } from 'hono';
import * as gameHandlers from '../handlers/games';

const GamesRouter = new Hono();

// Endpoint to get all games
GamesRouter.get('/', gameHandlers.getAllGames);

// Endpoint to get a specific game by ID
GamesRouter.get('/:gameid', gameHandlers.getGame);

// Endpoint to get all rulesets for a specific game
GamesRouter.get('/:gameid/rulesets', gameHandlers.getRulesets);

// Endpoint to get active ruleset for a specific game
GamesRouter.get(
  '/:gameid/rulesets/activeRuleset',
  gameHandlers.getActiveRuleset
);

export default GamesRouter;
