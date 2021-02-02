import { createDatabaseManager } from '@fiquu/database-manager-mongoose'
import type { Connection } from 'mongoose'

import config from '../configs/database'

import schemas from './schemas'

export const manager = createDatabaseManager()

manager.add('default', config.default)

/**
 * Connects to the database and loads it's schemas.
 *
 * @param {string} name The connection name to use.
 *
 * @returns {Connection} The connection.
 */
async function connect(name = 'default'): Promise<Connection> {
  const conn: Connection = await manager.connect(name)

  await schemas.load(name, conn)

  return conn
}

/**
 * Disconnects from the database.
 *
 * @param {string} name The connection name to use.
 * @param {boolean} force Whether to force disconnection.
 *
 * @returns {Promise<void>} A promise to the disconnection.
 */
function disconnect(name = 'default', force?: boolean): Promise<void> {
  return manager.disconnect(name, force)
}

export default {
  disconnect,
  connect,
}
