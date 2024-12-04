import { expect, test } from "bun:test";

import { solve } from "./2";

test("example", () => {
  const example = `3   4
4   3
2   5
1   3
3   9
3   3`;

  expect(solve(example)).toBe(31);
});
