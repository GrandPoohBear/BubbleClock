export const makeDotArray = (input: string): boolean[][] => {
  const arr = new Array<boolean[]>(7)
    .fill([])
    .map(() => new Array<boolean>(25).fill(false));
  //console.log(arr);
  arr[1][12] = true;
  arr[5][12] = true;
  for (let i = 0; i < input.length && i < 4; i++) {
    const numChar = input.charCodeAt(i) - '0'.charCodeAt(0);
    splatNumber(arr, numChar, i);
  }
  return arr;
};

const splatNumber = (canvas: boolean[][], digit: number, index: number) => {
  let offset = 0;
  switch (index) {
    case 1:
      offset = 6;
      break;
    case 2:
      offset = 14;
      break;
    case 3:
      offset = 20;
      break;
  }

  let digitPattern = charPatterns[digit];

  for (let yi = 0; yi < digitPattern.length; yi++) {
    for (let xi = 0; xi < digitPattern[yi].length; xi++) {
      canvas[yi][xi + offset] = digitPattern[yi][xi];
    }
  }
};

const charPatterns: boolean[][][] = [
  [
    //0
    [false, true, true, true, false],
    [true, false, false, false, true],
    [true, false, false, true, true],
    [true, false, true, false, true],
    [true, true, false, false, true],
    [true, false, false, false, true],
    [false, true, true, true, false],
  ],
  [
    //1
    [false, false, true, false, false],
    [false, true, true, false, false],
    [false, false, true, false, false],
    [false, false, true, false, false],
    [false, false, true, false, false],
    [false, false, true, false, false],
    [false, true, true, true, false],
  ],
  [
    //2
    [false, true, true, true, false],
    [true, false, false, false, true],
    [true, false, false, false, true],
    [false, false, false, true, false],
    [false, false, true, false, false],
    [false, true, false, false, false],
    [true, true, true, true, true],
  ],
  [
    //3
    [false, true, true, true, false],
    [true, false, false, false, true],
    [false, false, false, false, true],
    [false, false, true, true, false],
    [false, false, false, false, true],
    [true, false, false, false, true],
    [false, true, true, true, false],
  ],
  [
    //4
    [false, false, false, false, true],
    [false, false, false, true, true],
    [false, false, true, false, true],
    [false, true, false, false, true],
    [true, false, false, false, true],
    [true, true, true, true, true],
    [false, false, false, false, true],
  ],
  [
    //5
    [true, true, true, true, true],
    [true, false, false, false, false],
    [true, true, true, true, false],
    [false, false, false, false, true],
    [false, false, false, false, true],
    [true, false, false, false, true],
    [false, true, true, true, false],
  ],
  [
    //6
    [false, true, true, true, false],
    [true, false, false, false, true],
    [true, false, false, false, false],
    [true, true, true, true, false],
    [true, false, false, false, true],
    [true, false, false, false, true],
    [false, true, true, true, false],
  ],
  [
    //7
    [true, true, true, true, true],
    [false, false, false, false, true],
    [false, false, false, true, false],
    [false, false, true, false, false],
    [false, false, true, false, false],
    [false, false, true, false, false],
    [false, false, true, false, false],
  ],
  [
    //8
    [false, true, true, true, false],
    [true, false, false, false, true],
    [true, false, false, false, true],
    [false, true, true, true, false],
    [true, false, false, false, true],
    [true, false, false, false, true],
    [false, true, true, true, false],
  ],
  [
    //9
    [false, true, true, true, false],
    [true, false, false, false, true],
    [true, false, false, false, true],
    [false, true, true, true, true],
    [false, false, false, false, true],
    [true, false, false, false, true],
    [false, true, true, true, false],
  ],
];
