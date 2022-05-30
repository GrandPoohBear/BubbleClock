import {BubbleFont} from './BubbleFont';

const t = true;
const f = false;
const charPatterns: (boolean | undefined)[][][] = [
  [
    //0
    [f, t, t, t, f],
    [t, f, f, f, t],
    [t, f, f, t, t],
    [t, f, t, f, t],
    [t, t, f, f, t],
    [t, f, f, f, t],
    [f, t, t, t, f],
  ],
  [
    //1
    [f, f, t, f, f],
    [f, t, t, f, f],
    [f, f, t, f, f],
    [f, f, t, f, f],
    [f, f, t, f, f],
    [f, f, t, f, f],
    [f, t, t, t, f],
  ],
  [
    //2
    [f, t, t, t, f],
    [t, f, f, f, t],
    [t, f, f, f, t],
    [f, f, f, t, f],
    [f, f, t, f, f],
    [f, t, f, f, f],
    [t, t, t, t, t],
  ],
  [
    //3
    [f, t, t, t, f],
    [t, f, f, f, t],
    [f, f, f, f, t],
    [f, f, t, t, f],
    [f, f, f, f, t],
    [t, f, f, f, t],
    [f, t, t, t, f],
  ],
  [
    //4
    [f, f, f, f, t],
    [f, f, f, t, t],
    [f, f, t, f, t],
    [f, t, f, f, t],
    [t, f, f, f, t],
    [t, t, t, t, t],
    [f, f, f, f, t],
  ],
  [
    //5
    [t, t, t, t, t],
    [t, f, f, f, f],
    [t, t, t, t, f],
    [f, f, f, f, t],
    [f, f, f, f, t],
    [t, f, f, f, t],
    [f, t, t, t, f],
  ],
  [
    //6
    [f, t, t, t, f],
    [t, f, f, f, t],
    [t, f, f, f, f],
    [t, t, t, t, f],
    [t, f, f, f, t],
    [t, f, f, f, t],
    [f, t, t, t, f],
  ],
  [
    //7
    [t, t, t, t, t],
    [f, f, f, f, t],
    [f, f, f, t, f],
    [f, f, t, f, f],
    [f, f, t, f, f],
    [f, f, t, f, f],
    [f, f, t, f, f],
  ],
  [
    //8
    [f, t, t, t, f],
    [t, f, f, f, t],
    [t, f, f, f, t],
    [f, t, t, t, f],
    [t, f, f, f, t],
    [t, f, f, f, t],
    [f, t, t, t, f],
  ],
  [
    //9
    [f, t, t, t, f],
    [t, f, f, f, t],
    [t, f, f, f, t],
    [f, t, t, t, t],
    [f, f, f, f, t],
    [t, f, f, f, t],
    [f, t, t, t, f],
  ],
];

export const denseFont: BubbleFont = {
  charHeight: 7,
  charWidth: 5,
  patterns: charPatterns,
};
