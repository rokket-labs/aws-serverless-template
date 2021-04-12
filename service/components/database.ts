import { MongoClient } from 'mongodb'

import config from '../configs/database'

import schemas from './schemas'

export const connections = new Map<string, MongoClient>()

/**
 * Connects to the database and loads it's schemas.
 *
 * @param {string} name The connection name to use.
 *
 * @returns {Connection} The connection.
 */
async function connect(name = 'default'): Promise<MongoClient> {
  if (connections.has(name)) return connections.get(name)

  const client = config.get(name)

  await client.connect()
  await client.db('admin').command({
    ping: 1,
  })

  await schemas.load(name, client)

  connections.set(name, client)

  return client
}

/**
 * Disconnects from the database.
 *
 * @param {string} name The connection name to disconnect.
 * @param {boolean} force Whether to force disconnection.
 *
 * @returns {Promise<void>} A promise to the disconnection.
 */
function disconnect(name = 'default', force?: boolean): Promise<void> {
  return connections.get(name).close(force)
}

export default {
  disconnect,
  connect,
}
