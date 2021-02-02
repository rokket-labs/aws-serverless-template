import { createSchemaLoader } from '@fiquu/schema-loader-mongoose'
import type { Connection } from 'mongoose'

import config from '../configs/schemas'

/**
 * Loads all schemas into the default database connection.
 *
 * @param {string} name The connection name to load for.
 * @param {Connection} conn The connection to load into.
 */
function load(name = 'default', conn: Connection): void {
  const { schemas, options } = config.get(name)
  const loader = createSchemaLoader(conn, options)

  loader.loadAll(schemas)
}

export default { load }
