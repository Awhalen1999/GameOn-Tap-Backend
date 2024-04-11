import { Hono } from 'hono';
import * as gameHandlers from '../handlers/games';

const GamesRouter = new Hono();

// Endpoint to get all games
GamesRouter.get('/', gameHandlers.getAllGames);

// Endpoint to get a specific game by ID
GamesRouter.get('/:gameid', gameHandlers.getGame);

/**
 * Move to rulesets route?
 * get /rulesets/:userId/:gameId/ -> Get all specific user rulesets for a specific game
 * get /rulesets/:userId/:gameId/:rulesetId -> Get a specific user ruleset for a specific game
 * get /rulesets/active/:userId/:gameid
 */
// Endpoint to get all rulesets for a specific game
GamesRouter.get('/:gameid/rulesets', gameHandlers.getRulesets);

// Endpoint to get active ruleset for a specific game
GamesRouter.get(
  '/:gameid/rulesets/activeRuleset',
  gameHandlers.getActiveRuleset
);

export default GamesRouter;

/**
 * post /user/login -> sign in
 * get /user/:userId -> get user properties
 */
