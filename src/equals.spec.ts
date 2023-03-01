import { test } from "fvb"
import { equals, inspect } from "./index.js"

test("equals", t => {
  t.equal(typeof equals, "function", "is a function")
  t.plan(1)
})

test("equals Arguments Object", t => {
  // @ts-ignore: 'a' is declared but its value is never read.
  const args = function(...a: any[]) {
    return arguments
  }

  t.ok(equals(args())(args()), "true given arguments objects with no values")

  t.ok(
    equals(args(1, 2, 4, 8))(args(1, 2, 4, 8)),
    "true given arguments objects containing the same values"
  )

  t.ok(
    equals(args("a", 2, "c"))(args("a", 2, "c")),
    "true given arguments objects containing the same values"
  )

  t.notOk(
    equals(args(1, 2, 4, 7))(args(1, 2, 4, 8)),
    "false given arguments objects containing different values"
  )

  t.notOk(
    equals([1, 2, 3])(args(1, 2, 3)),
    "false given an array and an arguments object with the same values"
  )

  t.notOk(
    equals(args(1, 2, 3))([1, 2, 3]),
    "false given an arguments object and an array with the same values"
  )

  t.notOk(
    equals(args())([]),
    "false given an empty arguments object and an empty array"
  )

  t.notOk(
    equals(args())({}),
    "false given an empty arguments object and an empty object"
  )

  t.notOk(
    equals({})(args()),
    "false given an empty object and an empty arguments object"
  )

  t.notOk(
    equals({ 0: "a", 1: "b" })(args("a", "b")),
    "false given an object and an arguments object with similar values"
  )

  t.plan(10)
})

test("equals Array", t => {
  t.ok(
    equals([1, 2, 3])([1, 2, 3]),
    "true given arrays containing the same number values"
  )

  t.ok(
    equals(["a", "b", "c"])(["a", "b", "c"]),
    "true given arrays containing the same string values"
  )

  t.ok(
    equals([null, null, null])([null, null, null]),
    "true given arrays containing the same null values"
  )

  t.notOk(
    equals([1, 2, 3])({ 0: 1, 1: 2, 2: 3 }),
    "false given an array and an object with same keys/values"
  )

  t.notOk(
    equals([3, 2, 1])([1, 2, 3]),
    "false given arrays with the same values at different indexes"
  )

  t.notOk(
    equals([1, 2, 3, [2, 1]])([1, 2, 3, [1, 2]]),
    "false given nested arrays with same values at different indexes"
  )

  t.notOk(
    equals([, ,])([, , ,]),
    "false given sparse arrays of different lengths"
  )

  t.notOk(
    equals([1, 2])([1, 2, undefined]),
    "false given arrays of different lengths with an undefined value"
  )

  t.notOk(
    equals([1, 2, undefined])([1, 2]),
    "false given arrays of different lengths with an undefined value"
  )

  t.notOk(
    equals([undefined, undefined])([undefined, undefined, undefined]),
    "false given arrays of different lengths with only undefined values"
  )

  t.notOk(
    equals(new Array(9))(new Array(99)),
    "false given empty constructor arrays of different lengths"
  )

  t.notOk(
    equals([1, 2, 3])("1,2,3"),
    "false given an array and a string formatted like Array.toString"
  )

  t.ok(
    equals(["a", [4, 2], "d"])(["a", [4, 2], "d"]),
    "true given arrays with nested array with the same values"
  )

  t.ok(
    equals([{ a: 4 }, { b: 2 }])([{ a: 4 }, { b: 2 }]),
    "true given arrays of equivalent objects"
  )

  t.ok(
    equals([[[[[[[0], 1], 2], 3], 4]]])([[[[[[[0], 1], 2], 3], 4]]]),
    "true given deeply nested arrays containing the same values"
  )

  t.notOk(
    equals(["a", [4, 2], "d"])(["a", [4, 1], "d"]),
    "false given nested arrays containing different values"
  )

  t.notOk(
    equals([{ a: 4 }, { b: "2" }])([{ a: 4 }, { b: 2 }]),
    "false given arrays of objects with same keys but different values"
  )

  t.notOk(
    equals([[[[[[[0], 9], 2], 3], 4]]])([[[[[[[0], 1], 2], 3], 4]]]),
    "false given deeply nested arrays containing different values"
  )

  t.ok(
    equals(new Array(1, 2, 3))([1, 2, 3]),
    "true given an array constructor and array literal with the same values"
  )

  t.ok(
    equals([1, 2, 3])(new Array(1, 2, 3)),
    "true given an array literal and array constructor with the same values"
  )

  t.notOk(
    equals(new Array(1, 2, 4))([1, 2, 3]),
    "false given an array constructor and array literal with different values"
  )

  t.notOk(
    equals([1, 2, 4])(new Array(1, 2, 3)),
    "false given an array literal and array constructor with different values"
  )

  t.ok(equals([])([]), "true given empty arrays")
  t.notOk(equals([])({}), "false given an empty array and an empty object")
  t.notOk(equals([])(false), "false given [] and false")
  t.notOk(equals([])(0), "false given [] and 0")
  t.notOk(equals([])(""), "false given [] and ''")
  t.notOk(equals([0])(false), "false given [0] and false")
  t.notOk(equals([0])(0), "false given [0] and 0")
  t.notOk(equals([0])("0"), "false [0] and '0'")
  t.notOk(equals([1])(true), "false given [1] and true")
  t.notOk(equals([1])(1), "false given [1] and 1")
  t.notOk(equals([1])("1"), "false given [1] and '1'")
  t.notOk(equals([[]])(false), "false given [[]] and false")
  t.notOk(equals([[]])(0), "false given [[]] and 0")
  t.notOk(equals([[]])(""), "false given [[]] and ''")

  t.plan(36)
})

