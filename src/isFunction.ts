import { is } from "./is.js"

interface IsFunction {
  (a?: any): boolean
}

export const isFunction: IsFunction = a =>
  is("Function")(a) || is("GeneratorFunction")(a)
