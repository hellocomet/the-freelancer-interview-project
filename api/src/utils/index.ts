const isSomeEnum =
  <T>(e: T) =>
  (token: unknown): token is T[keyof T] => {
    return Object.values(e).includes(token as T[keyof T])
  }

export * from './ErrorMessages'
export * from './HttpStatusCodes'
export { isSomeEnum }
