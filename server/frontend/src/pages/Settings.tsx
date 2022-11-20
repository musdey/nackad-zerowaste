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
  IonTextarea,
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

type DeliveryHours = {
  monday: string
  tuesday: string
  wednesday: string
  thursday: string
  friday: string
  saturday: string
  sunday: string
}

const days = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
]

type BigSlots = Record<string, string[]>

const Settings: React.FC = () => {
  const { user } = useAuth()
  const [deliveryAreas, setDeliveryAreas] = useState<string[]>()
  // const [deliveryHours, setDeliveryHours] = useState({
  //     monday: '',
  //     tuesday: '',
  //     wednesday: '',
  //     thursday: '',
  //     friday: '',
  //     saturday: '',
  //     sunday: ''
  // })
  const [deliveryHours, setDeliveryHours] = useState('')
  const [extraSlots, setExtraSlots] = useState(0)
  const [showSlotDaysInAdvance, setSlotDaysInAdvance] = useState(0)
  const [slotsPerVehicle, setSlotsPerVehicle] = useState(0)
  const [vehicles, setVehicles] = useState(0)
  const [present] = useIonToast()
  const [bigSlots, setBigSlots] = useState<BigSlots>()
  const [useBigSlots, setUseBigSlots] = useState(false)

  useEffect(() => {
    const fn = async () => {
      const data = await api.getSettings()
      setDeliveryAreas(data.deliveryAreas)
      setDeliveryHours(JSON.stringify(data.deliveryHours))
      setExtraSlots(data.extraSlots)
      setSlotsPerVehicle(data.slotsPerVehicle)
      setVehicles(data.vehicles)
      setSlotDaysInAdvance(data.showSlotDaysInAdvance)
      setBigSlots(data.bigSlots)
      setUseBigSlots(data.useBigSlots)
    }
    fn()
  }, [])

  const buttonHandler = async () => {
    let error = false
    if (isNaN(vehicles) || isNaN(slotsPerVehicle) || isNaN(extraSlots)) {
      error = true
    }
    if (useBigSlots) {
      // TODO: validate this
      //   try {
      //     JSON.parse(bigSlots)
      //   } catch (err) {
      //     error = true
      //   }
    } else {
      try {
        JSON.parse(deliveryHours)
      } catch (err) {
        error = true
      }
    }
    deliveryAreas?.forEach((data: string) => {
      if (data.length !== 4) {
        error = true
      }
      if (isNaN(parseInt(data))) {
        error = true
      }
    })

    if (error) {
      await present('Input validation error.', 2000)
    } else {
      const obj = {
        deliveryAreas: [deliveryAreas],
        // deliveryHours: JSON.parse(deliveryHours), // TODO this
        bigSlots: bigSlots,
        vehicles: vehicles,
        slotsPerVehicle: slotsPerVehicle,
        extraSlots: extraSlots,
        showSlotDaysInAdvance: showSlotDaysInAdvance,
      }

      const result = await api.updateSettings(obj)
      if (result) {
        await present('Erfolgreich upgedated.', 2000)
      } else {
        await present('Fehler beim Update der Einstellungen.', 2000)
      }
    }
  }

  const handleAddPLZ = async () => {
    const element: any = document.getElementById('plzInput')
    const plz = element!.value
    if (plz.length !== 4 || deliveryAreas?.includes(plz)) {
      await present('Bitte eine gültige Postleitzahl eingeben', 3000)
    } else {
      const updatedAreas = [...deliveryAreas!]
      updatedAreas.push(plz)
      setDeliveryAreas(updatedAreas)
      element.value = ''
    }
  }

  const handleChipClose = (plz: string) => {
    const updatedAreas = [...deliveryAreas!]
    const index = updatedAreas.indexOf(plz)
    if (index > -1) {
      updatedAreas.splice(index, 1)
      setDeliveryAreas(updatedAreas)
    }
  }

  return (
    <IonPage>
      <Header subTitle="Einstellungen" />
      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle color="primary">
              Hallo, {user?.firstName}
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            Du hast diese Rolle: {user?.role.name}
          </IonCardContent>
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
          <IonCardContent>
            {deliveryAreas && (
              <IonItem lines="none" slot="start">
                <div>
                  {deliveryAreas.sort().map((plz: string) => {
                    return (
                      <IonChip key={'ChipPlz' + plz} id={plz + 'plz'}>
                        <IonLabel>{plz}</IonLabel>
                        <IonIcon
                          icon={close}
                          onClick={() => handleChipClose(plz)}
                        ></IonIcon>
                      </IonChip>
                    )
                  })}
                </div>
              </IonItem>
            )}
            <IonItem slot="end">
              <IonInput
                id={'plzInput'}
                style={{ width: '50px !important;' }}
                type="number"
                inputMode="numeric"
                maxlength={4}
                placeholder="PLZ"
              ></IonInput>
              <IonButton color={'grey'} onClick={handleAddPLZ}>
                +
              </IonButton>
            </IonItem>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Lieferzeit</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {useBigSlots && bigSlots ? (
              <>
                <IonAccordionGroup>
                  {days.map((day, dayIndex) => (
                    <IonAccordion value={day} key={dayIndex}>
                      <IonItem slot="header" color="light">
                        <IonLabel>{`${
                          day.charAt(0).toUpperCase() + day.slice(1)
                        } (${bigSlots[day].length})`}</IonLabel>
                      </IonItem>
                      <div className="ion-padding" slot="content">
                        {bigSlots[day].map((bigslot, slotIndex) => (
                          <div>
                            <IonInput
                              value={bigslot}
                              key={`${dayIndex}_${slotIndex}`}
                              color="dark"
                            >
                              <IonButton
                                slot="end"
                                color="secondary"
                                id={'REMOVE_' + dayIndex + slotIndex}
                                size="small"
                                onClick={() => {}}
                              >
                                x
                              </IonButton>
                            </IonInput>
                          </div>
                        ))}
                        <IonButton
                          slot="end"
                          id={'ADD_' + dayIndex}
                          size="small"
                          onClick={() => {}}
                        >
                          +
                        </IonButton>
                      </div>
                    </IonAccordion>
                  ))}
                </IonAccordionGroup>
              </>
            ) : (
              // TODO: convert to inputs
              <IonTextarea
                onInput={(e: any) => setDeliveryHours(e.target.value)}
                rows={6}
                cols={20}
                color="black"
                value={deliveryHours}
              ></IonTextarea>
            )}
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Verfügbare Slots pro Auto</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonInput
              onInput={(e: any) => setSlotsPerVehicle(e.target.value)}
              color="black"
              type="number"
              value={slotsPerVehicle}
            ></IonInput>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Verfügbare Fahrzeuge</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonInput
              onInput={(e: any) => setVehicles(e.target.value)}
              color="black"
              type="number"
              value={vehicles}
            ></IonInput>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              Extra Slots pro Auto (wenn im selben Bezirk bestellt wird)
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonInput
              onInput={(e: any) => setExtraSlots(e.target.value)}
              color="black"
              type="number"
              value={extraSlots}
            ></IonInput>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonButton onClick={buttonHandler}>Einstellung übernehmen</IonButton>
        </IonCard>
      </IonContent>
    </IonPage>
  )
}

export default Settings
