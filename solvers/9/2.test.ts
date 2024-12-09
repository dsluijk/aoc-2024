import { expect, test } from "bun:test";

import { solve } from "./2";

test("example", () => {
  const example = `2333133121414131402`;

  expect(solve(example)).toBe(2858);
});
