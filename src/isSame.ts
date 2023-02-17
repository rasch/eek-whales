interface IsSame {
  (a?: any): (b?: any) => boolean
}

export const isSame: IsSame = a => b =>
  a === b ? a !== 0 || 1 / a === 1 / b : a !== a && b !== b
