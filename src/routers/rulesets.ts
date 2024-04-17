import { Hono } from 'hono';
import * as ruleHandlers from '../handlers/rulesets';

const RulesetsRouter = new Hono();

// Route to get all rulesets for a specific user and game
RulesetsRouter.get('/:userId/:gameId/rulesets', ruleHandlers.getGameRulesets);

// Route to get a specific ruleset for a specific user and game
RulesetsRouter.get(
  '/:userId/:gameId/rulesets/:rulesetId',
  ruleHandlers.getGameRuleset
);

// Route to get the active ruleset for a specific user and game
RulesetsRouter.get(
  '/:userId/:gameId/activeRuleset',
  ruleHandlers.getActiveRuleset
);

export default RulesetsRouter;

/**
 * Move to rulesets route?
 * get /rulesets/:userId/:gameId/ -> Get all specific user rulesets for a specific game
 * get /rulesets/:userId/:gameId/:rulesetId -> Get a specific user ruleset for a specific game
 * get /rulesets/active/:userId/:gameid
 */
// Endpoint to get all rulesets for a specific game

// Endpoint to get active ruleset for a specific game
// RulesetsRouter.get(
//   '/:gameid/rulesets/activeRuleset',
//   gameHandlers.getActiveRuleset
// );

/**
 * post /user/login -> sign in
 * get /user/:userId -> get user properties
 */

/**
 *  todo: add a active ruleset endpoint/data
 * .get userid/gameid/rulesetid
 * then use .get specific ruleset function (await) to get the ruleset
 */
