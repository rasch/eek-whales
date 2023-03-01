interface Constant {
  <T>(a: T): (_?: any) => T
}

export const constant: Constant = a => _ => a
