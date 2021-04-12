import { MongoClient, MongoClientOptions } from 'mongodb'

const { DB_URI, NODE_ENV, LOG_LEVEL } = process.env

/**
 * These defaults have been set according to the official recommendations.
 *
 * @see https://docs.mongodb.com/drivers/node/current/fundamentals/connection/#connection-options
 */
const options: MongoClientOptions = {
  promiseLibrary: Promise, // Set the native promise library
  useUnifiedTopology: true,
  connectTimeoutMS: 3000, // Fail quickly if can't connect
  useNewUrlParser: true, // Use the new URL parser
  bufferMaxEntries: 0, // Disable MongoDB driver buffering
  loggerLevel: LOG_LEVEL,
  poolSize:
    NODE_ENV === 'local'
      ? 10 // Allow for some concurrency while developing locally
      : 1, // We don't need more for each function on production environments
}

const config = new Map<string, MongoClient>([
  ['default', new MongoClient(DB_URI, { ...options })],
])

export default config
