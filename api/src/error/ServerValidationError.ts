import { ValidationError } from 'class-validator'
import { ErrorMessage, HttpStatusCodes, isSomeEnum } from '../utils'

class ServerValidationError extends Error {
  constructor(validationErrors: ValidationError[]) {
    super()

    this.errors = this.extractErrors(validationErrors)
  }

  private extractErrors(validationErrors: ValidationError[]): Record<string, ErrorMessage[]> {
    const extractedErrors: Record<string, ErrorMessage[]> = {}

    validationErrors.map((error) => {
      if (error.property && error.constraints) {
        extractedErrors[error.property] = []

        for (const key in error.constraints) {
          if (isSomeEnum<ErrorMessage>(error.constraints[key] as ErrorMessage))
            extractedErrors[error.property].push(error.constraints[key] as ErrorMessage)
        }
      }
    })
    return extractedErrors
  }

  public errors: Record<string, ErrorMessage[]> = {}
  public code = HttpStatusCodes.BadRequest
}

export { ServerValidationError }
