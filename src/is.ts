import { getType } from "./getType.js"

interface Is {
  (type: string): (a?: any) => boolean
}

export const is: Is = type => a => getType(a) === type
