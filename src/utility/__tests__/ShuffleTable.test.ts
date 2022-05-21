import {makeShuffleTable} from '../ShuffleTable';

describe('ShuffleTable', () => {
  test('it initializes', () => {
    expect(makeShuffleTable(5)[0]).toBeDefined();
  });
});
