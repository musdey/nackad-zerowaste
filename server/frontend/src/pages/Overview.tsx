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
        console.log(data)
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
            <Header subTitle="Übersicht" />
            <IonContent fullscreen>
                <IonRefresher color="grey" slot="fixed" pullFactor={0.5} pullMin={100} pullMax={200} onIonRefresh={doRefresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                <IonList>
                    {deliveries?.map((obj: any, i) =>
                        <OverviewListItem
                            key={obj.shopifyOrder}
                            firstName={obj.address!.first_name}
                            lastName={obj.address.last_name}
                            address={{ street: obj.address.address1, extra: obj.address.adress2 || '', postal: obj.address.zip, city: obj.address.city }}
                            orderId={obj.shopifyOrder}
                            deliveryStatus={obj.status}
                            timeslot={obj.deliverySlot.slotHours}
                            deliveryDay={obj.deliverySlot.deliveryDay}
                            userId={obj.user}
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