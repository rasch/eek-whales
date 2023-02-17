interface IsTruthy {
  (a?: any): boolean
}

export const isTruthy: IsTruthy = a => !!a
