import React from 'react';
import { Actions, Scene, Router } from 'react-native-router-flux';
import { observer, Provider } from 'mobx-react';

import MapScreen from './screens/Map';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import PasswordReset from './components/PasswordReset';
import SplashScreen from './components/SplashScreen';

import NavigationDrawer from './components/NavigationDrawer';
import DrawerButton from './components/NavigationDrawer/DrawerButton';

import appStore from './stores/AppStore';
import theme from './theme';

import './i18n';

const scenes = Actions.create(
  <Scene key='root' theme={theme} hideNavBar>
    <Scene key='splashscreen' hideNavBar component={SplashScreen} type='reset' initial/>

    <Scene key='auth' component={Login} type='reset' />

    <Scene key='drawer' component={NavigationDrawer} open={false} type='reset' >
      <Scene key='withNavbar' >
        <Scene key='home' component={MapScreen} type='reset' renderLeftButton={() => <DrawerButton />}/>
      </Scene>
    </Scene>

  </Scene>
);

const stores = {
  appStore: appStore,
}

@observer
class App extends React.Component {
  
  static childContextTypes = {
    theme: React.PropTypes.object,
  };

  getChildContext() {
    return { theme };
  }

  render() {
    return (
      <Provider {...stores} theme={theme}>
        <Router scenes={scenes}/>
      </Provider>
    );
  }
}

export default App
