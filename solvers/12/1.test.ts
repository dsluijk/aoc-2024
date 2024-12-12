import { expect, test } from "bun:test";

import { solve } from "./1";

test("example", () => {
  const example = `AAAA
BBCD
BBCC
EEEC`;

  expect(solve(example)).toBe(140);
});

test("example2", () => {
  const example = `OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`;

  expect(solve(example)).toBe(772);
});

test("example3", () => {
  const example = `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`;

  expect(solve(example)).toBe(1930);
});
