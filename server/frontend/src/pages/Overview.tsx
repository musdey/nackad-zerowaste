/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
    IonContent,
    IonPage,
    IonFooter,
    IonGrid,
    IonList,
    useIonToast,
    IonRefresher,
    IonRefresherContent,
    RefresherEventDetail,
    IonLabel,
    IonButton,
    IonCard,
} from "@ionic/react";
import { useAuth } from "../lib/use-auth";
import { Redirect } from "react-router";
import { Header } from '../components/Header'
import OverviewListItem from "../components/OverviewListItem";
import api from '../lib/api'

const Overview: React.FC = () => {
    const { loggedIn } = useAuth();
    const [deliveries, setDeliveries] = useState([])
    const [present] = useIonToast();

    const updateData = async () => {
        const data = await api.getCurrentDeliveries()
        if (data === undefined) {
            await present("Unable to get data. Are you offline?", 4000)
        } else {
            setDeliveries(data)
        }
    }

    const doRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
        await updateData()
        setTimeout(() => {
            event.detail.complete();
        }, 1000);
    }

    const loadOldDeliveries = async () => {
        const data = await api.getCurrentDeliveries()
        if (data === undefined) {
            await present("Unable to get data. Are you offline?", 4000)
        } else {
            setDeliveries(data)
        }
    }

    useEffect(() => {
        async function doIt() {
            await updateData()
        }
        doIt()
    }, [])

    if (!loggedIn) {
        const url = '/login'
        return <Redirect to={url} />
    }

    return (
        <IonPage>
            <Header subTitle="Übersicht Lieferungen" />
            <IonContent fullscreen>
                <IonRefresher color="grey" slot="fixed" pullFactor={0.5} pullMin={100} pullMax={200} onIonRefresh={doRefresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                <IonList>
                    {deliveries.length === 0 &&
                        <IonCard>
                            <IonLabel>
                                Keine aktuellen Lieferungen!
                            </IonLabel>
                            <IonButton onClick={loadOldDeliveries}>
                                Zeige alte Lieferungen
                            </IonButton>
                        </IonCard>
                    }
                    {deliveries?.sort((a: any, b: any) => {
                        if (!a.deliverySlot) {
                            return -1
                        }
                        if (!b.deliverySlot) {
                            return 1
                        }
                        if (new Date(a.deliverySlot.deliveryDay).getTime() > new Date(b.deliverySlot.deliveryDay).getTime()) {
                            return 1
                        } else {
                            return -1
                        }
                    }).map((obj: any, i) =>
                        <OverviewListItem
                            key={obj.shopifyOrder || ""}
                            firstName={obj.address?.first_name || "First Name"}
                            lastName={obj.address?.last_name || "Last Name"}
                            address={{ street: obj.address?.address1 || "", extra: obj.address?.adress2 || "", postal: obj.address?.zip || "", city: obj.address?.city || "" }}
                            orderId={obj.shopifyOrder || ""}
                            deliveryStatus={obj.status || "OPEN"}
                            timeslot={obj.deliverySlot?.slotHours || 'unknown'}
                            deliveryDay={obj.deliverySlot?.deliveryDay || 'unknown'}
                            userId={obj.user || ""}
                            deliveryId={obj._id || ""}
                        >
                        </OverviewListItem>
                    )}
                </IonList>
            </IonContent>
            <IonFooter>
                <IonGrid className="ion-no-margin ion-no-padding">
                </IonGrid>
            </IonFooter>
        </IonPage >
    );
};

export default Overview;