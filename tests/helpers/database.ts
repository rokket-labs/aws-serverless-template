import { MongoMemoryServer } from 'mongodb-memory-server-core'
import { Connection } from 'mongoose'

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
 * @param {boolean} loadSchemas Whether to register all schemas.
 */
export async function setupTestDatabase(
  name = 'default',
): Promise<TestDatabase> {
  const mongod = await MongoMemoryServer.create()
  const uri = await mongod.getUri(true)

  manager.add(name, {
    uri,
    options: {
      ...config[name].options,
      poolSize: 10,
    },
  })

  const conn = await db.connect(name)

  return {
    mongod,
    conn,

    async stop() {
      await db.disconnect()
      await conn.close(true)
      await mongod.stop()
    },
  }
}
