import path from 'path'

import { config } from 'dotenv'

config({
  path: '.env.test',
  debug: true,
})

process.env.SERVERLESS_TEST_ROOT = path.join(process.cwd(), 'service')
process.env.MONGOMS_VERSION = '4.2.12'
