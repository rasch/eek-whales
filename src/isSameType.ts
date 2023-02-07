import { getType } from "./getType.js"

// isSameType :: a -> b -> Boolean
export const isSameType = (a: any) => (b: any) => getType(a) === getType(b)
