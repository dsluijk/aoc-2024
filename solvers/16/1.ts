import { MinPriorityQueue } from "@datastructures-js/priority-queue";

type Char = "#" | "." | "S" | "E";
type Direction = "N" | "E" | "S" | "W";

interface Path {
  x: number;
  y: number;
  cost: number;
  direction: Direction;
}

const find = (grid: Char[][], toFind: string): [number, number] | undefined => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === toFind) return [y, x];
    }
  }
};

const getSurroundings = (grid: Char[][], path: Path): Path[] => {
  let result: Path[] = [];

  for (const around of [
    [path.y + 1, path.x, "N"],
    [path.y - 1, path.x, "S"],
    [path.y, path.x + 1, "E"],
    [path.y, path.x - 1, "W"],
  ] as [number, number, Direction][]) {
    if (grid[around[0]][around[1]] === "#") continue;
    if (
      (path.direction === "N" && around[2] === "S") ||
      (path.direction === "S" && around[2] === "N")
    )
      continue;
    if (
      (path.direction === "E" && around[2] === "W") ||
      (path.direction === "W" && around[2] === "E")
    )
      continue;

    let cost = path.cost + 1;
    if (path.direction !== around[2]) cost += 1000;

    result.push({ y: around[0], x: around[1], cost, direction: around[2] });
  }

  return result;
};

export const solve = (input: string) => {
  const grid = input.split("\n").map((line) => line.split("") as Char[]);
  const start = find(grid, "S");
  const end = find(grid, "E");
  if (!start) throw new Error("No start found");
  if (!end) throw new Error("No end found");

  const pq = new MinPriorityQueue<Path>((path) => path.cost);
  const colored = new Set<string>();
  for (const surrounding of getSurroundings(grid, {
    y: start[0],
    x: start[1],
    cost: 0,
    direction: "E",
  })) {
    pq.enqueue(surrounding);
  }

  while (true) {
    const path = pq.dequeue();
    if (!path) throw new Error("Unexpected end of queue! No Path found");
    if (colored.has(`${path.y},${path.x}`)) continue;
    if (path.y === end[0] && path.x === end[1]) return path.cost;

    const surroundings = getSurroundings(grid, path);
    for (const surround of surroundings) {
      pq.push(surround);
    }
    colored.add(`${path.y},${path.x}`);
  }
};