test("equals Boolean", t => {
  t.ok(equals(true)(true), "true given the same (true) boolean literals")
  t.ok(equals(false)(false), "true given the same (false) boolean literals")
  t.notOk(equals(true)(false), "false given different boolean literals")
  t.notOk(equals(false)(true), "false given different boolean literals")
  t.notOk(equals(false)(0), "false given false and 0")
  t.notOk(equals(false)(-0), "false given false and -0")
  t.notOk(equals(false)("0"), "false given false and '0'")
  t.notOk(equals(false)("-0"), "false given false and '-0'")
  t.notOk(equals(false)(""), "false given false and ''")
  t.notOk(equals(false)([]), "false given false and []")
  t.notOk(equals(false)([[]]), "false given false and [[]]")
  t.notOk(equals(false)([0]), "false given false and [0]")
  t.notOk(equals(false)(new Number(0)), "false given false and new Number(0)")
  t.notOk(equals(false)(null), "false given false and null")
  t.notOk(equals(false)(undefined), "false given false and undefined")
  t.notOk(equals(false)(NaN), "false given false and NaN")
  t.notOk(equals(true)(1), "false given true and 1")
  t.notOk(equals(true)("1"), "false given true and '1'")
  t.notOk(equals(true)([1]), "false given true and [1]")

  t.plan(19)
})

test("equals Constructor Function", t => {
  const Foo : any = function() {
    /* empty */
  }

  const Bar : any = function() {
    /* empty */
  }

  const Baz : any = function(this: any, prop: any) {
    this.prop = prop
  }

  t.ok(
    equals(new Foo())(new Foo()),
    "true given instances created from the same empty constructor function"
  )

  t.ok(
    equals(new Baz(1))(new Baz(1)),
    "true given instances created from constructors given the same values"
  )

  t.notOk(
    equals(new Baz(1))(new Baz(2)),
    "false given instances created from constructors given different values"
  )

  Foo.prototype.foo = { a: 1 }
  Bar.prototype.foo = { a: 1 }

  t.ok(
    equals(new Foo())(new Bar()),
    "true given instances with equivalent prototypes"
  )

  Foo.prototype.foo = { a: 1 }
  Bar.prototype.foo = { a: 2 }

  t.notOk(
    equals(new Foo())(new Bar()),
    "false given instances with different prototypes"
  )

  t.plan(5)
})

