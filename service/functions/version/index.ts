import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda'

import { name, version } from '../../../package.json'
import { logger } from '../../util/logger'

const { NODE_ENV } = process.env

export const handler = async (
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2> => {
  logger.debug(event)

  return {
    statusCode: 200,
    body: `${name} v${version} [${NODE_ENV}]`,
  }
}
