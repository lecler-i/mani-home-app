import { AsyncStorage } from 'react-native';
import { observable, action, computed } from 'mobx';
import { Actions } from 'react-native-router-flux';

import api from '../utils/fetch';

class AppStore {
  @observable _authToken = null;
  @observable me = null;
  @observable loaded = false;

  @computed get loggedIn() {
    return !!this.authToken;
  }

  @computed 
  get authToken() {
    return this._authToken;
  }
  set authToken(val) {
    this._authToken = val;
    console.log('Updated token', val);
    if (!!val)
      AsyncStorage.setItem('@MySuperStore:authToken', this._authToken);
    else {
      AsyncStorage.removeItem('@MySuperStore:authToken');
    }
    if (!this._authToken) {
      Actions.auth();
    } else {
      this.fetchMe();
      Actions.home();
    }
  }

  @action
  async fetchMe() {
    if (!this.loggedIn) return;
    try {
      const {data} = await api('/me');
      this.me = data;
    } catch (e) {
      console.error(e);
    }
  }
}

const appStore = new AppStore();

AsyncStorage.getItem('@MySuperStore:authToken', (err, val) => {
  if (val) {
    appStore.authToken = val;
  }
  appStore.loaded = true;
  console.log('Got the auth', err, val);
});

export default appStore;
