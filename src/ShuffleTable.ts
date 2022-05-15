import {shuffle} from 'lodash';

export const makeShuffleTable = (size: number): number[] => {
  const array = new Array(size).fill(0).map((_, index) => index);
  return shuffle(array);
};
