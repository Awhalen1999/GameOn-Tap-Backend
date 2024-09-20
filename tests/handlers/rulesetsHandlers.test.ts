import { describe, expect, test, vi, afterEach } from 'vitest';
import { Context } from 'hono';
import * as api from '../../src/api/rulesets';
import * as handlers from '../../src/handlers/rulesets';
import { Ruleset } from '../../src/types';

// Mock API functions to requests
vi.mock('../../src/api/rulesets');

describe('Rulesets Handlers Tests', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  // Test for getGameRulesets handler
  describe('getGameRulesets()', () => {
    // api function should receive the correct parameters (game_id, user_id) and return the rulesets (correct)
    test('should return rulesets via the context response', async () => {
      const mockData: Ruleset[] = [
        {
          user_id: 1,
          game_id: 'KingsCup',
          name: 'Test Ruleset',
          rules: {},
          ruleset_id: 1,
        },
      ];
      vi.mocked(api.getRulesets).mockResolvedValueOnce(mockData);

      const mockContext = {
        req: { param: (key: string) => (key === 'user_id' ? '1' : 'KingsCup') },
        json: vi.fn(),
        status: vi.fn(),
      } as unknown as Context;

      await handlers.getGameRulesets(mockContext);

      expect(api.getRulesets).toHaveBeenCalledWith(1, 'KingsCup');
      expect(mockContext.json).toHaveBeenCalledWith(mockData);
    });

    // api function should throw an error if no rulesets are found (if issue)
    test('should throw an error if no rulesets are found', async () => {
      vi.mocked(api.getRulesets).mockRejectedValueOnce(
        new Error('No rulesets found')
      );

      const mockContext = {
        req: {
          param: (key: string) => (key === 'user_id' ? '1' : 'UnknownGame'),
        },
        json: vi.fn(),
        status: vi.fn(),
      } as unknown as Context;

      await handlers.getGameRulesets(mockContext);

      expect(api.getRulesets).toHaveBeenCalledWith(1, 'UnknownGame');
      expect(mockContext.status).toHaveBeenCalledWith(404);
      expect(mockContext.json).toHaveBeenCalledWith({
        message: 'No rulesets found',
      });
    });
  });

  // Test for getGameRuleset handler
  describe('getGameRuleset()', () => {
    // api function should receive the correct parameters (game_id, user_id, ruleset_id) and return the ruleset (correct)
    test('should return a specific ruleset via the context response', async () => {
      const mockRuleset: Ruleset = {
        user_id: 1,
        game_id: 'KingsCup',
        name: 'Test Ruleset',
        rules: { rule1: 'Do this' },
        ruleset_id: 1,
      };
      vi.mocked(api.getRuleset).mockResolvedValueOnce(mockRuleset);

      const mockContext = {
        req: {
          param: (key: string) =>
            key === 'user_id' ? '1' : key === 'game_id' ? 'KingsCup' : '1',
        },
        json: vi.fn(),
        status: vi.fn(),
      } as unknown as Context;

      await handlers.getGameRuleset(mockContext);

      expect(api.getRuleset).toHaveBeenCalledWith(1, 'KingsCup', 1);
      expect(mockContext.json).toHaveBeenCalledWith(mockRuleset);
    });

    // api function should throw an error if the ruleset_id is not found (if issue)
    test('should throw an error if the ruleset is not found', async () => {
      vi.mocked(api.getRuleset).mockRejectedValueOnce(
        new Error('No ruleset found with the provided ruleset_id')
      );

      const mockContext = {
        req: {
          param: (key: string) =>
            key === 'user_id' ? '1' : key === 'game_id' ? 'KingsCup' : '999',
        },
        json: vi.fn(),
        status: vi.fn(),
      } as unknown as Context;

      await handlers.getGameRuleset(mockContext);

      expect(api.getRuleset).toHaveBeenCalledWith(1, 'KingsCup', 999);
      expect(mockContext.status).toHaveBeenCalledWith(404);
      expect(mockContext.json).toHaveBeenCalledWith({
        message: 'No ruleset found with the provided ruleset_id',
      });
    });
  });

  // Test for createRuleset handler
  describe('createRuleset()', () => {
    // api function should receive the correct parameters (user_id, game_id, name, rules) and return the new ruleset (correct)
    test('should create and return a new ruleset', async () => {
      const mockRuleset: Ruleset = {
        user_id: 1,
        game_id: 'KingsCup',
        name: 'New Ruleset',
        rules: { rule1: 'New rule' },
        ruleset_id: 1,
      };
      vi.mocked(api.createRuleset).mockResolvedValueOnce(mockRuleset);

      const mockContext = {
        req: {
          param: (key: string) => (key === 'user_id' ? '1' : 'KingsCup'),
          json: vi.fn().mockResolvedValueOnce({
            name: 'New Ruleset',
            rules: { rule1: 'New rule' },
          }),
        },
        json: vi.fn(),
        status: vi.fn(),
      } as unknown as Context;

      await handlers.createRuleset(mockContext);

      // api should return the new ruleset (correct)
      expect(api.createRuleset).toHaveBeenCalledWith(
        1,
        'KingsCup',
        'New Ruleset',
        {
          rule1: 'New rule',
        }
      );
      expect(mockContext.json).toHaveBeenCalledWith(mockRuleset);
    });
  });

  // Test for updateActiveRuleset handler
  describe('updateActiveRuleset()', () => {
    // api function should receive the correct parameters (user_id, game_id, ruleset_id) and update the active ruleset (correct)
    test('should update the active ruleset successfully', async () => {
      const mockContext = {
        req: {
          param: (key: string) => (key === 'user_id' ? '1' : 'KingsCup'),
          json: vi.fn().mockResolvedValueOnce({ ruleset_id: '1' }),
        },
        json: vi.fn(),
        status: vi.fn(),
      } as unknown as Context;

      await handlers.updateActiveRuleset(mockContext);

      expect(api.updateActiveRuleset).toHaveBeenCalledWith(1, 'KingsCup', 1);
      expect(mockContext.json).toHaveBeenCalledWith({
        message: 'Active ruleset updated successfully',
      });
    });
  });

  // Test for deleteRuleset handler
  describe('deleteRuleset()', () => {
    // api function should receive the correct parameters (user_id, game_id, ruleset_id) and delete the ruleset (correct)
    test('should delete the ruleset successfully', async () => {
      const mockContext = {
        req: {
          param: (key: string) =>
            key === 'user_id' ? '1' : key === 'game_id' ? 'KingsCup' : '1',
        },
        json: vi.fn(),
        status: vi.fn(),
      } as unknown as Context;

      await handlers.deleteRuleset(mockContext);

      expect(api.deleteRuleset).toHaveBeenCalledWith(1, 'KingsCup', 1);
      expect(mockContext.json).toHaveBeenCalledWith({
        message: 'Ruleset deleted successfully',
      });
    });
  });
});
