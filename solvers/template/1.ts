export const solve = (input: string) => {
  const lines = input.split("\n");

  let count = 0;
  for (const line of lines) {
    count++;
  }

  return count;
};
