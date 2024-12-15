type Char = "#" | "." | "O" | "[" | "]" | "@";
type Move = "^" | ">" | "v" | "<";

const findStart = (grid: Char[][]): [number, number] | undefined => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === "@") return [y, x];
    }
  }
};

const nextPos = (pos: [number, number], dir: Move) => {
  let next = [pos[0], pos[1]] as [number, number];
  if (dir === "^") next[0]--;
  if (dir === ">") next[1]++;
  if (dir === "v") next[0]++;
  if (dir === "<") next[1]--;

  return next;
};

const makeSpace = (grid: Char[][], pos: [number, number], dir: Move) => {
  let newPos = nextPos(pos, dir);

  if (grid[pos[0]][pos[1]] === "[" && (dir === "^" || dir === "v")) {
    grid[pos[0]][pos[1]] = ".";
    makeSpace(grid, newPos, dir);
    makeSpace(grid, [pos[0], pos[1] + 1], dir);
    grid[newPos[0]][newPos[1]] = "[";
    return;
  }

  if (grid[pos[0]][pos[1]] === "]" && (dir === "^" || dir === "v")) {
    grid[pos[0]][pos[1]] = ".";
    makeSpace(grid, newPos, dir);
    makeSpace(grid, [pos[0], pos[1] - 1], dir);
    grid[newPos[0]][newPos[1]] = "]";
    return;
  }

  if (
    (grid[pos[0]][pos[1]] === "[" || grid[pos[0]][pos[1]] === "]") &&
    (dir === "<" || dir === ">")
  ) {
    makeSpace(grid, newPos, dir);
    grid[newPos[0]][newPos[1]] = grid[pos[0]][pos[1]];
    grid[pos[0]][pos[1]] = ".";
    return;
  }
};

const canMove = (grid: Char[][], pos: [number, number], dir: Move): boolean => {
  let newPos = nextPos(pos, dir);

  if (grid[newPos[0]][newPos[1]] === ".") {
    return true;
  }

  if (grid[newPos[0]][newPos[1]] === "[") {
    return (
      canMove(grid, newPos, dir) &&
      (dir !== "<" ? canMove(grid, [newPos[0], newPos[1] + 1], dir) : true)
    );
  }

  if (grid[newPos[0]][newPos[1]] === "]") {
    return (
      canMove(grid, newPos, dir) &&
      (dir !== ">" ? canMove(grid, [newPos[0], newPos[1] - 1], dir) : true)
    );
  }

  return false;
};

export const solve = (input: string) => {
  const [gridString, movesString] = input.split("\n\n");
  const grid = gridString
    .replaceAll("#", "##")
    .replaceAll("O", "[]")
    .replaceAll(".", "..")
    .replaceAll("@", "@.")
    .split("\n")
    .map((line) => line.split("") as Char[]);
  const moves = movesString.replaceAll("\n", "").split("") as Move[];

  let position = findStart(grid);
  if (!position) throw new Error("Start not found.");

  for (const move of moves) {
    if (!canMove(grid, position, move)) continue;
    makeSpace(grid, nextPos(position, move), move);

    grid[position[0]][position[1]] = ".";
    position = nextPos(position, move);
    grid[position[0]][position[1]] = "@";
  }

  let count = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] !== "[") continue;

      count += y * 100 + x;
    }
  }

  return count;
};
