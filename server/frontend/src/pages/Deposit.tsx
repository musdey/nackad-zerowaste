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
    useIonToast,
} from "@ionic/react";
import { useAuth } from "../lib/use-auth";
import { Redirect, useParams } from "react-router";
import { Header } from '../components/Header'
import DepositDetailListItem from "../components/DepositDetailListItem";
import api from '../lib/api'
import { DepositProp } from "../lib/types";

const Deposit: React.FC = (props) => {
    const params = useParams<{ depositId: string }>();
    const { loggedIn } = useAuth();
    const [orderInfo, setOrderInfo] = useState({ orderDate: "", deliveryId: "" })
    const [depositItems, setDepositItems] = useState([])
    const [present] = useIonToast();

    // const [isUpdating, setUpdating] = useState(false)
    const [updatedDeposit, setUpdatedDeposit] = useState<[{ id: string, amount: number }] | undefined>()

    const fetchDeposit = async () => {
        const data = await api.getDepositItems(params.depositId)
        setDepositItems(data.depositItems)
    }

    useEffect(() => {
        console.log(updatedDeposit)
        const data: DepositProp = props
        if (data!.location?.state?.state) {
            setOrderInfo(data.location.state.state)
        }
        fetchDeposit()
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

    const updateDepositBtn = async () => {
        if (updatedDeposit !== undefined && updatedDeposit.length > 0) {
            const result = await api.updateDeposit(params.depositId, orderInfo.deliveryId, updatedDeposit)
            if (result === undefined) {
                await present("Fehler beim Eintragen.", 2000)
            } else {
                setUpdatedDeposit(undefined)
                await present("Pfand erfolgreich eingetragen.", 2000)
                await fetchDeposit()
            }
        } else {
            await present("Keine Elemente ausgewählt", 2000)
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
                            Hier siehst du die Übersicht des Pfandes von der Bestellung vom {new Date(orderInfo.orderDate).toLocaleDateString()} um {new Date(orderInfo.orderDate).toLocaleTimeString()}
                        </IonCardSubtitle>
                    </IonCardContent>
                </IonCard>
                <IonItem>
                    <IonButton onClick={updateDepositBtn} slot="end" color="secondary">
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

export default Deposit;