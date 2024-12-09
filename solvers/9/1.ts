export const solve = (input: string) => {
  const diskMap = input.split("");

  let fs: (number | ".")[] = [];
  for (let d = 0; d < diskMap.length; d += 2) {
    const id = d / 2;
    const dataLength = Number(diskMap[d] ?? 0);
    const freeLength = Number(diskMap[d + 1] ?? 0);

    for (let i = 0; i < dataLength; i++) {
      fs.push(id);
    }

    for (let i = 0; i < freeLength; i++) {
      fs.push(".");
    }
  }

  while (true) {
    const lastIndex = fs.findLastIndex((id) => id !== ".");
    const freeIndex = fs.findIndex((id) => id === ".");

    if (lastIndex === -1 || freeIndex === -1 || freeIndex > lastIndex) break;

    fs[freeIndex] = fs[lastIndex];
    fs[lastIndex] = ".";
  }

  let result = 0;
  for (let i = 0; i < fs.length; i++) {
    if (fs[i] === ".") continue;
    result += i * (fs[i] as number);
  }

  return result;
};
