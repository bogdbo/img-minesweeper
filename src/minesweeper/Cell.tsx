import { MouseEventHandler, useCallback } from "react";
import styled from "styled-components";
import { getCellHoverStyle, getCellTextColor } from './utilities';
import { Cell } from "./types";

export interface MinesweeperCellProps {
  cell: Cell;
  onClick: (isFlagging: boolean) => void;
}

export function MinesweeperCell({ cell, onClick }: MinesweeperCellProps) {
  let content = null;
  if (cell.isDiscovered) {
    if (cell.isMine) {
      content = "💣️";
    } else if (cell.neighbouringBombsCount > 0) {
      content = cell.neighbouringBombsCount;
    }
  } else if (cell.isFlagged) {
    content = "🚩";
  }

  const handleClick: MouseEventHandler = useCallback(
    (e) => {
      e.preventDefault();
      // any button other than normal click will flag the cell
      const isFlagging = e.button !== 0;
      onClick(isFlagging);
    },
    [onClick]
  );

  return (
    <MinesweeperCellHost
      isDiscovered={cell.isDiscovered}
      isMine={cell.isMine}
      neighbouringBombsCount={cell.neighbouringBombsCount}
      onClick={handleClick}
      onContextMenu={handleClick}
    >
      {content}
    </MinesweeperCellHost>
  );
}

const MinesweeperCellHost = styled.div<{
  isDiscovered: boolean;
  isMine: boolean;
  neighbouringBombsCount?: number;
}>`
  font-family: monospace;
  font-size: 25px;
  font-weight: bold;
  width: 30px;
  box-shadow: 1px 1px black;
  height: 30px;
  background-color: ${({ isDiscovered, isMine }) =>
    isDiscovered ? (isMine ? "red" : "#EFEFEF") : "#ABABAB"};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ neighbouringBombsCount }) =>
    getCellTextColor(neighbouringBombsCount)};
  border: 1px solid #ababab;

  ${({ isDiscovered }) => getCellHoverStyle(isDiscovered)}

  &:active {
    background-color: #fafafa;
    color: black;
  }
`;
