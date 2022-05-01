import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonGrid, IonPage, IonRow, IonText } from "@ionic/react"
import { useEffect, useState } from "react";
import { Header } from "../components/Header"
import { useAuth } from "../lib/use-auth";
import api from '../lib/api'

const Statistics: React.FC = () => {

    const { user } = useAuth();
    const [statistics, setStatistics] = useState({ totalDeposit: 0, totalDepositItems: [] })
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
                </IonCard>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>
                            Gesamtpreis an verliehenem Pfand
                        </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonText>
                            <h2> {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(statistics.totalDeposit / 100)}</h2>
                        </IonText>
                    </IonCardContent>
                </IonCard>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle >
                            Menge der verliehenen Pfandbehälter
                        </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonGrid>
                            {statistics?.totalDepositItems?.map((item: any) =>
                                <IonRow key={"id_" + item?.depositType!}>
                                    <IonText>
                                        {item.type} : {item.amount - item.returned}
                                    </IonText>
                                </IonRow>
                            )}
                        </IonGrid>
                    </IonCardContent>
                </IonCard>

            </IonContent>

        </IonPage>
    )
}

export default Statistics