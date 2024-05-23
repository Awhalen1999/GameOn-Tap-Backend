import { ActiveRuleset } from '../types';

const activeRulesets: ActiveRuleset[] = [
  { userId: 1, gameId: 'KingsCup', rulesetId: 0 },
  { userId: 1, gameId: 'RideTheBus', rulesetId: 0 },
  { userId: 1, gameId: 'Snap', rulesetId: 0 },
  { userId: 1, gameId: 'Trivia', rulesetId: 0 },
  { userId: 1, gameId: 'PromptDash', rulesetId: 0 },
  { userId: 1, gameId: 'DiceRoll', rulesetId: 0 },
  { userId: 1, gameId: 'DrinkRoulette', rulesetId: 0 },
  { userId: 1, gameId: 'AIBartender', rulesetId: 0 },
  { userId: 1, gameId: 'BountyBlast', rulesetId: 0 },
];

export async function getActiveRulesets(): Promise<ActiveRuleset[]> {
  return activeRulesets;
}
