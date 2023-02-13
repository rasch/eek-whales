import { is } from "./is.js"

// isFunction :: a -> Boolean
export const isFunction = (x?: any) =>
  is("Function")(x) || is("GeneratorFunction")(x)
