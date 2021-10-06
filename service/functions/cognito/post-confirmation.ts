import { CustomMessageAuthenticationTriggerEvent as Event } from 'aws-lambda'

import db from '../../components/database'
import { UserRole } from '../../entities/user/model'
import { UserDocument } from '../../entities/user/types'

export async function handler(event: Event): Promise<Event> {
  const conn = await db.connect()

  await conn.model<UserDocument>('User').updateOne(
    {
      sub: event?.request?.userAttributes?.sub,
    },
    {
      email: event?.request?.userAttributes?.email,
      name: event?.request?.userAttributes?.name,
      sub: event?.request?.userAttributes?.sub,
      role: UserRole.User,
    },
    {
      upsert: true,
    },
  )

  return event
}
