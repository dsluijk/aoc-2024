const getCombo = (opperant: number, registers: [number, number, number]) => {
  if (opperant <= 3) return opperant;
  if (opperant >= 7) throw new Error("Invalid compo opperant.");

  return registers[opperant - 4];
};

const run = (registers: [number, number, number], program: number[]) => {
  let pc = 0;
  let outputs: number[] = [];

  while (true) {
    if (program[pc] === undefined) return outputs;

    switch (program[pc]) {
      case 0:
        registers[0] = Math.floor(
          registers[0] / Math.pow(2, getCombo(program[pc + 1], registers))
        );
        pc += 2;
        break;
      case 1:
        registers[1] = registers[1] ^ program[pc + 1];
        pc += 2;
        break;
      case 2:
        registers[1] = getCombo(program[pc + 1], registers) % 8;
        pc += 2;
        break;
      case 3:
        if (registers[0] === 0) {
          pc += 2;
          break;
        }
        pc = program[pc + 1];
        break;
      case 4:
        registers[1] = registers[1] ^ registers[2];
        pc += 2;
        break;
      case 5:
        outputs.push(getCombo(program[pc + 1], registers) % 8);
        pc += 2;
        break;
      case 6:
        registers[1] =
          registers[0] / Math.pow(2, getCombo(program[pc + 1], registers));
        pc += 2;
        break;
      case 7:
        registers[2] =
          registers[0] / Math.pow(2, getCombo(program[pc + 1], registers));
        pc += 2;
        break;
      default:
        throw new Error("Invalid opcode.");
    }
  }
};

const findA = (
  next: number,
  i: number,
  registers: [number, number, number],
  program: number[]
): number => {
  if (i < 0) return next;

  for (let a = next * 8; a < next * 8 + 8; a++) {
    registers[0] = a;
    const out = run(structuredClone(registers), program);
    if (out[0] === program[i]) {
      const finalVal = findA(a, i - 1, registers, program);
      if (finalVal >= 0) return finalVal;
    }
  }

  return -1;
};

export const solve = (input: string) => {
  const lines = input.split("\n");
  const regA = Number(lines[0].split(": ")[1]);
  const regB = Number(lines[1].split(": ")[1]);
  const regC = Number(lines[2].split(": ")[1]);
  const registers = [regA, regB, regC] as [number, number, number];
  const program = lines[4]
    .split(": ")[1]
    .split(",")
    .map((num) => Number(num));

  return findA(0, program.length - 1, registers, program);
};
