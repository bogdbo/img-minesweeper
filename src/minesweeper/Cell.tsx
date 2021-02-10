import { MouseEventHandler, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import { RootStore } from '../rootStore';
import { getCellHoverStyle, getCellTextColor } from './utilities';
import { clickCell } from "./slice";

export interface MinesweeperCellProps {
  x: number;
  y: number;
}

export function MinesweeperCell({ x, y }: MinesweeperCellProps) {
  const dispatch = useDispatch();
  const board = useSelector((state: RootStore) => state.minesweeper.board);
  const cell = board[x][y];

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
      dispatch(clickCell({ isFlag: isFlagging, x, y }))
    },
    [dispatch]
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
