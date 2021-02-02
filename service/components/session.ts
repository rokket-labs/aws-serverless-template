import { APIGatewayProxyEvent as Context } from 'aws-lambda'

import { UserDocument } from '../entities/user/types'

import db from './database'

export async function getUser(context: Context): Promise<UserDocument | null> {
  const sub = context?.requestContext?.authorizer?.claims?.sub

  if (!sub)
    return null

  const conn = await db.connect()

  return conn.model<UserDocument>('user').findOne()
    .where('sub').equals(sub)
    .lean()
}
