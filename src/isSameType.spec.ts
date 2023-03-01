import { test } from "fvb"
import { isSameType } from "./index.js"

test("isSameType", t => {
  t.equal(typeof isSameType, "function", "is a function")

  t.ok(
    isSameType(42)(42),
    "given the same numbers should return true"
  )

  t.ok(
    isSameType(21)(42),
    "given different numbers should return true"
  )

  t.ok(
    isSameType("hello")("world"),
    "given two different strings should return true"
  )

  t.notOk(
    isSameType("hello")(42),
    "given a string and a number should return false"
  )

  t.notOk(
    isSameType([])({}),
    "given an empty array and an empty object should return false"
  )

  t.notOk(
    isSameType(null)(undefined),
    "given null and undefined should return false"
  )

  t.notOk(
    isSameType(function* () { yield 1 })(function () { return 1 }),
    "given a generator function and a function should return false"
  )

  t.ok(
    isSameType([])([1, 2]),
    "given an empty array and an array of numbers should return true"
  )

  const id = (x: any) => x

  t.ok(
    isSameType((x: any) => x)(id),
    "given an anonymous function and a named function should return true"
  )

  t.plan(10)
})
