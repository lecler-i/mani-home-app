import React from 'react';
import { AsyncStorage } from 'react-native';
import { Actions, Scene, Router } from 'react-native-router-flux';
import { observer, Provider } from 'mobx-react';

import stores from './stores';

import MapScreen from './screens/Map';
import AccommodationListScreen from './screens/AccommodationListScreen';
import Login from './screens/Login';
import SplashScreen from './screens/SplashScreen';
import FiltersScreen from './screens/FiltersScreen';

import NavigationDrawer from './components/NavigationDrawer';


import DrawerButton from './components/NavigationDrawer/DrawerButton';

import './i18n';

const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
  const style = {
    flex: 1,
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  };
  if (computedProps.isActive) {
    style.marginTop = computedProps.hideNavBar ? 0 : 55;
  }
  return style;
};

const scenes = Actions.create((
  <Scene key="root">
    <Scene key="splashscreen" hideNavBar component={SplashScreen} type="reset" initial />

    <Scene key="auth" component={Login} hideNavBar type="reset" />
    <Scene key="map" component={MapScreen} />
    <Scene key="filters" component={FiltersScreen} />

    <Scene key="drawer" component={NavigationDrawer} open={false} type="reset" >
      <Scene key="withNavbar" >
        <Scene key="home" component={AccommodationListScreen} type="reset" renderLeftButton={() => <DrawerButton />} />
      </Scene>
    </Scene>
  </Scene>
));

@observer
class App extends React.Component {
  render() {
    return (
      <Provider {...stores}>
        <Router scenes={scenes} getSceneStyle={getSceneStyle} />
      </Provider>
    );
  }
}

AsyncStorage.getItem('@MySuperStore:authToken', async (err, val) => {
  if (val) {
    await stores.authStore.login(val);
    console.log('Loaded...');
  }
  stores.appStore.loaded = true;
});


export default App;
