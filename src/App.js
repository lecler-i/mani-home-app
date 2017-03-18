import React from 'react';
import { Actions, Scene, Router } from 'react-native-router-flux';
import { observer, Provider } from 'mobx-react';

import MapScreen from './screens/Map';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import PasswordReset from './components/PasswordReset';
import SplashScreen from './components/SplashScreen';

import appStore from './stores/AppStore';
import theme from './theme';

import './i18n';

const scenes = Actions.create(
  <Scene key='root' theme={theme} >
    <Scene key='splashscreen' hideNavBar component={SplashScreen} type='reset' initial />

    <Scene key='auth' hideNavBar type='reset' >
      <Scene key='login' component={Login}/>
      <Scene key='register' component={Register}/>
      <Scene key='passwordReset' component={PasswordReset}/>
    </Scene>

    <Scene key='home' component={MapScreen} type='reset' />
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
