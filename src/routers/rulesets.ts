import { Hono } from 'hono';
import * as ruleHandlers from '../handlers/rulesets';

const RulesetsRouter = new Hono();

// Route to get all rulesets for a specific user and game
RulesetsRouter.get('/:user_id/:game_id/rulesets', ruleHandlers.getGameRulesets);

// Route to get a specific ruleset for a specific user and game
RulesetsRouter.get(
  '/:user_id/:game_id/rulesets/:ruleset_id',
  ruleHandlers.getGameRuleset
);

// Route to get the active ruleset for a specific user and game
RulesetsRouter.get(
  '/:user_id/:game_id/active_ruleset',
  ruleHandlers.getActiveRuleset
);

// Route to update the active ruleset for a specific user and game
RulesetsRouter.put(
  '/:user_id/:game_id/active_ruleset',
  ruleHandlers.updateActiveRuleset
);

// Route to create a new ruleset for a specific user and game
RulesetsRouter.post('/:user_id/:game_id/rulesets', ruleHandlers.createRuleset);

// Route to delete a specific ruleset for a specific user and game
RulesetsRouter.delete(
  '/:user_id/:game_id/rulesets/:ruleset_id',
  ruleHandlers.deleteRuleset
);

export default RulesetsRouter;
