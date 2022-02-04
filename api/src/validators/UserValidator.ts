import { validate, ValidationError } from 'class-validator'
import { Request } from 'express'
import { UserPatchDTO } from '../dto'
import { HttpError, ServerValidationError } from '../error'
import { Languages } from '../types'
import { ErrorMessages, HttpStatusCodes, isSomeEnum } from '../utils'

interface IUserValidator {
  patchUserById(req: Request): Promise<{ user: UserPatchDTO; id: string }>
  getUserById(req: Request): { id: string }
}

class UserValidator implements IUserValidator {
  public getUserById = (req: Request): { id: string } => {
    const id = req.params.id

    if (!id) {
      throw new HttpError(HttpStatusCodes.BadRequest, {
        id: [ErrorMessages.IsNotValid],
      })
    }

    return { id }
  }

  public patchUserById = async (req: Request): Promise<{ user: UserPatchDTO; id: string }> => {
    const id = req.params.id
    const user = new UserPatchDTO()

    if (!id) {
      throw new HttpError(HttpStatusCodes.BadRequest, {
        id: [ErrorMessages.IsNotValid],
      })
    }

    Object.assign(user, req.body)
    const validationErrors: ValidationError[] = await validate(user, {
      stopAtFirstError: true,
      whitelist: true,
      skipMissingProperties: true,
    })

    if (user.language && !isSomeEnum(Languages)(user.language)) {
      throw new HttpError(HttpStatusCodes.BadRequest, {
        languages: [ErrorMessages.IsNotValid],
      })
    }

    if (validationErrors.length) {
      throw new ServerValidationError(validationErrors)
    }

    return { user, id }
  }
}

export { IUserValidator, UserValidator }
