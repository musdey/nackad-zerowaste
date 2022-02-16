import { Handler, NextFunction, Request, Response } from 'express'
import ShopifyAdmin from './shopifyAdminController'
import { GraphQLProduct } from '../types/GraphQLProduct'
import Product from '../models/Product'
import fs from 'fs/promises'
import path from 'path'

const updateProducts: Handler = async (req: Request, res: Response, next: NextFunction) => {
  console.log('updateProducts handler called')
  const shopifyAdmin = new ShopifyAdmin()
  const result = await shopifyAdmin.getAllProducts()

  const newProductArr: any[] = []
  //await fs.writeFile(path.join(__dirname, '/updatedProducts.json'), JSON.stringify(result))
  result?.forEach((product: GraphQLProduct) => {
    let packaging
    let deposit
    product.node.metafields.edges.forEach((element) => {
      if (element.node.key == 'verpackung') {
        packaging = element.node.value
      }
      if (element.node.key == 'pfand') {
        deposit = element.node.value
      }
    })
    const idArr = product.node.id.split('/')
    const id = idArr[idArr.length - 1]
    const newProduct = new Product({
      title: product.node.title,
      shopifyId: id,
      packaging: packaging,
      deposit: deposit
    })
    newProductArr.push(newProduct)
  })
  //update mit einem upsert
  await Product.deleteMany({})
  const answer = await Product.insertMany(newProductArr)
  console.log('successfully added')
  return res.status(200).send('Public Content.')
}

export { updateProducts }
