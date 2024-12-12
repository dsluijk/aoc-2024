type Coordinate = [number, number];

const getArea = (
  searchString: string,
  coordinate: Coordinate,
  grid: string[][]
): Coordinate[] => {
  if (coordinate[0] >= grid.length || coordinate[1] >= grid[0].length)
    return [];
  if (coordinate[0] < 0 || coordinate[1] < 0) return [];
  if (grid[coordinate[0]][coordinate[1]] !== searchString) return [];
  grid[coordinate[0]][coordinate[1]] = ".";

  let result = [coordinate];
  result = result.concat(
    getArea(searchString, [coordinate[0] - 1, coordinate[1]], grid)
  );
  result = result.concat(
    getArea(searchString, [coordinate[0], coordinate[1] + 1], grid)
  );
  result = result.concat(
    getArea(searchString, [coordinate[0] + 1, coordinate[1]], grid)
  );
  result = result.concat(
    getArea(searchString, [coordinate[0], coordinate[1] - 1], grid)
  );

  return result;
};

const isFilled = (
  coordinate: Coordinate,
  coordinates: Coordinate[]
): boolean => {
  for (const otherCoordinate of coordinates) {
    if (
      coordinate[0] === otherCoordinate[0] &&
      coordinate[1] === otherCoordinate[1]
    )
      return true;
  }

  return false;
};

const getSides = (
  coordinates: Coordinate[],
  gridSize: [number, number]
): number => {
  let count = 0;
  for (let y = -1; y <= gridSize[0]; y++) {
    for (let x = -1; x <= gridSize[1]; x++) {
      for (const dir of [
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1],
      ] as Coordinate[]) {
        const origin = isFilled([y, x], coordinates);
        const corner = isFilled([y + dir[0], x + dir[1]], coordinates);
        const bottom = isFilled([y + dir[0], x], coordinates);
        const right = isFilled([y, x + dir[1]], coordinates);

        if (origin === corner) {
          if (origin && origin !== bottom && origin !== right) {
            count++;
          }
          continue;
        }
        if (origin !== bottom) continue;
        if (origin !== right) continue;
        count++;
      }
    }
  }

  return count;
};

export const solve = (input: string) => {
  const grid = input.split("\n").map((line) => line.split(""));

  let price = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const searchString = grid[y][x];
      if (searchString === ".") continue;

      const area = getArea(searchString, [y, x], grid);
      const sides = getSides(area, [grid.length, grid[0].length]);

      price += area.length * sides;
    }
  }

  return price;
};
