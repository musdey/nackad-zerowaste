import { Redirect, Route } from 'react-router-dom'
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import Login from './pages/Login'
import Deposit from './pages/Deposit'
import Overview from './pages/Overview'
import Images from './pages/Images'
import { ProvideAuth } from './lib/use-auth'
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
import './theme/variables.css'
import './theme/custom.css'
import Order from './pages/Order'
import { Menu } from './components/Menu'
import Signup from './pages/Signup'
import UserPage from './pages/User'
import Settings from './pages/Settings'
import Statistics from './pages/Statistics'
import OrderDetail from './pages/OrderDetail'
import CustomerDetail from './pages/CustomerDetail'
import DepositDetail from './pages/DepositDetail'
import DeliverySlots from './pages/DeliverySlots'
import ResetPWRequest from './pages/ResetPWRequest'
import ResetPWSet from './pages/ResetPWSet'
import SMSSettings from './pages/SMSSettings'
import React from 'react'
import { DeliveriesProvider } from './lib/deliveryContext'
import { AccordionProvider } from './lib/accordionContext'
setupIonicReact()

const App: React.FC = () => {
  const [deliveries, setDeliveries] = React.useState([])
  const [searchText, setSearchText] = React.useState('')
  const [isSearch, setSearch] = React.useState(false)
  const [currentAccordion, setCurrentAccordion] = React.useState({ group1: '', group2: '' })

  return (
    <IonApp>
      <IonReactRouter>
        {/* <IonRouterOutlet animated={false} animation={undefined}> */}
        <ProvideAuth>
          <DeliveriesProvider value={{ deliveries, setDeliveries, isSearch, setSearch, searchText, setSearchText }}>
            <AccordionProvider value={{ currentAccordion, setCurrentAccordion }}>
              <Menu />
              <Route path="/" exact={true}>
                <Redirect to="/overview" />
              </Route>
              <Route path="/login" component={Login} exact />
              <Route path="/requestpw" component={ResetPWRequest} exact />
              <Route path="/resetpw/:token" component={ResetPWSet} exact />
              <Route path="/user" component={UserPage} exact />
              <Route path="/settings" component={Settings} exact />
              <Route path="/smssettings" component={SMSSettings} exact />
              <Route path="/statistics" component={Statistics} exact />
              <Route path="/deliveryslots" component={DeliverySlots} exact />
              <Route path="/signup" component={Signup} exact />
              <Route path="/overview" component={Overview} exact />
              <Route path="/order/:orderId" component={Order} exact />
              <Route path="/deposit/:userId" component={Deposit} exact />
              <Route path="/depositdetail/:depositId" component={DepositDetail} exact />
              <Route path="/orderdetail/:webShopOrderId" component={OrderDetail} exact />
              <Route path="/customerdetail/:webShopOrderId" component={CustomerDetail} exact />
              <Route path="/images/:deliveryId" component={Images} exact />
            </AccordionProvider>
          </DeliveriesProvider>
        </ProvideAuth>
        {/* </IonRouterOutlet> */}
      </IonReactRouter>
    </IonApp >
  )
}

export default App
