import { test } from "fvb"
import { nodeInspect } from "./index.js"

test("nodeInspect", t => {
  t.equal(typeof nodeInspect, "symbol", "is a symbol")
  t.plan(1)
})
