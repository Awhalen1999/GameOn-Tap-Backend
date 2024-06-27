import { afterEach, describe, expect, test, vi } from 'vitest';
import { getRulesets } from '../../src/api/rulesets';
import { Ruleset } from '../../src/types';

const mocks = vi.hoisted(() => {
  return {
    getRulesets: vi.fn(),
  };
});

vi.mock('../../src/data/rulesets', async (importOriginal) => {
  const mod = await importOriginal<typeof import('../../src/data/rulesets')>();

  return {
    ...mod,
    getRulesets: mocks.getRulesets,
  };
});

describe('getRulesets()', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  test('Should return rulesets if they exist', async () => {
    // 1. Setup the environment
    const data: Ruleset[] = [
      { user_id: 0, game_id: '', name: '', rules: {}, ruleset_id: 0 },
    ];

    mocks.getRulesets.mockResolvedValueOnce(data);

    // 2. Execute code
    const result = await getRulesets(0, '');

    // 3. Assert results and expectations
    expect(result).toEqual(data);
    expect(mocks.getRulesets).toHaveBeenCalledOnce();
    expect(mocks.getRulesets).toHaveBeenLastCalledWith(0, '');
  });
});