test("equals Date", t => {
  const d = new Date()

  t.ok(
    equals(d)(new Date(d)),
    "true given different date objects with the same date"
  )

  t.ok(
    equals(new Date(2017, 2, 31))(new Date(2017, 2, 31)),
    "true given different date objects with the same date"
  )

  t.ok(
    equals(new Date(1490287761000))(new Date("Thu Mar 23 2017 16:49:21 GMT")),
    "true given different date objects with the same date, Epoch vs UTC"
  )

  t.notOk(
    equals(new Date(2016, 2, 31))(new Date(2017, 2, 31, 16)),
    "false given date objects with the same date but different time"
  )

  t.notOk(
    equals(new Date(1490594199737))(new Date(1490594199738)),
    "false given date objects that differ in epochs by 1 millisecond"
  )

  t.ok(
    equals(new Date(NaN))(new Date(NaN)),
    "true given two Invalid Dates created with same values"
  )

  t.ok(
    equals(new Date("foo"))(new Date("bar")),
    "true given two Invalid Dates created with different values"
  )

  t.plan(7)
})

test("equals Array/Object basic check", t => {
  const values = [
    { a: 1 },
    { a: "a" },
    [{ a: 1 }],
    [{ a: true }],
    { a: 1, b: 2 },
    [1, 2],
    [1, 2, 3],
    { a: "1" },
    { a: "1", b: "2" }
  ]

  values.forEach((a, i) => {
    values.forEach((b, j) => {
      if (i === j) {
        t.ok(equals(a)(b), `true given ${inspect(a)} and ${inspect(b)}`)
      } else {
        t.notOk(equals(a)(b), `false given ${inspect(a)} and ${inspect(b)}`)
      }
    })
  })

  t.plan(values.length ** 2)
})

test("equals Edge Case basic check", t => {
  const values = [
    true,
    false,
    1,
    0,
    -1,
    "true",
    "false",
    "1",
    "0",
    "-1",
    "",
    null,
    undefined,
    Infinity,
    -Infinity,
    [],
    {},
    [[]],
    [0],
    [1],
    NaN
  ]

  values.forEach((a, i) => {
    values.forEach((b, j) => {
      if (i === j) {
        t.ok(equals(a)(b), `true given ${inspect(a)} and ${inspect(b)}`)
      } else {
        t.notOk(equals(a)(b), `false given ${inspect(a)} and ${inspect(b)}`)
      }
    })
  })

  t.ok(
    equals(values)([...values]),
    "true given an array of equality edge cases compared with itself"
  )

  t.plan(values.length ** 2 + 1)
})

test("equals Error Object", t => {
  const err = new Error("foo")

  t.ok(equals(err)(err), "true given the same error objects")

  t.ok(
    equals(new Error("foo"))(new Error("foo")),
    "true given different error objects created with equivalent messages"
  )

  t.notOk(
    equals(new Error("foo"))(new Error("bar")),
    "false given error objects created with different messages"
  )

  t.plan(3)
})

test("equals Function", t => {
  const foo = () => {
    /* empty */
  }

  const bar = () => {
    /* empty */
  }

  const baz = () => {
    "baz"
  }

  const qux = () => {
    "qux"
  }

  t.ok(
    equals(foo)(bar),
    "true given named functions with equivalent source text"
  )

  t.ok(
    equals((a: number, b: number) => a + b)((a: number, b: number) => a + b),
    "true given anonymous functions with equivalent source text"
  )

  t.notOk(
    equals(baz)(qux),
    "false given named functions with different source text"
  )

  t.notOk(
    // @ts-ignore: 'a' is declared but its value is never read.
    equals(() => {})(a => {}),
    "false given anonymous functions with different source text"
  )

  t.ok(equals(foo)(foo), "true given a function compared with itself")

  t.ok(
    equals([].slice)([].slice),
    "true given a function compared with itself, Array.prototype.slice"
  )

  t.notOk(
    equals([].slice)([].splice),
    "false given two different Array methods"
  )

  t.plan(7)
})

