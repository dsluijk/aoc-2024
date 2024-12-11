import { expect, test } from "bun:test";

import { solve } from "./1";

test("example", () => {
  const example = `125 17`;

  expect(solve(example)).toBe(55312);
});
