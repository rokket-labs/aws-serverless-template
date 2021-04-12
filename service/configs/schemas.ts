import user from '../entities/user/schema'

const config = new Map<string, Map<string, Record<string, unknown>>>()

config.set('default', new Map([['user', user]]))

export default config
