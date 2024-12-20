import { expect, test } from "bun:test";

import { solve } from "./1";

test("example", () => {
  const example = `r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb`;

  expect(solve(example)).toBe(6);
});