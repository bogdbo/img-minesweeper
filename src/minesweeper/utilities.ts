import { GameBoard, GameStatus } from './types';

export function initBoard(width: number, height: number, maxMines: number) {
  // create empty board
  const board: GameBoard = [];
  for (let x = 0; x < width; x++) {
    board.push([]);
    for (let y = 0; y < height; y++) {
      board[x][y] = {
        isDiscovered: false,
        isMine: false,
        isFlagged: false,
        neighbouringBombsCount: 0,
        x,
        y,
      };
    }
  }

  // add mines randomly and update neighbours bomb count
  let plantedMines = 0;
  while (plantedMines < maxMines) {
    const [x, y] = getRandomCoordinates(width, height);
    if (!board[x][y].isMine) {
      board[x][y].isMine = true;
      const neighbourCoordinates = getNeighbourCoordinates(width, height, x, y);
      for (const [nx, ny] of neighbourCoordinates) {
        const neighbour = board[nx][ny];
        neighbour.neighbouringBombsCount++;
      }
      plantedMines++;
    }
  }

  return board;
}

export function handleCellClickHelper(board: GameBoard, width: number, height: number, x: number, y: number, isFlaggingAction: boolean): [GameStatus, GameBoard] {
  const newBoard = [...board];
  const cell = newBoard[x][y];
  if (isFlaggingAction) {
    // toggle flag when right-clicking
    cell.isFlagged = !cell.isFlagged;
  } else {
    // clicking on a flagged cell does nothing
    if (cell.isFlagged) {
      // todo: fix this
      return [GameStatus.ongoing, newBoard];
    }

    if (cell.isMine) {
      revealAllMines(board);
      return [GameStatus.lost, newBoard];
    }

    if (!cell.isDiscovered) {
      revealEmptySpace(board, width, height, x, y);
    }
  }

  return [GameStatus.ongoing, newBoard];
}

export function revealEmptySpace(
  board: GameBoard,
  width: number,
  height: number,
  x: number,
  y: number
) {
  const clickedCell = board[x][y];
  if (clickedCell.isDiscovered) {
    return;
  }

  clickedCell.isDiscovered = true;

  // stop discovering if cell is a 'number' or a mine
  if (clickedCell.neighbouringBombsCount > 0 || clickedCell.isMine) {
    return;
  }

  const neighbourCoordinates = getNeighbourCoordinates(width, height, x, y);
  for (const [nx, ny] of neighbourCoordinates) {
    const neighbour = board[nx][ny];
    if (!neighbour.isMine) {
      revealEmptySpace(board, width, height, nx, ny);
    }
  }
}

export function revealAllMines(board: GameBoard) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const cell = board[i][j];
      if (cell.isMine) {
        cell.isDiscovered = true;
      }
    }
  }
}

// random number between [0, max)
function getRandomNumber(max: number) {
  return Math.floor(Math.random() * max);
}

// generates random X coordinate within [0, width) and random Y coordinate within [0, height)
export function getRandomCoordinates(width: number, height: number) {
  return [getRandomNumber(width), getRandomNumber(height)];
}

// checks if X is within [0, width) and Y is within [0, height)
function isWithinBounds(
  width: number,
  height: number,
  x: number,
  y: number
): boolean {
  return x >= 0 && y >= 0 && x < width && y < height;
}

function getNeighbourCoordinates(
  width: number,
  height: number,
  x: number,
  y: number
) {
  const neighbours = [
    [x + 1, y],
    [x - 1, y],
    [x, y + 1],
    [x, y - 1],
    [x + 1, y + 1],
    [x - 1, y - 1],
    [x + 1, y - 1],
    [x - 1, y + 1],
  ];

  return neighbours.filter(([tx, ty]) => isWithinBounds(width, height, tx, ty));
}

export function countNeighbouringBombs(
  board: GameBoard,
  width: number,
  height: number,
  x: number,
  y: number
) {
  const neighbours = getNeighbourCoordinates(width, height, x, y);
  return neighbours.reduce(
    (result, [tx, ty]) => result + (board[tx][ty].isMine ? 1 : 0),
    0
  );
}

export function getCellTextColor(mineCount?: number) {
  switch (mineCount) {
    case 1:
      return "blue";
    case 2:
      return "#2f892f";
    case 3:
      return "red";
    default:
      return "black";
  }
}

export function getCellHoverStyle(isDiscovered: boolean) {
  return !isDiscovered
    ? `&:hover {
      background-color: #e0e0e0;
      color: #121212;
    }`
    : "";
}
