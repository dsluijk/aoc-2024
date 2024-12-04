export const solve = (input: string) => {
  const grid = input.split("\n").map((line) => line.split(""));

  let valid = 0;
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      if (grid[x][y] != "X") continue;

      for (let xDir of [-1, 0, 1]) {
        for (let yDir of [-1, 0, 1]) {
          if (xDir === 0 && yDir === 0) continue;

          try {
            const M = grid[x + xDir * 1][y + yDir * 1];
            const A = grid[x + xDir * 2][y + yDir * 2];
            const S = grid[x + xDir * 3][y + yDir * 3];

            if (!M || !A || !S) continue;
            if (M !== "M" || A !== "A" || S !== "S") continue;
            valid++;
          } catch {}
        }
      }
    }
  }

  return valid;
};
