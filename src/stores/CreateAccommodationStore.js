import { observable, action } from 'mobx';

class CreateAccommodationStore {
  @observable accommodationType = null;
  @observable contractType = null;
  @observable price = 0;

  @action
  setAccommodationType(type) {
    this.accommodationType = type;
  }

  @action
  setContractType(type) {
    this.contractType = type;
  }
}

const createAccommodationStore = new CreateAccommodationStore();
export default createAccommodationStore;
