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

// Route to update the active ruleset for a specific user and game
RulesetsRouter.put(
  '/:userId/:gameId/activeRuleset',
  ruleHandlers.updateActiveRuleset
);

// Route to create a new ruleset for a specific user and game
RulesetsRouter.post('/:userId/:gameId/rulesets', ruleHandlers.createRuleset);

// Route to delete a specific ruleset for a specific user and game (changed ruleset data to be let instead of const)
RulesetsRouter.delete(
  '/:userId/:gameId/rulesets/:rulesetId',
  ruleHandlers.deleteRuleset
);

export default RulesetsRouter;
