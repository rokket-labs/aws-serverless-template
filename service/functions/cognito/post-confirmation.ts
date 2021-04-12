import { CustomMessageAuthenticationTriggerEvent as Event } from 'aws-lambda'

import db from '../../components/database'
import { UserDocument } from '../../entities/user/types'

export async function handler(event: Event): Promise<Event> {
  const client = await db.connect()

  await client.db().collection<UserDocument>('user').updateOne(
    {
      sub: event?.request?.userAttributes?.sub,
    },
    {
      email: event?.request?.userAttributes?.email,
      name: event?.request?.userAttributes?.name,
      sub: event?.request?.userAttributes?.sub,
    },
    {
      upsert: true,
    },
  )

  return event
}
