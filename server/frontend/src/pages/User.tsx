import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, useIonToast } from "@ionic/react"
import { useEffect, useState } from "react";
import { Header } from "../components/Header"
import { useAuth, User } from "../lib/use-auth";
import api from '../lib/api'

const UserPage: React.FC = () => {

    const { user } = useAuth();
    const [modalOpen, setModalState] = useState(false)
    const [employees, setEmployees] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [searchString, setSearchString] = useState('')
    const [pin, setPin] = useState('')
    const [currentEmployee, setCurrentEmployee] = useState<User>()
    const [present] = useIonToast();


    const getEmployees = async function () {
        const employees = await api.getEmployees()
        if (employees !== undefined) {
            setEmployees(employees)
        }
    }

    useEffect(() => {
        getEmployees()
    }, [])

    const handleClick = (userId: User) => {
        setCurrentEmployee(userId)
        setModalState(true)
    }

    const makeManager = async () => {
        if (currentEmployee && currentEmployee.role.name === "EMPLOYEE") {
            const admin = await api.updateUserRole(currentEmployee._id, 'MANAGER')
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

    const makeStandardUser = async () => {
        if (currentEmployee && currentEmployee.role.name !== "EMPLOYEE") {
            const admin = await api.updateUserRole(currentEmployee._id, 'CUSTOMER')
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

    const createPin = async () => {
        const pin = await api.createPin()
        if (pin !== undefined) {
            setPin(pin.pin)
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
                    <IonCard disabled={currentEmployee?.role.name === "MANAGER"}>
                        <IonCardHeader>
                            <IonCardTitle color="primary">
                                Zum Manager hochstufen
                            </IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonButton color="secondary" onClick={makeManager}>
                                Manager
                            </IonButton>
                        </IonCardContent>
                    </IonCard>
                    <IonCard disabled={currentEmployee?.role.name === "EMPLOYEE"}>
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
                    <IonCard disabled={currentEmployee?.role.name === "CUSTOMER"}>
                        <IonCardHeader>
                            <IonCardTitle color="primary">
                                Berechtigungen entziehen
                            </IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonButton color="secondary" onClick={makeStandardUser}>
                                keine Berechtigung
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
                {(user?.role.name === "MANAGER" || user?.role.name === "ADMIN") &&
                    <><IonCard>
                        <IonCardHeader>
                            <IonCardTitle >
                                Pin für neuen MA erstellen
                            </IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonItem lines="none">

                                <IonLabel> {pin && "Pin:"}<b> {pin}</b> </IonLabel>
                                <IonButton onClick={(e) => {
                                    createPin()
                                }} color="primary">
                                    Erstellen
                                </IonButton>
                            </IonItem>
                        </IonCardContent>
                    </IonCard>
                        <IonCard>
                            <IonCardHeader>
                                <IonCardTitle >
                                    Deine Mitarbeiter:innen:
                                </IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                {employees?.map((obj: any, i) =>
                                    <IonItem id={obj.shopifyUserId + "div"} lines="inset">
                                        <IonLabel id={obj.shopifyUserId}>{obj.firstName} {obj.lastName} ({obj.role.name}) </IonLabel>
                                        <IonButton onClick={(e) => {
                                            handleClick(obj)
                                        }} color="secondary">
                                            Anpassen
                                        </IonButton>
                                    </IonItem>
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
                                <IonItem>
                                    <IonInput placeholder="Suchanfrage.." type="text" onIonChange={(data) => { setSearchString(data.detail.value || '') }}>

                                    </IonInput>
                                    <IonButton disabled={searchString.length === 0} onClick={searchUser}>
                                        Suchen
                                    </IonButton>
                                </IonItem>

                                <IonList>
                                    {searchResults?.map((obj: any, i) =>
                                        <IonItem id={"listid" + obj.shopifyUserId}>
                                            <IonLabel id={obj.shopifyUserId}>{obj.firstName} {obj.lastName} </IonLabel>
                                            <IonButton onClick={(e) => {
                                                handleClick(obj)
                                            }} color="secondary">
                                                Anpassen
                                            </IonButton>
                                        </IonItem>
                                    )}
                                </IonList>
                            </IonCardContent>

                        </IonCard>
                    </>}

            </IonContent>
        </IonPage >
    )
}

export default UserPage