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
    IonCheckbox,
} from "@ionic/react";
import { useAuth } from "../lib/use-auth";
import { Header } from '../components/Header'
import validator from 'validator'
import api from '../lib/api'
import { Redirect, useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";

const ResetPWSet: React.FC = () => {
    const history = useHistory()
    const [present] = useIonToast();
    const { token } = useParams<{ token: string }>()
    const { loggedIn, getUserWithToken } = useAuth();
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [errorText, setErrorText] = useState('false')
    const [tokenIsValid, setTokenIsValid] = useState(true)

    useEffect(() => {
        api.chekPWToken(token).then((data) => {
            setTokenIsValid(data)
        })
    }, [])

    useEffect(() => {

        console.log(tokenIsValid)
    }, [tokenIsValid])

    useEffect(() => {
        setErrorText('')

        if (password !== password2) {
            setErrorText('Passwörter stimmen nicht überein!')
        }

        if (!validator.isStrongPassword(password)) {
            setErrorText('Passwort ist schwach.')
        }
    }, [password, password2])

    if (loggedIn) {
        const url = '/overview'
        return <Redirect to={url} />
    }

    const handleLogin = async () => {

        const result = await api.resetPW(token, password)
        if (result) {
            await present("Passwort erfolgreich zurückgesetzt", 5000)
            setPassword('')
            setPassword2('')
            setTimeout(() => {
                history.push('/login')
            }, 5000)
        } else {
            await present("Fehler beim Zurücksetzen des Passworts. Bitte Kontaktiere deine Administrator oder starte den gesamten Prozess von vorne.")
        }
    };

    return (

        <IonPage>
            <Header subTitle="Set new password" />
            {tokenIsValid ?
                <IonContent fullscreen>
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>Neues Passwort setzen</IonCardTitle>
                            <IonCardSubtitle>Bitte setze und bestätige dein neues Passwort</IonCardSubtitle>
                        </IonCardHeader>
                        <IonItemDivider></IonItemDivider>

                        <IonItem>
                            <IonCardContent>
                                <IonLabel position="floating">Passwort:</IonLabel>
                                <IonInput type="password" value={password} required onIonChange={(data) => { setPassword(data.detail.value || '') }}> </IonInput>
                            </IonCardContent>
                        </IonItem>
                        <IonItem>
                            <IonCardContent>
                                <IonLabel position="floating">Passwort bestätigen:</IonLabel>
                                <IonInput type="password" value={password2} required onIonChange={(data) => { setPassword2(data.detail.value || '') }}> </IonInput>
                            </IonCardContent>
                        </IonItem>
                    </IonCard>
                    <IonItem>
                        <IonText color="secondary">{errorText}</IonText>
                    </IonItem>
                    <IonButton disabled={errorText.length !== 0} size="large" expand="block" className="custom-button" onClick={handleLogin}>Zurücksetzen</IonButton>
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
                            <IonRouterLink href="/reset-pw">
                                Klicke hier, um zum Login zurückzukehren!
                            </IonRouterLink>
                        </IonCol>
                    </IonRow>
                </IonContent>

                :
                <IonContent>
                    <IonCard>
                        <IonCardHeader>
                            Token ist nicht mehr gültig, bitte beantrage <Link to={'/requestpw'}>hier</Link> eine neue Reset-Mail.

                        </IonCardHeader>
                    </IonCard>
                </IonContent>

            }

            <IonFooter>
                <IonGrid className="ion-no-margin ion-no-padding">
                </IonGrid>
            </IonFooter>
        </IonPage >
    );
};

export default ResetPWSet;