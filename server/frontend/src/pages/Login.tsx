import React, { useState } from "react";
import {
    IonContent,
    IonPage,
    IonButton,
    useIonRouter,
    IonRow,
    IonCol,
    IonCardTitle,
    IonFooter,
    IonGrid,
    IonLabel,
    IonInput,
    IonCard,
    IonCardContent,
    IonItem,
} from "@ionic/react";
import { useAuth } from "../lib/use-auth";
import { Redirect } from "react-router";
import { Header } from '../components/Header'
import { sign } from "crypto";
interface LoginProps { }

const Login: React.FC<LoginProps> = () => {
    const { signin, signout, user, loggedIn } = useAuth();
    const [userData, setUserData] = useState()
    const [error, setError] = useState(false)
    const router = useIonRouter();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    if (loggedIn) {
        const url = '/dashboard'
        return <Redirect to={url} />
    }

    const handleLogin = async () => {
        // await signin();
        await signin(email, password)
    };

    return (
        <IonPage>
            <Header />
            <IonContent fullscreen>
                <IonCard>
                    <IonItem>
                        <IonCardContent>
                            <IonLabel position="floating">E-mail:</IonLabel>
                            <IonInput value={email} onIonChange={(data) => { setEmail(data.detail.value || '') }} placeholder={"pazi@nackad.at"}> </IonInput>
                        </IonCardContent>
                    </IonItem>
                </IonCard>
                <IonCard>
                    <IonItem>
                        <IonCardContent>
                            <IonLabel position="floating">Password:</IonLabel>
                            <IonInput value={password} onIonChange={(data) => { setPassword(data.detail.value || '') }}> </IonInput>
                        </IonCardContent>
                    </IonItem>

                </IonCard>

                <IonButton className="custom-button" expand="block" onClick={handleLogin}>Login</IonButton>
            </IonContent>

            <IonFooter>
                <IonGrid className="ion-no-margin ion-no-padding">

                </IonGrid>
            </IonFooter>
        </IonPage >
    );
};

export default Login;