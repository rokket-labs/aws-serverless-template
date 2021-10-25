import { MongoMemoryServer } from 'mongodb-memory-server-core'
import mongoose, { Connection } from 'mongoose'

import db, { manager } from '../../service/components/database'
import config from '../../service/configs/database'

export interface TestDatabase {
  /**
   * The in-memory mongod instance.
   */
  mongod: MongoMemoryServer

  /**
   * The connection to the mongod instance.
   */
  conn: Connection

  /**
   * Closes the database connection and stops the mongod instance.
   */
  stop(): Promise<void>
}

/**
 * Creates a test in-memory database instance and stubs the database component.
 *
 */
export async function setupTestDatabase(): Promise<TestDatabase> {
  const mongod = await MongoMemoryServer.create()

  const uri = mongod.getUri()

  manager.setConnection(
    mongoose.createConnection(uri, config.default.options).asPromise(),
  )

  const conn = await db.connect()

  return {
    mongod,
    conn,
    async stop() {
      await conn.close(true)
      await mongod.stop(true)
    },
  }
}
