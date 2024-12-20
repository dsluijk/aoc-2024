type Char = number | "#" | "." | "S" | "E";

const find = (grid: Char[][], toFind: string): [number, number] | undefined => {
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      if (grid[x][y] === toFind) return [x, y];
    }
  }
};

export const solve = (input: string) => {
  const grid = input.split("\n").map((line) => line.split("") as Char[]);
  const start = find(grid, "S");
  const end = find(grid, "E");
  if (!start) throw new Error("No start found");
  if (!end) throw new Error("No end found");

  grid[end[0]][end[1]] = 0;
  const q = [end];
  while (true) {
    const coords = q.shift();
    if (!coords) break;
    const currDist = grid[coords[0]][coords[1]] as number;

    for (const offset of [
      [-1, 0],
      [1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const around = [coords[0] + offset[0], coords[1] + offset[1]] as [
        number,
        number
      ];
      const currValue = grid[around[0]][around[1]];
      if (currValue === "#") continue;
      if (typeof currValue === "number" && currValue <= currDist) continue;

      grid[around[0]][around[1]] = currDist + 1;
      q.push(around);
    }
  }

  const skips: number[] = [];
  for (let xStart = 1; xStart < grid.length - 1; xStart++) {
    for (let yStart = 1; yStart < grid[xStart].length - 1; yStart++) {
      if (grid[xStart][yStart] === "#") continue;
      const startVal = grid[xStart][yStart] as number;

      for (let xOffset = -20; xOffset <= 20; xOffset++) {
        for (let yOffset = -20; yOffset <= 20; yOffset++) {
          const distance = Math.abs(xOffset) + Math.abs(yOffset);
          if (distance > 20 || distance === 0) continue;
          const xEnd = xStart + xOffset;
          const yEnd = yStart + yOffset;
          if (xEnd < 0 || xEnd >= grid.length) continue;
          if (yEnd < 0 || yEnd >= grid[xEnd].length) continue;
          if (grid[xEnd][yEnd] === "#") continue;
          const endVal = grid[xEnd][yEnd] as number;

          const skip = startVal - endVal - distance;
          if (skip <= 0) continue;

          skips.push(skip);
        }
      }
    }
  }

  return skips.filter((skip) => skip >= 100).length;
};
