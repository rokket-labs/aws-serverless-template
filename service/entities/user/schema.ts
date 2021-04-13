import { getRegExp as emailRegExp } from '@fiquu/is/lib/regexp/email'
import { getRegExp as uuidRegExp } from '@fiquu/is/lib/regexp/uuid'

import { UserRole } from './types'

export default {
  validator: {
    $and: [
      {
        email: {
          $regex: emailRegExp().source,
        },
      },
      {
        sub: {
          $regex: uuidRegExp().source,
        },
      },
      {
        $jsonSchema: {
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
            },
            sub: {
              bsonType: 'string',
              description: 'must be a valid UUID and is required',
            },
            role: {
              bsonType: 'string',
              enum: Object.values(UserRole),
              description: 'can only be one of the enum values',
            },
          },
        },
      },
    ],
  },
}
