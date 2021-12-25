import { Handler, NextFunction, Request, Response } from 'express'
import ShopifyAdmin from './shopifyAdminController'
import { GraphQLProduct } from '../types/GraphQLProduct'
import Product from '../models/Product'

const updateProducts: Handler = async (req: Request, res: Response, next: NextFunction) => {
  console.log('updateProducts handler called')
  const shopifyAdmin = new ShopifyAdmin()
  const result = await shopifyAdmin.getAllProducts()

  const newProductArr: any[] = []
  result?.forEach((product: GraphQLProduct) => {
    let packaging
    product.node.metafields.edges.forEach((element) => {
      if (element.node.key == 'verpackung') {
        packaging = element.node.value
      }
    })
    const newProduct = new Product({ title: product.node.title, shopifyId: product.node.id, packaging: packaging })
    newProductArr.push(newProduct)
  })
  //update mit einem upsert
  await Product.deleteMany({})
  const answer = await Product.insertMany(newProductArr)
  console.log('successfully added')
  //await fs.writeFile(__dirname + '/result.json', JSON.stringify(result))
  return res.status(200).send('Public Content.')
}

export { updateProducts }
