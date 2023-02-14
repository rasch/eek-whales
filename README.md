# EEK-Whales

![The EEK-Whales Logo](/assets/logo.svg)

> A collection of JavaScript/TypeScript modules for functional programming

## API

### [Point-free Functions](#point-free-functions-1)

- [equals](#equals) :: `a -> b -> Boolean`

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
equals :: a -> b -> Boolean
```

The `equals` function is useful for deep equality comparisons or for
comparing two values of the `Setoid` type.

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
The original version of this function was named `type`, but had to be
changed when it was converted to TypeScript, to avoid using a reserved
word.

```typescript
import { getType } from "eek-whales"

getType("hello")    // => "String"
getType([1, 2, 3])  // => "Array"
getType(42)         // => "Number"
getType(/^foo$/i)   // => "RegExp"
getType(x => x)     // => "Function"
```

### is

```txt
is :: String -> a -> Boolean
```

The `is` function is curried and accepts two parameters. The first
parameter is a string that represents the type for the second parameter
to be validated with.

```typescript
import { is } from "eek-whales"

is("String")("hello")   // => true
is("String")(42)        // => false
is("Array")([1, 2, 3])  // => true
is("Array")({ a: 1 })   // => false
is("Undefined")()       // => true
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

isSame (0) (0)   // => true
isSame (0) (+0)  // => true
isSame (0) (-0)  // => false
isSame (-0) (+0) // => false
```

### isSameType

```txt
isSameType :: a -> b -> Boolean
```

`isSameType` accepts any value for both parameters and returns a boolean
that represents if both parameters are of the same type.

```typescript
import { isSameType } from "eek-whales"

isSameType("hello")("world")  // => true
isSameType(21)(42)            // => true
isSameType(null)(undefined)   // => false
isSameType({})([])            // => false
```

### isTruthy

```txt
isTruthy :: a -> Boolean
```

### isNil

```txt
isNil :: a -> Boolean
```

### isFunction

```txt
isFunction :: a -> Boolean
```

### isDate

```txt
isDate :: a -> Boolean
```

### isIterable

```txt
isIterable :: a -> Boolean
```

### isSetoid

```txt
isSetoid :: a -> Boolean
```

## Showable

### inspect

```txt
inspect :: a -> String
```

### nodeInspect

```txt
nodeInspect :: Symbol
```
