import type { Connection } from 'mongoose'

import models from '../configs/models'

/**
 * Loads all schemas into the default database connection.
 *
 * @param {Connection} conn The connection to load into.
 */
function load(conn: Connection): void {
  for (const model of models) conn.model(model.modelName, model.schema)
}

export default { load }
