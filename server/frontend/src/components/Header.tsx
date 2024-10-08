import React, { useEffect, useState } from 'react';
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonMenuButton, IonIcon, IonButton } from '@ionic/react';
import { useAuth } from '../lib/use-auth';
import { logInOutline } from 'ionicons/icons';
import '../components/custom.css'
interface HeaderProps {
    subTitle: string
}

export const Header: React.FC<HeaderProps> = ({ subTitle }) => {

    const { loggedIn } = useAuth();
    return (
        <IonHeader id="headerId" >

            <IonToolbar color="primary">
                <IonButtons slot="start">
                    <IonBackButton disabled={window.location.pathname === "/login" || window.location.pathname === "/overview"} defaultHref='login' />
                </IonButtons>
                <IonTitle> {subTitle}</IonTitle>
                {loggedIn === true ?

                    <IonButtons slot="end">
                        <IonMenuButton>

                        </IonMenuButton>
                    </IonButtons>
                    :
                    <IonButtons slot="end">
                        <IonButton>
                            <IonIcon slot="icon-only" icon={logInOutline} />
                        </IonButton>
                    </IonButtons>
                }
            </IonToolbar>
        </IonHeader >
    )
}