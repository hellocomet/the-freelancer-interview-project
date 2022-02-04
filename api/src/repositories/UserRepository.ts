import { Languages, User } from '../types'

interface IUserRepository {
  getUser(id: string): Promise<User | undefined>
  saveUser(newUser: User, id: string): Promise<User | undefined>
}

class UserRepository implements IUserRepository {
  public getUser = async (id: string): Promise<User | undefined> => {
    return this.users.find((element) => element.id === id)
  }

  public saveUser = async (newUser: User, id: string): Promise<User | undefined> => {
    let user: User | undefined = undefined

    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === id) {
        this.users[i] = newUser
        user = this.users[i]
      }
    }

    return user
  }

  users: User[] = [
    {
      id: 'a6af7583-ff4b-44b5-abc7-daf5444f3b9b',
      avatar: {
        '64x64': '/avatar/a6af7583-ff4b-44b5-abc7-daf5444f3b9b/64x64.png',
        '256x256': '/avatar/a6af7583-ff4b-44b5-abc7-daf5444f3b9b/256x256.png',
        '512x512': '/avatar/a6af7583-ff4b-44b5-abc7-daf5444f3b9b/512x512.png',
      },
      firstname: 'Gordon',
      lastname: 'Champlin',
      language: Languages.KLINGON,
      birthDate: new Date(1990, 12, 31).toISOString(),
      isVisible: false,
      retribution: 500,
    },
  ]
}

export { IUserRepository, UserRepository }
