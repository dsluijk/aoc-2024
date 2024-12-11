export const solve = (input: string) => {
  let stones: { [key: string]: number } = input
    .split(" ")
    .reduce((a, v) => ({ ...a, [v]: 1 }), {});

  let nextValues: { [key: string]: string[] } = {};
  for (let i = 0; i < 75; i++) {
    let newStones: { [key: string]: number } = {};

    for (let [key, value] of Object.entries(stones)) {
      let nextKeys = [];

      if (key in nextValues) {
        nextKeys = nextValues[key];
      } else {
        if (key === "0") {
          nextKeys = ["1"];
        } else if (key.length % 2 === 0) {
          nextKeys = [
            key.slice(0, key.length / 2),
            key.slice(key.length / 2, key.length),
          ];
        } else {
          nextKeys = [(Number(key) * 2024).toString()];
        }

        nextValues[key] = nextKeys;
      }

      for (const nextKey of nextKeys) {
        const normalizedKey = Number(nextKey).toString();
        if (!(normalizedKey in newStones)) {
          newStones[normalizedKey] = value;
        } else {
          newStones[normalizedKey] += value;
        }
      }
    }

    stones = newStones;
  }

  let count = 0;
  for (let key in stones) {
    count += stones[key];
  }

  return count;
};
