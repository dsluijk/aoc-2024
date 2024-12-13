export const solve = (input: string) => {
  const inputs = input.split("\n\n");

  let count = 0;
  for (const input of inputs) {
    const controls = input.split("\n");
    const a = controls[0]
      .replace("Button A: X+", "")
      .split(", Y+")
      .map((coord) => Number(coord));
    const b = controls[1]
      .replace("Button B: X+", "")
      .split(", Y+")
      .map((coord) => Number(coord));
    const prize = controls[2]
      .replace("Prize: X=", "")
      .split(", Y=")
      .map((coord) => Number(coord));

    let bestScore = Infinity;
    let current = 0;
    while (true) {
      let prizeRem = [prize[0] - a[0] * current, prize[1] - a[1] * current];
      if (prizeRem[0] < 0 || prizeRem[1] < 0) break;

      let bCount = [prizeRem[0] / b[0], prizeRem[1] / b[1]];
      if (bCount[0] === bCount[1] && bCount[0] === Math.floor(bCount[0])) {
        let score = current * 3 + bCount[0];
        if (score < bestScore) {
          bestScore = score;
        }
      }

      current++;
    }

    if (bestScore !== Infinity) {
      count += bestScore;
    }
  }

  return count;
};
