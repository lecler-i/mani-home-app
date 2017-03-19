import { AsyncStorage } from 'react-native';
import { observable, action, computed } from 'mobx';
import { Actions } from 'react-native-router-flux';
import Auth0 from 'react-native-auth0';

import authStore from './AuthStore';

import api from '../utils/fetch';

class AppStore {
   @observable loaded = false;

   @computed
   get me() {
      return authStore.me;
   }
}

const appStore = new AppStore();

export default appStore;
