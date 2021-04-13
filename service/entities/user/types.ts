import { ObjectId } from 'bson'

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER',
}

export interface User {
  email: string
  name: string
  sub: string
  role: UserRole
}

export interface UserDocument extends User {
  _id: ObjectId
}
