import { observable, action, computed } from 'mobx';

import authStore from './AuthStore';

class AppStore {
  @observable loaded = false;

  @computed
  get me() {
    return authStore.me;
  }
}

const appStore = new AppStore();
export default appStore;
