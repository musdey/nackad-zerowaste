import { IShopSettings } from './models/ShopSettings'

const NackadConfig = {
  deliveryAreas:
    '1010;1020;1030;1040;1050;1060;1070;1080;1090;1100;1110;1120;1130;1140;1150;1160;1170;1180;1190;1200;1210;1220',
  deliveryHours: {
    monday: '15:00-20:00',
    tuesday: '15:00-20:00',
    wednesday: '15:00-20:00',
    thursday: '15:00-20:00',
    friday: '15:00-20:00',
    saturday: '09:00-18:00',
    sunday: 'closed'
  },
  vehicles: 2,
  slotsPerVehicle: 2,
  showSlotDaysInAdvance: 5
} as IShopSettings

const RexeatConfig = {
  deliveryAreas: '',
  bigSlots: {
    monday: [
      { hours: '08:00-12:00', excludedDeliveryAreas: '1210;1220' },
      { hours: '13:00-15:00', excludedDeliveryAreas: '1210;1220' },
      { hours: '16:00-19:00', excludedDeliveryAreas: '1210;1220' },
      { hours: '19:00-23:00' }
    ],
    tuesday: [
      { hours: '08:00-12:00' },
      { hours: '13:00-15:00' },
      { hours: '16:00-19:00', excludedDeliveryAreas: '1210;1220' }
    ],
    wednesday: [{ hours: '08:00-12:00' }, { hours: '13:00-15:00' }, { hours: '16:00-19:00' }]
  },
  vehicles: 2,
  slotsPerVehicle: 25,
  showSlotDaysInAdvance: 14,
  useBigSlots: true
} as IShopSettings

const shopConfigs = {
  NACKAD: NackadConfig,
  REXEAT: RexeatConfig
}
export default shopConfigs
