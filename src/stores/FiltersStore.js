import { observable, action, computed } from 'mobx';

class FiltersStore {
  @observable accommodationType = ['house', 'appartment'];
  @observable contractType = null;
  @observable priceRange = [0, 0];
}

const filterStore = new FiltersStore();
export default filterStore;
