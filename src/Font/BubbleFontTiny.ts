import {BubbleFont} from './BubbleFont';

const t = true;
const f = false;
const _ = undefined;

const charPatterns: (boolean | undefined)[][][] = [
  [
    //0
    [_, t, t, _],
    [t, _, _, t],
    [t, _, _, t],
    [_, f, f, _],
    [t, _, _, t],
    [t, _, _, t],
    [_, t, t, _],
  ],
  [
    //1
    [_, f, f, _],
    [f, _, _, t],
    [f, _, _, t],
    [_, f, f, _],
    [f, _, _, t],
    [f, _, _, t],
    [_, f, f, _],
  ],
  [
    //2
    [_, t, t, _],
    [f, _, _, t],
    [f, _, _, t],
    [_, t, t, _],
    [t, _, _, f],
    [t, _, _, f],
    [_, t, t, _],
  ],
  [
    //3
    [_, t, t, _],
    [f, _, _, t],
    [f, _, _, t],
    [_, t, t, _],
    [f, _, _, t],
    [f, _, _, t],
    [_, t, t, _],
  ],
  [
    //4
    [_, f, f, _],
    [t, _, _, t],
    [t, _, _, t],
    [_, t, t, _],
    [f, _, _, t],
    [f, _, _, t],
    [_, f, f, _],
  ],
  [
    //5
    [_, t, t, _],
    [t, _, _, f],
    [t, _, _, f],
    [_, t, t, _],
    [f, _, _, t],
    [f, _, _, t],
    [_, t, t, _],
  ],
  [
    //6
    [_, t, t, _],
    [t, _, _, f],
    [t, _, _, f],
    [_, t, t, _],
    [t, _, _, t],
    [t, _, _, t],
    [_, t, t, _],
  ],
  [
    //7
    [_, t, t, _],
    [f, _, _, t],
    [f, _, _, t],
    [_, f, f, _],
    [f, _, _, t],
    [f, _, _, t],
    [_, f, f, _],
  ],
  [
    //8
    [_, t, t, _],
    [t, _, _, t],
    [t, _, _, t],
    [_, t, t, _],
    [t, _, _, t],
    [t, _, _, t],
    [_, t, t, _],
  ],
  [
    //9
    [_, t, t, _],
    [t, _, _, t],
    [t, _, _, t],
    [_, t, t, _],
    [f, _, _, t],
    [f, _, _, t],
    [_, f, f, _],
  ],
];

export const tinyFont: BubbleFont = {
  charHeight: 7,
  charWidth: 4,
  patterns: charPatterns,
};
