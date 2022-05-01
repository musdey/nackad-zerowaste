import { Handler, NextFunction, Request, Response } from 'express'
import ShopifyAdmin from './shopifyAdminController'
import { GraphQLProduct } from '../types/GraphQLProduct'
import Product from '../models/Product'
import DepositTypeModel from '../models/DepositType'

const updateProductsHandler: Handler = async (req: Request, res: Response, next: NextFunction) => {
  console.log('updateProducts handler called')

  const result = await updateProducts()
  if (result) {
    console.log('Successfully updated the products')
    return res.status(200).send('Public Content.')
  } else {
    res.status(200).send('200 but failed to fetch products.')
  }
}

const updateProducts = async () => {
  const shopifyAdmin = new ShopifyAdmin()
  const result = await shopifyAdmin.getAllProducts()

  if (!result) {
    console.log('There was an error fetching the products. No update here.')
    return false
  }

  const newProductArr: any[] = []
  const depositType: string[] = []
  //await fs.writeFile(path.join(__dirname, '/updatedProducts.json'), JSON.stringify(result))
  result?.forEach((product: GraphQLProduct) => {
    let deposit = null
    if (product.node.deposit !== null) {
      deposit = product.node.deposit.value
      if (!depositType.includes(deposit)) {
        depositType.push(deposit)
      }
    }
    const idArr = product.node.id.split('/')
    const id = idArr[idArr.length - 1]
    const newProduct = new Product({
      title: product.node.title,
      shopifyId: id,
      deposit: deposit
    })
    newProductArr.push(newProduct)
  })
  depositType.forEach(async (elem) => {
    const name = elem.split('-')[0]
    const price = elem.split('-')[1]
    const found = await DepositTypeModel.findOne({ name }).exec()
    if (!found) {
      await new DepositTypeModel({ name, price }).save()
    }
  })

  //update mit einem upsert
  await Product.deleteMany({})
  await Product.insertMany(newProductArr)
  return true
}

const productController = { updateProducts, updateProductsHandler }
export default productController
