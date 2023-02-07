import { isNil } from "./isNil.js"

// getType :: a -> String
export const getType = (x: any) : string =>
  (!isNil(x) && x["@@type"]) || Object.prototype.toString.call(x).slice(8, -1)
