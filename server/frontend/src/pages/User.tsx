import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonInput, IonLabel, IonList, IonModal, IonPage, useIonToast } from "@ionic/react"
import { useEffect, useState } from "react";
import { Header } from "../components/Header"
import { useAuth, User } from "../lib/use-auth";
import api from '../lib/api'

const UserPage: React.FC = () => {

    const { user } = useAuth();
    const [modalOpen, setModalState] = useState(false)
    const [employees, setEmployees] = useState([])
    const [admins, setAdmins] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [searchString, setSearchString] = useState('')
    const [currentEmployee, setCurrentEmployee] = useState<User>()
    const [present] = useIonToast();


    const getEmployees = async function () {
        const employees = await api.getEmployees()
        if (employees !== undefined) {
            setEmployees(employees)
        }
    }
    const getAdmins = async function () {
        const admins = await api.getAdmins()
        if (admins !== undefined) {
            setAdmins(admins)
        }
    }

    useEffect(() => {
        getEmployees()
        getAdmins()
    }, [])

    const handleClick = (userId: User) => {
        setCurrentEmployee(userId)
        setModalState(true)
    }

    const makeAdmin = async () => {
        if (currentEmployee && currentEmployee.role.name === "EMPLOYEE") {
            const admin = await api.updateUserRole(currentEmployee._id, 'ADMIN')
            if (admin !== undefined) {
                await getEmployees()
                await present("Erfolgreich!", 2000)
                setModalState(false)
            }
        }
    }

    const makeEmployee = async () => {
        if (currentEmployee && currentEmployee.role.name !== "EMPLOYEE") {
            const admin = await api.updateUserRole(currentEmployee._id, 'EMPLOYEE')
            if (admin !== undefined) {
                await getEmployees()
                await present("Erfolgreich!", 2000)
                setModalState(false)
            }
        }
    }

    const searchUser = async () => {
        const user = await api.searchUser(searchString)
        if (user !== undefined) {
            setSearchResults(user)
            await present("Erfolgreich!", 2000)
        }
    }

    return (
        <IonPage>
            <IonModal isOpen={modalOpen}>
                <IonContent >
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle color="primary">
                                {currentEmployee?.firstName || ''} bearbeiten:
                            </IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            Name: {currentEmployee?.firstName || ''} {currentEmployee?.lastName || ''}<br></br>
                            Rolle: {currentEmployee?.role.name}
                        </IonCardContent>
                    </IonCard>
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle color="primary">
                                Zum Admin hochstufen
                            </IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonButton color="secondary" onClick={makeAdmin}>
                                ADMIN
                            </IonButton>
                        </IonCardContent>
                    </IonCard>
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle color="primary">
                                Zum Mitarbeiter stufen
                            </IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonButton color="secondary" onClick={makeEmployee}>
                                Mitarbeiter
                            </IonButton>
                        </IonCardContent>
                    </IonCard>
                    <IonButton expand="full" onClick={() => { setModalState(false) }}>Schließen  </IonButton>


                </IonContent>
            </IonModal>
            <Header subTitle="User" />
            <IonContent fullscreen>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle color="primary">
                            Hallo, {user?.firstName}
                        </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        Du hast diese Rolle: {user?.role.name}
                    </IonCardContent>
                </IonCard>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle >
                            Deine Mitarbeiter:
                        </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        {employees?.map((obj: any, i) =>
                            <div>
                                <IonLabel id={obj.shopifyUserId}>{obj.firstName} {obj.lastName} </IonLabel>
                                <IonButton onClick={(e) => {
                                    handleClick(obj)
                                }} color="secondary" slot="right">
                                    Anpassen
                                </IonButton></div>
                        )}
                    </IonCardContent>
                </IonCard>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle >
                            Deine Admins:
                        </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        {admins?.map((obj: any, i) =>
                            <div>
                                <IonLabel id={obj.shopifyUserId}>{obj.firstName} {obj.lastName}</IonLabel>
                                <IonButton hidden={user?._id === obj._id} onClick={(e) => {
                                    handleClick(obj)
                                }} color="secondary" slot="right">
                                    Anpassen
                                </IonButton></div>
                        )}
                    </IonCardContent>
                </IonCard>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle >
                            User suchen:
                        </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonInput placeholder="Suchanfrage.." type="text" onIonChange={(data) => { setSearchString(data.detail.value || '') }}>

                        </IonInput>
                        <IonList>
                            {searchResults?.map((obj: any, i) =>
                                <div id={"listid" + obj.shopifyUserId}>
                                    <IonLabel id={obj.shopifyUserId}>{obj.firstName} {obj.lastName} </IonLabel>
                                    <IonButton onClick={(e) => {
                                        handleClick(obj)
                                    }} color="secondary" slot="right">
                                        Anpassen
                                    </IonButton></div>
                            )}
                        </IonList>
                        <IonButton onClick={searchUser}>
                            Suchen
                        </IonButton>
                    </IonCardContent>

                </IonCard>


            </IonContent>
        </IonPage >
    )
}

export default UserPage