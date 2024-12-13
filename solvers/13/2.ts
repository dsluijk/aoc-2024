export const solve = (input: string) => {
  const inputs = input.split("\n\n");

  let totalCost = 0;
  for (const input of inputs) {
    const controls = input.split("\n");
    const a = controls[0]
      .replace("Button A: X+", "")
      .split(", Y+")
      .map((coord) => Number(coord)) as [number, number];
    const b = controls[1]
      .replace("Button B: X+", "")
      .split(", Y+")
      .map((coord) => Number(coord)) as [number, number];
    const prize = controls[2]
      .replace("Prize: X=", "")
      .split(", Y=")
      .map((coord) => Number(coord) + 10000000000000) as [number, number];

    const d = a[0] * b[1] - b[0] * a[1];
    const aDivis =
      a[0] > prize[0] ? prize[0] % a[0] === 0 : a[0] % prize[0] === 0;
    const bDivis =
      a[1] > prize[1] ? prize[1] % a[1] === 0 : a[1] % prize[1] === 0;
    if (d === 0 && !(aDivis && bDivis)) {
      continue;
    }

    const aVal = (b[1] * prize[0] + -b[0] * prize[1]) / d;
    const bVal = (-a[1] * prize[0] + a[0] * prize[1]) / d;

    if (
      aVal >= 0 &&
      bVal >= 0 &&
      Math.round(aVal) === aVal &&
      Math.round(bVal) === bVal
    ) {
      totalCost += aVal * 3 + bVal;
    }
  }

  return totalCost;
};
