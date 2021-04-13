import { MongoClient } from 'mongodb'

import config from '../configs/schemas'

/**
 * Loads all schemas into the default database connection.
 *
 * @param {string} name The connection name to load for.
 * @param {Connection} conn The connection to load into.
 */
export const loadSchemas = async (
  name = 'default',
  client: MongoClient,
): Promise<void> => {
  const schemas = config.get(name)
  // const collections = (await client.db().collections()) as string[]

  for (const [name, schema] of schemas) {
    // if (collections.includes(name)) {
    // }

    await client.db().createCollection(name, { ...schema })
  }
}
