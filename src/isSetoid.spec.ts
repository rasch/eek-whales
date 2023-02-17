import { test } from "fvb"
import { isSetoid } from "./isSetoid.js"

test("isSetoid", t => {
  t.equal(typeof isSetoid, "function", "is a function")

  t.notOk(
    isSetoid(),
    "given no parameters should return false"
  )

  const setoid = {
    value: 42,
    equals(x: { value: any }) { return x.value === setoid.value }
  }

  t.ok(
    isSetoid(setoid),
    "given an oject with an equals method (duck typing) should return true"
  )

  const flSetoid = {
    value: 42,
    "fantasy-land/equals": (x: { value: any }) => x.value === setoid.value
  }

  t.ok(
    isSetoid(flSetoid),
    "given an oject with a 'fantasy-land/equals' method should return true"
  )

  interface NumericSetoid {
    value: number
    equals: (n: NumericSetoid) => boolean
  }

  const mySetoid = (x: number) => ({
    value: x,
    equals: (y: NumericSetoid) => x === y.value
  })

  t.ok(
    isSetoid(mySetoid(42)),
    "given an object with an equals method should return true"
  )

  t.plan(5)
})
