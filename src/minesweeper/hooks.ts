import { useCallback, useState } from "react";
import { handleCellClickHelper, initBoard } from './utilities';
import { GameBoard, GameStatus } from "./types";

export function useMinesweeper() {
  const [[width, height], setBoardSize] = useState([-1, -1]);
  const [board, setBoard] = useState<GameBoard>([]);
  const [status, setStatus] = useState<GameStatus>(GameStatus.notStarted);

  const newGame = useCallback(
    (width: number, height: number, maxMines: number) => {
      setBoard(initBoard(width, height, maxMines));
      setBoardSize([width, height]);
      setStatus(GameStatus.ongoing);
    },
    [setBoard, setStatus, setBoardSize]
  );

  const handleCellClick = useCallback(
    (x: number, y: number, isFlaggingAction: boolean) => {
      if (status !== GameStatus.ongoing) {
        return;
      }

      const [newStatus, newBoard] = handleCellClickHelper(board, width, height, x, y, isFlaggingAction);
      setStatus(newStatus);
      setBoard(newBoard);
    },
    [board, setBoard]
  );

  return {
    status,
    board,
    newGame,
    clickCell: handleCellClick,
    width,
    height,
  };
}
