import { observable, action } from 'mobx';

class FiltersStore {
  @observable accommodationTypes = ['house', 'appartment'];
  @observable contractTypes = [];
  @observable priceRange = [0, 0];
  @observable availableNow = false;

  @action
  toggleContractType(type) {
    const index = this.contractTypes.indexOf(type);
    if (index >= 0) {
      this.contractTypes.splice(index, 1);
    } else {
      this.contractTypes.push(type);      
    }
  }

  @action
  toggleAccommodationType(type) {
    const index = this.accommodationTypes.indexOf(type);
    if (index >= 0) {
      this.accommodationTypes.splice(index, 1);
    } else {
      this.accommodationTypes.push(type);      
    }
  }


}

const filterStore = new FiltersStore();
export default filterStore;
