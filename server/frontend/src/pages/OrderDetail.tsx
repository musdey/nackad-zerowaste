import React, { useState } from "react";
import {
    IonContent,
    IonPage,
    useIonRouter,
    IonFooter,
    IonGrid,
    IonList,
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonItem,
    IonText,
    IonRow,
} from "@ionic/react";
import { useAuth } from "../lib/use-auth";
import { Redirect, useParams } from "react-router";
import { Header } from '../components/Header'
import DepositListItem from "../components/DepositListItem";

const OrderDetail: React.FC = () => {
    const params = useParams<{ orderId: string }>();
    const { signin, signout, user, loggedIn } = useAuth();
    const [userData, setUserData] = useState()
    const [error, setError] = useState(false)
    const router = useIonRouter();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    if (!loggedIn) {
        const url = '/login'
        return <Redirect to={url} />
    }

    const handleLogin = async () => {
        // await signin();
        await signin(email, password)
    };
    const obj = {
        firstName: "Mustafa",
        lastName: "Tester",
        address: { street: "Lebinizgasse 61", postal: "1100", city: "Wien" },
        orderId: "someid",
        deliveryStatus: "OPEN",
        timeslot: "16:00-17:00"
    }

    return (
        <IonPage>
            <Header subTitle={"Bestellung " + params.orderId} />
            <IonContent fullscreen>
                <IonCard>
                    <IonCardContent>
                        {/* <IonCardTitle>
                            ion card title
                        </IonCardTitle>
                        <IonCardSubtitle>
                            Subtitle
                        </IonCardSubtitle> */}
                        <IonItem>
                            <IonGrid>
                                <IonRow>
                                    <IonText><b>{obj.firstName} {obj.lastName}</b></IonText>
                                </IonRow>
                                <IonRow>
                                    <IonText>{obj.address.street}</IonText>
                                </IonRow>
                                <IonRow>
                                    <IonText>{obj.address.postal} {obj.address.city}</IonText>
                                </IonRow>
                                <IonRow>
                                    <IonText color="secondary">Timeslot {obj.timeslot}</IonText>
                                </IonRow>
                                <IonRow>
                                    <IonText>Status {obj.deliveryStatus}</IonText>
                                </IonRow>

                            </IonGrid>
                        </IonItem>
                    </IonCardContent>
                </IonCard>
                <IonList>
                    <DepositListItem status={"OPEN"}
                        totalPrice={"12,23€"}
                        paidDeposit={"4,13€"}
                        depositId={"someDepositId"}
                        orderDate="20.02.2022 | 16:00-17:00">
                    </DepositListItem>
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