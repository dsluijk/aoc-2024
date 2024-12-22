export const solve = (input: string) => {
  const lines = input.split("\n");
  let allSequences: { [sequence: string]: number } = {};

  for (const line of lines) {
    let secret = BigInt(line);
    let prevPrice = Number(line) % 10;
    let changeStreak = [];
    let sellSequences: { [sequence: string]: number } = {};

    for (let i = 0; i < 2000; i++) {
      secret = ((secret * 64n) ^ secret) % 16777216n;
      secret = ((secret / 32n) ^ secret) % 16777216n;
      secret = ((secret * 2048n) ^ secret) % 16777216n;

      let price = Number(secret) % 10;

      if (prevPrice === price) {
        changeStreak = [];
        continue;
      }

      changeStreak.push(price - prevPrice);
      prevPrice = price;
      if (changeStreak.length <= 3) continue;

      let lastStreak = changeStreak.slice(-4).join(",");
      if (sellSequences[lastStreak] !== undefined) continue;
      sellSequences[lastStreak] = price;
    }

    for (const [sequence, price] of Object.entries(sellSequences)) {
      if (allSequences[sequence] === undefined) allSequences[sequence] = 0;

      allSequences[sequence] += price;
    }
  }

  return Math.max(...Object.values(allSequences));
};
