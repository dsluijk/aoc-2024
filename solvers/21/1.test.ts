import { expect, test } from "bun:test";

import { solve } from "./1";

test("example", () => {
  const example = `029A
980A
179A
456A
379A`;

  expect(solve(example)).toBe(126384);
});
