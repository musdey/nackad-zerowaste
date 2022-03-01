import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonInput, IonItem, IonPage, IonTextarea, useIonToast } from "@ionic/react"
import { useEffect, useState } from "react";
import { Header } from "../components/Header"
import { useAuth } from "../lib/use-auth";
import api from '../lib/api'

const Settings: React.FC = () => {

    const { signin, signout, user, loggedIn } = useAuth();
    const [deliveryAreas, setDeliveryAreas] = useState('')
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
    const [slotsPerVehicle, setSlotsPerVehicle] = useState(0)
    const [vehicles, setVehicles] = useState(0)
    const [present, dismiss] = useIonToast();


    useEffect(() => {
        const fn = async () => {
            const data = await api.getSettings()
            console.log(data)
            setDeliveryAreas(data.deliveryAreas.toString())
            setDeliveryHours(JSON.stringify(data.deliveryHours))
            setExtraSlots(data.extraSlots)
            setSlotsPerVehicle(data.slotsPerVehicle)
            setVehicles(data.vehicles)
        }
        fn()
    }, [])

    const buttonHandler = async () => {


        let error = false
        if (isNaN(vehicles) || isNaN(slotsPerVehicle) || isNaN(extraSlots)) {
            error = true
        }
        try {
            JSON.parse(deliveryHours)
        } catch (err) {
            error = true
        }
        deliveryAreas.split(';').forEach((data: string) => {
            if (data.length !== 4) {
                error = true
            }
            if (isNaN(parseInt(data))) {
                error = true
            }
        })

        if (error) {
            await present("Input validation error.", 2000)
        } else {
            const obj = {
                deliveryAreas: [deliveryAreas],
                deliveryHours: JSON.parse(deliveryHours),
                vehicles: vehicles,
                slotsPerVehicle: slotsPerVehicle,
                extraSlots: extraSlots
            }

            const result = await api.updateSettings(obj)
            if (result) {
                await present("Erfolgreich upgedated.", 2000)
            } else {
                await present("Fehler beim Update der Einstellungen.", 2000)
            }
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
                <IonCard >
                    <IonCardHeader>
                        <IonCardTitle>
                            Bezirke
                        </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent >
                        <IonTextarea onInput={(e: any) => setDeliveryAreas(e.target.value)} rows={2} cols={20} color="black" value={deliveryAreas} >
                        </IonTextarea>
                    </IonCardContent>
                </IonCard>
                <IonCard >
                    <IonCardHeader>
                        <IonCardTitle>
                            Lieferzeit
                        </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonTextarea onInput={(e: any) => setDeliveryHours(e.target.value)} rows={6} cols={20} color="black" value={deliveryHours}>
                        </IonTextarea>
                    </IonCardContent>
                </IonCard>
                <IonCard >
                    <IonCardHeader>
                        <IonCardTitle>
                            Verfügbare Slots pro Auto
                        </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonInput onInput={(e: any) => setSlotsPerVehicle(e.target.value)} color="black" type="number" value={slotsPerVehicle} >
                        </IonInput>
                    </IonCardContent>
                </IonCard>
                <IonCard >
                    <IonCardHeader>
                        <IonCardTitle>
                            Verfügbare Fahrzeuge
                        </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonInput onInput={(e: any) => setVehicles(e.target.value)} color="black" type="number" value={vehicles} >
                        </IonInput>
                    </IonCardContent>
                </IonCard>
                <IonCard >
                    <IonCardHeader>
                        <IonCardTitle>
                            Extra Slots pro Auto (wenn im selben Bezirk bestellt wird)
                        </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonInput onInput={(e: any) => setExtraSlots(e.target.value)} color="black" type="number" value={extraSlots} >
                        </IonInput>
                    </IonCardContent>
                </IonCard>
                <IonCard>
                    <IonButton onClick={buttonHandler}>
                        Einstellung übernehmen
                    </IonButton>
                </IonCard>

            </IonContent>

        </IonPage>
    )
}

export default Settings