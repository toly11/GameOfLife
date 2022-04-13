# game of life

# installation
`npm i the-game-of-life`

a javascript class for creating a game-of-life game

usage example:
```typescript
import { GameOfLife } from "the-game-of-life";


const grid = [
  [0, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 1, 0],
  [0, 0, 0, 0]
];

const game = new GameOfLife(grid);
game.grid; // get the current grid
game.next(); // perform 1 'tick'

```