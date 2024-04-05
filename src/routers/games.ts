import { Hono } from 'hono';
import { getActiveRuleset, getAllGames, getGame } from '../handlers/games';

const GamesRouter = new Hono();

// Endpoint to get all games
GamesRouter.get('/', getAllGames);

// Endpoint to get a specific game by ID
GamesRouter.get('/:gameid', getGame);

// Endpoint to get active rulesets for a specific game
GamesRouter.get('/:gameid/rulesets/:activeRulesets', getActiveRuleset);

export default GamesRouter;
