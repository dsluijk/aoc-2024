type Coordinate = [number, number];

const sameCoords = (a: Coordinate, b: Coordinate) => {
  return a[0] === b[0] && a[1] && b[1];
};

const antinodes = (a: Coordinate, b: Coordinate): Coordinate[] => {
  if (sameCoords(a, b)) return [];
  const dir: Coordinate = [b[0] - a[0], b[1] - a[1]];

  return [
    [a[0] - dir[0], a[1] - dir[1]],
    [b[0] + dir[0], b[1] + dir[1]],
  ];
};

export const solve = (input: string) => {
  const grid = input
    .split("\n")
    .map((l) => l.split(""))
    .filter((l) => l.length > 0);

  const antennas: { [type: string]: Coordinate[] } = {};
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === ".") continue;
      const type = grid[y][x];
      if (type === " ") continue;
      if (!(type in antennas)) antennas[type] = [];
      antennas[type].push([y, x]);
    }
  }

  const nodes = [];
  for (const antenna of Object.keys(antennas)) {
    const coordinates = antennas[antenna];

    for (const antennaCoord of coordinates) {
      for (const otherAntennaCoord of coordinates) {
        const possibleAntinodes = antinodes(antennaCoord, otherAntennaCoord);

        for (const possible of possibleAntinodes) {
          if (possible[0] < 0 || possible[1] < 0) continue;
          if (possible[0] >= grid.length || possible[1] >= grid[0].length)
            continue;

          if (grid[possible[0]][possible[1]] === antenna) continue;
          let valid = true;
          for (const existing of nodes) {
            if (existing[0] === possible[0] && existing[1] === possible[1]) {
              valid = false;
              break;
            }
          }

          if (!valid) continue;
          nodes.push(possible);
        }
      }
    }
  }

  return nodes.length;
};
