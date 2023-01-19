import { ShopConfig } from './types/shopconfig'

const NackadConfig = {
  useHourlySlots: true,
  showSlotDaysInAdvance: 5,
  smsText: "Hallo lieber Rex Eater, \n \n Wir sind mit deiner Bestellung auf dem Weg zu dir. \n Wir sind in den nächsten 15 min bei dir.Bitte bereite schon mal deine leeren Gläser für den Austausch vor. Dankeschön.\n \n Wenn du irgendwelche Fragen hast bitte melden dich in unserem Büro unter + 43 676 5418945 oder schrieb uns eine Email an office @rex-eat.at \n \n Bis gleich, \n Dein Rex Eat Team",
  deliverySlots: {
    monday: [
      {
        vehicle: 'vehicle1',
        slots: [{ hours: '15:00-21:00', deliveryAreas: '1010;1020;1030;1040;1050', maxDeliveries: 2 }]
      }
    ],
    tuesday: [
      {
        vehicle: 'vehicle1',
        slots: [{ hours: '15:00-21:00', deliveryAreas: '1210;1220', maxDeliveries: 2 }]
      }
    ],
    wednesday: [
      {
        vehicle: 'vehicle1',
        slots: [{ hours: '15:00-21:00', deliveryAreas: '1210;1220', maxDeliveries: 2 }]
      }
    ],
    thursday: [
      {
        vehicle: 'vehicle1',
        slots: [{ hours: '15:00-21:00', deliveryAreas: '1210;1220', maxDeliveries: 2 }]
      }
    ],
    friday: [
      {
        vehicle: 'vehicle1',
        slots: [{ hours: '15:00-21:00', deliveryAreas: '1210;1220', maxDeliveries: 2 }]
      }
    ],
    saturday: [
      {
        vehicle: 'vehicle1',
        slots: [{ hours: '15:00-16:00', deliveryAreas: '1210;1220', maxDeliveries: 2 }]
      }
    ]
  }
} as ShopConfig

const RexeatConfig = {
  useHourlySlots: false,
  smsText: "Hallo lieber Rex Eater, \n \n Wir sind mit deiner Bestellung auf dem Weg zu dir. \n Wir sind in den nächsten 15 min bei dir.Bitte bereite schon mal deine leeren Gläser für den Austausch vor. Dankeschön.\n \n Wenn du irgendwelche Fragen hast bitte melden dich in unserem Büro unter + 43 676 5418945 oder schrieb uns eine Email an office @rex-eat.at \n \n Bis gleich, \n Dein Rex Eat Team",
  deliverySlots: {
    monday: [
      {
        vehicle: 'vehicle1',
        slots: [
          { hours: '08:00-12:00', deliveryAreas: '1010;1020', maxDeliveries: 25 },
          { hours: '13:00-15:00', deliveryAreas: '1030;1040', maxDeliveries: 25 },
          { hours: '16:00-19:00', deliveryAreas: '1050;1060', maxDeliveries: 25 }
        ]
      },
      {
        vehicle: 'vehicle2',
        slots: [
          { hours: '08:00-12:00', deliveryAreas: '1010;1020', maxDeliveries: 25 },
          { hours: '13:00-15:00', deliveryAreas: '1030;1040', maxDeliveries: 25 },
          { hours: '16:00-19:00', deliveryAreas: '1050;1060', maxDeliveries: 25 }
        ]
      },
      {
        vehicle: 'vehicle3',
        slots: [
          { hours: '08:00-12:00', deliveryAreas: '1010;1020', maxDeliveries: 25 },
          { hours: '13:00-15:00', deliveryAreas: '1030;1040', maxDeliveries: 25 },
          { hours: '16:00-19:00', deliveryAreas: '1050;1060', maxDeliveries: 25 }
        ]
      }
    ],
    tuesday: [
      {
        vehicle: 'vehicle1',
        slots: [
          { hours: '08:00-12:00', deliveryAreas: '1010;1020', maxDeliveries: 25 },
          { hours: '13:00-15:00', deliveryAreas: '1030;1040', maxDeliveries: 25 },
          { hours: '16:00-19:00', deliveryAreas: '1050;1060', maxDeliveries: 25 }
        ]
      },
      {
        vehicle: 'vehicle2',
        slots: [
          { hours: '08:00-12:00', deliveryAreas: '1010;1020', maxDeliveries: 25 },
          { hours: '13:00-15:00', deliveryAreas: '1030;1040', maxDeliveries: 25 },
          { hours: '16:00-19:00', deliveryAreas: '1050;1060', maxDeliveries: 25 }
        ]
      },
      {
        vehicle: 'vehicle3',
        slots: [
          { hours: '08:00-12:00', deliveryAreas: '1010;1020', maxDeliveries: 25 },
          { hours: '13:00-15:00', deliveryAreas: '1030;1040', maxDeliveries: 25 },
          { hours: '16:00-19:00', deliveryAreas: '1050;1060', maxDeliveries: 25 }
        ]
      }
    ],
    wednesday: [
      {
        vehicle: 'vehicle1',
        slots: [
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
