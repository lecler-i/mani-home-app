import { AsyncStorage } from 'react-native';
import { observable, action, computed } from 'mobx';
import { Actions } from 'react-native-router-flux';
import Auth0 from 'react-native-auth0';

import api from '../utils/fetch';

class AuthStore {
  @observable _authToken = null;
  @observable me = null;
  @observable loading = false;
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
    if (!val) {
      AsyncStorage.removeItem('@MySuperStore:authToken');
      this.me = null;
      return Actions.auth();
    } else {
      AsyncStorage.setItem('@MySuperStore:authToken', val);
    }
  }

  @action
  logout() {
    this.authToken = null;
  }

  @action
  async login(authToken, profile = null) {
    if (!authToken) {
      this.authToken = null;
      return false;
    }
    if (profile) {
      this.me = profile;
      this.authToken = authToken;
      return true;
    }
    try {
      this.loading = true;
      //console.log("Requesting profile for token...");
      this.me = await this.auth0
        .authentication('WtBYagql92oaE6fhJ1r6jeJFzmMiH9cM')
        .tokenInfo(authToken);
      this.me = profile;
      console.log('Got profile : ', profile);
      this.authToken = authToken;
      this.loading = false;
      return true;
    } catch (e) {
      this.loading = false;
      this.authToken = null;
      console.error('Auth0 error', e);
      return false;
    }
  }
}

const authStore = new AuthStore();

export default authStore;
