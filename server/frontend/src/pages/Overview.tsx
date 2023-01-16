/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
    IonContent,
    IonPage,
    IonFooter,
    IonGrid,
    IonList,
    useIonToast,
    IonRefresher,
    IonRefresherContent,
    RefresherEventDetail,
    IonLabel,
    IonCard,
    IonSearchbar,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
} from "@ionic/react";
import { useAuth } from "../lib/use-auth";
import { Redirect } from "react-router";
import { Header } from '../components/Header'
import OverviewListItem from "../components/OverviewListItem";
import api from '../lib/api'

const Overview: React.FC = () => {
    const { signout, loggedIn } = useAuth();
    const [deliveries, setDeliveries] = useState([])
    const [isSearch, setSearch] = useState(false)
    const [present] = useIonToast();

    const updateData = async () => {
        if (!loggedIn) {
            return
        }
        const result = await api.getCurrentDeliveries()
        if (result.success) {
            setDeliveries(result.data)
        } else {
            if (result.data === "Unauthorized") {
                await signout()
            } else {
                await present(result.data, 4000)
            }
        }
    }

    const doRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
        await updateData()
        setTimeout(() => {
            event.detail.complete();
        }, 1000);
    }

    useEffect(() => {
        localStorage.removeItem("order")
        async function doIt() {
            await updateData()
        }
        doIt()
    }, [])

    if (!loggedIn) {
        const url = '/login'
        return <Redirect to={url} />
    }

    const searchChanged = async function (event: any) {
        if (event.target.value === "") {
            setSearch(false)
            await updateData()
        } else {
            const result = await api.searchDelivery(event.target.value)
            setSearch(true)
            setDeliveries(result)
        }
    }

    const updateDeliveryStatus = async (index: number, id: string, status: 'OPEN' | 'PACKED' | 'DELIVERED') => {
        await api.updateDeliveryStatus(id, status)
        await document.querySelector("ion-item-sliding")?.closeOpened();

        const values: any = [...deliveries]
        values[index].status = status
        setDeliveries(values);
    }

    return (
        <IonPage>
            <Header subTitle="Übersicht Lieferung/Abholung" />
            <IonContent fullscreen>
                <IonRefresher color="grey" slot="fixed" pullFactor={0.5} pullMin={100} pullMax={200} onIonRefresh={doRefresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                <IonSearchbar animated debounce={700} onIonChange={searchChanged}></IonSearchbar>
                <IonList>
                    {deliveries.length === 0 &&
                        <IonCard>
                            <IonLabel>
                                Keine aktuellen Lieferungen!
                            </IonLabel>
                        </IonCard>
                    }
                    {deliveries?.sort((a: any, b: any) => {
                        if (!a.deliverySlot) {
                            let value = isSearch === true ? 1 : -1
                            return value
                        }
                        if (!b.deliverySlot) {
                            let value = isSearch === true ? -1 : 1
                            return value
                        }
                        if (new Date(a.deliverySlot.deliveryDay).getTime() > new Date(b.deliverySlot.deliveryDay).getTime()) {
                            let value = isSearch === true ? -1 : 1
                            return value
                        } else {
                            let value = isSearch === true ? 1 : -1
                            return value
                        }
                    }).map((obj: any, index) =>
                        <IonItemSliding>
                            <IonItemOptions id={"slider-" + obj._id + "-top"} side="start" >
                                <IonItemOption onClick={() => updateDeliveryStatus(index, obj._id, "OPEN")} color="primary">Offen</IonItemOption>
                            </IonItemOptions>
                            <OverviewListItem
                                type={obj.type}
                                key={obj.shopifyOrder || obj.webShopOrder || ""}
                                firstName={(obj.type === 'DELIVERY' ? obj.address?.first_name : obj.user.firstName) || "First Name"}
                                lastName={(obj.type === 'DELIVERY' ? obj.address?.last_name : obj.user.lastName) || "Last Name"}
                                address={{ address1: obj.address?.address1 || "", address2: obj.address?.address2 || "", zip: obj.address?.zip || "", city: obj.address?.city || "" }}
                                orderId={obj.webShopOrder || obj.shopifyOrder || ""}
                                deliveryStatus={obj.status || "OPEN"}
                                timeslot={obj.deliverySlot?.slotHours || obj.slotHours || 'unknown'}
                                deliveryDay={obj.deliverySlot?.deliveryDay || obj.deliveryDay || 'unknown'}
                                user={obj.user || {}}
                                deliveryId={obj._id || ""}
                            >
                            </OverviewListItem>
                            <IonItemOptions side="end">
                                <IonItemOption id={"slider-" + obj._id + "-top"} onClick={() => updateDeliveryStatus(index, obj._id, "PACKED")} color="danger">Verpackt</IonItemOption>
                                <IonItemOption id={"slider-" + obj._id + "-top"} onClick={() => updateDeliveryStatus(index, obj._id, "DELIVERED")} color="secondary">Zugestellt</IonItemOption>
                            </IonItemOptions>
                        </IonItemSliding>
                    )}
                </IonList>
            </IonContent>
            <IonFooter>
                <IonGrid className="ion-no-margin ion-no-padding">
                </IonGrid>
            </IonFooter>
        </IonPage >
    );
};

export default Overview;