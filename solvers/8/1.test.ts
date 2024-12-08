import { expect, test } from "bun:test";

import { solve } from "./1";

test("example", () => {
  const example = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;

  expect(solve(example)).toBe(14);
});
