import React from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonRouterOutlet, IonIcon, IonLabel } from '@ionic/react';
import { useAuth } from '../lib/use-auth';
import { personCircle, logInOutline, logOutOutline, settingsOutline, barChartSharp, trailSignOutline } from 'ionicons/icons';
import { Redirect, useHistory } from 'react-router';

export const Menu: React.FC = () => {
    const { signout, user, loggedIn } = useAuth();
    const history = useHistory()

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

    const userHandler = async () => {
        const menu: HTMLElement & { toggle?: Function } = document.getElementById('first')!
        await menu.toggle!()
        await history.push('/user')
    }

    const settignsHandler = async () => {
        const menu: HTMLElement & { toggle?: Function } = document.getElementById('first')!
        await menu.toggle!()
        await history.push('/settings')
    }

    const statisticsHandler = async () => {
        const menu: HTMLElement & { toggle?: Function } = document.getElementById('first')!
        await menu.toggle!()
        await history.push('/statistics')
    }

    const deliverySlotHandler = async () => {
        const menu: HTMLElement & { toggle?: Function } = document.getElementById('first')!
        await menu.toggle!()
        await history.push('/deliveryslots')
    }

    return (<>
        <IonMenu menuId="first" contentId='content1' side="start" id='first'>
            <IonHeader>
                <IonToolbar color="primary">
                    {loggedIn ? <IonTitle>Hi, {user?.firstName || "No user."}</IonTitle>
                        :
                        <IonTitle>Please login</IonTitle>
                    }
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {loggedIn ?
                    <IonList>
                        <IonItem onClick={userHandler}>
                            <IonIcon icon={personCircle} slot="start"></IonIcon>
                            <IonLabel>Userdetails anzeigen</IonLabel>
                        </IonItem>
                        {user?.role.name === "ADMIN" &&
                            <IonItem onClick={settignsHandler}>
                                <IonIcon icon={settingsOutline} slot="start"></IonIcon>
                                <IonLabel>Einstellungen anzeigen</IonLabel>
                            </IonItem>
                        }
                        {user?.role.name === "ADMIN" &&
                            <IonItem onClick={statisticsHandler}>
                                <IonIcon icon={barChartSharp} slot="start"></IonIcon>
                                <IonLabel>Statistiken anzeigen</IonLabel>
                            </IonItem>
                        }
                        {user?.role.name === "ADMIN" &&
                            <IonItem onClick={deliverySlotHandler}>
                                <IonIcon icon={trailSignOutline} slot="start"></IonIcon>
                                <IonLabel>Lieferslots bearbeiten</IonLabel>
                            </IonItem>
                        }
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