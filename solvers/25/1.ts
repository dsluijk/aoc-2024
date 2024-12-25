export const solve = (input: string) => {
  const schematics = input.split("\n\n");

  const locks = [];
  const keys = [];

  for (const schematic of schematics) {
    const splitted = schematic.split("\n").map((line) => line.split(""));
    const heights = splitted[0]
      .map((_, i) => splitted.map((line) => line[i]).join(""))
      .map((line) => (line.match(/\#/g) || []).length - 1);

    if (schematic[0][0] === "#") {
      locks.push(heights);
    } else {
      keys.push(heights);
    }
  }

  let fits = 0;
  for (const lock of locks) {
    for (const key of keys) {
      let valid = true;
      for (let i = 0; i < lock.length; i++) {
        if (lock[i] + key[i] > 5) {
          valid = false;
          break;
        }
      }

      if (valid) fits++;
    }
  }

  return fits;
};
