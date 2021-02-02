import type { DatabaseClientConfig } from '@fiquu/database-manager-mongoose'
import mongoose from 'mongoose'

const { DB_URI, NODE_ENV, LOG_LEVEL } = process.env

mongoose.set('debug', LOG_LEVEL === 'debug')

/**
 * These defaults have been set according to the official recommendations.
 *
 * @see https://mongoosejs.com/docs/lambda.html
 */
const options = {
  promiseLibrary: Promise, // Set the native promise library
  useUnifiedTopology: true,
  connectTimeoutMS: 3000, // Fail quickly if can't connect
  bufferCommands: false, // Disable Mongoose buffering
  useNewUrlParser: true, // Use the new URL parser
  bufferMaxEntries: 0, // Disable MongoDB driver buffering
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false, // You should use the db-indexes setup script to create the database indexes
  poolSize:
    NODE_ENV === 'local'
      ? 10 // Allow for some concurrency while developing locally
      : 1, // We don't need more for each function on production environments
}

const config = {
  default: {
    uri: DB_URI,
    options
  } as DatabaseClientConfig
}

export default config
