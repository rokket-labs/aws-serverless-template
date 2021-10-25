import mongoose, { Connection } from 'mongoose'

import schemas from '../components/schemas'
import config from '../configs/database'

export class MongoManager {
  #loadedConnection: Promise<Connection>
  constructor() {
    if (process.env.NODE_ENV !== 'test')
      this.setConnection(
        mongoose
          .createConnection(config.default.uri, config.default.options)
          .asPromise(),
      )
  }

  setConnection(newConnection: Promise<Connection>): void {
    const loadConnection = async () => {
      const connection = await newConnection

      schemas.load(connection)

      return connection
    }

    this.#loadedConnection = loadConnection()
  }

  async getConnection(): Promise<Connection> {
    if (this.#loadedConnection === undefined)
      throw new Error('Must set a connection first')

    return this.#loadedConnection
  }

  async disconnect(force = false): Promise<void> {
    if (this.#loadedConnection) {
      const conn = await this.#loadedConnection

      await conn.close(force)
      this.#loadedConnection = undefined
    }
  }
}
