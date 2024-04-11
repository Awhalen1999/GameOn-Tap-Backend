import { Hono } from 'hono';
import * as ruleHandlers from '../handlers/rulesets';

const RulesetsRouter = new Hono();

/**
 * Move to rulesets route?
 * get /rulesets/:userId/:gameId/ -> Get all specific user rulesets for a specific game
 * get /rulesets/:userId/:gameId/:rulesetId -> Get a specific user ruleset for a specific game
 * get /rulesets/active/:userId/:gameid
 */
// Endpoint to get all rulesets for a specific game
RulesetsRouter.get('/:gameid/rulesets', ruleHandlers.getRulesets);

// Endpoint to get active ruleset for a specific game
// RulesetsRouter.get(
//   '/:gameid/rulesets/activeRuleset',
//   gameHandlers.getActiveRuleset
// );

/**
 * post /user/login -> sign in
 * get /user/:userId -> get user properties
 */

export default RulesetsRouter;