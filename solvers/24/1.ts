export const solve = (input: string) => {
  const [rawWires, rawGates] = input.split("\n\n");
  let wires: { [gate: string]: boolean | null } = Object.fromEntries(
    rawWires
      .split("\n")
      .map((wire) => wire.split(": "))
      .map((wire) => [wire[0], wire[1] === "1"])
  );
  const gates = rawGates
    .split("\n")
    .map((gate) => gate.replace(" -> ", " ").split(" "));

  for (const gate of gates) {
    if (wires[gate[0]] === undefined) wires[gate[0]] = null;
    if (wires[gate[2]] === undefined) wires[gate[2]] = null;
    if (wires[gate[3]] === undefined) wires[gate[3]] = null;
  }

  while (true) {
    const zWires = Object.entries(wires).filter((gate) =>
      gate[0].startsWith("z")
    );

    let complete = true;
    for (const zWire of zWires) {
      if (zWire[1] === null) complete = false;
    }

    if (complete) {
      return parseInt(
        zWires
          .sort((a, b) => Number(b[0].slice(1)) - Number(a[0].slice(1)))
          .map((zWire) => (zWire[1] ? 1 : 0))
          .join(""),
        2
      );
    }

    for (const gate of gates) {
      if (wires[gate[0]] === null) continue;
      if (wires[gate[2]] === null) continue;
      if (wires[gate[3]] !== null) continue;

      const a = wires[gate[0]] as boolean;
      const b = wires[gate[2]] as boolean;
      let value = false;
      switch (gate[1]) {
        case "AND":
          value = a && b;
          break;
        case "OR":
          value = a || b;
          break;
        case "XOR":
          value = a !== b;
          break;
      }
      wires[gate[3]] = value;
    }
  }
};
