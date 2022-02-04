import cors from 'cors'
import express from 'express'
import http from 'http'
import { IUserController, UserController } from './controllers'
import { errorHandler, httpErrorHandler, serverValidationErrorHandler } from './middleware'
import { IUserRepository, UserRepository } from './repositories'
import { UserRouter } from './routers'
import { IUserService, UserService } from './services'
import { IUserValidator, UserValidator } from './validators'

class Server {
  public constructor() {
    this.app = express()

    this.userRepository = new UserRepository()
    this.userService = new UserService(this.userRepository)
    this.userValidator = new UserValidator()
    this.userController = new UserController(this.userService, this.userValidator)

    this.app.use([express.json(), express.urlencoded({ extended: true }), cors()])
    this.userRouter = new UserRouter(this.userController)
    this.app.use(this.userRouter.router)

    this.app.use(httpErrorHandler)
    this.app.use(serverValidationErrorHandler)
    this.app.use(errorHandler)
  }

  public run(port: number, callback?: () => void | undefined): http.Server {
    return this.app.listen(port, callback)
  }

  private app: express.Application

  private userRouter: UserRouter
  private userController: IUserController
  private userService: IUserService
  private userRepository: IUserRepository
  private userValidator: IUserValidator
}

export default Server
