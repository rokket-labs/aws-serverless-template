import type { LeanDocument } from 'mongoose'

import db from '../../../components/database'
import { UserDocument } from '../types'

interface Params {
  _id: string
}

/**
 * @param {object} root The GraphQL root.
 * @param {object} params The GraphQL query params.
 * @param {object} context The request context.
 *
 * @returns {object} The response.
 */
export default async (
  root: void,
  { _id }: Params,
): Promise<LeanDocument<UserDocument>> => {
  const conn = await db.connect()

  return conn.model<UserDocument>('User').findById(_id)
}
