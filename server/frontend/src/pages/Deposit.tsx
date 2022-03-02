import React, { useEffect, useState } from "react";
import {
    IonContent,
    IonPage,
    IonList,
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonButton,
    IonItem,
} from "@ionic/react";
import { useAuth } from "../lib/use-auth";
import { Redirect, useParams } from "react-router";
import { Header } from '../components/Header'
import DepositDetailListItem from "../components/DepositDetailListItem";
import api from '../lib/api'
import { DepositProp } from "../lib/types";

const OrderDetail: React.FC = (props) => {
    const params = useParams<{ depositId: string }>();
    const { loggedIn } = useAuth();
    const [orderDate, setOrderDate] = useState("")
    const [depositItems, setDepositItems] = useState([])
    // const [isUpdating, setUpdating] = useState(false)
    const [updatedDeposit, setUpdatedDeposit] = useState<[{ id: string, amount: number }]>()

    useEffect(() => {
        console.log(updatedDeposit)
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

    useEffect(() => {
        console.log(updatedDeposit)
    }, [updatedDeposit])


    if (!loggedIn) {
        const url = '/login'
        return <Redirect to={url} />
    }


    const updateReturnHandler = (id: string, amount: number) => {
        console.log(id + " , amount: " + amount)
        if (updatedDeposit === undefined) {
            const obj = { id, amount }
            setUpdatedDeposit([obj])
        } else {
            const found = updatedDeposit.findIndex((elem) =>
                elem.id === id
            )
            console.log(found)
            if (found > -1) {
                updatedDeposit[found].amount = amount
            } else {
                updatedDeposit.push({ id, amount })
            }

            setUpdatedDeposit([...updatedDeposit])
        }
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
                            id={obj._id}
                            amount={obj.amount}
                            pricePerItem={obj.pricePerItem}
                            productName={obj.productName}
                            returnDates={obj.returnDates}
                            returned={obj.returned}
                            type={obj.type}
                            updateReturnHandler={updateReturnHandler}
                        >
                        </DepositDetailListItem>
                    )}

                </IonList>

            </IonContent>

        </IonPage >
    );
};

export default OrderDetail;