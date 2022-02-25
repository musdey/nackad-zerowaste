import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonItem, IonPage } from "@ionic/react"
import { useEffect, useState } from "react";
import { Header } from "../components/Header"
import { useAuth } from "../lib/use-auth";
import api from '../lib/api'

const User: React.FC = () => {

    const { signin, signout, user, loggedIn } = useAuth();
    const [name, setName] = useState('')
    const [role, setRole] = useState('')



    useEffect(() => {
        const fn = async () => {
            const data = await api.getUserData()
            const body = data?.body
            setName(body.firstName + " " + body.lastName)
            setRole(body.role.name)
        }
        fn()
    })

    return (
        <IonPage>
            <Header subTitle="User" />
            <IonContent fullscreen>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>
                            Hallo, {name}
                        </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        Du hast diese Rolle: {role}
                    </IonCardContent>
                </IonCard>
                <IonCard >

                </IonCard>
            </IonContent>
        </IonPage>
    )
}

export default User