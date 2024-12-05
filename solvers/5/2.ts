export const solve = (input: string) => {
  const parts = input.split("\n\n");
  const rules: { [k: string]: number[] } = parts[0]
    .split("\n")
    .map((r) => r.split("|").map((n) => Number(n)))
    .reduce((acc, v) => {
      if (!(v[0] in acc)) acc[v[0]] = [];
      acc[v[0]].push(v[1]);
      return acc;
    }, {} as any);
  const pages = parts[1]
    .split("\n")
    .map((r) => r.split(",").map((n) => Number(n)));

  let count = 0;
  for (let page of pages) {
    let valid = false;
    let wasInvalid = false;

    while (!valid) {
      valid = true;

      for (const [i, pageNumber] of page.entries()) {
        const needsBefore = Object.entries(rules)
          .filter((rule) => rule[1].findIndex((e) => e === pageNumber) >= 0)
          .map((r) => Number(r[0]));

        for (const req of needsBefore) {
          const ind = page.findIndex((v) => v === req);
          if (ind === -1) continue;
          if (ind > i) {
            valid = false;
            wasInvalid = true;
            page[i] = req;
            page[ind] = pageNumber;
            break;
          }
        }

        if (!valid) break;
      }
    }

    if (wasInvalid) count += page[Math.floor(page.length / 2)];
  }

  return count;
};
