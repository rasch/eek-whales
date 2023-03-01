import { getType } from "./getType.js"
import { nodeInspect } from "./nodeInspect.js"

interface Inspect {
  (a?: any): string
}

export const inspect: Inspect = a => {
  // Handle nested ADTs in Node.js console.
  if (a && typeof a[nodeInspect] === "function") {
    return a[nodeInspect]()
  }

  if (a === null) return String(null)

  switch (getType(a)) {
    case "Function":
      return a.name || a.toString()
    case "String":
      return `"${a}"`
    case "Array":
      return `[${a.map(inspect).join(", ")}]`
    case "Object":
      return `{${Object.keys(a)
        .map(k => [/\s/.test(k) ? `"${k}"` : k, inspect(a[k])])
        .map(k => k.join(": "))
        .join(", ")}}`
    case "Map":
      return `Map(${inspect([...a])})`
    case "Set":
      return `Set(${inspect([...a])})`
    default:
      return Object.is(a, -0) ? "-0" : String(a)
  }
}
