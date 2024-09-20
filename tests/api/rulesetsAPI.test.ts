import { describe, expect, test, vi, afterEach } from 'vitest';
import * as db from '../../src/data/rulesets';
import {
  getRulesets,
  getRuleset,
  getActiveRuleset,
  createRuleset,
  updateActiveRuleset,
  deleteRuleset,
} from '../../src/api/rulesets';
import { Ruleset } from '../../src/types';

// Mock data to handle data
vi.mock('../../src/data/rulesets');

describe('Rulesets API Tests', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  // test for getRulesets
  describe('getRulesets()', () => {
    // get all rulesets for a specific game and user (correct)
    test('should return rulesets if they exist', async () => {
      const mockData: Ruleset[] = [
        {
          user_id: 1,
          game_id: 'KingsCup',
          name: 'Test Ruleset',
          rules: {},
          ruleset_id: 1,
        },
      ];
      vi.mocked(db.getRulesets).mockResolvedValueOnce(mockData);

      const result = await getRulesets(1, 'KingsCup');

      expect(result).toEqual(mockData);
      expect(db.getRulesets).toHaveBeenCalledWith(1, 'KingsCup');
    });

    // throw an error if no rulesets found (if issue)
    test('should throw an error if no rulesets are found', async () => {
      vi.mocked(db.getRulesets).mockRejectedValueOnce(
        new Error('No rulesets found for this user and game')
      );

      await expect(getRulesets(1, 'UnknownGame')).rejects.toThrow(
        'No rulesets found for this user and game'
      );
      expect(db.getRulesets).toHaveBeenCalledWith(1, 'UnknownGame');
    });
  });

  // test for getRuleset
  describe('getRuleset()', () => {
    // get a specific ruleset for a specific game user and ruleset_id (correct)
    test('should return a specific ruleset if it exists', async () => {
      const mockRuleset: Ruleset = {
        user_id: 1,
        game_id: 'KingsCup',
        name: 'Test Ruleset',
        rules: { rule1: 'Do this' },
        ruleset_id: 1,
      };
      vi.mocked(db.getRuleset).mockResolvedValueOnce(mockRuleset);

      const result = await getRuleset(1, 'KingsCup', 1);

      expect(result).toEqual(mockRuleset);
      expect(db.getRuleset).toHaveBeenCalledWith(1, 'KingsCup', 1);
    });

    // throw an error if no ruleset found (if issue)
    test('should throw an error if the ruleset is not found', async () => {
      vi.mocked(db.getRuleset).mockRejectedValueOnce(
        new Error(
          'No ruleset found for this user and game with the provided ruleset_id'
        )
      );

      await expect(getRuleset(1, 'KingsCup', 999)).rejects.toThrow(
        'No ruleset found for this user and game with the provided ruleset_id'
      );
    });
  });

  // test for getActiveRuleset
  describe('getActiveRuleset()', () => {
    // get the active ruleset for a specific user and game (correct)
    test('should return the active ruleset ID if it exists', async () => {
      vi.mocked(db.getActiveRuleset).mockResolvedValueOnce(1);

      const result = await getActiveRuleset(1, 'KingsCup');

      expect(result).toEqual({ ruleset_id: 1 });
      expect(db.getActiveRuleset).toHaveBeenCalledWith(1, 'KingsCup');
    });

    // throw an error if no active ruleset found (if issue)
    test('should throw an error if no active ruleset is found', async () => {
      vi.mocked(db.getActiveRuleset).mockRejectedValueOnce(
        new Error('No active ruleset found for this user and game')
      );

      await expect(getActiveRuleset(1, 'UnknownGame')).rejects.toThrow(
        'No active ruleset found for this user and game'
      );
    });
  });

  // test for createRuleset
  describe('createRuleset()', () => {
    // create a new ruleset for a specific user and game (correct)
    test('should create and return a new ruleset', async () => {
      const mockRuleset: Ruleset = {
        user_id: 1,
        game_id: 'KingsCup',
        name: 'New Ruleset',
        rules: { rule1: 'New rule' },
        ruleset_id: 1,
      };
      vi.mocked(db.createRuleset).mockResolvedValueOnce(mockRuleset);

      const result = await createRuleset(1, 'KingsCup', 'New Ruleset', {
        rule1: 'New rule',
      });

      expect(result).toEqual(mockRuleset);
      expect(db.createRuleset).toHaveBeenCalledWith({
        user_id: 1,
        game_id: 'KingsCup',
        name: 'New Ruleset',
        rules: { rule1: 'New rule' },
      });
    });
  });

  // update active ruleset to new ruleset (correct)
  describe('updateActiveRuleset()', () => {
    test('should update the active ruleset successfully', async () => {
      await updateActiveRuleset(1, 'KingsCup', 1);

      expect(db.updateActiveRuleset).toHaveBeenCalledWith(1, 'KingsCup', 1);
    });
  });

  // test for deleteRuleset
  describe('deleteRuleset()', () => {
    // delete a specific ruleset for a specific user and game (correct)
    test('should delete the ruleset successfully', async () => {
      await deleteRuleset(1, 'KingsCup', 1);

      expect(db.deleteRuleset).toHaveBeenCalledWith(1, 'KingsCup', 1);
    });
  });
});
