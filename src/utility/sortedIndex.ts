export const sortedIndex = <T>(array: T[], value: T): number => {
  'worklet';
  let low = 0,
    high = array == null ? low : array.length;

  while (low < high) {
    // eslint-disable-next-line no-bitwise
    let mid = (low + high) >>> 1,
      computed = array[mid];

    if (computed <= value) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return high;
};
