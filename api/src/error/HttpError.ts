import { ErrorMessage, HttpStatusCode } from '../utils'

class HttpError extends Error {
  constructor(code: HttpStatusCode, errors?: Record<string, ErrorMessage[]>) {
    super()
    this.code = code
    if (errors) this.errors = errors
  }

  public code
  public errors: Record<string, unknown> = {}
}

export { HttpError }
