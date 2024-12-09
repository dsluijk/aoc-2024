export const solve = (input: string) => {
  const diskMap = input.split("");

  let fs: [number | ".", number][] = [];
  for (let d = 0; d < diskMap.length; d += 2) {
    const id = d / 2;
    const dataLength = Number(diskMap[d] ?? 0);
    const freeLength = Number(diskMap[d + 1] ?? 0);

    fs.push([id, dataLength]);
    fs.push([".", freeLength]);
  }

  while (true) {
    let moved = false;
    for (let i = fs.length - 1; i >= 0; i--) {
      const block = fs[i];
      if (block[0] === ".") continue;

      for (let j = 0; j < fs.length; j++) {
        const freeBlock = fs[j];
        if (i < j) break;
        if (freeBlock[0] !== ".") continue;
        if (freeBlock[1] < block[1]) continue;

        moved = true;
        fs.splice(j, 1, [block[0], block[1]]);
        if (freeBlock[1] - block[1] > 0) {
          fs.splice(j + 1, 0, [".", freeBlock[1] - block[1]]);
          i++;
        }
        fs[i][0] = ".";
        break;
      }

      if (moved) break;
    }

    if (!moved) break;
  }

  let result = 0;
  let offset = 0;
  for (let i = 0; i < fs.length; i++) {
    for (let j = offset; j < offset + fs[i][1]; j++) {
      if (fs[i][0] === ".") break;
      result += j * (fs[i][0] as number);
    }
    offset += fs[i][1];
  }

  return result;
};
