import { test } from "fvb"
import { isTruthy } from "./index.js"

test("isTruthy", t => {
  t.equal(typeof isTruthy, "function", "is a function")

  t.notOk(isTruthy(), "given no parameters should return false")
  t.notOk(isTruthy(false), "given false should return false")
  t.notOk(isTruthy(0), "given 0 should return false")
  t.notOk(isTruthy(-0), "given -0 should return false")
  t.notOk(isTruthy(0n), "given 0n should return false")
  t.notOk(isTruthy(""), "given an empty string should return false")
  t.notOk(isTruthy(null), "given null should return false")
  t.notOk(isTruthy(undefined), "given undefined should return false")
  t.notOk(isTruthy(NaN), "given NaN should return false")
  t.ok(isTruthy([]), "given an empty array should return true")
  t.ok(isTruthy(42), "given a non-zero number should return true")
  t.ok(isTruthy(true), "given true should return true")
  t.ok(isTruthy("hello"), "given 'hello' should return true")

  t.plan(14)
})
