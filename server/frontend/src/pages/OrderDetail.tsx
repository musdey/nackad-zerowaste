/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import {
    IonContent,
    IonPage,
    IonFooter,
    IonGrid,
    IonList,
    IonCard,
    IonCardContent,
    IonItem,
    IonText,
    IonRow,
    IonLabel,
    IonCheckbox,
    IonImg,
    IonThumbnail,
    IonModal,
    IonButton,
} from "@ionic/react";
import { useAuth } from "../lib/use-auth";
import { Redirect, useParams } from "react-router";
import { Header } from '../components/Header'
import api from '../lib/api'
import { LineItem, ShopifyOrder } from "../lib/types";

const OrderDetail: React.FC = (props) => {
    const { loggedIn } = useAuth();
    const params = useParams<{ webShopOrderId: string }>();
    const [order, setOrder] = useState<ShopifyOrder | undefined>(undefined)
    const [currentImage, setCurrentImage] = useState('')
    const [currentProductName, setCurrentProductName] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [productClicked, setProductClicked] = useState(false)
    const timeoutRef = useRef<NodeJS.Timeout>();
    const modal = useRef<HTMLIonModalElement>(null);

    const cleanUpShopifyOrder = (data: ShopifyOrder | undefined) => {
        if (!data) {
            return undefined
        }
        let newShopifyOrder = data
        const items = data.line_items?.filter(item => item.name !== "Pfand" && item.name !== "Tip")
        newShopifyOrder.line_items = items
        return newShopifyOrder
    }

    useEffect(() => {
        const fn = async () => {
            const result = await api.getShopifyOrder(params.webShopOrderId)
            const orderWithoutTipAndDepositObj: ShopifyOrder = cleanUpShopifyOrder(result)!
            const sortedLineItems = orderWithoutTipAndDepositObj!.line_items!.sort((a: LineItem, b: LineItem) => {
                if (!a?.deposit) {
                    return 1
                }
                if (isNaN(parseInt(a?.deposit?.pricePerItem))) {
                    return 1
                }

                if (parseInt(a?.deposit?.pricePerItem) < parseInt(b?.deposit?.pricePerItem)) {
                    return 1
                } else if (parseInt(a?.deposit?.pricePerItem) === parseInt(b?.deposit?.pricePerItem)) {
                    if (a!.name! >= b!.name!) {
                        return 1
                    } else {
                        return -1
                    }
                } else {
                    return -1
                }
            })
            orderWithoutTipAndDepositObj.line_items = sortedLineItems
            setOrder(orderWithoutTipAndDepositObj)
        }
        fn()
        const onBackButton = () => {
            console.log('Handler was called!');
            setIsOpen(false)
            document.removeEventListener("backbutton", onBackButton, false);
        }
        document.addEventListener('backbutton', onBackButton);
    }, [])

    useEffect(() => {
        if (productClicked) {
            if (timeoutRef.current) {

                clearTimeout(timeoutRef.current)
                timeoutRef.current = setTimeout(async () => {
                    await updateOrder()
                    timeoutRef.current = undefined
                }, 2000);
            } else {

                timeoutRef.current = setTimeout(async () => {
                    await updateOrder()
                    timeoutRef.current = undefined
                }, 2000);
            }
        }
        setProductClicked(false)
        //return () => clearTimeout(timeoutRef.current!);
    }, [productClicked]);

    const updateOrder = async () => {
        const result = await api.updateShopifyOrder(params.webShopOrderId, order!)
        console.log(result)
    }

    if (!loggedIn) {
        const url = '/login'
        return <Redirect to={url} />
    }

    const showImagePreview = (productName: string, img: string) => {
        setCurrentProductName(productName)
        setCurrentImage(img)
        setIsOpen(true)
    }

    const updateProduct = (index: number, picked: boolean) => {
        const newOrder = { ...order! }
        newOrder!.line_items![index].picked = picked
        setOrder(newOrder)
        setProductClicked(true)
    }

    return (
        <IonPage>
            <IonModal ref={modal} isOpen={isOpen}>
                <IonContent className="ion-padding">
                    <IonText><h2 style={{ textAlign: "center" }}>{currentProductName}</h2></IonText>
                    <IonItem>
                        <IonImg style={{ width: "100%" }} src={currentImage}></IonImg>
                    </IonItem>
                </IonContent>
                <IonFooter>
                    <IonButton expand="full" onClick={() => setIsOpen(false)}>Schließen</IonButton>
                </IonFooter>

            </IonModal>
            <Header subTitle={"Bestelldetails " + (order?.webShopOrderId || order?._id)} />
            <IonContent fullscreen>
                <IonCard>
                    <IonCardContent>
                        <IonItem>
                            <IonGrid>
                                <IonRow>
                                    <IonText><b>Bestellung {order?.webShopOrderId || order?.name}</b></IonText>
                                </IonRow>

                                <IonRow>
                                    <IonText><b>{order?.customer?.first_name} {order?.customer?.last_name}</b></IonText>
                                </IonRow>
                            </IonGrid>
                        </IonItem>
                    </IonCardContent>
                </IonCard>
                {(order?.note && order?.note.length > 0) ?
                    <IonCard style={{ background: '#c2327e' }}>
                        <IonCardContent>
                            <IonItem>
                                <IonGrid>
                                    <IonRow>
                                        <IonText><b>Hinweis vom Kunden: </b></IonText>
                                    </IonRow>

                                    <IonRow>
                                        <IonText>{order?.note}</IonText>
                                    </IonRow>
                                </IonGrid>
                            </IonItem>
                        </IonCardContent>
                    </IonCard> :
                    <div></div>
                }
                <IonList>
                    {order?.line_items?.map((obj: LineItem, i) => {
                        return <IonItem key={"item" + obj.id} disabled={obj.picked}>
                            <IonThumbnail slot="start" onClick={() => showImagePreview(obj.name!, obj.imgUrl!)}>
                                <IonImg src={obj.imgUrl}></IonImg>
                            </IonThumbnail>
                            <IonLabel className="ion-text-wrap" id={"label" + obj.id}>
                                <h2><b>{obj.quantity}</b> x {obj.name}</h2>
                                {obj.deposit?.depositName && <p slot="end">{obj.deposit?.depositName}</p>}
                            </IonLabel>
                            <IonCheckbox checked={obj.picked} id={"checkbox" + obj.id} style={{ marginLeft: "0px", pointerEvents: "auto" }} slot="end" onIonChange={(event: any) => {
                                if (event.target.checked) {
                                    event.target.parentElement!.disabled = true;
                                    event.target.parentElement!.style.pointerEvents = 'auto';
                                    updateProduct(i, true)
                                } else {
                                    obj.picked = false
                                    updateProduct(i, false)
                                    event.target.parentElement!.disabled = false;
                                }
                            }}></IonCheckbox>
                        </IonItem>;
                    }
                    )}
                </IonList>

            </IonContent>

            <IonFooter>
                <IonGrid className="ion-no-margin ion-no-padding">

                </IonGrid>
            </IonFooter>
        </IonPage >
    );

}

export default OrderDetail