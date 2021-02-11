export interface Cell {
  isDiscovered: boolean;
  isMine: boolean;
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
  isMousePressed: boolean;
}

export interface ClickCellPayload {
  x: number;
  y: number;
  isFlag: boolean;
}

export interface InitBoardPayload {
  width: number;
  height: number;
  maximumMines: number;
}
