import { test } from "fvb"
import { isFunction } from "./index.js"

test("isFunction", t => {
  t.equal(typeof isFunction, "function", "is a function")

  t.ok(
    isFunction((x: any) => x),
    "given an anonymous function should return true"
  )

  t.ok(
    isFunction(function*() { yield "a" }),
    "given a generator function should return true"
  )

  const id = (x: any) => x

  t.ok(
    isFunction(id),
    "given a named arrow function should return true"
  )

  function double(x: number) {
    return x * 2
  }

  t.ok(
    isFunction(double),
    "given a named function should return true"
  )

  t.ok(
    isFunction(new Function('x', 'return x')),
    "given a function constructor should return true"
  )

  t.notOk(
    isFunction(),
    "given no parameters should return false"
  )

  t.notOk(
    isFunction({}),
    "given an empty object should return false"
  )

  t.notOk(
    isFunction([]),
    "given an empty array should return false"
  )

  t.plan(9)
})
