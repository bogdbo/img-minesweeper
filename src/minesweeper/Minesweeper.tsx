import { useMemo } from "react";
import { useSelector } from 'react-redux';
import styled from "styled-components";
import { RootStore } from '../rootStore';
import { Settings } from "./Settings";
import { StatusDisplay } from "./StatusDisplay";
import { MinesweeperCell } from "./Cell";

export function Minesweeper() {
  const { board, width, height } = useSelector((state: RootStore) => state.minesweeper);
  const cellComponents = useMemo(
    () =>
      board.flatMap((row, x) =>
        row.map((cell, y) => (
          <MinesweeperCell x={x} y={y} key={`${x}-${y}`} />
        ))
      ),
    [board]
  );

  return (
    <MinesweeperHost>
      <ControlPanel>
        <Settings />
        <StatusDisplay />
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
