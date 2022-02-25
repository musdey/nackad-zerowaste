import React from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonRouterOutlet, IonIcon, IonLabel } from '@ionic/react';
import { useAuth } from '../lib/use-auth';
import { personCircle, logInOutline, logOutOutline } from 'ionicons/icons';
import { Redirect } from 'react-router';
import { menuController, MenuControllerI, MenuI } from '@ionic/core';


export const Menu: React.FC = () => {
    const { signin, signout, user, loggedIn } = useAuth();

    const logoutHandler = async () => {
        signout().then(async () => {
            const menu: HTMLElement & { toggle?: Function } = document.getElementById('first')!
            await menu.toggle!()
            const url = '/login'
            return <Redirect to={url} />
        })
    }

    const loginHandler = () => {
        const url = '/login'
        return <Redirect to={url} />
    }
    return (<>
        <IonMenu menuId="first" contentId='content1' side="start" id='first'>
            <IonHeader>
                <IonToolbar color="primary">
                    {loggedIn ? <IonTitle>Hi, {user?.firstName}</IonTitle>
                        :
                        <IonTitle>Please login</IonTitle>
                    }
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {loggedIn ?
                    <IonList>
                        <IonItem>
                            <IonIcon icon={personCircle} slot="start"></IonIcon>
                            <IonLabel>Userdetails anzeigen</IonLabel>
                        </IonItem>
                        <IonItem onClick={logoutHandler}>
                            <IonIcon icon={logOutOutline} slot="start"></IonIcon>
                            <IonLabel>Logout</IonLabel>
                        </IonItem>
                    </IonList>
                    : <IonList>
                        <IonItem onClick={loginHandler}>
                            <IonIcon icon={logInOutline} slot="start"></IonIcon>
                            <IonLabel>Login</IonLabel>
                        </IonItem>
                    </IonList>
                }
            </IonContent>
        </IonMenu>

        <IonRouterOutlet id="content1"></IonRouterOutlet>
    </>)
};