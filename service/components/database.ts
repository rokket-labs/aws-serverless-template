import mongoose, { Connection } from 'mongoose'

import config from '../configs/database'

import schemas from './schemas'

class MongoManager {
  #loadedConnection: Promise<Connection>
  setConnection(newConnection: Promise<Connection>) {
    const loadConnection = async () => {
      const connection = await newConnection

      schemas.load(connection)

      return connection
    }

    this.#loadedConnection = loadConnection()
  }

  async getConnection() {
    if (this.#loadedConnection === undefined)
      throw new Error('Must set a connection first')

    return this.#loadedConnection
  }
  async disconnect(force = false) {
    if (this.#loadedConnection) {
      const conn = await this.#loadedConnection

      await conn.close(force)
      this.#loadedConnection = undefined
    }
  }
}

export const manager = new MongoManager()

/**
 * Connects to the database and loads it's schemas.
 *
 */
async function connect(): Promise<Connection> {
  if (process.env.NODE_ENV !== 'test')
    manager.setConnection(
      mongoose
        .createConnection(config.default.uri, config.default.options)
        .asPromise(),
    )

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
