import { MongoClient } from 'mongodb'
import { MongoMemoryServer } from 'mongodb-memory-server-core'

import config from '../../service/configs/database'
import db from '../../service/components/database'

export interface TestDatabase {
  /**
   * The in-memory mongod instance.
   */
  mongod: MongoMemoryServer

  /**
   * The connection to the mongod instance.
   */
  client: MongoClient

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
export const setupTestDatabase = async (
  name = 'default',
): Promise<TestDatabase> => {
  const mongod = await MongoMemoryServer.create()
  const uri = await mongod.getUri(true)

  config.set(name, {
    uri,
    options: {
      ...config.get(name).options,
      poolSize: 10,
    },
  })

  const client = await db.connect(name)

  return {
    mongod,
    client,

    async stop() {
      await db.disconnect()
      await mongod.stop()
    },
  }
}
