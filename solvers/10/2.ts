type Coordinate = [number, number];

const countTrailhead = (
  grid: number[][],
  currentLocation: Coordinate,
  height: number
): Coordinate[] => {
  if (height === 9) return [currentLocation];

  const up = [currentLocation[0] - 1, currentLocation[1]];
  const right = [currentLocation[0], currentLocation[1] + 1];
  const down = [currentLocation[0] + 1, currentLocation[1]];
  const left = [currentLocation[0], currentLocation[1] - 1];

  let ends: Coordinate[] = [];
  for (const adjacent of [up, right, down, left] as Coordinate[]) {
    if (adjacent[0] < 0 || adjacent[1] < 0) continue;
    if (adjacent[0] >= grid.length || adjacent[1] >= grid[0].length) continue;
    if (grid[adjacent[0]][adjacent[1]] !== height + 1) continue;

    ends = ends.concat(countTrailhead(grid, adjacent, height + 1));
  }

  return ends;
};

export const solve = (input: string) => {
  const grid = input
    .split("\n")
    .map((l) => l.split("").map((c) => Number(c)))
    .filter((l) => l.length > 0);

  let count = 0;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] !== 0) continue;
      const ends = countTrailhead(grid, [y, x], 0);

      count += ends.length;
    }
  }

  return count;
};
