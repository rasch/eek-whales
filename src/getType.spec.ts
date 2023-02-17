import { test } from "fvb"
import { getType } from "./getType.js"

test("getType", t => {
  t.equal(typeof getType, "function", "is a function")

  t.equal(
    getType(),
    "Undefined",
    "given no parameters should return the string 'Undefined'"
  )

  t.equal(
    getType("hello"),
    "String",
    "given a string should return the string 'String'"
  )

  t.equal(
    getType(42),
    "Number",
    "given a number should return the string 'Number'"
  )

  t.equal(
    getType(false),
    "Boolean",
    "given a boolean should return the string 'Boolean'"
  )

  t.equal(
    getType((x: any) => x),
    "Function",
    "given a function should return the string 'Function'"
  )

  t.equal(
    getType([]),
    "Array",
    "given an empty array should return the string 'Array'"
  )

  t.equal(
    getType([[0, 1], [1, 2], [3, 5], [8, 13]]),
    "Array",
    "given an array should return the string 'Array'"
  )

  t.equal(
    getType({}),
    "Object",
    "given an empty object should return the string 'Object'"
  )

  t.equal(
    getType(/^foo$/i),
    "RegExp",
    "given a regular expression should return the string 'RegExp'"
  )

  t.equal(
    getType(new Date()),
    "Date",
    "given a date object should return the string 'Date'"
  )

  t.equal(
    getType(new Error("Foo")),
    "Error",
    "given an error object should return the string 'Error'"
  )

  t.equal(
    getType(Symbol(42)),
    "Symbol",
    "given a symbol should return the string 'Symbol'"
  )

  t.equal(
    getType(null),
    "Null",
    "given a null value should return the string 'Null'"
  )

  t.equal(
    getType(undefined),
    "Undefined",
    "given undefined should return the string 'Undefined'"
  )

  t.equal(
    getType(new Set([[0, 1], [1, 2], [3, 5], [8, 13]])),
    "Set",
    "given a set should return the string 'Set'"
  )

  t.equal(
    getType(new Map()),
    "Map",
    "given a map should return the string 'Map'"
  )

  t.equal(
    getType(10n),
    "BigInt",
    "given a bigint should return the string 'BigInt'"
  )

  t.equal(
    getType(new Int8Array(10)),
    "Int8Array",
    "given an int8array should return the string 'Int8Array'"
  )

  t.equal(
    getType((function() { return arguments })()),
    "Arguments",
    "given an arguments object should return the string 'Arguments'"
  )

  const CustomType = {
    "@@type": "MyCustomType",
  }

  t.equal(
    getType(CustomType),
    "MyCustomType",
    "given an object with an '@@type' property should return the value"
  )

  const CustomTypeGetter = {
    get [Symbol.toStringTag]() { return "MyCustomTypeGetter" },
  }

  t.equal(
    getType(CustomTypeGetter),
    "MyCustomTypeGetter",
    "given an object with a `[Symbol.toStringTag]()` getter should return its value"
  )

  const CustomTypePlusGetter = {
    "@@type": "MyCustomTypePlusGetter",
    get [Symbol.toStringTag]() { return "NotGonnaBeMe" },
  }

  t.equal(
    getType(CustomTypePlusGetter),
    "MyCustomTypePlusGetter",
    "given an object with a '@@type' property and a `[Symbol.toStringTag]()` getter should return its @@type value"
  )

  const CustomGetterPlusType = {
    get [Symbol.toStringTag]() { return "NotGonnaBeMe" },
    "@@type": "MyCustomGetterPlusType",
  }

  t.equal(
    getType(CustomGetterPlusType),
    "MyCustomGetterPlusType",
    "given an object with a `[Symbol.toStringTag]()` getter and an '@@type' property should return its @@type value"
  )

  t.plan(24)
})
