import { AsyncStorage } from 'react-native';
import { observable, action, computed } from 'mobx';
import { Actions } from 'react-native-router-flux';
import Auth0 from 'react-native-auth0';

import api from '../utils/fetch';

class AppStore {
  @observable _authToken = null;
  @observable me = null;
  @observable loaded = false;
  @observable auth0 = new Auth0('lecler-i.auth0.com');

  @computed get loggedIn() {
    return !!this.authToken && !!this.me;
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
    if (this.fetchMe()) {
      //Actions.home();
    } else {
      //Actions.auth();
    }
  }

  @action
  async fetchMe() {
    if (!this.authToken)
      return false;
    console.log("Trying to get profile");
    try {
      this.loaded = false;
      const profile = await this.auth0
        .authentication('WtBYagql92oaE6fhJ1r6jeJFzmMiH9cM')
        .tokenInfo(this.authToken);
      this.me = profile;
      this.loaded = true;
      return true;
    } catch (e) {
      console.error('ERROR', e);
      return false;
    }
  }
}

const appStore = new AppStore();

AsyncStorage.getItem('@MySuperStore:authToken', (err, val) => {
  if (val) {
    appStore.authToken = val;
    
  } else {
    appStore.loaded = true;
  }
  console.log('Got the auth', err, val);
});

export default appStore;
