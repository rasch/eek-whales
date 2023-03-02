import { test } from "fvb"
import { isIterable } from "./index.js"

test("isIterable", t => {
  t.equal(typeof isIterable, "function", "is a function")

  t.ok(isIterable([]), "given an empty array should return true")

  t.ok(isIterable([1, 2, 3]), "given an array should return true")

  t.ok(isIterable(new Map()), "given an empty Map should return true")

  t.ok(isIterable(new Set()), "given an empty Set should return true")

  t.ok(isIterable(new Set([1, 1, 2, 3])), "given a Set should return true")

  t.ok(isIterable(""), "given an empty string should return true")

  t.ok(isIterable("hello world"), "given a string should return true")

  t.ok(
    isIterable(new Uint8Array([1, 2, 3])),
    "given a TypedArray should return true",
  )

  t.notOk(isIterable({}), "given an empty object should return false")

  t.notOk(isIterable(), "given no parameters should return false")

  t.notOk(isIterable(42), "given a number should return false")

  const customIterable = {
    *[Symbol.iterator]() {
      yield 1
      yield 2
      yield 3
    },
  }

  t.ok(
    isIterable(customIterable),
    "given a custom iterable object should return true",
  )

  t.plan(13)
})
