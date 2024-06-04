import { Input } from 'hono/types';

export interface Game {
  game_id: string;
  name: string;
}

export interface Ruleset {
  ruleset_id: number;
  game_id: string;
  user_id: number;
  name: string;
  rules: any;
}

export interface ActiveRuleset {
  user_id: number;
  game_id: string;
  ruleset_id: number;
}

export interface User {
  user_id: number;
  username: string;
  email: string;
  password: string;
  theme: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface SignupInput {
  username: string;
  email: string;
  password: string;
  theme: string;
}

export interface UserWithoutPassword {
  user_id: number;
  email: string;
  username: string;
  theme: string;
}
