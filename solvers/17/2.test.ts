import { expect, test } from "bun:test";

import { solve } from "./2";

test("example", () => {
  const example = `Register A: 2024
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0`;

  expect(solve(example)).toBe(117440);
});
