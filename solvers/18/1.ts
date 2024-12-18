import { MinPriorityQueue } from "@datastructures-js/priority-queue";

const WIDTH = process.env.NODE_ENV === "test" ? 6 : 70;
const HEIGHT = process.env.NODE_ENV === "test" ? 6 : 70;
const STEPS = process.env.NODE_ENV === "test" ? 12 : 1024;

type Char = "#" | ".";

interface Path {
  x: number;
  y: number;
  length: number;
}

const getSurroundings = (grid: Char[][], path: Path): Path[] => {
  let result: Path[] = [];

  for (const around of [
    [path.x + 1, path.y],
    [path.x - 1, path.y],
    [path.x, path.y + 1],
    [path.x, path.y - 1],
  ] as [number, number][]) {
    if (around[0] < 0 || around[1] < 0) continue;
    if (around[0] > WIDTH || around[1] > HEIGHT) continue;
    if (grid[around[0]][around[1]] === "#") continue;

    result.push({ x: around[0], y: around[1], length: path.length + 1 });
  }

  return result;
};

export const solve = (input: string) => {
  const bytes = input.split("\n").map((line) => line.split(",").map(Number));

  const grid: Char[][] = [];
  for (let x = 0; x <= WIDTH; x++) {
    grid[x] = [];

    for (let y = 0; y <= HEIGHT; y++) {
      grid[x][y] = ".";
    }
  }

  for (const [i, byte] of bytes.entries()) {
    if (i >= STEPS) break;
    grid[byte[0]][byte[1]] = "#";
  }

  const pq = new MinPriorityQueue<Path>((path) => path.length);
  const colored = new Set<string>();
  pq.enqueue({
    x: 0,
    y: 0,
    length: 0,
  });

  while (true) {
    const path = pq.dequeue();
    if (!path) throw new Error("Unexpected end of queue! No Path found");
    if (colored.has(`${path.y},${path.x}`)) continue;
    if (path.y === WIDTH && path.x === HEIGHT) return path.length;

    for (const surround of getSurroundings(grid, path)) {
      pq.push(surround);
    }
    colored.add(`${path.y},${path.x}`);
  }
};
