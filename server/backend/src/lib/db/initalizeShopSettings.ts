import deliverySlotController from '../../controller/deliveryslot.controller'
import productsController from '../../controller/products.controller'
import rechargeController from '../../controller/recharge.controller'
import Product from '../../models/Product'
import Shop from '../../models/Shop'
import ShopSettings from '../../models/ShopSettings'
import shopConfigs from '../../ShopConfig'

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
  await deliverySlotController.createNackadSlots()
  await deliverySlotController.createRexeatSlots()
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
  registerRechargeWebhooks
}
