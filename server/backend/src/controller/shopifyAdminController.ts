import Config from '../Config'
import fetch from 'node-fetch'
import { GraphQLProduct } from '../types/GraphQLProduct'

const token = Buffer.from(Config.shopifyAdmin.API_KEY + ':' + Config.shopifyAdmin.API_PASSWORD).toString('base64')
const URL = 'https://nomnom-market.myshopify.com/admin/api/2021-10/graphql.json'

// GraphQL query to get products with metafields
const query = (firstQuery: boolean, cursor?: string) => {
  return `
    {    
      products(first: 50 ${firstQuery ? '' : ',after: "' + cursor + '"'}) {
        pageInfo {
            hasNextPage
        }
        edges {
            cursor
            node {
              	id,
                title,
                metafields(first: 10) {
                    edges {
                        node {
                            key
                            value
                        }
                    }
                }
            }
        }
    }
}`
}

const makeAPICall = async (firstCall: boolean, cursor?: string) => {
  const response = await fetch(URL, {
    method: 'post',
    headers: {
      'Content-Type': 'application/graphql',
      Authorization: 'Basic ' + token
    },
    body: query(firstCall, cursor)
  })
  if (!response.ok) {
    throw new Error('Call not successful')
  }
  return response
}

class ShopifyAdmin {
  public async getAllProducts() {
    try {
      // ResultArray
      const allProducts: GraphQLProduct[] = []

      const response = await makeAPICall(true)
      const body = await response.json()
      allProducts.push(...body.data.products.edges)

      // Check if there is more than 50 products
      let hasNextPage = body.data.products.pageInfo.hasNextPage
      let productLength = body.data.products.edges.length

      // Iterate through pages
      while (hasNextPage) {
        const cursor = body.data.products.edges[productLength - 1].cursor
        const nextResponse = await makeAPICall(false, cursor)
        const nextBody = await nextResponse.json()
        allProducts.push(...nextBody.data.products.edges)
        productLength = nextBody.data.products.edges.length
        hasNextPage = nextBody.data.products.pageInfo.hasNextPage
      }

      return allProducts
    } catch (error) {
      console.error(error)
    }
  }
}
export default ShopifyAdmin
