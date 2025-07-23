import { Injectable } from '@nestjs/common'
import { User } from '../types/user.type'

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'admin',
      password: '123456',
    },
    {
      userId: 2,
      username: 'user',
      password: '123456',
    },
  ]

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username)
  }
}
