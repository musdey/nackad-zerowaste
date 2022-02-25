import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Login from './pages/Login';
import Deposit from './pages/Deposit';
import Overview from './pages/Overview'
import { ProvideAuth } from './lib/use-auth'
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/custom.css'
import OrderDetail from './pages/OrderDetail';
import { Menu } from './components/Menu';
import Signup from './pages/Signup';
import User from './pages/User';
setupIonicReact();

const App: React.FC = () => {

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <ProvideAuth>
            <Menu />
            <Route path="/" exact={true}>
              <Redirect to="/overview" />
            </Route>
            <Route path="/home" exact={true}>
              <Home />
            </Route>
            <Route path="/login" component={Login} exact />
            <Route path="/user" component={User} exact />
            <Route path="/signup" component={Signup} exact />
            <Route path="/overview" component={Overview} exact />
            <Route path="/order/:orderId" component={OrderDetail} />
            <Route path="/deposit/:depositId" component={Deposit} exact />

          </ProvideAuth>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>

  )
};

export default App;
