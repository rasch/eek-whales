import { test } from "fvb"
import { isSame } from "./isSame.js"

test("isSame", t => {
  t.equal(typeof isSame, "function", "is a function")

  t.ok(
    isSame(NaN)(NaN),
    "given NaN vs NaN should return true"
  )

  t.ok(
    isSame(-0)(-0),
    "given -0 vs -0 should return true"
  )

  t.notOk(
    isSame(0)(-0),
    "given 0 vs -0 should return false"
  )

  t.notOk(
    isSame(-0)(0),
    "given 0 vs -0 should return false"
  )

  t.notOk(
    isSame([])([]),
    "given two empty arrays should return false"
  )

  t.notOk(
    isSame({})({}),
    "given two empty objects should return false"
  )

  t.ok(
    isSame("hello world")("hello world"),
    "given 2 identical strings should return true"
  )

  t.notOk(
    isSame(["hello world"])(["hello world"]),
    "given 2 identical arrays should return false"
  )

  t.notOk(
    isSame(undefined)(null),
    "given undefined vs null should return false"
  )

  t.notOk(
    isSame(NaN)(null),
    "given NaN vs null should return false"
  )

  t.plan(11)
})
