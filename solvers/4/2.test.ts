import { expect, test } from "bun:test";

import { solve } from "./2";

test("example", () => {
  const example = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

  expect(solve(example)).toBe(9);
});
