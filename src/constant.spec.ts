import { test } from "fvb"
import { constant, K } from "./index.js"

test("constant", t => {
  t.equal(typeof constant, "function", "is a function")

  t.equal(
    constant(undefined)(),
    undefined,
    "given undefined as the first value returns undefined",
  )

  t.equal(constant(42)(21), 42, "given 42 as the first value returns 42")

  t.equal(
    constant("")("blue"),
    "",
    "given an empty string as the first value returns the empty string",
  )

  t.equal(constant("blue")("yellow"), "blue", "Always Blue!")
  t.equal(K("blue")("yellow"), "blue", "K Always Blue!")
  t.equal(K(7)(77), 7, "K given 7 as the first value returns 7")

  t.plan(7)
})
