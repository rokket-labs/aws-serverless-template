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

/**
 * Disconnects from the database.
 *
 * @param {boolean} force Whether to force disconnection.
 *
 * @returns {Promise<void>} A promise to the disconnection.
 */
async function disconnect(force = false): Promise<void> {
  return manager.disconnect(force)
}

export default {
  disconnect,
  connect,
}
