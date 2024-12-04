import { expect, test } from "bun:test";

import { solve } from "./1";

test("example", () => {
  const example =
    "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";

  expect(solve(example)).toBe(161);
});
