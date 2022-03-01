import React, { useEffect, useState } from "react";
import {
    IonContent,
    IonPage,
    useIonRouter,
    IonFooter,
    IonList,
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonTitle,
    IonItem,
} from "@ionic/react";
import { useAuth } from "../lib/use-auth";
import { Redirect, useParams } from "react-router";
import { Header } from '../components/Header'
import DepositDetailListItem from "../components/DepositDetailListItem";
import { personCircle } from "ionicons/icons";
import api from '../lib/api'
import { DepositProp } from "../lib/types";

const OrderDetail: React.FC = (props) => {
    const params = useParams<{ depositId: string }>();
    const { signin, signout, user, loggedIn } = useAuth();
    const [orderDate, setOrderDate] = useState("")
    const [depositItems, setDepositItems] = useState([])
    const [isUpdating, setUpdating] = useState(false)
    const [updatingDeposit, setUpdatingDeposit] = useState([])

    useEffect(() => {
        const data: DepositProp = props
        if (data!.location?.state?.state) {
            setOrderDate(data.location.state.state.orderDate)
        }
        const fn = async () => {
            const data = await api.getDepositItems(params.depositId)
            setDepositItems(data.depositItems)
        }
        fn()
    }, [])

    if (!loggedIn) {
        const url = '/login'
        return <Redirect to={url} />
    }

    // TODO: sort date and sort returned
    return (
        <IonPage>
            <Header subTitle={"Pfand " + params.depositId} />
            <IonContent fullscreen>
                <IonCard>
                    <IonCardContent>
                        <IonCardTitle>

                        </IonCardTitle>
                        <IonCardSubtitle>
                            Hier siehst du die Übersicht des Pfandes von der Bestellung vom {new Date(orderDate).toLocaleDateString()} um {new Date(orderDate).toLocaleTimeString()}
                        </IonCardSubtitle>
                    </IonCardContent>
                </IonCard>
                <IonItem>
                    <IonButton slot="end" color="secondary">
                        Pfand eintragen
                    </IonButton>
                </IonItem>

                <IonList>

                    {depositItems.map((obj: any, i) =>
                        <DepositDetailListItem
                            amount={obj.amount}
                            pricePerItem={obj.pricePerItem}
                            productName={obj.productName}
                            returnDates={obj.returnDates}
                            returned={obj.returned}
                            type={obj.type}
                            returnHandler={setUpdatingDeposit}
                        >
                        </DepositDetailListItem>
                    )}


                    {/* <DepositDetailListItem
                        amount={7}
                        pricePerItem="1,24"
                        productName="Bauernmilch"
                        returnDates={[{ date: "21.12.2021 | 17:12", type: "Milchglas" }]}
                        returned={5}
                        type="Milchglase">

                    </DepositDetailListItem>
                    <DepositDetailListItem
                        amount={1}
                        pricePerItem="3,00"
                        productName="Kiste Ottakringer"
                        returnDates={[{ date: "21.12.2021 | 17:12", type: "Bierkiste" }]}
                        returned={1}
                        type="Bierkiste">
                    </DepositDetailListItem>
                    <DepositDetailListItem
                        amount={20}
                        pricePerItem="1,80"
                        productName="Kiste Ottakringer"
                        returnDates={[{ date: "21.12.2021 | 17:12", type: "Bierflasche" }]}
                        returned={18}
                        type="Bierflasche">
                    </DepositDetailListItem>
                    <DepositDetailListItem
                        amount={20}
                        pricePerItem="1,80"
                        productName="Kiste Ottakringer"
                        returnDates={[{ date: "21.12.2021 | 17:12", type: "Bierflasche" }]}
                        returned={18}
                        type="Bierflasche">
                    </DepositDetailListItem> */}
                </IonList>

            </IonContent>
            {/* <IonFooter className="ion-no-border">
                    <IonToolbar>
                        <IonTitle>Footer - No Border</IonTitle>
                    </IonToolbar>
                </IonFooter> */}


        </IonPage >
    );
};

export default OrderDetail;