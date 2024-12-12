import { expect, test } from "bun:test";

import { solve } from "./2";

test("example -1", () => {
  const example = `AB
AA`;

  expect(solve(example)).toBe(3 * 6 + 4);
});

test("example", () => {
  const example = `OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`;

  expect(solve(example)).toBe(436);
});

test("example 2", () => {
  const example = `EEEEE
EXXXX
EEEEE
EXXXX
EEEEE`;

  expect(solve(example)).toBe(236);
});

test("example 3", () => {
  const example = `AAAAAA
AAABBA
AAABBA
ABBAAA
ABBAAA
AAAAAA`;

  expect(solve(example)).toBe(368);
});

test("example 4", () => {
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

  expect(solve(example)).toBe(1206);
});
