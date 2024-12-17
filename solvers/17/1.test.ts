import { expect, test } from "bun:test";

import { solve } from "./1";

test("example", () => {
  const example = `Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`;

  expect(solve(example)).toBe("4,6,3,5,6,3,5,2,1,0");
});
