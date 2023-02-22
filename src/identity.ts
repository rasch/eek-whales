interface Identity {
  <T>(a: T): T
}

export const identity: Identity = a => a
