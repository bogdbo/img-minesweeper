import { combineReducers, configureStore } from "@reduxjs/toolkit";
import minesweeperReducer from "./minesweeper/slice";

const rootReducer = combineReducers({
  minesweeper: minesweeperReducer,
});

export const rootStore = configureStore({
  reducer: rootReducer,
});

export type RootStore = ReturnType<typeof rootReducer>;
