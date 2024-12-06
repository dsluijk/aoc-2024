type Direction = [number, number];
type Coordinates = [number, number];

const getStart = (grid: string[][]): Coordinates => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === "^") return [y, x];
    }
  }

  throw new Error("No start found");
};

const nextDirection = (direction: Direction): Direction => {
  if (direction[0] == 1) return [0, -1];
  if (direction[0] == -1) return [0, 1];
  if (direction[1] == 1) return [1, 0];
  if (direction[1] == -1) return [-1, 0];

  throw new Error("No direction found");
};

const nextCoordinates = (
  coordinates: Coordinates,
  direction: Direction,
  grid: string[][]
): Coordinates | "done" | "turn" => {
  // TODO: bounds check & collision check
  const candidate: Coordinates = [
    coordinates[0] + direction[0],
    coordinates[1] + direction[1],
  ];

  if (
    candidate[0] < 0 ||
    candidate[1] < 0 ||
    candidate[0] >= grid.length ||
    candidate[1] >= grid[candidate[0]].length
  ) {
    return "done";
  }

  if (grid[candidate[0]][candidate[1]] === "#") {
    return "turn";
  }

  return candidate;
};

const isLoop = (grid: string[][], start: Coordinates) => {
  let direction: Direction = [-1, 0];
  let coordinates = start;

  for (let i = 0; i < 100000; i++) {
    const coordCand = nextCoordinates(coordinates, direction, grid);
    if (coordCand instanceof Array) {
      coordinates = coordCand;
      grid[coordinates[0]][coordinates[1]] = "$";
    } else if (coordCand === "done") {
      return false;
    } else {
      direction = nextDirection(direction);
    }
  }

  return true;
};

export const solve = (input: string) => {
  let grid = input
    .split("\n")
    .map((line) => line.split(""))
    .filter((line) => line.length != 0);
  let start = getStart(grid);
  grid[start[0]][start[1]] = "$";

  let result = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === "#") continue;
      let modifiedGrid = JSON.parse(JSON.stringify(grid));
      modifiedGrid[y][x] = "#";
      if (isLoop(modifiedGrid, start)) result++;
    }
  }

  return result;
};
