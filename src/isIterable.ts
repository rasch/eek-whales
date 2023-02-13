import { isNil } from "./isNil.js"
import { isFunction } from "./isFunction.js"

// isIterable :: a -> Boolean
export const isIterable = (a?: any) : boolean =>
  !isNil(a) && isFunction(a[Symbol.iterator])
