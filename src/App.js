import React from 'react';
import { AsyncStorage } from 'react-native';
import { Actions, Scene, Router } from 'react-native-router-flux';
import { observer, Provider } from 'mobx-react';

import stores from './stores';

import MapScreen from './screens/Map';
import AccommodationListScreen from './screens/AccommodationListScreen';
import AccommodationDetails from './screens/AccommodationDetails';

import Login from './screens/Login';
import SplashScreen from './screens/SplashScreen';
import FiltersScreen from './screens/FiltersScreen';
import CreateAccommdationScreen from './screens/CreateAccommodationScreen';
import ChatRoomListScreen from './screens/ChatRoomListScreen';

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
    <Scene key="create_accommodation" component={CreateAccommdationScreen} />
    <Scene key="chat_room_list" component={ChatRoomListScreen} >
      <div>

      </div>
    </Scene>


    <Scene key="drawer" component={NavigationDrawer} open={false} type="reset" >
      <Scene key="withNavbar" >
        <Scene key="home" component={AccommodationListScreen} type="reset" renderLeftButton={() => <DrawerButton />} />
      </Scene>
    </Scene>

    <Scene key="accommodation_details" hideNavBar component={AccommodationDetails} />
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

AsyncStorage.getItem('@MySuperStore:me', async (err, val) => {
  const me = val ? JSON.parse(val) : null;
  AsyncStorage.getItem('@MySuperStore:authToken', async (err, val) => {
    if (val) {
      if (!me) {
        await stores.authStore.login(val);
      } else {
        stores.authStore.me = me;
        stores.authStore.login(val).then(() => {});
      }
      console.log('Loaded...');
    }
    stores.appStore.loaded = true;
  });
});

export default App;
