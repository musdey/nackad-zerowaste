import { IonButton, IonCard, IonChip, IonContent, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonPage, IonText, IonTextarea, useIonToast } from "@ionic/react"
import { useEffect, useState } from "react";
import { Header } from "../components/Header"
import { useAuth } from "../lib/use-auth";
import api from '../lib/api'
import { Redirect } from "react-router";
import { close, arrowDown } from 'ionicons/icons';

const DeliverySlots: React.FC = () => {

    const options: any = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    };

    type Slot = {
        _id: string
        deliveryAreas: string
        vehicleId: string
    }

    const { loggedIn } = useAuth();
    const [deliverySlots, setDeliverySlots] = useState<Slot[]>([])
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

    const handleChipClick = async (plz: string, slotId: string) => {
        let updated
        const updatedSlots = deliverySlots.map((slot: Slot) => {
            if (slot._id === slotId) {
                const split = slot.deliveryAreas.split(";")
                const index = split.indexOf(plz)
                split.splice(index, 1)
                slot.deliveryAreas = split.join(";")
                updated = slot
            }
            return slot
        })
        if (updatedSlots) {
            setDeliverySlots(updatedSlots)
            await api.updateDeliverySlot(slotId, updated)
        }
    }

    const handleAddDeliveryAreasClick = async (slotId: string) => {
        const element: any = document.getElementById("plzInput" + slotId)
        const plz = element!.value
        let updated
        if (plz.length !== 4) {
            await present('Bitte eine gültige Postleitzahl eingeben', 3000)
        } else {
            const updatedSlots = deliverySlots.map((slot: Slot) => {
                if (slot._id === slotId) {
                    if (!slot.deliveryAreas || slot.deliveryAreas.length === 0) {
                        slot.deliveryAreas = plz
                        element.value = ""
                    } else {
                        const split = slot.deliveryAreas.split(";")
                        const index = split.indexOf(plz)
                        if (index < 0) {
                            split.push(plz)
                            split.sort()
                            slot.deliveryAreas = split.join(";")
                            element.value = ""
                        }
                    }
                    updated = slot
                }
                return slot
            })
            if (updatedSlots) {
                setDeliverySlots(updatedSlots)
                await api.updateDeliverySlot(slotId, updated)
            }
        }
    }
    return (
        <IonPage>
            <Header subTitle="Lieferslots anpassen" />
            <IonContent fullscreen>
                {deliverySlots.sort((a: any, b: any) => {
                    if (new Date(a.deliveryDay) > new Date(b.deliveryDay)) {
                        return 1
                    } else {
                        return -1
                    }
                }).map((slot: any) =>
                    <IonCard key={"slotid+" + slot._id} onClick={(e: any) => {
                        const display = e.target.parentElement.nextSibling
                        if (display && display.id.includes("plzPart")) {
                            const style = window.getComputedStyle(display)
                            if (style.display == "none") {
                                e.target.parentElement.nextSibling.style = "display: unset"
                            } else {
                                e.target.parentElement.nextSibling.style = "display: none"
                            }
                        }
                    }}>
                        <IonItem lines="none">
                            <IonItem>
                                <IonLabel className="ion-text-wrap">
                                    <p><b>{slot.vehicleId.toUpperCase()}</b></p>
                                    <p>{new Date(slot.deliveryDay).toLocaleDateString('de-at', options)}</p>
                                    {slot.slotHours}
                                </IonLabel>

                                <IonLabel slot="end" >
                                    {slot.deliveries.length} / {slot.maxSlotSize}
                                    <p color="white"> &#160;</p>
                                    <IonIcon icon={arrowDown}></IonIcon>
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

                        <div id={"plzPart" + slot._id} style={{ display: "none" }}>
                            <IonItem lines="none" >
                                <IonItem lines="none" slot="start" >
                                    <IonLabel style={{ color: "grey" }} color={"grey"}>
                                        Lieferbezirke:
                                    </IonLabel>
                                </IonItem>

                                <IonItem slot="end">
                                    <IonInput id={"plzInput" + slot._id} style={{ width: "50px !important" }} type="number" inputMode="numeric" maxlength={4} placeholder="PLZ"></IonInput>
                                    <IonButton color={"grey"} onClick={() => handleAddDeliveryAreasClick(slot._id)}> + </IonButton>
                                </IonItem>
                            </IonItem>
                            {
                                slot.deliveryAreas &&
                                <IonItem>
                                    <div >
                                        {slot.deliveryAreas.split(";").map((plz: string) => {
                                            return <IonChip key={"ChipPlz" + plz} id={plz + "plz"}>
                                                <IonLabel >{plz}</IonLabel>
                                                <IonIcon icon={close} onClick={() => handleChipClick(plz, slot._id)}></IonIcon>
                                            </IonChip>
                                        })}
                                    </div>
                                </IonItem>
                            }
                        </div>
                    </IonCard>)}
            </IonContent>

        </IonPage >
    )
}

export default DeliverySlots