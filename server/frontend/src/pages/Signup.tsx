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
interface LoginProps { }

const Signup: React.FC<LoginProps> = () => {
    const { signin, loggedIn } = useAuth();
    const [error, setError] = useState(false)
    const [errorText, setErrorText] = useState('false')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [pin, setPin] = useState('')
    const [present] = useIonToast();


    useEffect(() => {
        setError(false)
        setErrorText('')

        if (!validator.isStrongPassword(password)) {
            setError(true)
            setErrorText('Passwort ist schwach.')
        }

        if (!validator.isInt(pin) || pin.length !== 8) {
            setError(true)
            setErrorText('Pin muss 8-stellig sein.')
        }
        if (!validator.isEmail(email)) {
            setError(true)
            setErrorText('Keine gültige E-mail.')
        }
        if (lastName.length === 0) {
            setError(true)
            setErrorText('Nachname fehlt.')
        }

        if (firstName.length === 0) {
            setError(true)
            setErrorText('Vorname fehlt.')
        }
    }, [email, password, pin, firstName, lastName])

    if (loggedIn) {
        const url = '/overview'
        return <Redirect to={url} />
    }

    const handleSignup = async () => {
        if (!error) {
            // await signin();
            const result = await api.signup(firstName, lastName, email, pin, password)
            if (result.status === 200) {
                await present(result.body.message, 2000)
                await signin(email, password)
            } else {
                await present(result.body.message, 5000)
            }
        }
    };



    return (
        <IonPage>
            <Header subTitle="Registrieren" />
            <IonContent fullscreen>

                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Mitarbeiter registrieren</IonCardTitle>
                        <IonCardSubtitle>Gib deine Daten an, um eine neues Benutzerkonto zu erstellen :)</IonCardSubtitle>
                    </IonCardHeader>
                    <IonItemDivider></IonItemDivider>
                    <IonItem>
                        <IonCardContent>
                            <IonLabel position="floating">Vorname:</IonLabel>
                            <IonInput value={firstName} onIonChange={(data) => { setFirstName(data.detail.value || '') }} placeholder={"Nackapazi"}> </IonInput>
                        </IonCardContent>
                    </IonItem>
                    <IonItem>
                        <IonCardContent>
                            <IonLabel position="floating">Nachname:</IonLabel>
                            <IonInput value={lastName} onIonChange={(data) => { setLastName(data.detail.value || '') }} placeholder={"Nackad"}> </IonInput>
                        </IonCardContent>
                    </IonItem>
                    <IonItem>
                        <IonCardContent>
                            <IonLabel position="floating">E-Mail:</IonLabel>
                            <IonInput type="email" required value={email} onIonChange={(data) => { setEmail(data.detail.value || '') }} placeholder={"pazi@nackad.at"}> </IonInput>
                        </IonCardContent>
                    </IonItem>
                    <IonItem>
                        <IonCardContent>
                            <IonLabel position="floating">Admin-PIN:</IonLabel>
                            <IonInput type="password" value={pin} required onIonChange={(data) => { setPin(data.detail.value || '') }}> </IonInput>
                        </IonCardContent>
                    </IonItem>
                    <IonItem>
                        <IonCardContent>
                            <IonLabel position="floating">Passwort:</IonLabel>
                            <IonInput type="password" value={password} required onIonChange={(data) => { setPassword(data.detail.value || '') }}> </IonInput>
                        </IonCardContent>
                    </IonItem>
                </IonCard>
                <IonItem>
                    <IonText color="secondary">{errorText}</IonText>

                </IonItem>
                <IonButton disabled={error} size="large" expand="block" className="custom-button" onClick={handleSignup}>Konto erstellen</IonButton>
                <IonRow>
                    <IonCol>
                        &nbsp;
                    </IonCol>
                    <IonCol size="12" class="ion-padding-top">
                        <IonText>
                            Du hast schon einen Account?
                        </IonText>
                    </IonCol>

                    <IonCol size="12" class="ion-padding-top">
                        <IonRouterLink href="/login">
                            Zurück zum Login!
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

export default Signup;