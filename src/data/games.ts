import { Game } from '../types';

const games: Game[] = [
  { id: 'KingsCup', name: 'Kings Cup' },
  { id: 'RideTheBus', name: 'Ride The Bus' },
  { id: 'Snap', name: 'Snap' },
  { id: 'Trivia', name: 'Trivia' },
  { id: 'PromptDash', name: 'Prompt Dash' },
  { id: 'DiceRoll', name: 'Dice Roll' },
  { id: 'DrinkRoulette', name: 'Drink Roulette' },
  { id: 'AIBartender', name: 'AI Bartender' },
  { id: 'BountyBlast', name: 'Bounty Blast' },
];

export async function getGames(): Promise<Game[]> {
  return games;
}
