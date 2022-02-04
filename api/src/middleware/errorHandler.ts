import { NextFunction, Request, Response } from 'express'
import { HttpError, ServerValidationError } from '../error'
import { HttpStatusCodes } from '../utils'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
  res.status(500).json({
    code: HttpStatusCodes.InternalServerError,
  })
}

function httpErrorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
  if (!(err instanceof HttpError)) {
    return next(err)
  }

  res.status(err.code).json({
    code: err.code,
    errors: err.errors,
  })
}

function serverValidationErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (!(err instanceof ServerValidationError)) {
    return next(err)
  }

  res.status(err.code).json({
    code: err.code,
    errors: err.errors,
  })
}

export { errorHandler, httpErrorHandler, serverValidationErrorHandler }
