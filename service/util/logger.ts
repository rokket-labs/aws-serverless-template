import { createLogger, format, LoggerOptions, transports } from 'winston'

const { timestamp, prettyPrint } = format

const defaultOptions: LoggerOptions = {
  level: process.env.LOG_LEVEL || 'info',
  transports: [new transports.Console()],
  format: format.combine(timestamp(), prettyPrint()),
}

export const logger = createLogger(defaultOptions)