test("equals Map", t => {
  const a = [["a", 1], ["b", 2], ["c", 4], ["d", 8]] as const
  const b = [["a", 1], ["b", 2], ["c", 3], ["d", 8]] as const

  t.ok(
    equals(new Map(a))(new Map(a)),
    "true given two Map objects created from the same array"
  )

  t.notOk(
    equals(new Map(a))(new Map(b)),
    "false given two Map objects created from different arrays"
  )

  t.notOk(
    equals(new Map(a))({ a: 1, b: 2, c: 4, d: 8 }),
    "false given a Map compared to an Object"
  )

  t.notOk(equals(new Map(a))(a), "false given a Map compared to an Array")

  t.plan(4)
})

test("equals Number", t => {
  t.ok(equals(1)(1), "true given 1 and 1")
  t.ok(equals(-1)(-1), "true given -1 and -1")
  t.ok(equals(42)(42), "true given 42 and 42")
  t.ok(equals(3e4)(30000), "true given 3e4 and 30000")
  t.ok(equals(Infinity)(Infinity), "true given Infinity and Infinity")
  t.ok(equals(-Infinity)(-Infinity), "true given -Infinity and -Infinity")
  t.notOk(equals(0)(1), "false given 0 and 1")
  t.notOk(equals(1 + 2)(2), "false given 1 + 2 and 2")
  t.notOk(equals(42)(-42), "false given 42 and -42")
  t.notOk(equals(-42)(42), "false given -42 and 42")
  t.notOk(equals(-Infinity)(Infinity), "false given -Infinity and Infinity")
  t.notOk(equals(Infinity)(-Infinity), "false given Infinity and -Infinity")
  t.ok(equals(0)(0), "true given 0 and 0")
  t.ok(equals(-0)(-0), "true given -0 and -0")
  t.ok(equals(+0)(+0), "true given +0 and +0")
  t.notOk(equals(0)(-0), "false given 0 and -0")
  t.notOk(equals(-0)(0), "false given -0 and 0")
  t.notOk(equals(-0)(+0), "false given -0 and +0")
  t.notOk(equals(+0)(-0), "false given +0 and -0")
  t.ok(equals(NaN)(NaN), "true given NaN and NaN")
  t.notOk(equals(0)(false), "false given 0 and false")
  t.notOk(equals(0)("0"), "false given 0 and '0'")
  t.notOk(equals(0)([0]), "false given 0 and [0]")
  t.notOk(equals(0)(""), "false given 0 and ''")
  t.notOk(equals(0)([]), "false given 0 and []")
  t.notOk(equals(0)([[]]), "false given 0 and [[]]")
  t.notOk(equals(1)(true), "false given 1 and true")
  t.notOk(equals(1)("1"), "false given 1 and '1'")
  t.notOk(equals(1)([1]), "false given 1 and [1]")

  t.plan(29)
})

