const isValid = (input: number[]): boolean => {
  if (
    !(
      input.toSorted((a, b) => a - b).every((val, i) => val == input[i]) ||
      input
        .toSorted((a, b) => a - b)
        .toReversed()
        .every((val, i) => val == input[i])
    )
  )
    return false;

  if (
    !input.every((val, i) =>
      i > 0
        ? Math.abs(val - input[i - 1]) <= 3 && Math.abs(val - input[i - 1]) > 0
        : true
    )
  )
    return false;

  return true;
};

export const solve = (input: string) => {
  const lines = input.split("\n");

  let safeReports = 0;
  for (const line of lines) {
    const input = line.split(" ").map((el) => Number(el));

    if (isValid(input)) safeReports += 1;
  }

  return safeReports;
};
