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
                await present("Unable to get data. Are you offline?", 4000)
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
                    }).map((obj: any, i) =>
                        <OverviewListItem
                            type={obj.type}
                            key={obj.shopifyOrder || ""}
                            firstName={(obj.type === 'DELIVERY' ? obj.address?.first_name : obj.user.firstName) || "First Name"}
                            lastName={(obj.type === 'DELIVERY' ? obj.address?.last_name : obj.user.lastName) || "Last Name"}
                            address={{ address1: obj.address?.address1 || "", address2: obj.address?.address2 || "", zip: obj.address?.zip || "", city: obj.address?.city || "" }}
                            orderId={obj.shopifyOrder || ""}
                            deliveryStatus={obj.status || "OPEN"}
                            timeslot={obj.deliverySlot?.slotHours || obj.slotHours || 'unknown'}
                            deliveryDay={obj.deliverySlot?.deliveryDay || obj.deliveryDay || 'unknown'}
                            user={obj.user || {}}
                            deliveryId={obj._id || ""}
                        >
                        </OverviewListItem>
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