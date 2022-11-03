import { ApiVersion } from '@shopify/shopify-api'

const Config = {
  shopifyAdmin: {
    API_KEY: process.env.API_KEY,
    API_PASSWORD: process.env.API_PASSWORD,
    STORE_NAME: process.env.STORE_NAME,
    API_VERSION: '2022-10',
    SCOPES: ['read_products', 'write_products'],
    STOREFRONTACCESSTOKEN: process.env.STOREFRONTACCESSTOKEN
  },
  webHooks: {
    key: process.env.WEBHOOKKEY,
    newOrder: process.env.NEW_ORDER || 'key',
    rechargeKey: process.env.RECHARGE_WEBHOOK_KEY || 'key'
  }
}

export default Config