test("equals Objects", t => {
  t.ok(equals({})({}), "true given two empty objects")

  t.ok(
    equals({ foo: "a", bar: "b", baz: 42 })({ foo: "a", bar: "b", baz: 42 }),
    "true given different objects with the same keys/values"
  )

  t.ok(
    equals({ foo: { bar: { baz: 42 } } })({ foo: { bar: { baz: 42 } } }),
    "true given different objects with nested objects with the same keys/values"
  )

  t.ok(
    equals({ a: [2, 3], b: [4] })({ a: [2, 3], b: [4] }),
    "true given different objects with array values and the same keys/values"
  )

  t.ok(
    equals({
      a: { q: 1, r: { s: "s" } },
      b: [{ x: 1, y: 2 }, [4, 2]],
      c: 42
    })({
      a: { q: 1, r: { s: "s" } },
      b: [{ x: 1, y: 2 }, [4, 2]],
      c: 42
    }),
    "true given different objects with nested objects and equivalent values"
  )

  t.ok(
    equals({ a: 4, b: 2 })({ b: 2, a: 4 }),
    "true given different objects with the same keys/values in different order"
  )

  t.ok(
    equals({ c: /42/, a: 4, b: 2 })({ c: /42/, b: 2, a: 4 }),
    "true given different objects with the same keys/values in different order"
  )

  t.notOk(
    equals({ a: 4, b: 2 })({ a: 4, b: 3 }),
    "false given different objects with same keys but different values"
  )

  t.notOk(
    equals({ x: 5, y: [6] })({ x: 5, y: 6 }),
    "false given different objects with same keys but different values"
  )

  t.notOk(
    equals({ foo: { bar: { baz: -42 } } })({ foo: { bar: { baz: 42 } } }),
    "false given different nested objects with same keys but different values"
  )

  t.notOk(
    equals({ foo: "a", bar: "b", baz: 41 })({ foo: "a", bar: "b", baz: 42 }),
    "false given different objects with same keys but different values"
  )

  t.notOk(
    equals({ foo: "a", bar: "b", baz: 42 })({ foo: "a", bar: "b", quux: 42 }),
    "false given different objects with different keys and values"
  )

  t.notOk(
    equals({
      a: { q: 1, r: { s: "s" } },
      b: [{ x: 1, y: 2 }, [4, 2]],
      c: 42
    })({
      a: { q: 1, r: { s: "u" } },
      b: [{ x: 1, y: 2 }, [4, 2]],
      c: 42
    }),
    "false given different nested objects with same keys but different values"
  )

  const a = { foo: 42, bar: {} }
  const b = { foo: 42, bar: {} }
  const c = { a, b }

  a.bar = c
  b.bar = c

  t.ok(equals(a)(b), "true given cyclic objects with the same keys/values")

  const d = { child: {} }
  const e = { child: {} }

  d.child = e
  e.child = d

  t.ok(equals(d)(e), "true given cyclic objects containing empty objects")

  const f = { foo: "bar", bar: {} }
  const g = { foo: "bar", bar: {} }

  f.bar = g
  g.bar = f

  t.ok(equals(f)(g), "true given cyclic objects with the same keys/values")

  const h = { foo: "bar", bar: {} }
  const i = { foo: "bar", bar: {} }

  h.bar = h
  i.bar = i

  t.ok(
    equals(h)(i),
    "true given objects with equivalent self-referencing props"
  )

  const j = { foo: "foo", bar: {} }
  const k = { foo: "bar", bar: {} }

  j.bar = k
  k.bar = j

  t.notOk(
    equals(j)(k),
    "false given cyclic objects with same keys but different values"
  )

  const l = { foo: "foo", baz: "baz", bar: {} }
  const m = { foo: "foo", bar: "bar", baz: {} }

  l.bar = m
  m.baz = l

  t.notOk(
    equals(l)(m),
    "false given cyclic objects with different keys/values"
  )

  t.notOk(equals({})([]), "false given an empty object and an empty array")

  t.ok(
    equals(Object.create({ foo: { bar: 20 } }))(
      Object.create({ foo: { bar: 20 } })
    ),
    "true given different objects created from equivalent prototypes"
  )

  t.notOk(
    equals(Object.create({ foo: { bar: 20 } }))(
      Object.create({ foo: { bar: 21 } })
    ),
    "false given different objects created from different prototypes"
  )

  t.plan(22)
})

