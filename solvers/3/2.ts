export const solve = (input: string) => {
  const dos = input
    .matchAll(/do\(\)/g)
    .map((v) => v.index)
    .toArray();
  const donts = input
    .matchAll(/don\'t\(\)/g)
    .map((v) => v.index)
    .toArray();

  let result = 0;
  const matches = input.matchAll(/mul\([0-9]*,[0-9]*\)/g);
  for (let match of matches) {
    const maxDo = Math.max.apply(
      Math,
      dos.filter((el) => el < match.index)
    );
    const maxDont = Math.max.apply(
      Math,
      donts.filter((el) => el < match.index)
    );
    if (maxDont > maxDo) continue;

    const a = Number(match[0].split(",")[0].split("(")[1]);
    const b = Number(match[0].split(",")[1].split(")")[0]);
    result += a * b;
  }

  return result;
};
