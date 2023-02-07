import { isTruthy } from "./isTruthy.js"
import { isFunction } from "./isFunction.js"

// isSetoid :: a -> Boolean
export const isSetoid = (a: any) : boolean =>
  isTruthy(a) && isFunction(a.equals)
