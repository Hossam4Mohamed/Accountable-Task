import { runPromisesSequentially } from './asyncHelpers';

describe('Async Helpers Utilities', () => {
  let list: number[] = [];

  const simulateDelayedPromise = (num: number, time: number): Promise<number> =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(num);
      }, time);
    });

  const asyncDelayedListPush = (num: number, time: number) => async () => {
    const result = await simulateDelayedPromise(num, time);
    list.push(result);
  };

  beforeEach(() => {
    list = [];
  });

  test('run promises sequentially i.e. wait for the previous promise to resolve to await for next promise', async () => {
    const asyncFunctionsList = [
      asyncDelayedListPush(0, 2000),
      asyncDelayedListPush(1, 1000),
      asyncDelayedListPush(2, 0),
    ];

    await runPromisesSequentially(asyncFunctionsList, list);
    expect(list).toEqual([0, 1, 2]);
  });
});
