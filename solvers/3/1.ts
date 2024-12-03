export const solve = (input: string) => {
  let result = 0;
  const matches = input.matchAll(/mul\([0-9]*,[0-9]*\)/g);
  for (let match of matches) {
    const a = Number(match[0].split(",")[0].split("(")[1]);
    const b = Number(match[0].split(",")[1].split(")")[0]);
    result += a * b;
  }

  return result;
};
