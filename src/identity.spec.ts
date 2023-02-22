import { test } from "fvb"
import { identity, I } from "./index.js"

test("identity", t => {
  t.equal(typeof identity, "function", "is a function")

  t.equal(identity(42), 42, "given 42 should return 42")
  t.equal(identity(""), "", "given '' should return ''")
  t.equal(identity([]), [], "given [] should return []")
  t.equal(identity([0]), [0], "given [0] should return [0]")
  t.equal(identity({a: 1}), {a: 1}, "given {a: 1} should return {a: 1}")

  t.equal(identity(NaN), NaN, "given NaN should return NaN")

  t.equal(
    identity(undefined),
    undefined,
    "given undefined should return undefined"
  )

  t.equal(I("tacocat"), "tacocat", "given tacocat should return tacocat")
  t.equal(I(42.21), 42.21, "given 42.21 should return 42.21")

  t.plan(10)
})
