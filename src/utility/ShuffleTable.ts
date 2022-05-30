import {shuffle, isUndefined} from 'lodash';

export const makeShuffleTable = (size: number): number[] => {
  const array = new Array(size).fill(0).map((_, index) => index);
  return shuffle(array);
};

export interface SparseShuffleTable<T> {
  getCoords: (idx1: number, idx2: number) => [number, number];
  getVal: (idx1: number, idx2: number) => T | undefined;
}

const isDefined = <T>(inp: T | undefined): inp is T => !isUndefined(inp);

export const make2DSparseShuffleTable = <T>(
  table: (T | undefined)[][],
): SparseShuffleTable<T> => {
  const definedIndexes: [number, number][] = [];
  for (let i = 0; i < table.length; i++) {
    for (let j = 0; j < table[i].length; j++) {
      if (isDefined(table[i][j])) {
        definedIndexes.push([i, j]);
      }
    }
  }
  const shuffledIndexes = shuffle(definedIndexes);
  let indexLookup: {[idx1: number]: {[idx2: number]: [number, number]}} = {};
  for (let k = 0; k < definedIndexes.length; k++) {
    if (isUndefined(indexLookup[definedIndexes[k][0]])) {
      indexLookup[definedIndexes[k][0]] = {};
    }
    indexLookup[definedIndexes[k][0]][definedIndexes[k][1]] =
      shuffledIndexes[k];
  }

  return {
    getCoords: (idx1, idx2) => indexLookup[idx1][idx2],
    getVal: (idx1, idx2) => {
      if (isUndefined(indexLookup[idx1])) {
        return undefined;
      }
      const coords = indexLookup[idx1][idx2];
      return isDefined(coords) ? table[coords[0]][coords[1]] : undefined;
    },
  };
};
