import { getType } from "./getType.js"

// is :: String -> a -> Boolean
export const is = (t: string) => (x?: any) : boolean => getType(x) === t
