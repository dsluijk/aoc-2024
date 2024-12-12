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

const getPerimeter = (coordinates: Coordinate[]): number => {
  let borders: Coordinate[] = [];

  for (const coordinate of coordinates) {
    for (const border of [
      [coordinate[0] - 1, coordinate[1]],
      [coordinate[0], coordinate[1] + 1],
      [coordinate[0] + 1, coordinate[1]],
      [coordinate[0], coordinate[1] - 1],
    ] as Coordinate[]) {
      let valid = true;
      for (const otherCoord of coordinates) {
        if (otherCoord[0] === border[0] && otherCoord[1] === border[1]) {
          valid = false;
          break;
        }
      }

      if (valid) {
        borders.push(border);
      }
    }
  }

  return borders.length;
};

export const solve = (input: string) => {
  const grid = input.split("\n").map((line) => line.split(""));

  let price = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const searchString = grid[y][x];
      if (searchString === ".") continue;

      const area = getArea(searchString, [y, x], grid);
      const perimeter = getPerimeter(area);

      price += area.length * perimeter;
    }
  }

  return price;
};