test("equals RegExp", t => {
  t.ok(equals(/\s/)(/\s/), "true given equivalent RegExp literals")

  t.ok(
    equals(/\s/gi)(/\s/gi),
    "true given equivalent RegExp literals with the same flags"
  )

  t.notOk(
    equals(/\w/)(/\s/),
    "false given RegExp literals with different values"
  )

  t.notOk(
    equals(/abc/i)(/abc/g),
    "false given RegExp literals with same values but different flags"
  )

  t.notOk(
    equals(/abc/i)(/abb/g),
    "false given RegExp literals with different values and flags"
  )

  t.ok(
    equals(new RegExp("^abc$", "g"))(/^abc$/g),
    "true given RegExp constructor and RegExp literal with the same values"
  )

  t.ok(
    equals(/^abc$/g)(new RegExp("^abc$", "g")),
    "true given RegExp literal and RegExp constructor with same values"
  )

  t.notOk(
    equals(new RegExp("^abc", "g"))(/^abc$/g),
    "false given RegExp constructor and RegExp literal with different values"
  )

  t.notOk(
    equals(/^abc/g)(new RegExp("^abc$", "g")),
    "false given RegExp literal and RegExp constructor with different values"
  )

  t.ok(
    equals(RegExp("^42$"))(RegExp("^42$")),
    "true given RegExp using factory notation with the same values"
  )

  t.notOk(
    equals(RegExp("^42$"))(RegExp("^42")),
    "false given RegExp using factory notation with different values"
  )

  t.ok(
    equals(RegExp("^abc$", "g"))(/^abc$/g),
    "true given RegExp factory notation and RegExp literal with equal values"
  )

  t.ok(
    equals(/^abc$/g)(RegExp("^abc$", "g")),
    "true given RegExp literal and RegExp factory notation with equal values"
  )

  t.plan(13)
})

test("equals String", t => {
  t.ok(equals("foo")("foo"), "true given string literals with same value")
  t.ok(equals("")(""), "true given string literals with empty strings")

  t.ok(
    equals("foo")(`fo${String.fromCharCode(111)}`),
    "true given string literal and template literal with interpolation"
  )

  t.notOk(
    equals("foo")("bar"),
    "false given string literals with different values"
  )

  t.notOk(
    equals(" ")(""),
    "false given string literals with different whitespace values"
  )

  t.notOk(equals("foo")(["foo"]), "false given 'foo' and ['foo']")
  t.notOk(equals("0")(false), "false given '0' and false")
  t.notOk(equals("0")(0), "false given '0' and 0")
  t.notOk(equals("0")([0]), "false given '0' and [0]")
  t.notOk(equals("1")(true), "false given '1' and true")
  t.notOk(equals("1")(1), "false given '1' and 1")
  t.notOk(equals("1")([1]), "false given '1' and [1]")
  t.notOk(equals("")(false), "false given '' and false")
  t.notOk(equals("")(0), "false given '' and 0")
  t.notOk(equals("")([]), "false given '' and []")
  t.notOk(equals("")([[]]), "false given '' and [[]]")

  t.plan(16)
})

test("equals Null/Undefined", t => {
  t.ok(equals(null)(null), "true given null and null")
  t.ok(equals(undefined)(undefined), "true given undefined and undefined")
  t.notOk(equals(null)(undefined), "false given null and undefined")
  t.notOk(equals(undefined)(null), "false given undefined and null")

  t.plan(4)
})

test("equals Sets", t => {
  const a = new Set([1, 2, 4, 8, 16])
  const b = new Set([1, 2, 4, 8, 16])

  t.ok(equals(a)(b), "true given different Sets containing the same values")

  const c = new Set([1, 2, 3, 8, 16])
  const d = new Set([1, 2, 4, 8, 16])

  t.notOk(
    equals(c)(d),
    "false given different Sets containing different values"
  )

  const e = new Set([1, 2, 4, 4, 8, 16])
  const f = new Set([1, 2, 4, 8, 16])

  t.ok(
    equals(e)(f),
    "true given different Sets created from two Arrays, one with duplicates"
  )

  const g = new Set([1, 2, 4, 8, 16, 32])
  const h = new Set([1, 2, 4, 8, 16])

  t.notOk(equals(g)(h), "false given Sets with different number of values")

  t.notOk(
    equals(new Set([1, 2, 3]))([1, 2, 3]),
    "false given a Set and an Array with the same values"
  )

  const foo = new Set('abcdef')
  const bar = new Set('abcdefg')

  t.notOk(
    equals(foo)(bar),
    "false given different sets created with different strings"
  )

  t.plan(6)
})

