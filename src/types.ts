export type Email = string;
export type UserId = string;
export type GameId = string;
export type RulesetId = string;

export interface Game {
  id: GameId;
  name: string;
}

export interface User {
  id: UserId;
  email: Email;
  password: string;
  theme: string;
}

export interface Ruleset {
  id: RulesetId;
  gameId: string;
  userId: string;
  name: string;
  rules: any;
}

export interface ActiveRuleset {
  userId: UserId;
  gameId: GameId;
  rulesetId: RulesetId;
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