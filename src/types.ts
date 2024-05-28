import { Input } from 'hono/types';

export type Email = string;
export type UserId = number;
export type GameId = string;
export type RulesetId = number;

export interface Game {
  id: GameId;
  name: string;
}

export interface Ruleset {
  id: RulesetId;
  gameId: string;
  userId: UserId | null;
  name: string;
  rules: any;
}

export interface ActiveRuleset {
  userId: UserId;
  gameId: GameId;
  rulesetId: RulesetId;
}

export interface User {
  id: UserId;
  username: string;
  email: Email;
  password: string;
  theme: string;
}

export interface LoginInput {
  email: Email;
  password: string;
}

export interface SignupInput {
  username: string;
  email: Email;
  password: string;
  theme: string;
}

export interface UserWithoutPassword {
  id: number;
  email: string;
  username: string;
  theme: string;
}
