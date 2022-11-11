type ShopConfig = {
  shop: string
  exludedDeliveryAreas?: string
  deliveryAreas: string
  deliveryHours: {
    monday: string
    tuesday: string
    wednesday: string
    thursday: string
    friday: string
    saturday: string
    sunday: string
  }
  vehicles: number
  slotsPerVehicle: number
  showSlotDaysInAdvance: number
}

export default ShopConfig
