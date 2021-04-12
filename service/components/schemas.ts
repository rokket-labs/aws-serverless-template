import { MongoClient } from 'mongodb'

import config from '../configs/schemas'

/**
 * Loads all schemas into the default database connection.
 *
 * @param {string} name The connection name to load for.
 * @param {Connection} conn The connection to load into.
 */
export const load = async (
  name = 'default',
  client: MongoClient,
): Promise<void> => {
  const schemas = config.get(name)

  for (const [name, schema] of schemas)
    await client.db().createCollection(name, {
      validator: {
        $jsonSchema: {
          ...schema,
        },
      },
    })
}

export default { load }
