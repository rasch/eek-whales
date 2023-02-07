// nodeInspect :: Symbol
//
// Using this in the ADTs allows for defining custom `console.log`
// output for Node.js without the need to `import` the `util` module.
// This makes it unnecessary to verify a Node.js environment.
//
// Example:
//
//   import { inspect } from "./inspect.js"
//   import { nodeInspect } from "./nodeInspect.js"
//
//   const Identity = x => ({
//     ...
//     },
//     toString() {
//       return `Identity(${inspect(x)})`
//     },
//     [nodeInspect]() {
//       return this.toString()
//     }
//   })
//
export const nodeInspect = Symbol.for("nodejs.util.inspect.custom")
