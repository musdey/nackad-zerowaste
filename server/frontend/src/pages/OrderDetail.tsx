/* eslint-disable react-hooks/exhaustive-deps */
import React, { Children, useEffect, useState } from "react";
import {
    IonContent,
    IonPage,
    IonFooter,
    IonGrid,
    IonList,
    IonCard,
    IonCardContent,
    IonItem,
    IonText,
    IonRow,
    IonLabel,
    IonCheckbox,
} from "@ionic/react";
import { useAuth } from "../lib/use-auth";
import { Redirect, useHistory, useParams } from "react-router";
import { Header } from '../components/Header'
import api from '../lib/api'
import { ShopifyOrder, UserOrderProp } from "../lib/types";

const OrderDetail: React.FC = (props) => {
    const { loggedIn } = useAuth();
    const history = useHistory()
    const params = useParams<{ shopifyOrderId: string }>();
    const [order, setOrder] = useState<ShopifyOrder | undefined>(undefined)

    useEffect(() => {
        const data: UserOrderProp = props
        const fn = async () => {
            const result = await api.getShopifyOrder(params.shopifyOrderId)
            setOrder(result)
        }
        fn()
    }, [])

    if (!loggedIn) {
        const url = '/login'
        return <Redirect to={url} />
    }

    return (
        <IonPage>
            <Header subTitle={"Bestelldetails " + order?._id} />
            <IonContent fullscreen>
                <IonCard>
                    <IonCardContent>
                        <IonItem>
                            <IonGrid>
                                <IonRow>
                                    <IonText><b>Bestellung {order?.name}</b></IonText>
                                </IonRow>

                                <IonRow>
                                    <IonText><b>{order?.customer?.first_name} {order?.customer?.last_name}</b></IonText>
                                </IonRow>

                            </IonGrid>
                        </IonItem>
                    </IonCardContent>
                </IonCard>
                <IonList>
                    {order?.line_items?.sort((a: any, b: any) => {
                        if (!a?.deposit) {
                            return 1
                        }
                        if (isNaN(parseInt(a?.deposit?.pricePerItem))) {
                            return 1
                        }
                        if (parseInt(a?.deposit?.pricePerItem) < parseInt(b?.deposit?.pricePerItem)) {
                            return 1
                        } else {
                            return -1
                        }
                    }).map((obj: any, i) =>
                        <IonItem key={"item" + obj.id}>
                            <IonLabel className="ion-text-wrap" id={"label" + obj.id}>
                                <h2><b>{obj.quantity}</b> - {obj.name}</h2>
                                {obj.deposit?.depositName && <p slot="end">{obj.deposit?.depositName}</p>}
                            </IonLabel>
                            <IonCheckbox id={"checkbox" + obj.id} style={{ marginLeft: "0px" }} slot="end" onIonChange={(event: any) => {
                                console.log(event.target.checked)
                                if (event.target.checked) {
                                    event.target.parentElement!.disabled = true
                                    event.target.parentElement!.style.pointerEvents = 'auto'
                                } else {
                                    event.target.parentElement!.disabled = false
                                }
                            }}></IonCheckbox>
                        </IonItem>
                    )}
                </IonList>

            </IonContent>

            <IonFooter>
                <IonGrid className="ion-no-margin ion-no-padding">

                </IonGrid>
            </IonFooter>
        </IonPage >
    );

}

export default OrderDetail