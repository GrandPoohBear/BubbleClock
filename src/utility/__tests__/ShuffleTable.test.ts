import {makeShuffleTable, make2DSparseShuffleTable} from '../ShuffleTable';

const sparseTable = [
  [
    5,
    undefined,
    1,
    undefined,
    undefined,
    2,
    undefined,
    3,
    undefined,
    undefined,
    4,
  ],
];

describe('ShuffleTable', () => {
  test('it initializes', () => {
    expect(makeShuffleTable(5)[0]).toBeDefined();
  });

  test('makes a nice sparse shuffle table', () => {
    const sparseShuffleTable = make2DSparseShuffleTable(sparseTable);
    expect(sparseShuffleTable.getVal(0, 0)).toBeDefined();
    expect(sparseShuffleTable.getVal(0, 1)).toBeUndefined();
    console.log(sparseShuffleTable);
  });
});
