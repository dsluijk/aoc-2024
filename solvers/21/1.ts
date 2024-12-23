type Directional = "^" | ">" | "v" | "<" | "A";
type Numeric = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "A";

const numericPositions = {
  "7": [0, 0],
  "8": [0, 1],
  "9": [0, 2],
  "4": [1, 0],
  "5": [1, 1],
  "6": [1, 2],
  "1": [2, 0],
  "2": [2, 1],
  "3": [2, 2],
  "0": [3, 1],
  A: [3, 2],
} as const;

const directionPositions = {
  A: [0, 2],
  "^": [0, 1],
  ">": [1, 2],
  v: [1, 1],
  "<": [1, 0],
} as const;

const getMoves = (
  from: keyof typeof directionPositions | keyof typeof numericPositions,
  to: keyof typeof directionPositions | keyof typeof numericPositions,
  depth: number
): Directional[][] => {
  if (from === to) return [["A"]];
  const positions = depth === 0 ? numericPositions : directionPositions;
  const startPos = positions[from as keyof typeof positions];
  const endPos = positions[to as keyof typeof positions];

  const q: [Directional[], [number, number]][] = [[[], [...startPos]]];

  let result: Directional[][] = [];
  let bestLength = Number.MAX_SAFE_INTEGER;
  while (true) {
    const top = q.shift();
    if (!top) break;

    for (const offset of [
      [-1, 0, "^"],
      [1, 0, "v"],
      [0, 1, ">"],
      [0, -1, "<"],
    ] as const) {
      const newCoord = [top[1][0] + offset[0], top[1][1] + offset[1]] as [
        number,
        number
      ];
      const validCoords = (Object.values(positions) as [number, number][]).some(
        (pos) => pos[0] === newCoord[0] && pos[1] === newCoord[1]
      );
      if (!validCoords) continue;

      const newSequence = [...top[0], offset[2]];
      if (bestLength < newSequence.length) continue;
      if (newCoord[0] === endPos[0] && newCoord[1] === endPos[1]) {
        result.push([...newSequence, "A"]);
        bestLength = newSequence.length + 1;
        continue;
      }

      q.push([newSequence, newCoord]);
    }
  }

  return result;
};

const minLength = (
  sequence: Directional[] | Numeric[],
  limit: number = 2,
  depth: number = 0
): number => {
  let total = 0;
  let currentChar: Directional | Numeric = "A";
  for (const char of sequence) {
    const moves = getMoves(currentChar, char, depth);

    if (depth >= limit) {
      total += moves[0].length;
      currentChar = char;
      continue;
    }

    let minimum = Number.MAX_SAFE_INTEGER;
    for (const move of moves) {
      minimum = Math.min(minimum, minLength(move, limit, depth + 1));
    }

    total += minimum;
    currentChar = char;
  }

  return total;
};

export const solve = (input: string) => {
  const lines = input.split("\n");

  let totalComplexity = 0;
  for (const line of lines) {
    const length = minLength(line.split("") as Numeric[], 2, 0);
    totalComplexity += Number(line.replaceAll("A", "")) * length;
  }

  return totalComplexity;
};
