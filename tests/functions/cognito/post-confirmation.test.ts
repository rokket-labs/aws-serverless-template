import { PostConfirmationConfirmSignUpTriggerEvent } from 'aws-lambda'
import faker from 'faker'
import { ObjectId } from 'mongodb'
import { getWrapper } from 'serverless-jest-plugin'

import { UserDocument, UserRole } from '../../../service/entities/user/types'
import { setupTestDatabase, TestDatabase } from '../../helpers/database'

describe('cognito', () => {
  describe('post-confirmation hook', () => {
    let db: TestDatabase
    let handler

    beforeAll(async () => {
      db = await setupTestDatabase()

      handler = getWrapper(
        'graphql',
        '/functions/cognito/post-confirmation.ts',
        'handler',
      )

      console.log(
        (await db.client.db().collections()).map(
          ({ collectionName }) => collectionName,
        ),
      )
    })

    afterAll(async () => {
      await db.stop()
    })

    test('resolves an event', async () => {
      const event: PostConfirmationConfirmSignUpTriggerEvent = {
        callerContext: null,
        region: 'us-east-1',
        response: null,
        triggerSource: null,
        userName: null,
        userPoolId: null,
        version: null,
        request: {
          userAttributes: {
            role: faker.random.arrayElement(Object.values(UserRole)),
            email: faker.internet.email(),
            name: faker.name.findName(),
            sub: faker.datatype.uuid(),
          },
        },
      }

      const res: PostConfirmationConfirmSignUpTriggerEvent = await handler.run(
        event,
      )

      expect(res).toEqual<PostConfirmationConfirmSignUpTriggerEvent>({
        request: expect.any(Object),
        version: null,
        callerContext: null,
        region: 'us-east-1',
        response: null,
        triggerSource: null,
        userName: null,
        userPoolId: null,
      })

      const user = await db.client
        .db()
        .collection<UserDocument>('user')
        .findOne({
          sub: event.request.userAttributes.sub,
        })

      expect(user).toEqual<UserDocument>({
        _id: expect.any(ObjectId),
        email: expect.any(String),
        name: expect.any(String),
        role: expect.any(String),
        sub: expect.any(String),
      })
    })
  })
})
