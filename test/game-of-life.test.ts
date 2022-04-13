import _ from "lodash";
import { GameOfLife } from "../src/index";

describe('test', () => {
  it('works', () => {
    const grid = [
      [0, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0]
    ];

    const expectedResult = [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0]
    ];

    const game = new GameOfLife(grid);
    game.next();
    const isEqual = _.isEqual(game.grid, expectedResult);
    expect(isEqual).toBe(true);
  });
});

