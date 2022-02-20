import React, { useState } from "react";
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
interface LoginProps { }

const Overview: React.FC<LoginProps> = () => {
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

    return (
        <IonPage>
            <Header subTitle="Overview" />
            <IonContent fullscreen>
                <IonList>
                    <OverviewListItem firstName={"Mustafa"}
                        lastName={"Tester"}
                        address={{ street: "Lebinizgasse 61", postal: "1100", city: "Wien" }}
                        orderId={"someid"}
                        deliveryStatus={"OPEN"}
                        timeslot="16:00-17:00">
                    </OverviewListItem>
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