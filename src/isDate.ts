import { is } from "./is.js"

interface IsDate {
  (a?: any): boolean
}

export const isDate: IsDate = is("Date")
