export const solve = (input: string) => {
  const [_rawWires, rawGates] = input.split("\n\n");
  const gates = rawGates
    .split("\n")
    .map(
      (gate) =>
        gate.replace(" -> ", " ").split(" ") as [string, string, string, string]
    );

  const outSize = gates.filter((gate) => gate[3].startsWith("z")).length;
  const incorrect: string[] = [];

  for (let i = 0; i < outSize; i++) {
    const padded = i.toString().padStart(2, "0");
    const x = `x${padded}`;
    const y = `y${padded}`;

    const xor = gates.find(
      (gate) =>
        ((gate[0] === x && gate[2] === y) ||
          (gate[0] === y && gate[2] === x)) &&
        gate[1] === "XOR"
    );
    const and = gates.find(
      (gate) =>
        ((gate[0] === x && gate[2] === y) ||
          (gate[0] === y && gate[2] === x)) &&
        gate[1] === "AND"
    );
    const z = gates.find((instruction) => instruction[3] === `z${padded}`);

    if (xor === undefined || and === undefined || z === undefined) continue;
    if (z[1] !== "XOR") incorrect.push(z[3]);

    const or = gates.find((gate) => gate[0] === and[3] || gate[2] === and[3]);
    if (or !== undefined && or[1] !== "OR" && i > 0) {
      incorrect.push(and[3]);
    }

    const next = gates.find((gate) => gate[0] === xor[3] || gate[2] === xor[3]);
    if (next !== undefined && next[1] === "OR") {
      incorrect.push(xor[3]);
    }
  }

  incorrect.push(
    ...gates
      .filter(
        (gate) =>
          !(gate[0][0] === "x" || gate[0][0] === "y") &&
          gate[1] === "XOR" &&
          !(gate[2][0] === "x" || gate[2][0] === "y") &&
          !(gate[3][0] === "z")
      )
      .map((instruction) => instruction[3])
  );

  return incorrect.sort().join(",");
};
