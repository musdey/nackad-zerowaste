export type SlotDetails = {
  hours: string
  deliveryAreas: string
  maxDeliveries: number
}

export type VehicleConfig = {
  vehicle: string
  slots: SlotDetails[]
}

export type DeliverySlots = {
  monday?: VehicleConfig[]
  tuesday?: VehicleConfig[]
  wednesday?: VehicleConfig[]
  thursday?: VehicleConfig[]
  friday?: VehicleConfig[]
  saturday?: VehicleConfig[]
  sunday?: VehicleConfig[]
}

export type ShopConfig = {
  shop?: string
  useHourlySlots: boolean
  showSlotDaysInAdvance: number
  deliverySlots: DeliverySlots
}
