import { nodeInspect } from "./nodeInspect.js"
import { getType } from "./getType.js"

// inspect :: a -> String
export const inspect = (x: any) : string => {
  // Handle nested ADTs in Node.js console.
  if (x && typeof x[nodeInspect] === "function") {
    return x[nodeInspect]()
  }

  if (x === null) return String(null)

  switch (getType(x)) {
    case "Function":
      return x.name || x.toString()
    case "String":
      return `"${x}"`
    case "Array":
      return `[${x.map(inspect).join(", ")}]`
    case "Object":
      return `{${Object.keys(x)
        .map(k => [/\s/.test(k) ? `"${k}"` : k, inspect(x[k])])
        .map(k => k.join(": "))
        .join(", ")}}`
    case "Map":
      return `Map(${inspect([...x])})`
    case "Set":
      return `Set(${inspect([...x])})`
    default:
      return String(x)
  }
}
