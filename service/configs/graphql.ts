import { join } from 'path'

// Import resolvers manually because serverless-plugin-typescript only compiles explicitly imported files.
import { AuthDirective } from '../entities/session/directives/auth'
import user from '../entities/user/resolvers'

export default {
  typeDefs: join('service', 'entities', '**', '*.graphql'),
  directives: {
    auth: AuthDirective,
  },
  resolvers: [user],
  cors: {
    origin: process.env.APP_ORIGIN,
    credentials: true,
  },
}
