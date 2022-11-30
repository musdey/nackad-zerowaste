import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonInput,
  IonItem,
  IonPage,
  useIonToast,
  IonLabel,
  IonAccordionGroup,
  IonAccordion,
  IonChip,
  IonIcon,
} from '@ionic/react'
import { close } from 'ionicons/icons'
import { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { useAuth } from '../lib/use-auth'
import api from '../lib/api'

const days = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
]

type SingleSlot = {
  hours: string
  deliveryAreas: string
  maxDeliveries: number
}

type deliverySlotsPerVehicle = { vehicle: string; slots: SingleSlot[] }

type deliverSlotsPerDay = Record<string, deliverySlotsPerVehicle[]>

const Settings: React.FC = () => {
  const { user } = useAuth()
  const [showSlotDaysInAdvance, setSlotDaysInAdvance] = useState(0)

  const [present] = useIonToast()
  const [deliverySlots, setDeliverySlots] = useState<deliverSlotsPerDay>()
  const [useHourlySlots, setUseHourlySlots] = useState(false)
  const [shop, setShop] = useState()

  useEffect(() => {
    const fn = async () => {
      const data = await api.getSettings()
      setShop(data.shop.name)
      setSlotDaysInAdvance(data.showSlotDaysInAdvance)
      setDeliverySlots(data.deliverySlots)
      setUseHourlySlots(data.useHourlySlots)
    }
    fn()
  }, [])

  const buttonHandler = async () => {
    let error = false
    // if (isNaN(vehicles) || isNaN(slotsPerVehicle) || isNaN(extraSlots)) {
    //   error = true
    // }
    // if (useBigSlots) {
    //   // TODO: validate this ?
    //   //   try {
    //   //     JSON.parse(bigSlots)
    //   //   } catch (err) {
    //   //     error = true
    //   //   }
    // } else {
    //   // TODO: validate this ?
    //   // try {
    //   //   JSON.parse(deliveryHours)
    //   // } catch (err) {
    //   //   error = true
    //   // }
    // }
    // deliveryAreas?.split(';').forEach((data: string) => {
    //   if (data.length !== 4) {
    //     error = true
    //   }
    //   if (isNaN(parseInt(data))) {
    //     error = true
    //   }
    // })

    if (error) {
      await present('Input validation error.', 2000)
    } else {
      const obj = {
        deliverySlots: deliverySlots,
        showSlotDaysInAdvance: showSlotDaysInAdvance,
        useHourlySlots: useHourlySlots,
      }

      const result = await api.updateSettings(obj)
      if (result) {
        await present('Erfolgreich upgedated.', 2000)
      } else {
        await present('Fehler beim Update der Einstellungen.', 2000)
      }
    }
  }

  const handleUpdateSlotTime = async (
    value: string,
    day: string,
    vehicleIndex: number,
    slotIndex: number
  ) => {
    let updatedSlots = { ...deliverySlots! }
    const deliverySlotsOfVehicle = updatedSlots[day][vehicleIndex]
    deliverySlotsOfVehicle.slots[slotIndex].hours = value
    setDeliverySlots(updatedSlots)
  }

  const handleUpdateSlotMaxDeliveries = async (
    value: number,
    day: string,
    vehicleIndex: number,
    slotIndex: number
  ) => {
    let updatedSlots = { ...deliverySlots! }
    const deliverySlotsOfVehicle = updatedSlots[day][vehicleIndex]
    deliverySlotsOfVehicle.slots[slotIndex].maxDeliveries = value
    setDeliverySlots(updatedSlots)
  }

  const handleAddPlz = async (
    day: string,
    vehicleIndex: number,
    slotIndex: number
  ) => {
    const element: any = document.getElementById(
      'plzInput' + day + vehicleIndex + slotIndex
    )
    const plz = element!.value
    if (plz.length !== 4) {
      await present('Bitte eine gültige Postleitzahl eingeben', 3000)
    } else {
      let updatedSlots = { ...deliverySlots! }
      const deliverySlotsOfVehicle = updatedSlots[day][vehicleIndex]
      if (!deliverySlotsOfVehicle.slots[slotIndex].deliveryAreas) {
        deliverySlotsOfVehicle.slots[slotIndex].deliveryAreas = plz
        setDeliverySlots(updatedSlots)
        element.value = ''
      } else {
        if (
          !deliverySlotsOfVehicle.slots[slotIndex].deliveryAreas
            .split(';')
            .includes(plz)
        ) {
          const areasArray =
            deliverySlotsOfVehicle.slots[slotIndex].deliveryAreas.split(';')
          const index = areasArray.indexOf(plz)
          if (index < 0) {
            areasArray.push(plz)
            areasArray.sort()
            deliverySlotsOfVehicle.slots[slotIndex].deliveryAreas =
              areasArray.join(';')
            setDeliverySlots(updatedSlots)
            element.value = ''
          }
        } else {
          await present('Bitte eine gültige Postleitzahl eingeben', 3000)
        }
      }
    }
  }

  const handleRemovePlz = (
    plz: string,
    day: string,
    vehicleIndex: number,
    slotIndex: number
  ) => {
    let updatedSlots = { ...deliverySlots! }
    const deliverySlotsOfVehicle = updatedSlots[day][vehicleIndex]
    const areasArray =
      deliverySlotsOfVehicle.slots[slotIndex].deliveryAreas.split(';')
    const index = areasArray.indexOf(plz)
    if (index > -1 && areasArray.length > 1) {
      areasArray.splice(index, 1)
      areasArray.sort()
      deliverySlotsOfVehicle.slots[slotIndex].deliveryAreas =
        areasArray.join(';')
      setDeliverySlots(updatedSlots)
    }
  }

  const handleAddSlot = (day: string) => {
    // let updatedBigSlots = { ...bigSlots! }
    // const dayToAddSlot = updatedBigSlots[day]
    // dayToAddSlot.push({ hours: '' })
    // setBigSlots(updatedBigSlots)
  }

  const handleRemoveSlot = (_id: string, day: string) => {
    // let updatedBigSlots = { ...bigSlots! }
    // const dayToRemoveSlot = updatedBigSlots[day]
    // const index = dayToRemoveSlot.findIndex((slot) => slot._id === _id)
    // if (index > -1) {
    //   dayToRemoveSlot.splice(index, 1)
    //   dayToRemoveSlot.sort()
    //   setBigSlots(updatedBigSlots)
    // }
  }

  return (
    <IonPage>
      <Header subTitle="Einstellungen" />
      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle color="primary">
              Einstellungen für {shop} ändern
            </IonCardTitle>
          </IonCardHeader>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Lieferslots Tage im Voraus anzeigen</IonCardTitle>
          </IonCardHeader>
          <IonCardContent style={{ display: 'flex' }}>
            <IonInput
              style={{ width: '50%' }}
              onInput={(e: any) => setSlotDaysInAdvance(e.target.value)}
              color="black"
              type="number"
              value={showSlotDaysInAdvance}
            ></IonInput>
            <IonInput disabled style={{ width: '50%' }}>
              Tage
            </IonInput>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Bezirke</IonCardTitle>
          </IonCardHeader>
          <IonCardContent></IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Lieferzeit</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {!useHourlySlots && deliverySlots && (
              <IonAccordionGroup>
                {days.map((day, dayIndex) => (
                  <IonAccordion value={day} key={dayIndex}>
                    <IonItem slot="header" color="light">
                      <IonLabel>{`${
                        day.charAt(0).toUpperCase() + day.slice(1)
                      }`}</IonLabel>
                    </IonItem>
                    <div slot="content">
                      {deliverySlots[day].map((vehicleSlots, vehicleIndex) => (
                        <IonCard>
                          <IonCardHeader>
                            {vehicleSlots.vehicle.toLocaleUpperCase()}
                          </IonCardHeader>
                          <IonCardContent>
                            {vehicleSlots.slots.map((slot, slotIndex) => (
                              <IonCard>
                                <IonItem>
                                  <IonLabel>Slot Time</IonLabel>
                                  <IonInput
                                    slot="end"
                                    value={slot.hours}
                                    key={`${dayIndex}_${slotIndex}`}
                                    placeholder="Add slot time"
                                    onInput={(event: any) => {
                                      if (event.target.value)
                                        handleUpdateSlotTime(
                                          event.target.value,
                                          day,
                                          vehicleIndex,
                                          slotIndex
                                        )
                                    }}
                                  />
                                </IonItem>
                                <IonItem>
                                  <IonLabel>Max. delivery</IonLabel>
                                  <IonInput
                                    slot="end"
                                    onInput={(event: any) => {
                                      if (event.target.value)
                                        handleUpdateSlotMaxDeliveries(
                                          event.target.value,
                                          day,
                                          vehicleIndex,
                                          slotIndex
                                        )
                                    }}
                                    type="number"
                                    value={slot.maxDeliveries}
                                  />
                                </IonItem>
                                <IonItem lines="none">
                                  <div>
                                    {slot.deliveryAreas
                                      .split(';')
                                      .sort()
                                      .map((plz: string) => {
                                        return (
                                          <IonChip
                                            key={'ChipPlz' + plz}
                                            id={plz + 'plz'}
                                          >
                                            <IonLabel>{plz}</IonLabel>
                                            <IonIcon
                                              icon={close}
                                              onClick={() =>
                                                handleRemovePlz(
                                                  plz,
                                                  day,
                                                  vehicleIndex,
                                                  slotIndex
                                                )
                                              }
                                            ></IonIcon>
                                          </IonChip>
                                        )
                                      })}
                                  </div>
                                </IonItem>
                                <IonItem>
                                  <IonInput
                                    id={
                                      'plzInput' +
                                      day +
                                      vehicleIndex +
                                      slotIndex
                                    }
                                    type="number"
                                    inputMode="numeric"
                                    maxlength={4}
                                    placeholder="Add Plz"
                                  ></IonInput>
                                  <IonButton
                                    color={'grey'}
                                    onClick={() =>
                                      handleAddPlz(day, vehicleIndex, slotIndex)
                                    }
                                  >
                                    +
                                  </IonButton>
                                </IonItem>
                              </IonCard>
                            ))}
                            {/* <IonButton
                              slot="end"
                              id={'ADD_' + dayIndex}
                              size="small"
                              style={{ width: '100%' }}
                              onClick={() => {
                                handleAddSlot(day)
                              }}
                            >
                              Add slot
                            </IonButton> */}
                          </IonCardContent>
                        </IonCard>
                      ))}
                    </div>
                  </IonAccordion>
                ))}
              </IonAccordionGroup>
            )}
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Verfügbare Slots pro Auto</IonCardTitle>
          </IonCardHeader>
          <IonCardContent></IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Verfügbare Fahrzeuge</IonCardTitle>
          </IonCardHeader>
          <IonCardContent></IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              Extra Slots pro Auto (wenn im selben Bezirk bestellt wird)
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent></IonCardContent>
        </IonCard>
        <IonCard>
          <IonButton onClick={buttonHandler}>Einstellung übernehmen</IonButton>
        </IonCard>
      </IonContent>
    </IonPage>
  )
}

export default Settings
