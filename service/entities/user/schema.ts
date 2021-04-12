import { UserRole } from './types'

export default {
  title: 'User Schema',
  bsonType: 'object',
  required: ['name', 'email', 'sub', 'role'],
  properties: {
    name: {
      bsonType: 'string',
      description: 'must be a string and is required',
      minLength: 1,
    },
    email: {
      bsonType: 'string',
      description: 'must be a valid email address and is required',
      minLength: 6,
    },
    sub: {
      bsonType: 'string',
      description: 'must be a valid UUID and is required',
      minLength: 36,
      maxLength: 36,
    },
    role: {
      bsonType: 'string',
      enum: Object.values(UserRole),
      description: 'can only be one of the enum values',
    },
  },
}
