import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'
import { ApolloServer, IResolvers } from 'apollo-server-lambda'

import config from '../configs/graphql'

const { LOG_LEVEL, NODE_ENV } = process.env

const resolvers = mergeResolvers(config.resolvers) as IResolvers
const typeDefs = mergeTypeDefs(
  loadFilesSync(config.typeDefs, {
    recursive: true,
  }),
)

export const server = new ApolloServer({
  context: ({ event }) => event,
  debug: LOG_LEVEL === 'debug',
  resolvers,
  typeDefs,
  schemaDirectives: {
    ...config.directives,
  },
  playground: {
    endpoint: `/${NODE_ENV}/graphql`,
  },
})

export const handler = server.createHandler({
  cors: config.cors,
})
