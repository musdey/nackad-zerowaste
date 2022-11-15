import { IonButton, IonCard, IonChip, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonText, IonTextarea, useIonToast } from "@ionic/react"
import { useEffect, useState } from "react";
import { Header } from "../components/Header"
import { useAuth } from "../lib/use-auth";
import api from '../lib/api'
import { Redirect } from "react-router";
import { close, closeCircle, pin } from 'ionicons/icons';

const DeliverySlots: React.FC = () => {

    const options: any = {
        weekday: 'short',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    type Slot = {
        _id: string
        excludedDeliveryAreas: string
    }

    const { loggedIn } = useAuth();
    const [deliverySlots, setDeliverySlots] = useState<Slot[]>([])
    const [present] = useIonToast();

    const fetchDeliverySlots = async () => {
        const data = await api.getDeliverySlots()
        console.log(data)
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


    const handleChipClick = async (plz: string, slotId: string) => {

        const updatedSlots = deliverySlots.map((slot: Slot) => {
            if (slot._id === slotId) {
                console.log("path with id equal")
                const split = slot.excludedDeliveryAreas.split(";")
                const index = split.indexOf(plz)
                split.splice(index, 1)
                slot.excludedDeliveryAreas = split.join(";")
            }
            return slot
        })
        if (updatedSlots) {
            setDeliverySlots(updatedSlots)
        }
        //const result = await api.updateDeliverySlot(slotId, deliverySlots.)
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
                                    <p>{new Date(slot.deliveryDay).toLocaleDateString('de-at', options)}</p>
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
                        <IonItem lines="none">
                            <IonItem lines="none">
                                <IonLabel>
                                    Exkludierte Bezirke:
                                </IonLabel>
                                <IonItem slot="end">
                                    <IonButton color={"grey"}> + </IonButton>
                                </IonItem>
                            </IonItem>
                        </IonItem>
                        {slot.excludedDeliveryAreas &&
                            <IonItem>
                                <div >
                                    {slot.excludedDeliveryAreas.split(";").map((plz: string) => {
                                        return <IonChip key={"ChipPlz" + plz} id={plz + "plz"}>
                                            <IonLabel >{plz}</IonLabel>
                                            <IonIcon icon={close} onClick={() => handleChipClick(plz, slot._id)}></IonIcon>
                                        </IonChip>
                                    })}

                                </div>
                            </IonItem>
                        }
                    </IonCard>)}
            </IonContent>

        </IonPage >
    )
}

export default DeliverySlots