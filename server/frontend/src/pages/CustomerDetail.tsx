/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
    IonContent,
    IonPage,
    IonFooter,
    IonGrid,
    IonCard,
    IonCardContent,
    IonItem,
    IonText,
    IonRow,
    IonHeader,
    IonButton,
} from "@ionic/react";
import { useAuth } from "../lib/use-auth";
import { Redirect, useParams } from "react-router";
import { Header } from '../components/Header'
import api from '../lib/api'
import { ShopifyOrder } from "../lib/types";

const CustomerDetail: React.FC = (props) => {
    const { loggedIn } = useAuth();
    const params = useParams<{ shopifyOrderId: string }>();
    const [order, setOrder] = useState<ShopifyOrder | undefined>(undefined)

    useEffect(() => {
        const fn = async () => {
            const result = await api.getShopifyOrder(params.shopifyOrderId)
            setOrder(result)
            console.log(result)
        }
        fn()
    }, [])

    if (!loggedIn) {
        const url = '/login'
        return <Redirect to={url} />
    }

    function containsNumbers(str: string) {
        return /\d/.test(str);
    }

    return (
        <IonPage>
            <Header subTitle={"Kunde " + order?.customer?.first_name + " " + order?.customer?.last_name} />
            <IonContent fullscreen>
                <IonCard>
                    <IonCardContent>
                        <IonItem>
                            <IonGrid>
                                <IonRow>
                                </IonRow>
                                <IonRow>
                                    <IonText><b>{order?.customer?.first_name} {order?.customer?.last_name}</b></IonText>
                                </IonRow>
                                <IonRow>
                                    <IonText><p> {order?.customer?.default_address?.address1} <br></br>
                                        {order?.customer?.default_address?.address2}</p>
                                        <p>{order?.customer?.default_address?.zip} {order?.customer?.default_address?.city} </p>

                                    </IonText>
                                </IonRow>
                            </IonGrid>
                        </IonItem>
                    </IonCardContent>
                </IonCard>
                <IonCard>
                    <IonCardContent>
                        <IonHeader>Rechnungsadresse</IonHeader>
                        <IonItem>
                            <IonGrid>

                                <IonRow>
                                </IonRow>
                                <IonRow>
                                    <IonText><b>{order?.billing_address?.first_name} {order?.billing_address?.last_name}</b></IonText>
                                </IonRow>
                                <IonRow>
                                    <IonText>{order?.billing_address?.company}</IonText>
                                </IonRow>
                                <IonRow>
                                    <IonText>
                                        <p> {order?.customer?.default_address?.address1} <br></br>
                                            {order?.customer?.default_address?.address2}</p>
                                        <p>{order?.customer?.default_address?.zip} {order?.customer?.default_address?.city} </p>
                                        <p>{order?.customer?.default_address?.country} </p>
                                        <h2> <a href={"mailto:" + order?.customer?.email}>{order?.customer?.email}</a> </h2>
                                    </IonText>
                                    <IonButton onClick={() => {
                                        const address = order?.billing_address?.address1
                                        let street = address!.split("/")[0].replace("ß", "ss")
                                        if (!containsNumbers(street)) {
                                            street = street + " " + order?.billing_address?.address2
                                            street = street.split("/")[0]
                                        }
                                        const totalAddress = street + ", " + order?.billing_address?.zip + " " + order?.billing_address?.city
                                        const add = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURI(totalAddress) + "&dir_action=navigate"
                                        window.open(add)
                                    }}>
                                        Google Maps
                                    </IonButton>
                                </IonRow>
                                <IonRow>
                                    <IonText><a href={"tel:" + order?.billing_address?.phone}> {order?.billing_address?.phone} </a></IonText>
                                </IonRow>
                                <IonRow>
                                    <IonText></IonText>
                                </IonRow>
                            </IonGrid>
                        </IonItem>
                    </IonCardContent>
                </IonCard>
                <IonCard>
                    <IonCardContent>
                        <IonHeader>Lieferadresse</IonHeader>
                        <IonItem>
                            <IonGrid hidden={order?.shipping_address === undefined}>

                                <IonRow>
                                </IonRow>
                                <IonRow>
                                    <IonText><b>{order?.customer?.first_name} {order?.customer?.last_name}</b></IonText>
                                </IonRow>
                                <IonRow>
                                    <IonText><b>{order?.customer?.phone} </b></IonText>
                                </IonRow>
                                <IonRow  >
                                    <IonText>
                                        <p> {order?.shipping_address?.address1} <br></br>
                                            {order?.shipping_address?.address2}</p>
                                        <p>{order?.shipping_address?.zip} {order?.shipping_address?.city} </p>
                                        <p>{order?.shipping_address?.country} </p>
                                        <h2> <a href={"mailto:" + order?.customer?.email}>{order?.customer?.email}</a> </h2>
                                    </IonText>
                                    <IonButton onClick={() => {
                                        const address = order?.shipping_address?.address1
                                        let street = address!.split("/")[0].replace("ß", "ss")
                                        if (!containsNumbers(street)) {
                                            street = street + " " + order?.shipping_address?.address2
                                            street = street.split("/")[0]
                                        }
                                        const totalAddress = street + ", " + order?.shipping_address?.zip + " " + order?.shipping_address?.city
                                        const add = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURI(totalAddress) + "&dir_action=navigate"
                                        window.open(add)
                                    }}>
                                        Google Maps
                                    </IonButton>
                                </IonRow>
                                <IonRow>
                                    <IonText></IonText>
                                </IonRow>

                            </IonGrid>
                        </IonItem>
                    </IonCardContent>
                </IonCard>
                <IonCard>
                    <IonCardContent>
                        <IonHeader>Bestellungen </IonHeader>
                        <IonItem>
                            <IonGrid>
                                <IonRow>
                                    <IonText>Gesamt {order?.customer?.orders_count} </IonText>
                                </IonRow>
                                <IonRow>
                                    <IonText>Akzeptiert Marketing? {order?.buyer_accepts_marketing?.toString()} </IonText>
                                </IonRow>
                                <IonRow>
                                    ... weitere Info folgt ..
                                </IonRow>
                            </IonGrid>
                        </IonItem>
                    </IonCardContent>
                </IonCard>
            </IonContent>

            <IonFooter>
                <IonGrid className="ion-no-margin ion-no-padding">

                </IonGrid>
            </IonFooter>
        </IonPage >
    );

}

export default CustomerDetail