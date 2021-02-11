import { GameBoard } from '../types';
import { initBoard } from '../utilities';

describe("initBoard", () => {
  it.each([
    [0, 0, 1],
    [1, 0, 1],
    [0, 1, 0],
    [-1, 1, 1],
    [-1, -1, -1],
  ])(
    "should throw error when dimensions are invalid [%p %p %p]",
    (width, height, maximumMines) => {

      // Act & Assert
      expect(() => initBoard({ width, height, maximumMines })).toThrow();
    }
  );

  it.each([
    [1, 1, 1],
    [1, 1, 5],
    [5, 5, 5],
    [3, 3, 1],
  ])("should create a board of the specified size [%p %p %p]", (width, height, maximumMines) => {
    // Act
    const board = initBoard({ width, height, maximumMines });

    // Assert
    expect(getBoardSize(board)).toEqual(expect.arrayContaining([width, height]));
  });
});


function getBoardSize(board: GameBoard) {
  const height = board.length;
  const width = board[0].length;

  return [width, height];
}
