import React, { useState } from "react";
import {
    IonContent,
    IonPage,
    IonButton,
    useIonRouter,
    IonFooter,
    IonGrid,
    IonLabel,
    IonInput,
    IonCard,
    IonCardContent,
    IonItem,
    IonCardHeader,
    IonCardTitle,
    IonItemDivider,
    IonCardSubtitle,
    IonRow,
    IonCol,
    IonText,
    IonRouterLink,
    useIonToast,
} from "@ionic/react";
import { useAuth } from "../lib/use-auth";
import { Redirect } from "react-router";
import { Header } from '../components/Header'
import validator from 'validator'
interface LoginProps { }

const Login: React.FC<LoginProps> = () => {
    const { signin, signout, user, loggedIn } = useAuth();
    const [userData, setUserData] = useState()
    const [error, setError] = useState(false)
    const router = useIonRouter();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [present, dismiss] = useIonToast();



    if (loggedIn) {
        const url = '/overview'
        return <Redirect to={url} />
    }

    const handleLogin = async () => {
        // await signin();
        if (!validator.isEmail(email) || password.length <= 0) {
            await present('E-mail oder Passwort nicht korrekt!')
        } else {
            await signin(email, password)
        }
    };

    return (
        <IonPage>
            <Header subTitle="Login" />
            <IonContent fullscreen>

                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Mitarbeiter Login</IonCardTitle>
                        <IonCardSubtitle>Melde dich bitte mit deinen Nutzerdaten an. :)</IonCardSubtitle>
                    </IonCardHeader>
                    <IonItemDivider></IonItemDivider>

                    <IonItem>
                        <IonCardContent>
                            <IonLabel position="floating">E-Mail:</IonLabel>
                            <IonInput type="email" value={email} onIonChange={(data) => { setEmail(data.detail.value || '') }} placeholder={"pazi@nackad.at"}> </IonInput>
                        </IonCardContent>
                    </IonItem>
                    <IonItem>
                        <IonCardContent>
                            <IonLabel position="floating">Password:</IonLabel>
                            <IonInput type="password" value={password} onIonChange={(data) => { setPassword(data.detail.value || '') }}> </IonInput>
                        </IonCardContent>
                    </IonItem>
                </IonCard>
                <IonButton size="large" expand="block" className="custom-button" onClick={handleLogin}>Login</IonButton>
                <IonRow>
                    <IonCol>
                        &nbsp;
                    </IonCol>
                    <IonCol size="12" class="ion-padding-top">
                        <IonText>
                            Du bist noch nicht registriert?
                        </IonText>
                    </IonCol>

                    <IonCol size="12" class="ion-padding-top">
                        <IonRouterLink href="/signup">
                            Klicke hier, um einen Firmenaccount anzulegen!
                        </IonRouterLink>
                    </IonCol>
                </IonRow>
            </IonContent>

            <IonFooter>
                <IonGrid className="ion-no-margin ion-no-padding">

                </IonGrid>
            </IonFooter>
        </IonPage >
    );
};

export default Login;