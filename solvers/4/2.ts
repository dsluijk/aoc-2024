export const solve = (input: string) => {
  const grid = input.split("\n").map((line) => line.split(""));

  let valid = 0;
  for (let x = 1; x < grid.length - 1; x++) {
    for (let y = 1; y < grid[x].length - 1; y++) {
      if (grid[x][y] != "A") continue;

      if (grid[x + 1][y + 1] === grid[x - 1][y - 1]) continue;
      if (grid[x + 1][y - 1] === grid[x - 1][y + 1]) continue;

      if (grid[x + 1][y + 1] !== "M" && grid[x - 1][y - 1] !== "M") continue;
      if (grid[x + 1][y + 1] !== "S" && grid[x - 1][y - 1] !== "S") continue;
      if (grid[x + 1][y - 1] !== "M" && grid[x - 1][y + 1] !== "M") continue;
      if (grid[x + 1][y - 1] !== "S" && grid[x - 1][y + 1] !== "S") continue;
      valid++;
    }
  }

  return valid;
};
