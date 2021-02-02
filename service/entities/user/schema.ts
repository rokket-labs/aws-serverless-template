import is from '@fiquu/is'
import { Schema } from 'mongoose'

import { UserRole } from './types'

const schema = new Schema({
  email: {
    type: String,
    required: true,
    validate: (val: string): boolean => is.email(val),
  },
  sub: {
    type: String,
    required: true,
    validate: (val: string): boolean => is.uuid(val),
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.User,
    required: true,
  }
}, {
  versionKey: false,
  timestamps: true,
})

export default schema
