import { expect, test } from "bun:test";

import { solve } from "./1";

test("example", () => {
  const example = `1
10
100
2024`;

  expect(solve(example)).toBe(37327623);
});
