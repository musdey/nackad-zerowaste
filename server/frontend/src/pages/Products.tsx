import { IonButton, IonCard, IonCardContent, IonContent, IonPage, useIonToast } from '@ionic/react'
import { Header } from '../components/Header'
import apiObj from '../lib/api'

const Products: React.FC = () => {
  const [present] = useIonToast()

  const handleBtnClick = async () => {
    const result = await apiObj.updateProducts()
    if (result) {
      await present('Produkte wurden erfolgreich aktualisiert!', 2000)
      return
    }
    await present('Produkte wurden NICHT aktualisiert!', 2000)
  }

  return (
    <IonPage>
      <Header subTitle="Produkteinstellungen" />
      <IonContent fullscreen>
        <IonCard>
          <IonCardContent>
            <IonButton onClick={handleBtnClick}>Produktliste aktualisieren</IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  )
}

export default Products
