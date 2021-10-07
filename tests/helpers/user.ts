import faker from 'faker'
import type { Connection } from 'mongoose'

import { User, UserRole } from '../../service/entities/user/model'
import { UserDocument } from '../../service/entities/user/types'

export function getCreateUserInput(params?: Partial<User>): User {
  return {
    role: params?.role ?? faker.random.arrayElement(Object.values(UserRole)),
    email: params?.email ?? faker.internet.email(),
    name: params?.name ?? faker.random.word(),
    sub: params?.sub ?? faker.datatype.uuid(),
  }
}

export async function createUser(
  conn: Connection,
  params?: Partial<User>,
): Promise<UserDocument> {
  const input = getCreateUserInput(params)

  return await conn.model<UserDocument>('User').create(input)
}
