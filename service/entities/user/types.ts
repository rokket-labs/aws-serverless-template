import type { Document } from 'mongoose'

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

export interface UserDocument extends User, Document {
  createdAt: Date
  updatedAt: Date
}
