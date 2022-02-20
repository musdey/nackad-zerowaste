import ShopSettings, { DeliveryHours, IShopSettings } from '../models/ShopSettings'

const getSettings = async () => {
  const settings = await ShopSettings.find({})
  if (!settings || settings.length === 0) {
    return 'empty'
  }
  return settings[0]
}

const updateSettings = async (areas: string, hours: object) => {
  const settings = await ShopSettings.find({})
  console.log(settings)
  if (!settings || settings.length === 0) {
    return await new ShopSettings({ deliveryAreas: areas, deliveryHours: hours }).save()
  }
  const oneSetting = settings[0]
  oneSetting.deliveryAreas = areas
  oneSetting.deliveryHours = hours as DeliveryHours
  const updated = await oneSetting.save()
  return updated
}

const settingsController = { getSettings, updateSettings }
export default settingsController

/*
{
	"deliveryAreas":"1020;1030;1040;1050;1060;1070;1080;1090;1120;1130;1140;1150;1160;1170;1180",
	"deliveryHours": {
	"monday":"15:00-20:00",
      "tuesday":"15:00-20:00",
      "wednesday":"15:00-20:00",
      "thursday":"15:00-20:00",
      "friday":"15:00-20:00",
      "saturday":"15:00-20:00",
      "sunday":"15:00-20:00"
 }
}
*/
