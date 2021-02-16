import path from 'path'

import { config } from 'dotenv'

config({
  path: path.resolve(process.cwd(), '.env.test'),
})

process.env.SERVERLESS_TEST_ROOT = path.join(process.cwd(), 'service')
process.env.MONGOMS_VERSION = '4.2.12'
