import { expect, test } from "bun:test";

import { solve } from "./1";

test("example", () => {
  const example = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

  expect(solve(example)).toBe(2);
});
