import { APIGatewayProxyEventV2 } from 'aws-lambda'
import faker from 'faker'

export const getAPIGatewayProxyEvent = (
  event: Partial<APIGatewayProxyEventV2>,
): APIGatewayProxyEventV2 => {
  return {
    isBase64Encoded: false,
    rawQueryString: null,
    requestContext: {
      accountId: null,
      apiId: null,
      domainName: null,
      domainPrefix: null,
      requestId: faker.datatype.uuid(),
      stage: 'test',
      routeKey: null,
      time: null,
      timeEpoch: null,
      http: {
        method: 'POST',
        path: '/graphql',
        protocol: 'http',
        sourceIp: '127.0.0.1',
        userAgent: '',
      },
    },
    rawPath: '/graphql',
    routeKey: null,
    version: null,
    headers: {
      Referer: 'http://localhost',
      Origin: 'http://localhost',
    },
    body: null,

    ...event,
  }
}
