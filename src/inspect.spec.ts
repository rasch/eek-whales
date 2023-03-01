import { test } from "fvb"
import { inspect } from "./inspect.js"
import { nodeInspect } from "./nodeInspect.js"

// Set timezone explicitly for testing Date object inspection
process.env.TZ = "America/New_York"

test("inspect", t => {
  t.equal(typeof inspect, "function", "is a function")

  t.equal(
    inspect("hello world"),
    '"hello world"',
    "given a string should return the string wrapped in double quotes"
  )

  t.equal(
    inspect(42),
    "42",
    "given a number should return the string of the number"
  )

  t.equal(
    inspect(-0),
    "-0",
    "given a negative zero should return the string '-0'"
  )

  t.equal(
    inspect(0),
    "0",
    "given the number zero should return the string '0'"
  )

  t.equal(
    inspect([1, 2, 3]),
    "[1, 2, 3]",
    "given an array should return a string representation of the array"
  )

  t.equal(
    inspect(undefined),
    "undefined",
    "given undefined should return the string 'undefined'"
  )

  t.equal(
    inspect(null),
    "null",
    "given null value should return the string 'null'"
  )

  t.equal(
    inspect(NaN),
    "NaN",
    "given NaN value should return the string 'NaN'"
  )

  t.equal(
    inspect(false),
    "false",
    "given false value should return the string 'false'"
  )

  t.equal(
    inspect(true),
    "true",
    "given true value should return the string 'true'"
  )

  t.equal(
    inspect((x: any) => x),
    "(x) => x",
    "given an anonymous function should return the function as a string"
  )

  const id = (x: any) => x

  t.equal(
    inspect(id),
    "id",
    "given a named function should return the name as a string"
  )

  t.equal(
    inspect({ a: 1, b: 2 }),
    "{a: 1, b: 2}",
    "given an object should return a string representation of the object"
  )

  t.equal(
    inspect({ foo: "bar", "baz qux": 42 }),
    '{foo: "bar", "baz qux": 42}',
    "given an object with keys with spaces should wrap keys in double quotes"
  )

  t.equal(
    inspect({ foo: "bar", baz: 42, qux: { a: 1, b: 2 } }),
    '{foo: "bar", baz: 42, qux: {a: 1, b: 2}}',
    "given an object with nested objects should return a string representation"
  )

  t.equal(
    inspect(/^foo$/g),
    "/^foo$/g",
    "given a regexp should return a string representation of the regexp"
  )

  t.equal(
    inspect(new Date(2020, 3, 20, 4, 20, 0)),
    "Mon Apr 20 2020 04:20:00 GMT-0400 (Eastern Daylight Time)",
    "given a date should return a string representation of the date"
  )

  t.equal(
    inspect(Symbol(42)),
    "Symbol(42)",
    "given a symbol should return a string representation of the symbol"
  )

  t.equal(
    inspect(Symbol("foo")),
    "Symbol(foo)",
    "given a symbol should return a string representation of the symbol"
  )

  t.equal(
    inspect(new Map([["a", 1], ["b", 2], ["c", 3]])),
    'Map([["a", 1], ["b", 2], ["c", 3]])',
    "given a map object should return a string representation of the map"
  )

  t.equal(
    inspect(new Set([0, 1, 1, 2, 3, 5])),
    "Set([0, 1, 2, 3, 5])",
    "given a set object should return a string representation of the set"
  )

  t.equal(
    inspect(new WeakMap([[{ a: 1 }, 1], [{ a: 2 }, 2], [{ a: 3 }, 3]])),
    "[object WeakMap]",
    "given a weak map should return a string representation of the weak map"
  )

  t.equal(
    inspect(new WeakSet([{ a: 1 }, { a: 2 }, { a: 3 }])),
    "[object WeakSet]",
    "given a weak set should return a string representation of the weak set"
  )

  t.equal(
    inspect(new Error("FOO")),
    "Error: FOO",
    "given an error object should return a string representation of the error"
  )

  t.equal(
    inspect(new TypeError("BAR")),
    "TypeError: BAR",
    "given a type error should return a string representation of the error"
  )

  t.equal(
    inspect((function() { return arguments })()),
    "[object Arguments]",
    "given an arguments object should return the string [object Arguments]"
  )

  const Foo = (x: any) => ({
    [nodeInspect]: () => `Foo(${inspect(x)})`
  })

  t.equal(
    inspect(Foo("bar")),
    'Foo("bar")',
    "given a constructor fn with [nodeInspect] method should use it for inspect"
  )

  t.equal(
    inspect(Foo(Foo("bar"))),
    'Foo(Foo("bar"))',
    "given nested constructors with [nodeInspect] should return proper string"
  )

  t.plan(29)
})
