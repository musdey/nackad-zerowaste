/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
    IonContent,
    IonPage,
    IonButton,
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
import api from '../lib/api'

interface ResetPWProps { }

const ResetPWRequest: React.FC<ResetPWProps> = () => {
    const { loggedIn, getUserWithToken } = useAuth();
    const [email, setEmail] = useState('')
    const [present] = useIonToast();

    if (loggedIn) {
        const url = '/overview'
        return <Redirect to={url} />
    }

    const handleLogin = async () => {
        if (!validator.isEmail(email)) {
            await present('Keine gültige E-Mail Adresse!', 2000)
        } else {

            const result = await api.requestPW(email)
            await present("Eine E-Mail zum Zurücksetzen deines Passwortes wurde versandt. Überprüfe bitte deine Inbox.", 5000)
        }
    };

    return (
        <IonPage>
            <Header subTitle="Passwort Reset" />
            <IonContent fullscreen>

                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Benutzerpasswort zurücksetzen</IonCardTitle>
                        <IonCardSubtitle>Bitte gib deine E-Mail Adresse an, mit der du dich hier registiert hast.</IonCardSubtitle>
                    </IonCardHeader>
                    <IonItemDivider></IonItemDivider>

                    <IonItem>
                        <IonCardContent>
                            <IonLabel position="floating">E-Mail:</IonLabel>
                            <IonInput type="email" value={email} onIonChange={(data) => { setEmail(data.detail.value || '') }} autocomplete="on" placeholder={"pazi@nackad.at"} ></IonInput>
                        </IonCardContent>
                    </IonItem>
                </IonCard>
                <IonButton size="large" expand="block" className="custom-button" onClick={handleLogin}>Zurücksetzen</IonButton>
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
                <IonRow>
                    <IonCol>
                        &nbsp;
                    </IonCol>
                    <IonCol size="12" class="ion-padding-top">
                        <IonText>
                            Zurück zum Login!
                        </IonText>
                    </IonCol>

                    <IonCol size="12" class="ion-padding-top">
                        <IonRouterLink href="/login">
                            Klicke hier, um zum Login zurückzukehren!
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

export default ResetPWRequest;