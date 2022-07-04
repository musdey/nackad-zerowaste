/* eslint-disable react-hooks/exhaustive-deps */
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
    IonAccordion,
    IonAccordionGroup,
    IonText,
    useIonPicker,
    IonLabel,
} from "@ionic/react";
import { useAuth } from "../lib/use-auth";
import { Redirect, useParams } from "react-router";
import { Header } from '../components/Header'
import api from '../lib/api'
import { IDeposit, UserOrderProp } from "../lib/types";
import DepositListItem from "../components/DepositListItem";
import DepositItemListItem from "../components/DepositItemListItem";

const Deposit: React.FC = (props) => {
    const [presentPicker] = useIonPicker();
    const [ionPickerColums, setPickercolums] = useState<any[]>([])
    const params = useParams<{ userId: string }>();
    const { loggedIn } = useAuth();
    const [orderInfo, setOrderInfo] = useState({ orderDate: "", deliveryId: "" })
    const [depositItems, setDepositItems] = useState([])
    const [deposits, setDeposits] = useState([])
    const [totalDeposit, setTotalDeposit] = useState(0)
    const [present, dismiss] = useIonToast();
    const [order, setOrder] = useState({
        firstName: "No", lastName: "data", deliveryStatus: "OPEN", timeslot: "", address: {
            address1: "", address2: "", zip: "", city: ""
        }, deliveryDay: "", userId: { _id: "" }, orderId: "", type: "", deliveryId: "", user: {
            _id: "",
            address: {
                address1: '', address2: '', city: '', zip: '', province: '', email: "", emailIsVerified: false, firstName: "", lastName: ""
                , phoneNumber: "", shopifyUserId: "", _id: ""
            }
        }
    })

    const addDeposit = async (depositType: { _id: string, name: string }, amount: number) => {
        const result = await api.addNewDeposit(params.userId, depositType.name, amount + "", depositType._id)
        if (result) {
            await fetchDeposit()
        }
    }

    const createNewDeposit = async () => {
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

    // const [isUpdating, setUpdating] = useState(false)
    const [updatedDeposit, setUpdatedDeposit] = useState<[{ id: string, amount: number, depositTypeId?: string, type?: string }] | undefined>()

    const fetchDeposit = async () => {
        const data = await api.getAggregatedDeposit(params.userId)
        setDepositItems(data.output)
        setDeposits(data.deposits)
        let total = 0
        data.output.forEach((elem: any) => {
            total += parseInt(elem.pricePerItem) * (elem.amount - elem.returned)
        })
        setTotalDeposit(total)

        if (data.deposits.length === 0) {
            const data = await api.getDepositTypes()
            let pickerData: any[] = []
            data.forEach((element: any) => {
                let pickObj = { text: element.name, value: element }
                pickerData.push(pickObj)
            });
            setPickercolums(pickerData)
        }
    }

    useEffect(() => {

        const data: UserOrderProp = props
        if (data?.location?.state?.state) {
            setOrder(data!.location!.state!.state!)
        }
        fetchDeposit()
    }, [])

    useEffect(() => {
    }, [updatedDeposit])


    if (!loggedIn) {
        const url = '/login'
        return <Redirect to={url} />
    }

    const updateReturnHandler = (id: string, amount: number, depositTypeId?: string, type?: string,) => {
        if (updatedDeposit === undefined) {
            const obj = { id, amount, depositTypeId, type }
            setUpdatedDeposit([obj])
        } else {
            const found = updatedDeposit.findIndex((elem) =>
                elem.id === id
            )
            if (found > -1) {
                updatedDeposit[found].amount = amount
            } else {
                updatedDeposit.push({ id, amount, depositTypeId, type })
            }
            setUpdatedDeposit([...updatedDeposit])
        }
    }

    const updateDepositBtn = async () => {
        if (updatedDeposit !== undefined && updatedDeposit.length > 0) {
            const result = await api.returnDeposit(params.userId, orderInfo.deliveryId, updatedDeposit)
            if (result === undefined) {
                await present("Fehler beim Eintragen.", 2000)
            } else {
                setUpdatedDeposit(undefined)
                await present({ buttons: [{ text: 'hide', handler: () => dismiss() }], message: result.text, duration: 10000 })
                await fetchDeposit()
            }
        } else {
            await present("Keine Elemente ausgewählt", 2000)
        }
    }

    return (
        <IonPage>
            <Header subTitle={"Pfand " + params.userId} />
            <IonContent fullscreen>
                <IonCard>
                    <IonCardContent>

                        <IonCardSubtitle>
                            Hier siehst du die Übersicht des Pfandes von Kund:in
                        </IonCardSubtitle>
                        <IonCardTitle>
                            {order.firstName} {order.lastName}
                        </IonCardTitle>
                        <IonText>
                            Insgesamt Pfand offen: {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(totalDeposit / 100)}
                        </IonText>
                    </IonCardContent>
                </IonCard>
                <IonCard hidden={deposits.length === 0}>
                    <IonAccordionGroup>
                        <IonAccordion>
                            <IonItem slot="header">Einzelne Positionen</IonItem>
                            <IonList slot="content">
                                {deposits!.map((obj: IDeposit, i) =>
                                    <DepositListItem key={"key" + obj._id}
                                        userId={params.userId}
                                        status={obj.status}
                                        totalPrice={obj.totalPrice}
                                        paidDeposit={obj.paidDeposit}
                                        depositId={obj._id}
                                        orderDate={obj.orderDate}
                                        deliveryId={""}
                                        dueDate={obj.dueDate}
                                        returnedDeposit={obj.returnedDeposit}
                                    >
                                    </DepositListItem>
                                )}
                            </IonList>

                        </IonAccordion>
                    </IonAccordionGroup>
                </IonCard>
                <IonCard hidden={depositItems.length === 0}>
                    <IonAccordionGroup>
                        <IonAccordion>
                            <IonItem slot="header">Rückgabeverlauf</IonItem>
                            <IonList slot="content">
                                {deposits!.map((deposit: any, i) =>
                                    deposit.depositItems.map((item: any, j: any) => {
                                        if (item.returned > 0) {
                                            return (<IonItem key={"returnDate" + item._id}>
                                                <IonLabel className="ion-text-wrap">
                                                    <h2 style={{ color: '#c2327e' }}><b>{item.type}</b></h2>
                                                    {item.returnDates.map((data: any, k: any) => {
                                                        return (<h3 key={"element" + data._id}>{data.amount} Stück am {new Date(data.date).toLocaleString()}</h3>)
                                                    })}
                                                </IonLabel>
                                            </IonItem>)
                                        }
                                    }
                                    )
                                )}
                            </IonList>
                        </IonAccordion>
                    </IonAccordionGroup>
                </IonCard>

                {depositItems.length === 0 ?

                    <IonCard>
                        <IonCardContent>
                            <IonCardSubtitle>
                                Aktuell kein Pfand offen!
                            </IonCardSubtitle>
                            <IonButton onClick={createNewDeposit} slot="end" color="secondary">
                                Pfand erstellen
                            </IonButton>
                        </IonCardContent>
                    </IonCard>
                    :
                    <IonItem>
                        <IonButton onClick={updateDepositBtn} slot="end" color="secondary">
                            Pfand eintragen
                        </IonButton>
                    </IonItem>
                }
                {depositItems?.sort((a: any, b: any) => {
                    if (a?.pricePerItem > b?.pricePerItem) {
                        return -1
                    } else {
                        return 1
                    }
                }).map((obj: any, i) =>
                    < DepositItemListItem
                        withButtons={true}
                        key={"id" + obj._id}
                        id={obj._id}
                        amount={obj.amount}
                        pricePerItem={obj.pricePerItem}
                        productName={obj.productName}
                        returnDates={obj.returnDates}
                        returned={obj.returned}
                        type={obj.type}
                        updateReturnHandler={updateReturnHandler}
                        depositTypeId={obj.depositType}
                    >
                    </DepositItemListItem>
                )}



            </IonContent>

        </IonPage >
    );
};

export default Deposit;