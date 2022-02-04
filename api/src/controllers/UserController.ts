import { NextFunction, Request, Response } from 'express'
import { IUserService } from '../services'
import { HttpStatusCode, HttpStatusCodes } from '../utils'
import { IUserValidator } from '../validators'

interface IUserController {
  getUserById(req: Request, res: Response, next: NextFunction): Promise<void>
  patchUserById(req: Request, res: Response, next: NextFunction): Promise<void>
}

class UserController implements IUserController {
  constructor(userService: IUserService, userValidator: IUserValidator) {
    this.userService = userService
    this.userValidator = userValidator
  }

  public getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = this.userValidator.getUserById(req)
      const user = await this.userService.getUserById(id)

      this.res(res, HttpStatusCodes.Ok, {
        ...user,
      })
    } catch (error) {
      return next(error)
    }
  }

  public patchUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { user: userDTO, id } = await this.userValidator.patchUserById(req)

      const user = await this.userService.patchUserById(userDTO, id)

      this.res(res, HttpStatusCodes.Ok, { ...user })
    } catch (error) {
      return next(error)
    }
  }

  private res(res: Response, code: HttpStatusCode, data?: Record<string, unknown>): Response {
    return res.status(code).json({ code, data })
  }

  private userService: IUserService
  private userValidator: IUserValidator
}

export { UserController, IUserController }
