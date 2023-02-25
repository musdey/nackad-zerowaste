/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import {
  IonButton,
  IonContent,
  IonPage,
  IonFooter,
  IonGrid,
  IonList,
  IonCard,
  IonCardContent,
  IonItem,
  IonText,
  IonRow,
  IonLabel,
  IonIcon,
} from '@ionic/react'
import { useAuth } from '../lib/use-auth'
import { Redirect, useHistory, useParams } from 'react-router'
import { Header } from '../components/Header'
import { UserOrderProp } from '../lib/types'
import { cubeOutline, newspaperOutline, personCircleOutline, mailOutline, arrowUpCircleOutline } from 'ionicons/icons'

const Order: React.FC = (props) => {
  const history = useHistory()
  const params = useParams<{ orderId: string }>()
  const { loggedIn, user } = useAuth()
  const [order, setOrder] = useState({
    smsSent: false,
    firstName: 'No',
    lastName: 'data',
    deliveryStatus: 'OPEN',
    timeslot: '',
    address: {
      address1: '',
      address2: '',
      zip: '',
      city: '',
    },
    deliveryDay: '',
    userId: { _id: '' },
    orderId: '',
    type: '',
    deliveryId: '',
    user: {
      _id: '',
      phoneNumber: '',
      address: {
        address1: '',
        address2: '',
        city: '',
        zip: '',
        province: '',
        email: '',
        emailIsVerified: false,
        firstName: '',
        lastName: '',
        webShopUserId: '',
        _id: '',
        shopifyUserId: '',
      },
    },
  })

  useEffect(() => {
    const data: UserOrderProp = props
    if (data?.location?.state?.state) {
      setOrder(data!.location!.state!.state!)
    } else {
      const cachedOrder = localStorage.getItem('order')
      if (cachedOrder) {
        setOrder(JSON.parse(cachedOrder))
      }
    }
  }, [])

  if (!loggedIn) {
    const url = '/login'
    return <Redirect to={url} />
  }

  const handleSMSClick = () => {
    const data = encodeURI('This is a test sms')
  }

  const handleOrderDetail = () => {
    history.push('/orderdetail/' + params.orderId, {
      state: order,
    })
  }

  const handleCustomerDetail = () => {
    history.push('/customerdetail/' + params.orderId, {
      state: order,
    })
  }

  const handleDepositDetail = () => {
    localStorage.setItem('order', JSON.stringify(order))
    history.push('/deposit/' + order.user._id, {
      state: order,
    })
  }

  const handleImagesDetail = () => {
    history.push('/images/' + order.deliveryId)
  }

  function containsNumbers(str: string) {
    return /\d/.test(str)
  }

  return (
    <IonPage>
      <Header subTitle={'Bestellung ' + order.orderId} />
      <IonContent fullscreen>
        <IonCard>
          <IonCardContent>
            <IonItem>
              <IonGrid>
                <IonRow>
                  <IonText>
                    <b>
                      {order.firstName} {order.lastName}
                    </b>
                  </IonText>
                </IonRow>
                <IonRow>
                  <IonText> {order.type === 'PICKUP' ? 'ABHOLUNG' : 'ZUSTELLUNG'}</IonText>
                </IonRow>
                <br></br>
                <IonRow>
                  <IonText>Datum {new Date(order.deliveryDay).toLocaleDateString()}</IonText>
                </IonRow>

                <IonRow>
                  <IonText color='secondary'>Zeitslot {order.timeslot}</IonText>
                </IonRow>
                <IonRow>
                  <IonText>Status {order.deliveryStatus}</IonText>
                </IonRow>
                <br></br>
                <IonRow>
                  <IonText>{order.address?.address1}</IonText>
                </IonRow>

                {order.address?.address2 ?? (
                  <IonRow>
                    <IonText>{order.address?.address2}</IonText>
                  </IonRow>
                )}

                <IonRow>
                  <IonText>
                    {order.address?.zip} {order.address?.city}
                  </IonText>
                </IonRow>
                <IonRow>
                  <IonButton
                    onClick={() => {
                      let street = order.address.address1.split('/')[0].replace('ß', 'ss')
                      if (!containsNumbers(street)) {
                        street = street + ' ' + order.address.address2
                        street = street.split('/')[0]
                      }
                      const totalAddress = street + ', ' + order.address.zip + ' ' + order.address.city
                      const add =
                        'https://www.google.com/maps/dir/?api=1&destination=' +
                        encodeURI(totalAddress) +
                        '&dir_action=navigate'
                      window.open(add)
                    }}
                  >
                    {' '}
                    Navigiere{' '}
                  </IonButton>
                </IonRow>
              </IonGrid>
            </IonItem>
          </IonCardContent>
        </IonCard>
        <IonList>
          <IonItem lines='full' onClick={handleOrderDetail}>
            <IonIcon icon={newspaperOutline} slot='start'></IonIcon>
            <IonLabel>Bestelldetails anzeigen</IonLabel>
          </IonItem>
          <IonItem lines='full' onClick={handleCustomerDetail}>
            <IonIcon icon={personCircleOutline} slot='start'></IonIcon>
            <IonLabel>Kundendaten anzeigen</IonLabel>
          </IonItem>
          <IonItem lines='full' onClick={handleDepositDetail}>
            <IonIcon icon={cubeOutline} slot='start'></IonIcon>
            <IonLabel>Pfand anzeigen</IonLabel>
          </IonItem>
          <IonItem
            href={`sms://${order.user.phoneNumber};?&body=${encodeURI(user!.smsText)}`}
            lines='full'
            onClick={handleSMSClick}
          >
            <IonIcon icon={mailOutline} slot='start'></IonIcon>
            <IonLabel>SMS senden</IonLabel>
          </IonItem>
          <IonItem lines="full" onClick={handleImagesDetail}>
            <IonIcon icon={arrowUpCircleOutline} slot="start"></IonIcon>
            <IonLabel>Upload images</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>

      <IonFooter>
        <IonGrid className='ion-no-margin ion-no-padding'></IonGrid>
      </IonFooter>
    </IonPage>
  )
}

export default Order
