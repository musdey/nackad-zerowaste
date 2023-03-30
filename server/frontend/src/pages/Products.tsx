import { IonButton, IonCard, IonCardContent, IonContent, IonPage, useIonToast } from '@ionic/react'
import { Header } from '../components/Header'
import apiObj from '../lib/api'

const Products: React.FC = () => {
  const [present] = useIonToast()

  const handleBtnClick = async () => {
    const result = await apiObj.updateProducts()
    if (result) {
      await present('Products updated successfully', 2000)
      return
    }
    await present('Products not updated', 2000)
  }

  return (
    <IonPage>
      <Header subTitle="Products Settings" />
      <IonContent fullscreen>
        <IonCard>
          <IonCardContent>
            <IonButton onClick={handleBtnClick}>Update Products</IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  )
}

export default Products
