import { test } from "fvb"
import { is } from "./index.js"

test("is", t => {
  t.equal(typeof is, "function", "is a function")

  t.ok(
    is("String")("hello"),
    "given is('String') and 'hello' should return true",
  )

  t.ok(
    is("Array")([]),
    "given is('Array') and an empty array should return true",
  )

  t.notOk(is("String")(42), "given is('String') and 42 should return false")

  t.ok(
    is("Undefined")(),
    "given is('Undefined') and no parameters should return true",
  )

  t.notOk(is("")(""), "given is('') and '' should return false")

  t.ok(
    is("Set")(new Set([1, 2, 3])),
    "given is('Set') and new Set([1, 2, 3]) should return true",
  )

  t.plan(7)
})
