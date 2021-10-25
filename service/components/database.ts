import type { Connection } from 'mongoose'

import { MongoManager } from '../util/MongoManager'

export const manager = new MongoManager()

/**
 * Connects to the database and loads it's schemas.
 *
 */
async function connect(): Promise<Connection> {
  const conn = await manager.getConnection()

  return conn
}

export default {
  connect,
}
