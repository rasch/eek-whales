import { test } from "fvb"
import { isEqual } from "./index.js"

test("isEqual", t => {
  t.equal(typeof isEqual, "function", "is a function")

  t.ok(isEqual(NaN)(NaN), "given NaN and NaN should return true")

  t.ok(
    isEqual("pizza")("pizza"),
    "given 'pizza' and 'pizza' should return true",
  )

  t.ok(isEqual(42)(42), "given 42 and 42 should return true")

  t.notOk(isEqual({})({}), "given two empty objects should return false")

  t.notOk(
    isEqual([1, 2, 3])([1, 2, 3]),
    "given two deeply equal arrays should return false",
  )

  t.notOk(
    isEqual("night")("day"),
    "given two different strings should return false",
  )

  t.plan(7)
})
