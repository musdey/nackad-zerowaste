import React, { useEffect, useState } from "react";
import {
    IonContent,
    IonPage,
    useIonRouter,
    IonFooter,
    IonGrid,
    IonList,
} from "@ionic/react";
import { useAuth } from "../lib/use-auth";
import { Redirect } from "react-router";
import { Header } from '../components/Header'
import OverviewListItem from "../components/OverviewListItem";
import api from '../lib/api'

interface LoginProps { }

const Overview: React.FC<LoginProps> = () => {
    const { signin, signout, user, loggedIn } = useAuth();
    const [deliveries, setDeliveries] = useState([])

    useEffect(() => {
        const fn = async () => {
            const data = await api.getCurrentDeliveries()
            console.log(data)
            setDeliveries(data)
        }
        fn()
    }, [])

    if (!loggedIn) {
        const url = '/login'
        return <Redirect to={url} />
    }


    return (
        <IonPage>
            <Header subTitle="Übersicht" />
            <IonContent fullscreen>
                <IonList>
                    {deliveries!.map((obj: any, i) =>
                        <OverviewListItem key={obj.shopifyOrder} firstName={obj.address!.first_name}
                            lastName={obj.address.last_name}
                            address={{ street: obj.address.address1, postal: obj.address.zip, city: obj.address.city }}
                            orderId={obj.shopifyOrder}
                            deliveryStatus={obj.status}
                            timeslot={obj.deliverySlot.slotHours}>
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