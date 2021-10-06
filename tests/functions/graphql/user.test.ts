/* eslint-disable max-lines-per-function */
import { gql } from 'apollo-server-lambda'
import { APIGatewayProxyStructuredResultV2 } from 'aws-lambda'
import { print } from 'graphql'
import { getWrapper } from 'serverless-jest-plugin'

import { UserDocument } from '../../../service/entities/user/types'
import { setupTestDatabase, TestDatabase } from '../../helpers/database'
import { getAPIGatewayProxyEvent } from '../../helpers/event'
import { createUser } from '../../helpers/user'

describe('grahql', () => {
  describe('user', () => {
    let user: UserDocument
    let db: TestDatabase
    let handler

    beforeAll(async () => {
      db = await setupTestDatabase()
      user = await createUser(db.conn)

      handler = getWrapper('graphql', '/functions/graphql/index.ts', 'handler')
    })

    afterAll(async () => {
      await db.stop()
    })

    test('finds an existing user', async () => {
      const event = getAPIGatewayProxyEvent({
        body: JSON.stringify({
          variables: {
            _id: user._id.toHexString(),
          },
          query: print(gql`
            query User($_id: ID!) {
              user(_id: $_id) {
                _id
                name
                email
                role
              }
            }
          `),
        }),
      })

      const res: APIGatewayProxyStructuredResultV2 = await handler.run(event)

      expect(res).toEqual<APIGatewayProxyStructuredResultV2>({
        statusCode: 200,
        body: expect.any(String),
        headers: expect.any(Object),
      })

      const { data, errors } = JSON.parse(res.body)

      expect(errors).toBeUndefined()
      expect(data).toEqual(
        expect.objectContaining({
          user: {
            _id: expect.any(String),
            name: expect.any(String),
            email: expect.any(String),
            role: expect.any(String),
          },
        }),
      )
    })

    test('does not finds a non existing user', async () => {
      const event = getAPIGatewayProxyEvent({
        body: JSON.stringify({
          variables: {
            _id: '00aa00a0a0a0a00aa0aaaaa0',
          },
          query: print(gql`
            query User($_id: ID!) {
              user(_id: $_id) {
                _id
                name
                email
                role
              }
            }
          `),
        }),
      })

      const res: APIGatewayProxyStructuredResultV2 = await handler.run(event)

      expect(res).toEqual<APIGatewayProxyStructuredResultV2>({
        statusCode: 200,
        body: expect.any(String),
        headers: expect.any(Object),
      })

      const { data, errors } = JSON.parse(res.body)

      expect(errors).toBeUndefined()
      expect(data).toEqual(
        expect.objectContaining({
          user: null,
        }),
      )
    })
  })
})
