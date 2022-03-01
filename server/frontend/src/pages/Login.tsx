import React, { useEffect, useState } from "react";
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
    IonCheckbox,
} from "@ionic/react";
import { useAuth } from "../lib/use-auth";
import { Redirect } from "react-router";
import { Header } from '../components/Header'
import validator from 'validator'
interface LoginProps { }

const Login: React.FC<LoginProps> = () => {
    const { signin, signout, user, loggedIn, getUserWithToken } = useAuth();
    const [userData, setUserData] = useState()
    const [error, setError] = useState(false)
    const router = useIonRouter();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [present, dismiss] = useIonToast();
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        const autoLogin = async function () {
            const loginWasSaved = localStorage.getItem("SAVELOGIN")
            if (loginWasSaved === "TRUE") {
                setChecked(true)
                const data = localStorage.getItem("TOKEN")
                if (data && data.length > 0) {
                    await getUserWithToken()
                }
            }
        }
        autoLogin()
    }, [])

    if (loggedIn) {
        const url = '/overview'
        return <Redirect to={url} />
    }

    const handleLogin = async () => {
        if (!validator.isEmail(email) || password.length <= 0) {
            await present('E-mail oder Passwort nicht korrekt!', 2000)
        } else {
            const result = await signin(email, password)
            if (!result.success) {
                await present(result.error!.message, 2000)
            }
            localStorage.setItem("SAVELOGIN", checked ? "TRUE" : "FALSE")
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
                            <IonInput type="email" value={email} onIonChange={(data) => { setEmail(data.detail.value || '') }} autocomplete="on" placeholder={"pazi@nackad.at"} ></IonInput>
                        </IonCardContent>
                    </IonItem>
                    <IonItem>
                        <IonCardContent>
                            <IonLabel position="floating">Password:</IonLabel>
                            <IonInput type="password" value={password} onIonChange={(data) => { setPassword(data.detail.value || '') }}> </IonInput>
                        </IonCardContent>
                    </IonItem>
                </IonCard>
                <IonItem>
                    <IonCheckbox checked={checked} onIonChange={e => setChecked(e.detail.checked)} />
                    &#160;
                    <IonLabel> Login für das nächste Mal speichern?</IonLabel>

                </IonItem>
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