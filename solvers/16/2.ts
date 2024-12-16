import { MinPriorityQueue } from "@datastructures-js/priority-queue";

type Char = "#" | "." | "S" | "E";
type Direction = "N" | "E" | "S" | "W";

interface Path {
  x: number;
  y: number;
  cost: number;
  direction: Direction;
  pathStrings: string[];
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

    result.push({
      y: around[0],
      x: around[1],
      cost,
      direction: around[2],
      pathStrings: [`${around[0]},${around[1]}`, ...path.pathStrings],
    });
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
  const otherPaths: Path[] = [];
  for (const surrounding of getSurroundings(grid, {
    y: start[0],
    x: start[1],
    cost: 0,
    direction: "E",
    pathStrings: [`${start[0]},${start[1]}`],
  })) {
    pq.enqueue(surrounding);
  }

  let bestCost = Number.MAX_SAFE_INTEGER;
  const bestPaths = new Set<string>();
  const shortestTo: { [key: string]: number } = {};
  while (true) {
    const path = pq.dequeue();
    if (!path && bestCost < Number.MAX_SAFE_INTEGER) return bestPaths.size;
    if (!path && bestCost === Number.MAX_SAFE_INTEGER)
      throw new Error("Unexpected end of queue! No Path found");
    const posEncode = `${path.y},${path.x},${path.direction}`;
    if (shortestTo[posEncode] && shortestTo[posEncode] < path.cost) continue;

    if (path.y === end[0] && path.x === end[1]) {
      if (path.cost > bestCost) return bestPaths.size;
      if (bestCost === Number.MAX_SAFE_INTEGER) {
        bestCost = path.cost;
        for (const other of otherPaths) {
          pq.push(other);
        }
      }

      for (const pathEntry of path.pathStrings) {
        bestPaths.add(pathEntry);
      }
    }

    shortestTo[posEncode] = path.cost;
    const surroundings = getSurroundings(grid, path);
    for (const surround of surroundings) {
      if (surround.cost > bestCost) continue;
      pq.push(surround);
    }
  }
};
