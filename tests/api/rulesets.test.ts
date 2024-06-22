import { afterEach, describe, expect, test, vi } from 'vitest';
import { getRulesets } from '../../src/api/rulesets';
import * as db from '../../src/data/rulesets';
import { Ruleset } from '../../src/types';

describe('getRulesets()', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  test('Should return rulesets if they exist', async () => {
    // 1. Setup the environment
    const data: Ruleset[] = [
      { user_id: 0, game_id: '', name: '', rules: {}, ruleset_id: 0 },
    ];

    const mockDb = vi.fn().mockResolvedValueOnce(data);

    // @ts-ignore
    db.getRulesets = mockDb;

    // 2. Execute code
    const result = await getRulesets(0, '');

    // 3. Assert results and expectations
    expect(result).toEqual(data);
  });
});
