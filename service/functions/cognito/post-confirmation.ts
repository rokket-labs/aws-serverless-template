import { CustomMessageAuthenticationTriggerEvent as Event } from 'aws-lambda'

import { UserDocument, UserRole } from '../../entities/user/types'
import db from '../../components/database'

export const handler = async (event: Event): Promise<Event> => {
  const client = await db.connect()

  await client
    .db()
    .collection<UserDocument>('user')
    .updateOne(
      {
        sub: event?.request?.userAttributes?.sub,
      },
      {
        $set: {
          role: event?.request?.userAttributes?.role as UserRole,
          email: event?.request?.userAttributes?.email,
          name: event?.request?.userAttributes?.name,
          sub: event?.request?.userAttributes?.sub,
        },
      },
      {
        upsert: true,
      },
    )

  return event
}
