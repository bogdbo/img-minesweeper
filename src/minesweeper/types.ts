export interface Cell {
  isDiscovered: boolean;
  isMine: boolean;
  x: number;
  y: number;
  isFlagged: boolean;
  neighbouringBombsCount: number;
}

export type GameBoard = Array<Array<Cell>>;

export enum GameStatus {
  notStarted,
  ongoing,
  won,
  lost,
}
