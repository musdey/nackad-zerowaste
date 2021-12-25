import { ApiVersion } from '@shopify/shopify-api'

// https://{{api_key}}:{{api_password}}@{{store_name}}.myshopify.com/admin/api/{{api_version}}/collects.json'
const Config = {
  shopifyAdmin: {
    API_KEY: 'xxxxx',
    API_PASSWORD: 'xxxx',
    STORE_NAME: 'nomnom-market.myshopify.com',
    API_VERSION: ApiVersion.October21,
    SCOPES: ['read_products', 'write_products'],
    STOREFRONTACCESSTOKEN: 'xxxx'
  }
}

export default Config
