import { isFunction } from "./isFunction.js"
import { isTruthy } from "./isTruthy.js"

interface IsSetoid {
  (a?: any): boolean
}

export const isSetoid: IsSetoid = a =>
  isTruthy(a) && (isFunction(a.equals) || isFunction(a["fantasy-land/equals"]))
