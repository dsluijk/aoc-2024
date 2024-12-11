export const solve = (input: string) => {
  let stones = new Map<number, number>();
  input.split(" ").forEach((stone) => {
    stones.set(Number(stone), 1);
  });

  const valueCache = new Map<number, number[]>();
  for (let i = 0; i < 75; i++) {
    const newStones = new Map<number, number>();

    stones.forEach((count, stone) => {
      let nextStones = valueCache.get(stone);

      if (!nextStones) {
        if (stone === 0) {
          nextStones = [1];
        } else if (Math.floor(Math.log10(stone) % 2) === 1) {
          const digits = (Math.floor(Math.log10(stone)) + 1) / 2;
          const border = 10 ** digits;
          nextStones = [Math.floor(stone / border), stone % border];
        } else {
          nextStones = [stone * 2024];
        }

        valueCache.set(stone, nextStones);
      }

      for (const nextKey of nextStones) {
        newStones.set(nextKey, count + (newStones.get(nextKey) ?? 0));
      }
    });

    stones = newStones;
  }

  let total = 0;
  stones.forEach((count) => {
    total += count;
  });

  return total;
};
