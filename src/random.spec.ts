import { test } from "fvb"
import { random } from "./index.js"

test("random", t => {
  t.equal(typeof random, "function", "is a function")

  const rNum = random()

  t.ok(rNum >= 0 && rNum < 1, "given the default Date.now() seed")

  // NOTE: this is 138 tests
  for (let i = 0; i < 10002; i += 73) {
    const n = random(i * 73)
    t.ok(n >= 0 && n < 1, `given a seed of ${i * 73}`)
  }

  t.equal(
    random(1001001),
    0.707733154296875,
    "given the same seed should always return the same value",
  )

  t.equal(
    random(42),
    0.582305908203125,
    "given the same seed should always return the same value",
  )

  t.equal(random(0), 0, "given a seed of 0 should always return 0")

  t.plan(143)
})
