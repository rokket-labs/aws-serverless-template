import { SES } from 'aws-sdk'
import {
  SendTemplatedEmailRequest,
  SendTemplatedEmailResponse,
} from 'aws-sdk/clients/ses'
import { ParsedMailbox, parseOneAddress } from 'email-addresses'

import config from '../configs/ses'

const { NODE_ENV } = process.env

interface Recipient {
  email: string
  name: string
}

interface ExampleEmailData {
  name: string
}

/**
 * Encodes a friendly email address to allow special characters.
 *
 * @param {string} input The input friendly email address.
 *
 * @returns {string} The encoded friendly email address.
 */
const encodeFriendlyAddress = (input: string): string => {
  const params: emailAddresses.Options = {
    simple: true,
    input,
  }

  const { address, name } = parseOneAddress(params) as ParsedMailbox

  if (name) {
    const base64Name = Buffer.from(name).toString('base64')

    return `=?UTF-8?B?${base64Name}?= <${address}>`
  }

  return address
}

const mapRecipients = (recipients: Recipient[]) =>
  recipients.map(({ name, email }) => `${name} <${email}>`)

/**
 * Sends an email message.
 *
 * @param {object} params The params to send the email with.
 *
 * @returns {Promise<object>} A promise to the sending.
 */
export const send = (
  params: Omit<SendTemplatedEmailRequest, 'Source'>,
): Promise<SendTemplatedEmailResponse> => {
  const ses = new SES()
  const _params: SendTemplatedEmailRequest = {
    ...params,
    Source: encodeFriendlyAddress(config.sender),
  }

  // Encode special characters on friendly email addresses.
  _params.Destination.ToAddresses = params.Destination.ToAddresses.map(
    addr => {
      return encodeFriendlyAddress(addr)
    },
  )

  return ses.sendTemplatedEmail(_params).promise()
}

/**
 * Here you could add convenience methods like `sendWelcome` or `sendPasswordChanged` with predefined params and then
 * call the `send` method with such params.
 */

export const sendExampleEmail = (
  recipients: Recipient[],
  data: ExampleEmailData,
): Promise<SendTemplatedEmailResponse> =>
  send({
    Template: `example_message_es_${NODE_ENV}`,
    TemplateData: JSON.stringify(data),
    Destination: {
      ToAddresses: mapRecipients(recipients),
    },
  })
