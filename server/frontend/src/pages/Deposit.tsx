import React, { useState } from "react";
import {
    IonContent,
    IonPage,
    useIonRouter,
    IonFooter,
    IonList,
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
} from "@ionic/react";
import { useAuth } from "../lib/use-auth";
import { Redirect, useParams } from "react-router";
import { Header } from '../components/Header'
import DepositDetailListItem from "../components/DepositDetailListItem";
import { personCircle } from "ionicons/icons";

const OrderDetail: React.FC = () => {
    const params = useParams<{ depositId: string }>();
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
        timeslot: "16:00-17:00",
        orderDate: "2022-02-23T15:00:00.000+00:00"
    }

    // TODO: sort date and sort returned
    return (
        <IonPage>
            <Header subTitle={"Pfand " + params.depositId} />
            <IonContent fullscreen>
                <IonCard>
                    <IonCardContent>
                        <IonCardTitle>

                        </IonCardTitle>
                        <IonCardSubtitle>
                            Hier siehst du die Übersicht des Pfandes von der Bestellung vom {new Date(obj.orderDate).toLocaleDateString()} um {new Date(obj.orderDate).toLocaleTimeString()}
                        </IonCardSubtitle>
                    </IonCardContent>
                </IonCard>
                <IonList>


                    <DepositDetailListItem
                        amount={7}
                        pricePerItem="1,24"
                        productName="Bauernmilch"
                        returnDates={[{ date: "21.12.2021 | 17:12", type: "Milchglas" }]}
                        returned={5}
                        type="Milchglase">

                    </DepositDetailListItem>
                    <DepositDetailListItem
                        amount={1}
                        pricePerItem="3,00"
                        productName="Kiste Ottakringer"
                        returnDates={[{ date: "21.12.2021 | 17:12", type: "Bierkiste" }]}
                        returned={1}
                        type="Bierkiste">
                    </DepositDetailListItem>
                    <DepositDetailListItem
                        amount={20}
                        pricePerItem="1,80"
                        productName="Kiste Ottakringer"
                        returnDates={[{ date: "21.12.2021 | 17:12", type: "Bierflasche" }]}
                        returned={18}
                        type="Bierflasche">
                    </DepositDetailListItem>

                </IonList>
            </IonContent>

            <IonFooter collapse="fade">
                <IonToolbar>
                    <IonButtons slot="begin" >
                        <IonButton>
                            <IonIcon slot="icon-only" icon={personCircle} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonFooter>
        </IonPage >
    );
};

export default OrderDetail;