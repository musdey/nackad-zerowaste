/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
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
} from "@ionic/react";
import { useAuth } from "../lib/use-auth";
import { Redirect, useParams } from "react-router";
import { Header } from '../components/Header'
import DepositListItem from "../components/DepositListItem";
import api from '../lib/api'
import { Deposit, UserOrderProp } from "../lib/types";

const OrderDetail: React.FC = (props) => {
    const params = useParams<{ orderId: string }>();
    const { loggedIn } = useAuth();
    const [deposits, setDeposits] = useState([])
    const [delivery, setDelivery] = useState({
        firstName: "No", lastName: "data", deliveryStatus: "OPEN", timeslot: "", address: {
            street: "", postal: "", city: ""
        }, deliveryDay: "", userId: "", deliveryId: ""
    })

    useEffect(() => {
        const data: UserOrderProp = props
        if (data!.location?.state?.state) {
            setDelivery(data!.location!.state!.state!)
        }
        const fn = async () => {
            const result = await api.getDepositByUserId(data!.location?.state?.state?.userId!)
            setDeposits(result)
        }
        fn()
    }, [])

    if (!loggedIn) {
        const url = '/login'
        return <Redirect to={url} />
    }
    return (
        <IonPage>
            <Header subTitle={"Bestellung " + params.orderId} />
            <IonContent fullscreen>
                <IonCard>
                    <IonCardContent>
                        <IonItem>
                            <IonGrid>
                                <IonRow>
                                    <IonText><b>{delivery.firstName} {delivery.lastName}</b></IonText>
                                </IonRow>
                                <IonRow>
                                    <IonText>{delivery.address.street}</IonText>
                                </IonRow>
                                <IonRow>
                                    <IonText>{delivery.address.postal} {delivery.address.city}</IonText>
                                </IonRow>
                                <IonRow>
                                    <IonText>Datum  {new Date(delivery.deliveryDay).toLocaleDateString()}</IonText>
                                </IonRow>
                                <IonRow>
                                    <IonText color="secondary">Zeitslot {delivery.timeslot}</IonText>
                                </IonRow>
                                <IonRow>
                                    <IonText>Status {delivery.deliveryStatus}</IonText>
                                </IonRow>

                            </IonGrid>
                        </IonItem>
                    </IonCardContent>
                </IonCard>
                <IonList>
                    {deposits!.map((obj: Deposit, i) =>
                        <DepositListItem key={"key" + obj._id}
                            status={obj.status}
                            totalPrice={obj.totalPrice}
                            paidDeposit={obj.paidDeposit}
                            depositId={obj._id}
                            orderDate={obj.orderDate}
                            deliveryId={delivery.deliveryId}
                            returnedDeposit={obj.returnedDeposit}
                        >
                        </DepositListItem>
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

export default OrderDetail;