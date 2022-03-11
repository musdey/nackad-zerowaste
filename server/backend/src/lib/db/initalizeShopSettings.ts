import deliverySlotController from '../../controller/deliveryslot.controller'
import ShopSettings from '../../models/ShopSettings'

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

const createSettings = async function () {
  const newSetting = new ShopSettings({
    deliveryAreas: '1020;1030;1040;1050;1060;1070;1080;1090;1120;1130;1140;1150;1160;1170;1180',
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
    slotsPerVehicle: 2
  })
  try {
    await newSetting.save()
  } catch (err) {
    console.log(err)
  }
}

export default initializeSettings
