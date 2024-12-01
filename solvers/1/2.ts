export const solve = (input: string) => {
  const lines = input.split("\n");
  const left = [];
  const right = [];

  for (const line of lines) {
    const [a, b] = line.split("   ");
    left.push(Number(a));
    right.push(Number(b));
  }

  left.sort();
  right.sort();

  let diff = 0;
  for (const a of left) {
    let occurance = 0;
    for (const b of right) {
      if (a == b) occurance++;
    }

    diff += a * occurance;
  }

  return diff;
};
