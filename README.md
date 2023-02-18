# EEK-Whales

![The EEK-Whales Logo](/assets/logo.svg)

> A collection of JavaScript/TypeScript modules for functional programming

## API

### [Point-free Functions](#point-free-functions-1)

- [equals](#equals) :: `Setoid a => a -> a-> Boolean` or `a -> b -> Boolean`

### [Classify Functions](#classify-functions-1)

- [getType](#gettype) :: `a -> String`
- [is](#is) :: `String -> a -> Boolean`

### [Predicate Functions](#predicate-functions-1)

- [isSame](#issame) :: `a -> b -> Boolean`
- [isSameType](#issametype) :: `a -> b -> Boolean`
- [isTruthy](#istruthy) :: `a -> Boolean`
- [isNil](#isnil) :: `a -> Boolean`
- [isFunction](#isfunction) :: `a -> Boolean`
- [isDate](#isdate) :: `a -> Boolean`
- [isIterable](#isiterable) :: `a -> Boolean`
- [isSetoid](#issetoid) :: `a -> Boolean`

### [Showable](#showable-1)

- [inspect](#inspect) :: `a -> String`
- [nodeInspect](#nodeinspect) :: `Symbol`

## Point-free Functions

### equals

```txt
equals :: Setoid a => a -> a -> Boolean
equals :: a -> b -> Boolean
```

The `equals` function is useful for deep equality comparisons or for
comparing two values of the [`Setoid`](#issetoid) type. Returns `true`
given two values that are deeply equal and `false` otherwise. Primitive
values are checked using the [`isSame`](#issame) module. `Setoids` are
compared using their `equals` or `fantasy-land/equals` methods.

```typescript
import { equals } from "eek-whales"

equals ([1, 2, 3]) ([1, 2, 3])            // => true
equals ({ a: 1, b: 2 }) ({ a: 1, b: 2 })  // => true
equals (NaN) (NaN)                        // => true
equals ([]) ([])                          // => true

equals (0) (-0)                           // => false
equals ([4]) ([2])                        // => false

// `Max` is a Setoid [Object] with an `equals` method
equals (Max(42)) (Max(43))                // => false
```

## Classify Functions

### getType

```txt
getType :: a -> String
```

`getType` is a function that returns a value's type, given any value.
The original version of this function was named `type`, but was changed
to avoid conflicts with the TypeScript keyword.

```typescript
import { getType } from "eek-whales"

getType("hello")            // => "String"
getType([1, 2, 3])          // => "Array"
getType(42)                 // => "Number"
getType(/^foo$/i)           // => "RegExp"
getType(<T>(x: T): T => x)  // => "Function"

// An object with a custom type
const MyCustomType = {
  "@@type": "CustomType",
}

// An object with a custom type using the Symbol.toStringTag
const AnotherCustomType = {
  get [Symbol.toStringTag]() { return "CustomType" },
}

getType(MyCustomType)       // => "CustomType"
getType(AnotherCustomType)  // => "CustomType"
```

### is

```txt
is :: String -> a -> Boolean
```

The `is` function accepts two parameters. The first is a string that
represents the type for the second parameter to be validated against.
Uses [`getType`](#gettype) on the second parameter for the comparison.

```typescript
import { is } from "eek-whales"

is ("String") ("hello")   // => true
is ("String") (42)        // => false
is ("Array") ([1, 2, 3])  // => true
is ("Array") ({ a: 1 })   // => false
is ("Undefined") ()       // => true

is ("Max") (Max(42).concat(Max(41)))  // => true
```

## Predicate Functions

### isSame

```txt
isSame :: a -> b -> Boolean
```

The `isSame` predicate function is similar to [isEqual](#isequal) with
the exception of negative zero (`-0`) and zero (`0`, `+0`) not being
equal. It is equivalent to the JavaScript `Object.is` static method.

```typescript
import { isSame } from "eek-whales"

isSame (0) (0)    // => true
isSame (0) (+0)   // => true
isSame (0) (-0)   // => false
isSame (-0) (+0)  // => false
```

### isSameType

```txt
isSameType :: a -> b -> Boolean
```

`isSameType` accepts any value for both parameters and returns a boolean
that represents if both parameters are of the same type.

```typescript
import { isSameType } from "eek-whales"

isSameType ("hello") ("world")  // => true
isSameType (21) (42)            // => true
isSameType (null) (undefined)   // => false
isSameType ({}) ([])            // => false
```

### isTruthy

```txt
isTruthy :: a -> Boolean
```

`isTruthy` returns the result of converting the given parameter into a
boolean.

```typescript
import { isTruthy } from "eek-whales"

isTruthy(true)        // => true
isTruthy({})          // => true
isTruthy([])          // => true
isTruthy(42)          // => true
isTruthy("0")         // => true
isTruthy(new Date())  // => true
isTruthy(Infinity)    // => true
isTruthy(false)       // => false
isTruthy(0)           // => false
isTruthy(-0)          // => false
isTruthy(0n)          // => false
isTruthy("")          // => false
isTruthy(null)        // => false
isTruthy(undefined)   // => false
isTruthy(NaN)         // => false
```

### isNil

```txt
isNil :: a -> Boolean
```

`isNil` returns `true` given one of `null`, `undefined`, or `NaN`. All
other values return `false`.

```typescript
import { isNil } from "eek-whales"

isNil(null)       // => true
isNil(undefined)  // => true
isNil(NaN)        // => true
isNil("")         // => false
isNil(0)          // => false
isNil(42)         // => false
isNil([])         // => false
```

### isFunction

```txt
isFunction :: a -> Boolean
```

`isFunction` returns `true` given a function or generator function. All
other values return `false`.

```typescript
import { isFunction } from "eek-whales"

const generator = function*() { yield "a"}
const fn = <T>(x: T): T => x

isFunction(fn)                         // => true
isFunction(<T>(x: T): T => x)          // => true
isFunction(generator)                  // => true
isFunction(function*() { yield "a" })  // => true
isFunction([])                         // => false
```

### isDate

```txt
isDate :: a -> Boolean
```

`isDate` returns `true` given a date object. All other values return
`false`.

```typescript
import { isDate } from "eek-whales"

isDate(new Date())            // => true
isDate(new Date(2023, 1, 1))  // => true
isDate(Date.now())            // => false
isDate()                      // => false
isDate("Wed Feb 01 2023 00:00:00 GMT-0500 (Eastern Standard Time)") // => false
```

### isIterable

```txt
isIterable :: a -> Boolean
```

`isIterable` returns `true` given a value with a `Symbol.iterator`
static method.

```typescript
import { isIterable } from "eek-whales"

isIterable("hello world")                               // => true
isIterable([1, 2, 3])                                   // => true
isIterable(new Uint8Array([10, 20, 30, 40, 50]))        // => true
isIterable(new Map([["a", 1], ["b", 10], ["c", 100]]))  // => true
isIterable(new Set([0, 1, 1, 2, 3, 5, 8, 13, 21, 34]))  // => true
isIterable(42)                                          // => false
isIterable({})                                          // => false
isIterable()                                            // => false

const customIterable = {
  *[Symbol.iterator]() {
    yield 1
    yield 2
    yield 3
  }
}

isIterable(customIterable)  // => true
```

### isSetoid

```txt
isSetoid :: a -> Boolean
```

`isSetoid` returns `true` given an object/class with an `equals` or
`fantasy-land/equals` method. All other values return `false`. This
module relies on duck typing to check if a value is a Setoid. It does
**NOT** validate any of the required algebraic laws (reflexivity,
symmetry, and transitivity) as laid out in the [Fantasy Land
Specification]. Validating the laws is not possible without knowing the
type of value that will be passed to the `equals` method in advance and
that will vary depending on the Setoid implementation.

```typescript
import { isSetoid } from "eek-whales"
import { Min, Max } from "eek-whales"

isSetoid(Min)            // => true
isSetoid(Max)            // => true
isSetoid("hello world")  // => false

interface NumericSetoid {
  value: number
  equals: (n: NumericSetoid) => boolean
}

const mySetoid = (x: number) => ({
  value: x,
  equals: (y: NumericSetoid) => x === y.value
})

isSetoid(mySetoid(42))  // => true
isSetoid(mySetoid)      // => false
```

## Showable

### inspect

```txt
inspect :: a -> String
```

`inspect` returns a string representation of the given value. Useful
as a helper function for creating `toString` methods for ADTs.

```typescript
import { inspect } from "eek-whales"

inspect("hello world")         // => "hello world"
inspect(42)                    // => "42"
inspect([1, 2, 3])             // => "[1, 2, 3]"
inspect(undefined)             // => "undefined"
inspect(<T>(x: T): T => x)     // => "(x) => x"
inspect(new TypeError("FOO"))  // => "TypeError: FOO"
```

### nodeInspect

```txt
nodeInspect :: Symbol
```

Using `nodeInspect` in the ADTs allows for defining custom `console.log`
output for Node.js without the need to `import` the `util` module. This
makes it unnecessary to verify a Node.js environment.

```typescript
import { inspect, nodeInspect } from "eek-whales"

const Identity = x => ({
  // ...

  toString() {
    return `Identity(${inspect(x)})`
  },

  [nodeInspect]() {
    return this.toString()
  }
})
```

[Fantasy Land Specification]: https://github.com/fantasyland/fantasy-land
