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
  for (let x = 1; x < grid.length - 1; x++) {
    for (let y = 1; y < grid[x].length - 1; y++) {
      if (grid[x][y] !== "#") continue;

      for (const aOffset of [
        [-1, 0],
        [1, 0],
        [0, 1],
        [0, -1],
      ]) {
        const aCoords = [x + aOffset[0], y + aOffset[1]] as [number, number];
        let aVal = grid[aCoords[0]][aCoords[1]];
        if (aVal === "#") continue;
        aVal = aVal as number;

        for (const bOffset of [
          [-1, 0],
          [1, 0],
          [0, 1],
          [0, -1],
        ]) {
          const bCoords = [x + bOffset[0], y + bOffset[1]] as [number, number];
          let bVal = grid[bCoords[0]][bCoords[1]];
          if (bVal === "#") continue;
          bVal = bVal as number;
          if (aCoords[0] === bCoords[0] && aCoords[1] === bCoords[1]) continue;
          if (aVal - 2 <= bVal) continue;

          const skip = aVal - bVal - 2;
          skips.push(skip);
        }
      }
    }
  }

  return skips.filter((skip) => skip >= 100).length;
};
