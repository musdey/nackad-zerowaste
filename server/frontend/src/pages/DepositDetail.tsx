import React, { useEffect, useState } from "react";
import {
    IonContent,
    IonPage,
    IonList,
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonItem,
    useIonToast,
    useIonPicker,
    IonButton,
} from "@ionic/react";
import { useAuth } from "../lib/use-auth";
import { Redirect, useHistory, useParams } from "react-router";
import { Header } from '../components/Header'
import api from '../lib/api'
import { DepositProp } from "../lib/types";
import DepositItemListItem from "../components/DepositItemListItem";

const DepositDetail: React.FC = (props) => {
    const history = useHistory()
    const params = useParams<{ depositId: string }>();
    const [presentPicker] = useIonPicker();
    const { loggedIn } = useAuth();
    const [orderInfo, setOrderInfo] = useState({ orderDate: "", deliveryId: "", userId: "" })
    const [depositItems, setDepositItems] = useState([])
    const [ionPickerColums, setPickercolums] = useState<any[]>([])
    const [present] = useIonToast();

    // const [isUpdating, setUpdating] = useState(false)
    const [updatedDeposit, setUpdatedDeposit] = useState<[{ id: string, amount: number }] | undefined>()

    const fetchDeposit = async () => {
        const data = await api.getDepositItems(params.depositId)
        setDepositItems(data.depositItems)
    }

    const fetchDepositTypes = async () => {
        const data = await api.getDepositTypes()
        let pickerData: any[] = []
        data.forEach((element: any) => {
            let pickObj = { text: element.name, value: element }
            pickerData.push(pickObj)
        });
        setPickercolums(pickerData)
    }

    useEffect(() => {
        const data: DepositProp = props
        if (data!.location?.state?.state) {
            setOrderInfo(data.location.state.state)
        }
        fetchDeposit()
        fetchDepositTypes()
    }, [])

    if (!loggedIn) {
        const url = '/login'
        return <Redirect to={url} />
    }

    const updateReturnHandler = (id: string, amount: number) => {
        if (updatedDeposit === undefined) {
            const obj = { id, amount }
            setUpdatedDeposit([obj])
        } else {
            const found = updatedDeposit.findIndex((elem) =>
                elem.id === id
            )
            if (found > -1) {
                updatedDeposit[found].amount = amount
            } else {
                updatedDeposit.push({ id, amount })
            }
            setUpdatedDeposit([...updatedDeposit])
        }
    }

    const addDeposit = async (depositType: { _id: string, name: string }, amount: number) => {
        const result = await api.addNewDeposit(orderInfo.userId, depositType.name, amount + "", depositType._id, params.depositId)
        if (result) {
            await fetchDeposit()
            await present("Erfolgreich hinzugefügt!", 2000)
        }
    }

    const handleClick = () => {
        presentPicker(
            [
                {
                    name: 'deposit',
                    options: ionPickerColums,
                },
                {
                    name: 'amount',
                    options: [
                        { text: '1', value: '1' },
                        { text: '2', value: '2' },
                        { text: '3', value: '3' },
                        { text: '4', value: '4' },
                        { text: '5', value: '5' },
                        { text: '6', value: '6' },
                        { text: '7', value: '7' },
                        { text: '8', value: '8' },
                    ],
                },
            ],
            [
                {
                    text: 'Hinzufügen',
                    handler: (selected) => {
                        const depositType = selected.deposit.value
                        const amount = selected.amount.value
                        addDeposit(depositType, amount)
                    },
                },
            ]
        )
    }

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
                <IonCard>
                    <IonCardContent>
                        <IonCardSubtitle>Pfand manuell hinzufügen:</IonCardSubtitle>
                        <IonItem slot="end">
                            <IonButton size="default" onClick={handleClick}> Hinzufügen</IonButton>
                        </IonItem>
                    </IonCardContent>

                </IonCard>
                <IonList>
                    {depositItems?.sort((a: any, b: any) => {
                        if (a?.pricePerItem > b?.pricePerItem) {
                            return -1
                        } else {
                            return 1
                        }
                    }).map((obj: any, i) =>
                        <DepositItemListItem
                            withButtons={false}
                            key={"id" + obj._id}
                            id={obj._id}
                            amount={obj.amount}
                            pricePerItem={obj.pricePerItem}
                            productName={obj.productName}
                            returnDates={obj.returnDates}
                            returned={obj.returned}
                            type={obj.type}
                            depositTypeId={obj.depositType}
                            updateReturnHandler={updateReturnHandler}
                        >
                        </DepositItemListItem>
                    )}

                </IonList>

            </IonContent>

        </IonPage >
    );
};

export default DepositDetail;