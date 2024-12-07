const getTotals = (numbers: number[], searchValue: number): number[] => {
  if (numbers.length == 0) return [];
  if (numbers.length == 1) return numbers;

  const rest = getTotals(numbers.slice(0, -1), searchValue);
  return [
    ...rest.map((v) => v + numbers[numbers.length - 1]),
    ...rest.map((v) => v * numbers[numbers.length - 1]),
  ].filter((v) => v <= searchValue);
};

export const solve = (input: string) => {
  const lines = input.split("\n");

  let count = 0;
  for (const line of lines) {
    const numbers = line
      .replace(":", "")
      .split(" ")
      .map((n) => Number(n));
    const result = numbers[0];
    const values = getTotals(numbers.slice(1), result);

    if (values.filter((v) => v === result).length >= 1) count += result;
  }

  return count;
};
