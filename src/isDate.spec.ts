import { test } from "fvb"
import { isDate } from "./isDate.js"

test("isDate", t => {
  t.equal(typeof isDate, "function", "is a function")

  t.ok(
    isDate(new Date()),
    "given 'new Date()' should return true"
  )

  t.notOk(
    isDate(),
    "given no parameters should return false"
  )

  t.notOk(
    isDate(Date.now()),
    "given 'Date.now()' should return false"
  )

  t.notOk(
    isDate("Wed Feb 01 2023 00:00:00 GMT-0500 (Eastern Standard Time)"),
    "given a date string should return false"
  )

  t.ok(
    isDate(new Date(2023, 1, 1)),
    "given 'new Date(2023, 1, 1)' should return true"
  )

  t.plan(6)
})
