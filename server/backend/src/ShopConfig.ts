import { ShopConfig } from './types/shopconfig'

const NackadConfig = {
  useHourlySlots: true,
  showSlotDaysInAdvance: 5,
  deliverySlots: {
    monday: [
      {
        vehicle1: [{ hours: '15:00-21:00', deliveryAreas: '1010;1020;1030;1040;1050', maxDeliveries: 2 }]
      }
    ],
    tuesday: [
      {
        vehicle1: [{ hours: '15:00-21:00', deliveryAreas: '1210;1220', maxDeliveries: 2 }]
      }
    ],
    wednesday: [
      {
        vehicle1: [{ hours: '15:00-21:00', deliveryAreas: '1210;1220', maxDeliveries: 2 }]
      }
    ],
    thursday: [
      {
        vehicle1: [{ hours: '15:00-21:00', deliveryAreas: '1210;1220', maxDeliveries: 2 }]
      }
    ],
    friday: [
      {
        vehicle1: [{ hours: '15:00-21:00', deliveryAreas: '1210;1220', maxDeliveries: 2 }]
      }
    ],
    saturday: [
      {
        vehicle1: [{ hours: '15:00-16:00', deliveryAreas: '1210;1220', maxDeliveries: 2 }]
      }
    ]
  }
} as ShopConfig

const RexeatConfig = {
  useHourlySlots: false,
  deliverySlots: {
    monday: [
      {
        vehicle1: [
          { hours: '08:00-12:00', deliveryAreas: '1010;1020', maxDeliveries: 25 },
          { hours: '13:00-15:00', deliveryAreas: '1030;1040', maxDeliveries: 25 },
          { hours: '16:00-19:00', deliveryAreas: '1050;1060', maxDeliveries: 25 }
        ]
      },
      {
        vehicle2: [
          { hours: '08:00-12:00', deliveryAreas: '1010;1020', maxDeliveries: 25 },
          { hours: '13:00-15:00', deliveryAreas: '1030;1040', maxDeliveries: 25 },
          { hours: '16:00-19:00', deliveryAreas: '1050;1060', maxDeliveries: 25 }
        ]
      },
      {
        vehicle3: [
          { hours: '08:00-12:00', deliveryAreas: '1010;1020', maxDeliveries: 25 },
          { hours: '13:00-15:00', deliveryAreas: '1030;1040', maxDeliveries: 25 },
          { hours: '16:00-19:00', deliveryAreas: '1050;1060', maxDeliveries: 25 }
        ]
      }
    ],
    tuesday: [
      {
        vehicle1: [
          { hours: '08:00-12:00', deliveryAreas: '1010;1020', maxDeliveries: 25 },
          { hours: '13:00-15:00', deliveryAreas: '1030;1040', maxDeliveries: 25 },
          { hours: '16:00-19:00', deliveryAreas: '1050;1060', maxDeliveries: 25 }
        ]
      },
      {
        vehicle2: [
          { hours: '08:00-12:00', deliveryAreas: '1010;1020', maxDeliveries: 25 },
          { hours: '13:00-15:00', deliveryAreas: '1030;1040', maxDeliveries: 25 },
          { hours: '16:00-19:00', deliveryAreas: '1050;1060', maxDeliveries: 25 }
        ]
      },
      {
        vehicle3: [
          { hours: '08:00-12:00', deliveryAreas: '1010;1020', maxDeliveries: 25 },
          { hours: '13:00-15:00', deliveryAreas: '1030;1040', maxDeliveries: 25 },
          { hours: '16:00-19:00', deliveryAreas: '1050;1060', maxDeliveries: 25 }
        ]
      }
    ],
    wednesday: [
      {
        vehicle1: [
          { hours: '08:00-12:00', deliveryAreas: '1010;1020', maxDeliveries: 25 },
          { hours: '13:00-15:00', deliveryAreas: '1030;1040', maxDeliveries: 25 },
          { hours: '16:00-19:00', deliveryAreas: '1050;1060', maxDeliveries: 25 }
        ]
      }
    ]
  },
  showSlotDaysInAdvance: 12
} as ShopConfig

const shopConfigs = {
  NACKAD: NackadConfig,
  REXEAT: RexeatConfig
}
export default shopConfigs
