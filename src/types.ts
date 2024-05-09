//todo: set user id to number

import { Input } from 'hono/types';

export type Email = string;
export type UserId = string;
export type GameId = string;
export type RulesetId = string;

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
  // theme: 'dark' | 'light';
}

export interface LoginInput {
  email: Email;
  password: string;
}

export interface SignupInput {
  username: string;
  email: Email;
  password: string;
}

/**
 * User
 * id | email | password
 * 1 | bob@example.com | 1234
 */

/**
 * Game
 * id | name
 * 0 | kings cup
 */

/**
 * Ruleset
 * id | gameId | userId | name | rules
 * 0 | 0 | 0 | default | []
 * 1 | 0 | 1 |  awesome rules | []
 */

/**
 * Active Rulesets
 * userId | gameId | rulesetId
 * 1 | 0 | 1
 */
