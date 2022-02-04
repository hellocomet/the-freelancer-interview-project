import { UserPatchDTO } from '../dto'
import { HttpError } from '../error'
import { IUserRepository } from '../repositories'
import { User } from '../types'
import { ErrorMessages, HttpStatusCodes } from '../utils'

interface IUserService {
  getUserById(id: string): Promise<User>
  patchUserById(partialUser: UserPatchDTO, id: string): Promise<User>
}

class UserService implements IUserService {
  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  public getUserById = async (id: string): Promise<User> => {
    const user = await this.userRepository.getUser(id)

    if (!user) throw new HttpError(HttpStatusCodes.NotFound, { id: [ErrorMessages.DoesNotExist] })

    return user
  }

  public patchUserById = async (partialUser: UserPatchDTO, id: string): Promise<User> => {
    const user = await this.userRepository.getUser(id)

    if (!user) throw new HttpError(HttpStatusCodes.NotFound, { id: [ErrorMessages.DoesNotExist] })

    if (partialUser.firstname) user.firstname = partialUser.firstname
    if (partialUser.lastname) user.lastname = partialUser.lastname
    if (partialUser.birthDate) user.birthDate = user.birthDate
    if (partialUser.isVisible) user.isVisible = user.isVisible
    if (partialUser.retribution) user.retribution = user.retribution

    return user
  }

  private userRepository: IUserRepository
}

export { IUserService, UserService }
