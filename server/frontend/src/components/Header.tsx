import React from 'react';
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonMenuButton, IonTabButton, IonIcon, IonButton } from '@ionic/react';
import { useAuth } from '../lib/use-auth';
import { personCircle, search, ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons';
export const Header: React.FC = () => {

    const { signin, signout, user, loggedIn } = useAuth();

    return (
        <IonHeader>
            <IonToolbar color="primary">
                <IonButtons slot="secondary">
                    <IonButton>
                        <IonIcon slot="icon-only" icon={personCircle} />
                    </IonButton>

                </IonButtons>
                <IonTitle>{loggedIn ? 'Hi, ' + user?.firstName : 'Login to continue..'}</IonTitle>
            </IonToolbar>

            {/* <IonToolbar>
                <IonTitle>Subheader</IonTitle>
            </IonToolbar> */}
        </IonHeader>
    )
}