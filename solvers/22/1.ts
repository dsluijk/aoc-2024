export const solve = (input: string) => {
  const lines = input.split("\n");

  let count = 0n;
  for (const line of lines) {
    let secret = BigInt(line);

    for (let i = 0; i < 2000; i++) {
      secret = ((secret * 64n) ^ secret) % 16777216n;
      secret = ((secret / 32n) ^ secret) % 16777216n;
      secret = ((secret * 2048n) ^ secret) % 16777216n;
    }

    count += secret;
  }

  return Number(count);
};