// Only test Buffer objects when they are available (e.g., Node.js).
if (typeof Buffer === "function") {
  test("equals Buffer (Node.js)", t => {
    t.ok(
      equals(Buffer.from("hello"))(Buffer.from("hello")),
      "true given different Buffer objects created from the same values"
    )

    t.ok(
      equals(Buffer.from([110, 111]))(Buffer.from([110, 111])),
      "true given different Buffer objects created from the same values"
    )

    t.ok(
      equals(Buffer.alloc(10))(Buffer.alloc(10)),
      "true given zero-filled Buffer objects of the same size"
    )

    t.notOk(
      equals(Buffer.from("hello"))(Buffer.from("world")),
      "false given different Buffer objects created from different values"
    )

    t.notOk(
      equals(Buffer.from([111, 110]))(Buffer.from([110, 111])),
      "false given different Buffer objects created from different values"
    )

    t.notOk(
      equals(Buffer.alloc(11))(Buffer.alloc(10)),
      "false given zero-filled Buffer objects of different sizes"
    )

    t.plan(6)
  })
}

test("equals Setoid", t => {

  // NOTE: the `Palindrome` and `Pdrome` Setoid types are contrived examples
  // with `equals` methods that consider the values they hold to be equal as
  // long as they are both palindromes.

  const isPalindrome = (a: any) => {
    const b = a
      .toString()
      .replace(/[^a-z0-9]/gi, "")
      .toLowerCase()

    return b === [...b].reverse().join("")
  }

  const Palindrome = (x: any) => ({
    val: x,
    equals(y: any) { return isPalindrome(this.val) && isPalindrome(y.val) },
    "@@type": "Palindrome"
  })

  const Pdrome = (x: any) => ({
    val: x,
    equals(y: any) { return isPalindrome(this.val) && isPalindrome(y.val) },
    "@@type": "Pdrome"
  })

  t.ok(
    equals(Palindrome("racecar"))(Palindrome("tacocat")),
    "true given Setoids that are equal based on their `equals` method"
  )

  t.notOk(
    equals(Pdrome("tacocat"))(Palindrome("tacocat")),
    "false given Setoids of different types but with the same values"
  )

  t.ok(
    equals(Palindrome("Do geese see God?"))(Palindrome("Step on no pets")),
    "true given Setoids that are equal based on their `equals` method"
  )

  t.ok(
    equals
      (Palindrome("Never odd or even"))
      (Palindrome("Rats live on no evil star")),
    "true given Setoids that are equal based on their `equals` method"
  )

  t.ok(
    equals(Palindrome(3))(Palindrome(3)),
    "true given equivalent Setoids"
  )

  t.notOk(
    equals(Palindrome("racecar"))(Palindrome("hello")),
    "false given Setoids that are NOT equal based on their `equals` method"
  )

  t.notOk(
    equals(Palindrome("hello"))(Palindrome("racecar")),
    "false given Setoids that are NOT equal based on their `equals` method"
  )

  t.notOk(
    equals(Palindrome("hello"))(Palindrome("world")),
    "false given Setoids that are NOT equal based on their `equals` method"
  )

  const FantasyLandSetoid = (n: number) => ({
    value: n,
    "fantasy-land/equals": (x: any) => n === x.value
  })

  t.ok(
    equals(FantasyLandSetoid(42))(FantasyLandSetoid(42)),
    "true given Setoids that are equal based on their `fantasy-land/equals` method"
  )

  t.notOk(
    equals(FantasyLandSetoid(42))(FantasyLandSetoid(21)),
    "false given Setoids that are NOT equal based on their `fantasy-land/equals` method"
  )

  t.plan(10)
})
