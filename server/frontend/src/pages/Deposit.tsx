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
    IonBackButton,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
} from "@ionic/react";
import { useAuth } from "../lib/use-auth";
import { Redirect, useParams } from "react-router";
import { Header } from '../components/Header'
import DepositListItem from "../components/DepositListItem";
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
        timeslot: "16:00-17:00"
    }

    // TODO: sort date and sort returned
    return (
        <IonPage>
            <Header subTitle={"Deposit detail of " + params.depositId} />
            <IonContent fullscreen>
                <IonCard>
                    <IonCardContent>
                        <IonCardTitle>
                            Deposit Card TItle
                        </IonCardTitle>
                        <IonCardSubtitle>
                            Subtitle
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