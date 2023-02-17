import { isNil } from "./isNil.js"

interface GetType {
  (a?: any): string
}

// getType :: a -> String
export const getType: GetType = a =>
  (!isNil(a) && a["@@type"]) || Object.prototype.toString.call(a).slice(8, -1)
