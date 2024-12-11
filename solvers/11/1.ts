export const solve = (input: string) => {
  let stones = input.split(" ").map((c) => Number(c));

  for (let i = 0; i < 25; i++) {
    let newStones = [];

    for (let j = 0; j < stones.length; j++) {
      if (stones[j] === 0) {
        newStones.push(1);
        continue;
      }

      if (stones[j].toString().length % 2 === 0) {
        newStones.push(
          Number(stones[j].toString().slice(0, stones[j].toString().length / 2))
        );
        newStones.push(
          Number(
            stones[j]
              .toString()
              .slice(
                stones[j].toString().length / 2,
                stones[j].toString().length
              )
          )
        );
        continue;
      }

      newStones.push(stones[j] * 2024);
    }

    stones = newStones;
  }

  return stones.length;
};
