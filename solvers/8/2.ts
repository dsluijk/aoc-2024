type Coordinate = [number, number];

const sameCoords = (a: Coordinate, b: Coordinate) => {
  return a[0] === b[0] && a[1] && b[1];
};

const antinodes = (
  a: Coordinate,
  b: Coordinate,
  gridSize: [number, number]
): Coordinate[] => {
  const dir: Coordinate = [b[0] - a[0], b[1] - a[1]];

  const nodes: Coordinate[] = [];
  for (let i = 1; i <= 99999; i++) {
    let hasNode = false;
    const scaledDir: Coordinate = [dir[0] * i, dir[1] * i];
    const coordA: Coordinate = [a[0] - scaledDir[0], a[1] - scaledDir[1]];
    const coordB: Coordinate = [b[0] + scaledDir[0], b[1] + scaledDir[1]];

    if (
      coordA[0] >= 0 &&
      coordA[1] >= 0 &&
      coordA[0] <= gridSize[0] &&
      coordA[1] <= gridSize[1]
    ) {
      nodes.push(coordA);
      hasNode = true;
    }
    if (
      coordB[0] >= 0 &&
      coordB[1] >= 0 &&
      coordB[0] <= gridSize[0] &&
      coordB[1] <= gridSize[1]
    ) {
      nodes.push(coordB);
      hasNode = true;
    }

    if (!hasNode) break;
  }

  return nodes;
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
        const possibleAntinodes = antinodes(antennaCoord, otherAntennaCoord, [
          grid.length,
          grid[0].length,
        ]);

        for (const possible of possibleAntinodes) {
          if (possible[0] < 0 || possible[1] < 0) continue;
          if (possible[0] >= grid.length || possible[1] >= grid[0].length)
            continue;

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
