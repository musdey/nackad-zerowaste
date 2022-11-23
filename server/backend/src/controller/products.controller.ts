import { Handler, NextFunction, Request, Response } from 'express'
import ShopifyAdmin from './shopifyAdminController'
import { GraphQLProduct } from '../types/GraphQLProduct'
import Product from '../models/Product'
import DepositTypeModel from '../models/DepositType'
import Shop from '../models/Shop'

const shopifyAdmin = new ShopifyAdmin()

const triggerUpdateProducts = async () => {
  const result = await shopifyAdmin.requestProductsInBulk()
  return result
}

const triggerUpdateProductsHandler: Handler = async (req: Request, res: Response, next: NextFunction) => {
  await triggerUpdateProducts()
  return res.status(200).send('200')
}

const handleIncomingProductsHandler: Handler = async (req: Request, res: Response, next: NextFunction) => {
  const body = await req.body

  if (body.status == 'completed') {
    const path = body.admin_graphql_api_id
    const arr = path.split('/')
    const id = arr[arr.length - 1]
    await shopifyAdmin.fetchActualProducts(id)
  }
  res.status(200).send('200')
  await updateProducts()
}

const updateProducts = async () => {
  const result = await shopifyAdmin.fetchGoogleApi()

  if (!result) {
    console.log('There was an error fetching the products. No update here.')
    return false
  }

  const lines = await shopifyAdmin.readJsonFile()
  const newProductArr: any[] = []
  const depositType: string[] = []
  const shop = await Shop.findOne({ name: 'NACKAD' })
  //await fs.writeFile(path.join(__dirname, '/updatedProducts.json'), JSON.stringify(result))
  lines?.forEach((product: GraphQLProduct) => {
    let deposit = null
    if (product.deposit !== null) {
      deposit = product.deposit?.value
      if (deposit && !depositType.includes(deposit!)) {
        depositType.push(deposit!)
      }
    }
    const idArr = product.id.split('/')
    const id = idArr[idArr.length - 1]
    const newProduct = new Product({
      webShop: shop,
      title: product.title,
      shopifyId: id,
      deposit: deposit,
      imgUrl: product.url
    })
    newProductArr.push(newProduct)
  })

  depositType.forEach(async (elem) => {
    const name = elem.split('-')[0]
    const price = elem.split('-')[1]
    const found = await DepositTypeModel.findOne({ name, shop }).exec()
    if (!found) {
      await new DepositTypeModel({ name, price, shop }).save()
    }
  })

  //update mit einem upsert
  await Product.deleteMany({})
  await Product.insertMany(newProductArr)
  return true
}

const productController = { handleIncomingProductsHandler, triggerUpdateProducts, triggerUpdateProductsHandler }
export default productController
