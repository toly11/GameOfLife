enum Life { alive = 1, dead = 0 };
type Grid = Life[][];
interface GridSize { X: number, Y: number; };
interface NeighborsStateSum { alive: number, dead: number; }

export class GameOfLife {
  constructor(grid: Grid) {
    this._grid = grid;
    this.gridSize = {
      X: (grid.length > 0) ? grid[0].length : 0,
      Y: grid.length,
    };
  }

  private _grid: Grid;
  private gridSize: GridSize;

  public get grid(): Grid {
    return this._grid;
  }

  next() {
    const snapshoot = this.cloneGrid();

    for (let x = 0; x < this.gridSize.Y; x++) {
      for (let y = 0; y < this.gridSize.X; y++) {
        const state: NeighborsStateSum = this.getNeighborsLifeStateSum(snapshoot, x, y);
        this._grid[x][y] = this.calcNextGridState(state, snapshoot[x][y]);
      }
    }
  }

  private cloneGrid(): Grid {
    const newGrid: Grid = new Array(this.gridSize.Y);
    for (let row = 0; row < this.gridSize.Y; row++) {
      newGrid[row] = [...this._grid[row]];
    }
    return newGrid;
  }

  private getNeighborsLifeStateSum(grid: Grid, x: number, y: number): NeighborsStateSum {
    const state: NeighborsStateSum = { alive: 0, dead: 0 };
    const addNeighbor = (x: number, y: number) => {
      (grid[x][y] == Life.alive) ? state.alive++ : state.dead++;
    };

    const hasTopNeighbor = () => x > 0;
    const hasBottomNeighbor = () => x < this.gridSize.Y - 1;
    const hasLeftNeighbor = () => y > 0;
    const hasRightNeighbor = () => y < this.gridSize.X - 1;

    if (hasLeftNeighbor()) addNeighbor(x, y - 1);
    if (hasRightNeighbor()) addNeighbor(x, y + 1);

    if (hasTopNeighbor()) {
      addNeighbor(x - 1, y);
      if (hasLeftNeighbor()) addNeighbor(x - 1, y - 1);
      if (hasRightNeighbor()) addNeighbor(x - 1, y + 1);
    }

    if (hasBottomNeighbor()) {
      addNeighbor(x + 1, y);
      if (hasLeftNeighbor()) addNeighbor(x + 1, y - 1);
      if (hasRightNeighbor()) addNeighbor(x + 1, y + 1);
    }

    return state;
  }

  private calcNextGridState(state: NeighborsStateSum, currentCellLife: Life): Life {
    if (currentCellLife == Life.alive) {
      return (state.alive === 2 || state.alive == 3) ? Life.alive : Life.dead;
    } else {
      return state.alive === 3 ? Life.alive : Life.dead;
    }
  }
}
