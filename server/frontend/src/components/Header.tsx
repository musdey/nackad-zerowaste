import React from 'react';
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonMenuButton, IonTabButton, IonIcon, IonButton } from '@ionic/react';
import { useAuth } from '../lib/use-auth';
import { personCircle, logInOutline } from 'ionicons/icons';
import '../components/custom.css'
interface HeaderProps {
    subTitle: string
}

export const Header: React.FC<HeaderProps> = ({ subTitle }) => {

    const { signin, signout, user, loggedIn } = useAuth();
    return (
        <IonHeader>
            <IonToolbar color="primary">
                {/* <IonTitle slot='start'>{loggedIn ? 'Hi, ' + user?.firstName : 'Login to continue..'}</IonTitle> */}
                <IonTitle slot=''> {subTitle}</IonTitle>
                {loggedIn === true ?
                    <IonButtons slot="end">
                        <IonButton>
                            <IonIcon slot="icon-only" icon={personCircle} />
                        </IonButton>
                    </IonButtons>
                    :
                    <IonButtons slot="end">
                        <IonButton>
                            <IonIcon slot="icon-only" icon={logInOutline} />
                        </IonButton>
                    </IonButtons>
                }

            </IonToolbar>

        </IonHeader>
    )
}