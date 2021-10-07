import mongoose from 'mongoose'

const { DB_URI, LOG_LEVEL } = process.env

mongoose.set('debug', LOG_LEVEL === 'debug')

/**
 * These defaults have been set according to the official recommendations.
 *
 * @see https://mongoosejs.com/docs/lambda.html
 */
const options = {
  connectTimeoutMS: 3000, // Fail quickly if can't connect
  bufferCommands: false, // Disable Mongoose buffering
  autoIndex: false, // You should use the db-indexes setup script to create the database indexes
}

const config = {
  default: {
    uri: DB_URI,
    options,
  },
}

export default config
