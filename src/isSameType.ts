import { getType } from "./getType.js"

interface IsSameType {
  (a?: any): (b?: any) => boolean
}

export const isSameType: IsSameType = a => b => getType(a) === getType(b)
