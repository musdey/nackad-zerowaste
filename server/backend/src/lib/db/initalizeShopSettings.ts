import deliverySlotController from '../../controller/deliveryslot.controller'
import productsController from '../../controller/products.controller'
import rechargeController from '../../controller/recharge.controller'
import Product from '../../models/Product'
import Shop from '../../models/Shop'
import ShopSettings from '../../models/ShopSettings'

const initializeShops = async function (shopString: string[]) {
  try {
    shopString.forEach(async (shopName) => {
      const result = await Shop.findOne({ name: shopName })
      if (!result) {
        // TODO: load shop config
        const newShop = await new Shop({ name: shopName }).save()
      }
    })
  } catch (err) {
    console.log('Error creating shops. Aready there.')
  }
}

const initializeSettings = async function () {
  try {
    await deliverySlotController.createDeliverySlots()

    const result = await ShopSettings.estimatedDocumentCount()
    if (result === 0) {
      await createSettings()
      console.log('Settings are created initially')
    }
  } catch (err) {
    console.log('Error creating settings, maybe already there.')
  }
}

const initProducts = async function () {
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

const createSettings = async function () {
  const newSetting = new ShopSettings({
    deliveryAreas: '1020;1030;1040;1050;1060;1070;1080;1090;1100;1110;1120;1130;1140;1150;1160;1170;1180;1190;1200',
    deliveryHours: {
      monday: '15:00-20:00',
      tuesday: '15:00-20:00',
      wednesday: '15:00-20:00',
      thursday: '15:00-20:00',
      friday: '15:00-20:00',
      saturday: '15:00-20:00',
      sunday: 'closed'
    },
    vehicles: 2,
    slotsPerVehicle: 2,
    showSlotDaysInAdvance: 5
  })
  try {
    await newSetting.save()
  } catch (err) {
    console.log(err)
  }
}

const registerRechargeWebhooks = async function () {
  const result = await rechargeController.registerWebhooks()
  return
}

export default { initializeShops, initializeSettings, initProducts, registerRechargeWebhooks }
