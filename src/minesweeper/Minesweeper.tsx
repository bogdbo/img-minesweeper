import { useCallback, useMemo } from "react";
import styled from "styled-components";
import { Settings } from "./Settings";
import { StatusDisplay } from "./StatusDisplay";
import { MinesweeperCell } from "./Cell";
import { useMinesweeper } from "./hooks";

export function Minesweeper() {
  const { board, status, newGame, clickCell, width, height } = useMinesweeper();
  const cellComponents = useMemo(
    () =>
      board.flatMap((row, x) =>
        row.map((cell, y) => (
          <MinesweeperCell
            onClick={(isFlagging) => clickCell(x, y, isFlagging)}
            key={`${x}-${y}`}
            cell={cell}
          />
        ))
      ),
    [board]
  );

  const handleGameStart = useCallback(
    (width: number, height: number, maximumMines: number) => {
      newGame(width, height, maximumMines);
    },
    [newGame]
  );

  return (
    <MinesweeperHost>
      <ControlPanel>
        <Settings onGameStart={handleGameStart} />
        <StatusDisplay status={status} />
      </ControlPanel>
      <Board width={width} height={height}>
        {cellComponents}
      </Board>
    </MinesweeperHost>
  );
}

const MinesweeperHost = styled.div`
  display: inline-block;
  flex-direction: column;
  align-items: center;
  min-width: 20vw;
`;

const ControlPanel = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const Board = styled.div<{ height: number; width: number }>`
  display: grid;
  grid-template-rows: repeat(${(p) => p.width}, min-content);
  grid-template-columns: repeat(${(p) => p.height}, min-content);
  grid-gap: 2px;
  user-select: none;
`;
