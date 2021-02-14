import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameStatus, InitBoardPayload } from "./types";
import {
  getGameStatus,
  initBoard,
  revealAllMines,
  revealEmptySpace,
} from "./utilities";
import { ClickCellPayload, GameState } from "./types";

const initialState: GameState = {
  board: [],
  width: -1,
  height: -1,
  status: GameStatus.notStarted,
  isMousePressed: false,
};

const minesweeperSlice = createSlice({
  name: "minesweeper",
  initialState,
  reducers: {
    startGame(state, action: PayloadAction<InitBoardPayload>) {
      state.status = GameStatus.ongoing;
      state.width = action.payload.width;
      state.height = action.payload.height;
      state.board = initBoard(action.payload);
      return state;
    },
    clickCell(
      state,
      { payload: { x, y, isFlag } }: PayloadAction<ClickCellPayload>
    ) {
      if (state.status !== GameStatus.ongoing) {
        return state;
      }

      const cell = state.board[x][y];
      if (isFlag) {
        // toggle flag when right-clicking
        cell.isFlagged = !cell.isFlagged;
        state.status = getGameStatus(state.board);
      } else {
        // clicking on a flagged cell does nothing
        if (cell.isFlagged) {
          return state;
        }

        if (cell.isMine) {
          revealAllMines(state.board);
          state.status = GameStatus.lost;
          return state;
        }

        if (!cell.isDiscovered) {
          revealEmptySpace(state.board, state.width, state.height, x, y);
          state.status = getGameStatus(state.board);
        }
      }

      return state;
    },
    mouseEvent(state, action: PayloadAction<{ isMousePressed: boolean }>) {
      state.isMousePressed = action.payload.isMousePressed;
      return state;
    },
  },
});

export const { startGame, clickCell, mouseEvent } = minesweeperSlice.actions;
export default minesweeperSlice.reducer;
