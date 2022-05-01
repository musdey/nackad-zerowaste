import { IonButton, IonCard, IonContent, IonItem, IonLabel, IonPage, useIonToast } from "@ionic/react"
import { useEffect, useState } from "react";
import { Header } from "../components/Header"
import { useAuth } from "../lib/use-auth";
import api from '../lib/api'
import { Redirect } from "react-router";

const DeliverySlots: React.FC = () => {

    const { loggedIn } = useAuth();
    const [deliverySlots, setDeliverySlots] = useState([])
    const [present] = useIonToast();

    const fetchDeliverySlots = async () => {
        const data = await api.getDeliverySlots()
        setDeliverySlots(data)
    }

    useEffect(() => {
        fetchDeliverySlots()
    }, [])

    if (!loggedIn) {
        const url = '/login'
        return <Redirect to={url} />
    }

    const handleButton = async (event: any) => {
        const actionString = event.target.id
        const action = actionString.split("_")[0]
        const deliverySlotId = actionString.split("_")[1]

        const result = await api.updateDeliverySlots(deliverySlotId, action)
        if (result) {
            await present("Lieferslot aktualisiert!", 2000)
            await fetchDeliverySlots()
        }
    }

    return (
        <IonPage>
            <Header subTitle="Einstellungen" />
            <IonContent fullscreen>
                {deliverySlots.sort((a: any, b: any) => {
                    if (new Date(a.deliveryDay) > new Date(b.deliveryDay)) {
                        return 1
                    } else {
                        return -1
                    }
                }).map((slot: any) =>
                    <IonCard key={"slotid+" + slot._id}>
                        <IonItem>

                            <IonItem>
                                <IonLabel className="ion-text-wrap">
                                    <p>{new Date(slot.deliveryDay).toLocaleDateString('de-at', { dateStyle: "full" })}</p>
                                    {slot.slotHours}
                                </IonLabel>

                                <IonLabel slot="end" >
                                    {slot.deliveries.length} / {slot.maxSlotSize}
                                </IonLabel>
                            </IonItem>
                            <IonItem slot="end" style={{ marginLeft: "unset" }} lines="none">
                                <IonButton color="secondary" id={"REMOVE_" + slot._id} size='default' onClick={handleButton}  >
                                    -
                                </IonButton>
                                <IonButton id={"ADD_" + slot._id} size='default' onClick={handleButton}>
                                    +
                                </IonButton>
                            </IonItem>
                        </IonItem>
                    </IonCard>)}
            </IonContent>

        </IonPage>
    )
}

export default DeliverySlots