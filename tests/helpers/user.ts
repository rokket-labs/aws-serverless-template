import faker from 'faker'
import type { Connection } from 'mongoose'

import { User, UserDocument, UserRole } from '../../service/entities/user/types'

export function getCreateUserInput(params?: Partial<User>): User {
  return {
    role: params?.role ?? faker.random.arrayElement(Object.values(UserRole)),
    email: params?.email ?? faker.internet.email(),
    name: params?.name ?? faker.random.word(),
    sub: params?.sub ?? faker.datatype.uuid(),
  }
}

export function createUser(
  conn: Connection,
  params?: Partial<User>,
): Promise<UserDocument> {
  const input = getCreateUserInput(params)

  return conn.model<UserDocument>('user').create(input)
}
