import { expect, test } from "bun:test";

import { solve } from "./2";

test("example", () => {
  const example =
    "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

  expect(solve(example)).toBe(48);
});
