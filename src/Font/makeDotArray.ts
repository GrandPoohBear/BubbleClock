import {BubbleFont} from './BubbleFont';
import {SPACE_BETWEEN_CHARS, COLON_WIDTH} from './constants';

export const makeDotArray = (
  input: string,
  font: BubbleFont,
): (boolean | undefined)[][] => {
  console.log(`Making dot array for ${input}`);
  const arr = new Array<boolean | undefined[]>(font.charHeight)
    .fill([])
    .map(() =>
      new Array<boolean | undefined>(
        (font.charWidth + SPACE_BETWEEN_CHARS) * 3 + COLON_WIDTH,
      ).fill(undefined),
    );

  // Draw the colon
  arr[2][font.charWidth + SPACE_BETWEEN_CHARS] = true; //bottom dot
  arr[font.charHeight - 3][font.charWidth + SPACE_BETWEEN_CHARS] = true; //top dot

  for (let i = 0; i < input.length && i < 3; i++) {
    const numChar = input.charCodeAt(i) - '0'.charCodeAt(0);
    splatNumber(arr, numChar, i, font);
  }
  return arr;
};

const splatNumber = (
  canvas: (boolean | undefined)[][],
  digit: number,
  index: number,
  font: BubbleFont,
) => {
  let offset = 0;
  if (index === 0) {
    offset = (font.charWidth + SPACE_BETWEEN_CHARS) * index;
  } else {
    offset =
      (font.charWidth + SPACE_BETWEEN_CHARS) * index +
      COLON_WIDTH +
      SPACE_BETWEEN_CHARS;
  }
  let digitPattern = font.patterns[digit];

  for (let yi = 0; yi < digitPattern.length; yi++) {
    for (let xi = 0; xi < digitPattern[yi].length; xi++) {
      canvas[yi][xi + offset] = digitPattern[yi][xi];
    }
  }
};
