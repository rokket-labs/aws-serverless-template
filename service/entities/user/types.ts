import { Document } from 'mongoose'

import { User } from './model'

export interface UserDocument extends User, Document {
  createdAt: Date
  updatedAt: Date
}
