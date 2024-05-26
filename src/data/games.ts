import { Game } from '../types';
import db from './db';

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
  const results = (await db`select * from games`) as Game[];

  return results;
}

export async function getGame(id: string): Promise<Game | null> {
  const results = await db`select * from games where id = ${id} limit 1`;

  return (results?.[0] as Game) ?? null;
}
