import { expect, test } from "bun:test";

import { solve } from "./2";

test("example", () => {
  const example = `1
2
3
2024`;

  expect(solve(example)).toBe(23);
});
