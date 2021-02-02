import type {
  SchemaLoaderOptions,
  SchemasMap,
} from '@fiquu/schema-loader-mongoose'

import user from '../entities/user/schema'

const config = new Map()
const schemas: SchemasMap = new Map()
const options: SchemaLoaderOptions = {
  replace: false,
  clone: true,
}

schemas.set('user', user)

config.set('default', { schemas, options })

export default config
