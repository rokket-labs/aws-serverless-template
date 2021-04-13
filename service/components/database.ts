import { MongoClient } from 'mongodb'

import config from '../configs/database'

import { loadSchemas } from './schemas'

export const connections = new Map<string, MongoClient>()

/**
 * Connects to the database and loads it's schemas.
 *
 * @param {string} name The connection name to use.
 *
 * @returns {Connection} The connection.
 */
const connect = async (name = 'default'): Promise<MongoClient> => {
  try {
    if (connections.has(name)) return connections.get(name)

    const { uri, options } = config.get(name)
    const client = new MongoClient(uri, options)

    await client.connect()
    await client.db().command({
      ping: 1,
    })

    connections.set(name, client)

    await loadSchemas(name, client)

    return client
  } catch (err) {
    if (connections.has(name)) {
      await connections.get(name).close()
      connections.delete(name)
    }

    throw err
  }
}

/**
 * Disconnects from the database.
 *
 * @param {string} name The connection name to disconnect.
 * @param {boolean} force Whether to force disconnection.
 *
 * @returns {Promise<void>} A promise to the disconnection.
 */
const disconnect = (name = 'default', force?: boolean): Promise<void> => {
  return connections.get(name).close(force)
}

export default {
  disconnect,
  connect,
}
