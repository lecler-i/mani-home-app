import { observable, action } from 'mobx';

import { types } from 'mobx-state-tree';


      // "type": "house",
      // "room_nbr": 4,
      // "room_available": 1,
      // "rent_price": 100,
      // "name": "aaaaaa",
      // "longitude": 1.5,
      // "latitude": 1.4,
      // "id": 2,
      // "draft": true,
      // "date_end": null,
      // "date_begin": "2012-04-23T18:25:43.511000Z",
      // "contract_type": "full",
      // "accommodation_medias": []

export const AccommodationType = types.union(
  types.literal('house'),
  types.literal('appartment'),
);

export const ContractType = types.union(
  types.literal('full'),
  types.literal('shared'),
  types.literal('private'),
);

export const AccommodationCreation = types.model('AccommodationCreation', {
  type: types.maybe(AccommodationType),
  contract_type: types.maybe(ContractType),
  room_nbr: types.maybe(types.number),
  rent_price: types.maybe(types.number),
  room_available: types.optional(types.number, 0),
  name: types.maybe(types.string),
  longitude: types.maybe(types.number),
  latitude: types.maybe(types.number),
  draft: true,
  date_begin: types.maybe(types.string),
  date_end: types.maybe(types.string),
  accommodation_medias: types.maybe(types.array(types.identifier)),

  get currentStep() {
    if (!this.contract_type) return 1;
    if (!this.type) return 2;
    if (!(this.rent_price && this.name && this.date_begin)) return 3;
    return 0;
  },
}, {
  changeContractType(val) {
    this.contract_type = val;
  },
  changeType(val) {
    this.type = val;
  },
  changeName(val) {
    this.name = val;
  },
  changeRentPrice(val) {
    this.rent_price = val;
  },
  changeRoomAvailable(val) {
    this.room_available = val;
  },
});

const createAccommodationStore = AccommodationCreation.create({});
export default createAccommodationStore;
