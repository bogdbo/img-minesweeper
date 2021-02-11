import { GameBoard, GameStatus, InitBoardPayload } from "./types";

export function initBoard({ width, height, maximumMines }: InitBoardPayload) {
  if (width <= 0 || height <= 0 || maximumMines < 0) {
    throw new Error("invalid dimension or number of mines");
  }

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
      };
    }
  }

  // add mines randomly
  let plantedMines = 0;
  const totalCellCount = width * height;
  while (plantedMines < maximumMines && plantedMines < totalCellCount) {
    const [x, y] = getRandomCoordinates(width, height);
    if (!board[x][y].isMine) {
      board[x][y].isMine = true;
      plantedMines++;

      // update neighbouring cells bomb count
      const neighbourCoordinates = getNeighbourCoordinates(width, height, x, y);
      for (const [nx, ny] of neighbourCoordinates) {
        const neighbour = board[nx][ny];
        neighbour.neighbouringBombsCount++;
      }
    }
  }

  return board;
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
  if (
    clickedCell.neighbouringBombsCount > 0 ||
    clickedCell.isMine ||
    clickedCell.isFlagged
  ) {
    return;
  }

  const neighbourCoordinates = getNeighbourCoordinates(width, height, x, y);
  for (const [nx, ny] of neighbourCoordinates) {
    const neighbour = board[nx][ny];
    if (!neighbour.isMine && !neighbour.isFlagged) {
      revealEmptySpace(board, width, height, nx, ny);
    }
  }
}

export function revealAllMines(board: GameBoard) {
  board.forEach((row) =>
    row.forEach((cell) => {
      if (cell.isMine) {
        cell.isDiscovered = true;
      }
    })
  );

  return board;
}

export function getGameStatus(board: GameBoard): GameStatus {
  const boardStats = board.flat().reduce(
    (result: any, cell) => {
      result.flaggedMines += Number(
        cell.isMine && cell.isFlagged && !cell.isDiscovered
      );
      result.undiscoveredCells += Number(!cell.isDiscovered);
      return result;
    },
    {
      flaggedMines: 0,
      undiscoveredCells: 0,
    }
  );

  if (boardStats.discoveredMines > 0) {
    return GameStatus.lost;
  }

  if (boardStats.flaggedMines == boardStats.undiscoveredCells) {
    return GameStatus.won;
  }

  return GameStatus.ongoing;
}

// random number between [0, max)
function getRandomNumber(max: number) {
  return Math.max(0, Math.floor(Math.random() * max));
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
