import { Router } from 'express'
import { IUserController } from '../controllers'

class UserRouter {
  public constructor(private userController: IUserController) {
    this.router.get('/user/:id', userController.getUserById)
    this.router.patch('/user/:id', userController.patchUserById)
  }

  public router: Router = Router()
}

export { UserRouter }
