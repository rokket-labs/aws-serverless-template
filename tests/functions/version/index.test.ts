import {
  APIGatewayProxyEventV2,
  APIGatewayProxyStructuredResultV2,
} from 'aws-lambda'
import { getWrapper } from 'serverless-jest-plugin'

import { name, version } from '../../../package.json'

describe('version', () => {
  describe('index', () => {
    let handler

    beforeAll(async () => {
      handler = getWrapper('version', '/functions/version/index.ts', 'handler')
    })

    test('resolves the current version', async () => {
      const event: APIGatewayProxyEventV2 = {
        isBase64Encoded: false,
        rawQueryString: null,
        requestContext: null,
        rawPath: '/version',
        routeKey: null,
        version: null,
        headers: {},
        body: '',
      }

      const res: APIGatewayProxyStructuredResultV2 = await handler.run(event)

      expect(res).toEqual<APIGatewayProxyStructuredResultV2>({
        statusCode: 200,
        body: `${name} v${version} [test]`,
      })
    })
  })
})
