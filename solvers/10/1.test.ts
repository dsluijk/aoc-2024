import { expect, test } from "bun:test";

import { solve } from "./1";

test("example", () => {
  const example = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;

  expect(solve(example)).toBe(36);
});
