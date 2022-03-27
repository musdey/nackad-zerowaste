import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonInput, IonPage, IonTextarea, useIonToast } from "@ionic/react"
import { useEffect, useState } from "react";
import { Header } from "../components/Header"
import { useAuth } from "../lib/use-auth";
import api from '../lib/api'

const Statistics: React.FC = () => {

    const { user } = useAuth();
    const [statistics, setStatistics] = useState({ totalDeposit: 0 })
    //const [present] = useIonToast();


    useEffect(() => {
        const fn = async () => {
            const data = await api.getStatistics()
            console.log(data)
            setStatistics(data)
        }
        fn()
    }, [])

    return (
        <IonPage>
            <Header subTitle="Statistiken" />
            <IonContent fullscreen>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle color="primary">
                            Hallo, {user?.firstName}
                        </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        Die Gesamtzahl an verliehenem Pfand beträgt {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(statistics.totalDeposit / 100)}
                    </IonCardContent>
                </IonCard>

            </IonContent>

        </IonPage>
    )
}

export default Statistics