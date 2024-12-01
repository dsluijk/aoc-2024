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
  for (let i = 0; i < left.length; i++) {
    diff += Math.abs(left[i] - right[i]);
  }

  return diff;
};
