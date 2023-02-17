import { isFunction } from "./isFunction.js"
import { isNil } from "./isNil.js"

interface IsIterable {
  (a?: any): boolean
}

export const isIterable: IsIterable = a =>
  !isNil(a) && isFunction(a[Symbol.iterator])
