/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import {
  IonContent,
  IonPage,
  IonFooter,
  IonGrid,
  IonList,
  useIonToast,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
  IonLabel,
  IonCard,
  IonSearchbar,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonAccordionGroup,
  IonAccordion,
  IonItem,
} from '@ionic/react'
import { useAuth } from '../lib/use-auth'
import { Redirect } from 'react-router'
import { Header } from '../components/Header'
import OverviewListItem from '../components/OverviewListItem'
import api from '../lib/api'
import { isDayAfterTomorrow, isToday, isTomorrow } from '../lib/helper'
import DeliveriesContext from '../lib/deliveryContext'
import AccordionContext from '../lib/accordionContext'

const Overview: React.FC = () => {
  const { deliveries, setDeliveries, isSearch, setSearch, searchText, setSearchText } = useContext(DeliveriesContext)
  const { currentAccordion } = useContext(AccordionContext)
  const { signout, loggedIn } = useAuth()
  const [present] = useIonToast()

  const updateData = async () => {
    if (!loggedIn) {
      return
    }
    const result = await api.getCurrentDeliveries()
    if (result.success) {
      setDeliveries(result.data)
      localStorage.setItem('lastUpdate', new Date().toISOString())
    } else {
      if (result.data === 'Unauthorized') {
        await signout()
      } else {
        await present(result.data, 4000)
      }
    }
  }

  const doRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    if (!isSearch) {
      await updateData()
      setTimeout(() => {
        event.detail.complete()
      }, 1000)
    } else {
      event.detail.complete()
    }
  }

  useEffect(() => {
    localStorage.removeItem('order')
    async function doIt() {
      if (!isSearch) {
        if (localStorage.getItem('lastUpdate')) {
          const lastUpdateString = localStorage.getItem('lastUpdate') || ''
          if (lastUpdateString === '') {
            await updateData()
          } else {
            const lastUpdate = new Date(lastUpdateString)
            const now = new Date()
            const diff = Math.abs(now.getTime() - lastUpdate.getTime())
            const diffMinutes = Math.ceil(diff / (1000 * 60))
            if (diffMinutes > 5) {
              await updateData()
            } else {
              if (deliveries) {
                const outerAccordion = document.getElementById("outeraccordion") as any
                if (currentAccordion && outerAccordion) {
                  const valueToSet = currentAccordion.deliveryDayGroup.split("T")[0] + "-day"
                  outerAccordion.value = [valueToSet]
                  setTimeout(() => {
                    let innerAccordion = document.getElementById(currentAccordion.deliveryDayGroup.split("T")[0] + "-vehicle") as any
                    if (innerAccordion) {
                      const value = currentAccordion.deliveryDayGroup.split("T")[0] + "-" + currentAccordion.vehicleGroup
                      innerAccordion.value = [value]
                    }
                  }, 100)

                }
              } else {
                await updateData()
              }
            }
          }
        } else {
          await updateData()
        }
      }
    }
    doIt()
  }, [])

  if (!loggedIn) {
    const url = '/login'
    return <Redirect to={url} />
  }

  const searchChanged = async function (event: any) {
    if (event.target.value === '') {
      setSearchText('')
      setDeliveries([])
      setSearch(false)
      await updateData()
    } else {
      const result = await api.searchDelivery(event.target.value)
      setSearchText(event.target.value)
      setDeliveries([])
      setSearch(true)
      setDeliveries(result)
    }
  }

  const updateDeliveryStatus = async (dayIndex: number, vehicleIndex: number, index: number, id: string, status: 'OPEN' | 'PACKED' | 'DELIVERED') => {
    await api.updateDeliveryStatus(id, status)
    await document.querySelector('ion-item-sliding')?.closeOpened()
    const values: any = [...deliveries]
    values[dayIndex].vehicles[vehicleIndex].deliveries[index].status = status
    setDeliveries(values)
  }

  return (
    <IonPage>
      <Header subTitle='Übersicht Lieferung/Abholung' />
      <IonContent fullscreen>
        <IonRefresher color='grey' slot='fixed' pullFactor={0.5} pullMin={100} pullMax={200} onIonRefresh={doRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonSearchbar animated debounce={750} onIonChange={searchChanged} value={searchText}></IonSearchbar>
        {deliveries.length === 0 && (
          <IonList>
            <IonCard>
              <IonLabel>Keine aktuellen Lieferungen!</IonLabel>
            </IonCard>
          </IonList>
        )}
        {isSearch ? (
          <IonList>
            {deliveries.sort((a: any, b: any) => {
              if (a && b && a.deliverySlot && b.deliverySlot) {
                if (a.deliverySlot.deliveryDay < b.deliverySlot.deliveryDay) {
                  return 1
                } else {
                  return -1
                }
              } else {
                return 0
              }
            }).map((obj: any, index: any) => (
              <IonItemSliding slot="content" key={index}>
                <IonItemOptions id={'slider-' + obj._id + '-top'} side='start'>
                  <IonItemOption color='primary'>
                    Offen
                  </IonItemOption>
                </IonItemOptions>
                <OverviewListItem
                  smsSent={obj.smsSent || false}
                  type={obj.type}
                  key={obj.shopifyOrder || obj.webShopOrder || ''}
                  firstName={(obj.type === 'DELIVERY' ? obj.address?.first_name : obj.user.firstName) || 'First Name'}
                  lastName={(obj.type === 'DELIVERY' ? obj.address?.last_name : obj.user.lastName) || 'Last Name'}
                  address={{
                    address1: obj.address?.address1 || '',
                    address2: obj.address?.address2 || '',
                    zip: obj.address?.zip || '',
                    city: obj.address?.city || '',
                  }}
                  vehicleId={''}
                  orderId={obj.webShopOrder || obj.shopifyOrder || ''}
                  deliveryStatus={obj.status || 'OPEN'}
                  timeslot={obj.deliverySlot?.slotHours || obj.slotHours || 'unknown'}
                  deliveryDay={obj.deliverySlot?.deliveryDay || obj.deliveryDay || 'unknown'}
                  user={obj.user || {}}
                  deliveryId={obj._id || ''}
                ></OverviewListItem>
                <IonItemOptions side='end'>
                  <IonItemOption
                    id={'slider-' + obj._id + '-top'}
                    color='danger'
                  >
                    Verpackt
                  </IonItemOption>
                  <IonItemOption
                    id={'slider-' + obj._id + '-top'}
                    color='secondary'
                  >
                    Zugestellt
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            ))}
          </IonList>)
          : (
            <IonAccordionGroup multiple={true} id="outeraccordion" animated={false}>
              {deliveries.map((deliveryDay: any, dayIndex: any) => (
                <IonAccordion value={deliveryDay.vehicles[0].deliveries[0].deliverySlot.deliveryDay.split("T")[0] + "-day"} key={dayIndex}>
                  <IonItem slot="header" color="tertiary">
                    <IonLabel >
                      {isToday(new Date(deliveryDay.vehicles[0].deliveries[0].deliverySlot.deliveryDay)) && (
                        <p style={{ color: 'green' }}>
                          {' '}
                          <b> Heute </b>
                        </p>
                      )}

                      {isTomorrow(new Date(deliveryDay.vehicles[0].deliveries[0].deliverySlot.deliveryDay)) && (
                        <p style={{ color: 'red' }}>
                          {' '}
                          <b> Morgen </b>
                        </p>
                      )}

                      {isDayAfterTomorrow(new Date(deliveryDay.vehicles[0].deliveries[0].deliverySlot.deliveryDay)) && (
                        <p style={{ color: 'red' }}>
                          {' '}
                          <b> Übermorgen </b>
                        </p>
                      )}

                      <p>{new Date(deliveryDay.vehicles[0].deliveries[0].deliverySlot.deliveryDay).toLocaleDateString()}</p>
                    </IonLabel>
                  </IonItem>

                  <IonAccordionGroup multiple={true} slot="content" id={deliveryDay.deliveryDay.split("T")[0] + "-vehicle"} animated={false}>
                    {deliveryDay.vehicles.map((vehicle: any, vehicleIndex: any) => (
                      <IonAccordion value={deliveryDay.deliveryDay.split("T")[0] + "-" + vehicle.vehicleId} key={vehicle + vehicleIndex} >
                        <IonItem slot='header' color="light">
                          <IonLabel>{vehicle.vehicleId}</IonLabel>
                        </IonItem>
                        {vehicle.deliveries.map((obj: any, index: any) => (
                          <IonItemSliding slot="content" key={index}>
                            <IonItemOptions id={'slider-' + obj._id + '-top'} side='start'>
                              <IonItemOption onClick={() => updateDeliveryStatus(dayIndex, vehicleIndex, index, obj._id, 'OPEN')} color='primary'>
                                Offen
                              </IonItemOption>
                            </IonItemOptions>
                            <OverviewListItem
                              smsSent={obj.smsSent || false}
                              type={obj.type}
                              key={obj.shopifyOrder || obj.webShopOrder || ''}
                              firstName={(obj.type === 'DELIVERY' ? obj.address?.first_name : obj.user.firstName) || 'First Name'}
                              lastName={(obj.type === 'DELIVERY' ? obj.address?.last_name : obj.user.lastName) || 'Last Name'}
                              address={{
                                address1: obj.address?.address1 || '',
                                address2: obj.address?.address2 || '',
                                zip: obj.address?.zip || '',
                                city: obj.address?.city || '',
                              }}
                              vehicleId={vehicle.vehicleId || ''}
                              orderId={obj.webShopOrder || obj.shopifyOrder || ''}
                              deliveryStatus={obj.status || 'OPEN'}
                              timeslot={obj.deliverySlot?.slotHours || obj.slotHours || 'unknown'}
                              deliveryDay={obj.deliverySlot?.deliveryDay || obj.deliveryDay || 'unknown'}
                              user={obj.user || {}}
                              deliveryId={obj._id || ''}
                            ></OverviewListItem>
                            <IonItemOptions side='end'>
                              <IonItemOption
                                id={'slider-' + obj._id + '-top'}
                                onClick={() => updateDeliveryStatus(dayIndex, vehicleIndex, index, obj._id, 'PACKED')}
                                color='danger'
                              >
                                Verpackt
                              </IonItemOption>
                              <IonItemOption
                                id={'slider-' + obj._id + '-top'}
                                onClick={() => updateDeliveryStatus(dayIndex, vehicleIndex, index, obj._id, 'DELIVERED')}
                                color='secondary'
                              >
                                Zugestellt
                              </IonItemOption>
                            </IonItemOptions>
                          </IonItemSliding>
                        ))}

                      </IonAccordion>
                    ))}
                  </IonAccordionGroup>
                </IonAccordion>
              ))}
            </IonAccordionGroup>)}
      </IonContent>
      <IonFooter>
        <IonGrid className='ion-no-margin ion-no-padding'></IonGrid>
      </IonFooter>
    </IonPage >
  )
}

export default Overview
