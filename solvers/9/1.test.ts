import { expect, test } from "bun:test";

import { solve } from "./1";

test("example", () => {
  const example = `2333133121414131402`;

  expect(solve(example)).toBe(1928);
});
