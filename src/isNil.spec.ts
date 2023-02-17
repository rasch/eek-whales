import { test } from "fvb"
import { isNil } from "./isNil.js"

test("isNil", t => {
  t.equal(typeof isNil, "function", "is a function")

  // these should be the only values that return true
  t.ok(isNil(null), "given null should return true")
  t.ok(isNil(undefined), "given undefined should return true")
  t.ok(isNil(NaN), "given NaN should return true")

  // but given an array of nil values returns false
  t.notOk(
    isNil([NaN, undefined, null]),
    "given an array with null, undefined, and NaN should return false"
  )

  // everything else should return false
  t.notOk(isNil("hello"), "given a string should return false")
  t.notOk(isNil(""), "given an empty string should return false")
  t.notOk(isNil([]), "given an empty array should return false")
  t.notOk(isNil({}), "given an empty object should return false")
  t.notOk(isNil(0), "given a number zero should return false")

  t.plan(10)
})
