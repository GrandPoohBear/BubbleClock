export type BubbleCharacter = (boolean | undefined)[][];

export interface BubbleFont {
  charHeight: number;
  charWidth: number;
  patterns: BubbleCharacter[];
}
