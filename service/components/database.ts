import mongoose, { Connection } from 'mongoose'

import config from '../configs/database'

import schemas from './schemas'

const mongooseInstance = mongoose
  .createConnection(config.default.uri, config.default.options)
  .asPromise()

/**
 * Connects to the database and loads it's schemas.
 *
 * @param {string} name The connection name to use.
 *
 * @returns {Connection} The connection.
 */
async function connect(name = 'default'): Promise<Connection> {
  const conn = await mongooseInstance

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
async function disconnect(): Promise<void> {
  const conn = await mongooseInstance

  return conn.close()
}

export default {
  disconnect,
  connect,
}
