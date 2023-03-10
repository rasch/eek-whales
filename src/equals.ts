import { getType } from "./getType.js"
import { isDate } from "./isDate.js"
import { isFunction } from "./isFunction.js"
import { isIterable } from "./isIterable.js"
import { isSame } from "./isSame.js"
import { isSameType } from "./isSameType.js"
import { isSetoid } from "./isSetoid.js"

type Setoid =
  | { "fantasy-land/equals": (b: Setoid) => boolean }
  | { equals: (b: Setoid) => boolean }

interface Equals {
  (a: Setoid): (b: Setoid) => boolean
  (a?: any): (b?: any) => boolean
}

export const equals: Equals = a => b => {
  if (isSame(a)(b)) {
    return true
  }

  if (isSetoid(a) && isSameType(a)(b)) {
    return isFunction(b["fantasy-land/equals"])
      ? b["fantasy-land/equals"].call(b, a)
      : b.equals.call(b, a)
  }

  if (
    !["object", "function"].includes(typeof a) ||
    !isSameType(a)(b) ||
    a.toString() !== b.toString() ||
    (isDate(a) && !isSame(a.valueOf())(b.valueOf()))
  ) {
    return false
  }

  const deepEqual: Equals = x => y => {
    if (Object.keys(x).length !== Object.keys(y).length) {
      return false
    }

    for (const key in x) {
      // Handle cyclic objects. If both keys equal each other or if both
      // keys equal themselves, then that key will match as long as the
      // rest of the keys match.
      if ((x[key] === y && y[key] === x) || (x[key] === x && y[key] === y)) {
        continue
      }

      if (!equals(x[key])(y[key])) {
        return false
      }
    }

    return true
  }

  // Compare Map, Set, TypedArray, WeakMap, WeakSet by converting to Arrays.
  return isIterable(a) && !["Array", "String"].includes(getType(a))
    ? deepEqual([...a])([...b])
    : deepEqual(a)(b)
}
