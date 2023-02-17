interface IsNil {
  (a?: any): boolean
}

export const isNil: IsNil = a => a == null || a !== a
