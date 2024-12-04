import { expect, test } from "bun:test";

import { solve } from "./1";

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

  expect(solve(example)).toBe(18);
});
