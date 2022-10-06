import Config from '../Config'
import fetch from 'node-fetch'
import { GraphQLProduct } from '../types/GraphQLProduct'
import fs from 'fs'

const token = Buffer.from('662698132c578091e53021f26e514d87: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').toString('base64')
const URL = 'https://nomnom-market.myshopify.com/admin/api/2022-10/graphql.json'

const registerCallbackUrl = async () => {
  const queryString = `mutation {
    webhookSubscriptionCreate(
      topic: BULK_OPERATIONS_FINISH
      webhookSubscription: {
        format: JSON,
        callbackUrl: "https://app.nackad.at/api/v1/update-products-handler"}
    ) {
      userErrors {
        field
        message
      }
      webhookSubscription {
        id
      }
    }
  }`
  const response = await fetch(URL, {
    method: 'post',
    headers: {
      'Content-Type': 'application/graphql',
      Authorization: 'Basic ' + token
    },
    body: queryString
  })
  if (!response.ok) {
    throw new Error('Call not successful')
  }
  return response
}

const queryProductsInBulk = async () => {
  const queryString = `
  mutation {
    bulkOperationRunQuery(
     query: """
      {
        products {
          edges {
              node {
                  id,
                  title,
                  images(first:1){
                    edges{
                      node{
                        url(transform: {maxWidth: 160})
                      }
                    }
                  }
                  deposit: metafield(
                      namespace:"my_fields"
                      key: "pfand"
                  ) {
                      value
                }
              }
          }
      }
      }
      """
    ) {
      bulkOperation {
        id
        status
      }
      userErrors {
        field
        message
      }
    }
  }`

  const response = await fetch(URL, {
    method: 'post',
    headers: {
      'Content-Type': 'application/graphql',
      Authorization: 'Basic ' + token
    },
    body: queryString
  })
  if (!response.ok) {
    throw new Error('Call not successful')
  }
  return response
}

const getProducts = async (id: string) => {
  const queryString = `query {
    node(id: "gid://shopify/BulkOperation/${id}") {
      ... on BulkOperation {
        url
        partialDataUrl
      }
    }
  }`
  const response = await fetch(URL, {
    method: 'post',
    headers: {
      'Content-Type': 'application/graphql',
      Authorization: 'Basic ' + token
    },
    body: queryString
  })
  if (!response.ok) {
    throw new Error('Call not successful')
  }
  return response
}

class ShopifyAdmin {
  GOOGLEURL = ''
  public async requestProductsInBulk() {
    const res = await registerCallbackUrl()
    const response = await queryProductsInBulk()
    const body = await response.json()
  }

  public async fetchActualProducts(id: string) {
    const res = await getProducts(id)
    const body = await res.json()
    if (res.ok) {
      const url = body.data.node.url
      this.GOOGLEURL = url
    }
  }

  public async fetchGoogleApi() {
    const response = await fetch(this.GOOGLEURL, {
      method: 'GET'
    })
    if (response.ok) {
      const body = response.body
      return new Promise((resolve, reject) => {
        const dest = fs.createWriteStream('./products.jsonl')
        response.body.pipe(dest)
        response.body.on('end', () => resolve('it worked'))
        dest.on('error', reject)
      })
    } else {
      throw new Error('Error fetching jsonline file')
    }
  }

  public async readJsonFile() {
    const allProducts: GraphQLProduct[] = []

    try {
      // read contents of the file
      const data = fs.readFileSync('./products.jsonl').toString()

      // split the contents by new line
      const lines = data.split(/\r?\n/)

      let product = {} as GraphQLProduct
      // print all lines
      lines.forEach((line: any) => {
        try {
          const json = JSON.parse(line)
          let isFirstLine = false
          if (json.id) {
            if (product.id) {
              allProducts.push(product)
            }
            isFirstLine = true
          } else {
            if (!product.id) {
              return
            }
          }

          if (isFirstLine) {
            // product
            if (json.id) {
              product.id = json.id
            }
            if (json.title) {
              product.title = json.title
            }
            if (json.deposit) {
              product.deposit = json.deposit
            }
          } else {
            // url
            if (json.url) {
              product.url = json.url
            }
          }

          if (!isFirstLine) {
            allProducts.push(product)
            product = {} as GraphQLProduct
          }
        } catch (err) {
          // console.log(err)
        }
      })
      return allProducts
    } catch (err) {
      console.error(err)
    }
  }
}
export default ShopifyAdmin
