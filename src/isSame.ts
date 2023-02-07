// isSame :: a -> b -> Boolean
export const isSame = (a: any) => (b: any) : boolean =>
  a === b ? a !== 0 || 1 / a === 1 / b : a !== a && b !== b
