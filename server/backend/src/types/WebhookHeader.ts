type WebhookHeader = {
  host: string
  'user-agent': string
  'content-length': number
  accept: string
  'accept-encoding': string
  'content-type': string
  'x-forwarded-for': string
  'x-forwarded-proto': string
  'x-shopify-api-version': string
  'x-shopify-hmac-sha256': string
  'x-shopify-order-id': string
  'x-shopify-shop-domain': string
  'x-shopify-test': boolean
  'x-shopify-topic': string
  'x-shopify-webhook-id': string
}

export default WebhookHeader
