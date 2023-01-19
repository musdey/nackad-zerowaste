import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTextarea,
  useIonToast,
} from '@ionic/react'
import { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import apiObj from '../lib/api'
import { useAuth } from '../lib/use-auth'

const SMSSettings: React.FC = () => {
  const { user, updateUserSMSMethod } = useAuth()
  const [smsContent, setSMSContent] = useState('')
  const [showBtn, setShowBtn] = useState(false)
  const [cloudSMS, setCloudSMS] = useState(user?.cloudSMS || false)

  const [present] = useIonToast()

  const onSegmentChanged = async (e: any) => {
    let selected
    if (e.target.value === 'own') {
      selected = false
    } else {
      selected = true
    }
    setCloudSMS(selected)
    updateUserSMSMethod(selected)
  }

  const handleSMSInput = async (text: string) => {
    setShowBtn(true)
    setSMSContent(text)
  }

  const handleBtnClick = async () => {
    const result = await apiObj.updateSMSSettings(smsContent)
    if (result) {
      user!.smsText = result.smsText
      await present('SMS Text aktualisiert!', 2000)
    }
    setShowBtn(false)
  }

  useEffect(() => {
    const fn = async () => {
      const data = await apiObj.getSMSSettings()
      setSMSContent(data.smsText || '')
    }
    fn()
  }, [])

  return (
    <IonPage>
      <Header subTitle='SMS Einstellungen' />
      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Zustellung</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonSegment color='primary' onIonChange={onSegmentChanged} value={cloudSMS ? 'cloud' : 'own'}>
              <IonSegmentButton color='primary' value='own' defaultChecked={!cloudSMS}>
                Mit eigener Nummer
              </IonSegmentButton>
              <IonSegmentButton color='secondary' value='cloud' defaultChecked={!cloudSMS} disabled={true}>
                Über Internet
              </IonSegmentButton>
            </IonSegment>
          </IonCardContent>
        </IonCard>
        {(user?.role.name === 'ADMIN' || user?.role.name === 'MANAGER') && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Inhalt der SMS für {user.mainShop.name}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonTextarea
                autoGrow={true}
                value={smsContent}
                onInput={(event: any) => {
                  handleSMSInput(event.target.value)
                }}
              ></IonTextarea>
              <IonButton onClick={handleBtnClick} style={{ float: 'right' }} hidden={!showBtn} disabled={!showBtn}>
                Speichern
              </IonButton>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  )
}

export default SMSSettings
