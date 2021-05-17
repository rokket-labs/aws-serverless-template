import { isEmail } from '@fiquu/is/lib/regexp/email'
import { isUuid } from '@fiquu/is/lib/regexp/uuid'
import { Schema } from 'mongoose'

import { UserRole } from './types'

const schema = new Schema({
  email: {
    type: String,
    required: true,
    validate: (val: string): boolean => isEmail(val),
  },
  sub: {
    type: String,
    required: true,
    validate: (val: string): boolean => isUuid(val),
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
