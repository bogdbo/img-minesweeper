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

export interface GameState {
  board: GameBoard;
  width: number;
  height: number;
  status: GameStatus;
}

export interface ClickCellPayload {
  x: number;
  y: number;
  isFlag: boolean;
}

export interface InitBoardPayload {
  width: number,
  height: number,
  maximumMines: number
}
