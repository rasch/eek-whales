interface IsEqual {
  (a?: any): (b?: any) => boolean
}

export const isEqual: IsEqual = a => b => a === b || (a !== a && b !== b)
