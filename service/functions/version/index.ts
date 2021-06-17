import { createLogger } from '@fiquu/logger'
import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda'

import { name, version } from '../../../package.json'

const { NODE_ENV } = process.env

const log = createLogger('functions/version')

export const handler = async (
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2> => {
  log.debug(event)

  return {
    statusCode: 200,
    body: `${name} v${version} [${NODE_ENV}]`,
  }
}
