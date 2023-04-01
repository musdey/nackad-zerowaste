import deliverySlotController from '../../controller/deliveryslot.controller'
import productsController from '../../controller/products.controller'
import rechargeController from '../../controller/recharge.controller'
import DepositTypeModel from '../../models/DepositType'
import Product from '../../models/Product'
import Shop from '../../models/Shop'
import ShopSettings from '../../models/ShopSettings'
import shopConfigs from '../../ShopConfig'

const initRexeatDepositTypes = async () => {
  console.log('initRexeatDepositTypes called')
  const rexeatShop = await Shop.findOne({ name: 'REXEAT' })

  const kisteKlein = await DepositTypeModel.findOne({ name: 'Holzkiste Klein', shop: rexeatShop }).exec()
  if (!kisteKlein) {
    await new DepositTypeModel({ name: 'Holzkiste Klein', price: '2500', shop: rexeatShop }).save()
  }
  const kisteGross = await DepositTypeModel.findOne({ name: 'Holzkiste Gross', shop: rexeatShop }).exec()
  if (!kisteGross) {
    await new DepositTypeModel({ name: 'Holzkiste Gross', price: '2500', shop: rexeatShop }).save()
  }
  const rexGlasGross = await DepositTypeModel.findOne({ name: 'Rexglas Gross', shop: rexeatShop }).exec()
  if (!rexGlasGross) {
    await new DepositTypeModel({ name: 'Rexglas Gross', price: '200', shop: rexeatShop }).save()
  }
  const rexGlasKlein = await DepositTypeModel.findOne({ name: 'Rexglas Klein', shop: rexeatShop }).exec()
  if (!rexGlasKlein) {
    await new DepositTypeModel({ name: 'Rexglas Klein', price: '100', shop: rexeatShop }).save()
  }
  const karton = await DepositTypeModel.findOne({ name: 'Karton', shop: rexeatShop }).exec()
  if (!karton) {
    await new DepositTypeModel({ name: 'Karton', price: '0', shop: rexeatShop }).save()
  }
}

const initializeShops = async function (shopString: string[]) {
  await Promise.all(
    shopString.map(async (shopName) => {
      const result = await Shop.findOne({ name: shopName })
      if (!result) {
        await new Shop({ name: shopName }).save()
      } else {
        console.log('Error creating shop' + shopName + '. Aready there.')
      }
    })
  )
}

const initializeSettings = async function () {
  try {
    const result = await ShopSettings.estimatedDocumentCount()
    if (result === 0) {
      await createSettings()
      console.log('Settings are created initially')
    }
  } catch (err) {
    console.log('Error creating settings, maybe already there.')
  }
}

const initNackadProductsProducts = async function () {
  try {
    const productCount = await Product.find({}).count()
    if (productCount === 0) {
      await productsController.triggerUpdateProducts()
      console.log('Products fetched initially')
    }
  } catch (error) {
    console.log('Error ,' + error)
  }
}

const initalizeDeliverySlots = async () => {
  await deliverySlotController.createDeliverySlots('NACKAD')
  await deliverySlotController.createDeliverySlots('REXEAT')
}

const createSettings = async function () {
  try {
    const nackadSettings = new ShopSettings(shopConfigs.NACKAD)
    const nackadShop = await Shop.findOne({ name: 'NACKAD' })
    nackadSettings.shop = nackadShop!
    await nackadSettings.save()

    const rexeatSettings = new ShopSettings(shopConfigs.REXEAT)
    const rexeatShop = await Shop.findOne({ name: 'REXEAT' })
    rexeatSettings.shop = rexeatShop!
    await rexeatSettings.save()
  } catch (err) {
    console.log(err)
  }
}

const registerRechargeWebhooks = async function () {
  const result = await rechargeController.registerWebhooks()
  return
}

const initProducts = async () => {
  await initNackadProductsProducts()
  //init Rexeatproducts
}

export default {
  initializeShops,
  initalizeDeliverySlots,
  initializeSettings,
  initProducts,
  registerRechargeWebhooks,
  initRexeatDepositTypes
}
