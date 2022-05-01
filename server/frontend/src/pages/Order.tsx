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
    IonLabel,
    IonIcon,
} from "@ionic/react";
import { useAuth } from "../lib/use-auth";
import { Redirect, useHistory, useParams } from "react-router";
import { Header } from '../components/Header'
import { UserOrderProp } from "../lib/types";
import { cubeOutline, newspaperOutline, personCircleOutline } from "ionicons/icons";

const Order: React.FC = (props) => {
    const history = useHistory()
    const params = useParams<{ orderId: string }>();
    const { loggedIn } = useAuth();
    const [order, setOrder] = useState({
        firstName: "No", lastName: "data", deliveryStatus: "OPEN", timeslot: "", address: {
            street: "", postal: "", city: ""
        }, deliveryDay: "", userId: { _id: "" }, orderId: "", type: "", deliveryId: "", user: {
            _id: "",
            address: {
                address1: '', address2: '', city: '', zip: '', province: '', email: "", emailIsVerified: false, firstName: "", lastName: ""
                , phoneNumber: "", shopifyUserId: "", _id: ""
            }
        }
    })

    useEffect(() => {
        const data: UserOrderProp = props
        if (data?.location?.state?.state) {
            setOrder(data!.location!.state!.state!)
        }

    }, [])

    if (!loggedIn) {
        const url = '/login'
        return <Redirect to={url} />
    }

    const handleOrderDetail = () => {
        history.push('/orderdetail/' + params.orderId)
    }

    const handleCustomerDetail = () => {
        history.push('/customerdetail/' + params.orderId)
    }

    const handleDepositDetail = () => {
        console.log(order.user._id)
        history.push('/deposit/' + order.user._id, {
            state: order
        })
    }

    if (!loggedIn) {
        const url = '/login'
        return <Redirect to={url} />
    }

    return (
        <IonPage>
            <Header subTitle={"Bestellung " + order.orderId} />
            <IonContent fullscreen>
                <IonCard>
                    <IonCardContent>
                        <IonItem>
                            <IonGrid>
                                <IonRow>
                                    <IonText><b>{order.firstName} {order.lastName}</b></IonText>
                                </IonRow>
                                <IonRow>
                                    <IonText> {order.type === "PICKUP" ? "ABHOLUNG" : "ZUSTELLUNG"}</IonText>
                                </IonRow>
                                <IonRow>
                                    <IonText>{order.address?.street}</IonText>
                                </IonRow>
                                <IonRow>
                                    <IonText>{order.address?.postal} {order.address?.city}</IonText>
                                </IonRow>
                                <IonRow>
                                    <IonText>Datum  {new Date(order.deliveryDay).toLocaleDateString()}</IonText>
                                </IonRow>

                                <IonRow>
                                    <IonText color="secondary">Zeitslot {order.timeslot}</IonText>
                                </IonRow>
                                <IonRow>
                                    <IonText>Status {order.deliveryStatus}</IonText>
                                </IonRow>

                            </IonGrid>
                        </IonItem>
                    </IonCardContent>
                </IonCard>
                <IonList>
                    <IonItem lines="full">
                        <IonIcon icon={newspaperOutline} slot="start"></IonIcon>
                        <IonLabel onClick={handleOrderDetail}>
                            Bestelldetails anzeigen
                        </IonLabel>
                    </IonItem>
                    <IonItem lines="full">
                        <IonIcon icon={personCircleOutline} slot="start"></IonIcon>
                        <IonLabel onClick={handleCustomerDetail}>
                            Kundendaten anzeigen
                        </IonLabel>
                    </IonItem>
                    <IonItem lines="full">
                        <IonIcon icon={cubeOutline} slot="start"></IonIcon>
                        <IonLabel onClick={handleDepositDetail}>
                            Pfand anzeigen
                        </IonLabel>
                    </IonItem>
                </IonList>

            </IonContent>

            <IonFooter>
                <IonGrid className="ion-no-margin ion-no-padding">

                </IonGrid>
            </IonFooter>
        </IonPage >
    );
};

export default Order;