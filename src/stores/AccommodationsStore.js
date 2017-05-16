import { observable, action, computed } from 'mobx';
import { types, getEnv } from 'mobx-state-tree'
import fetchApi from '../utils/fetch';
import config from '../config';
import filtersStore from './FiltersStore';

// class AccommodationsStore {
//   @observable accommodations = [];
//   @observable isLoading = false;

//   @action
//   async fetch() {
//     this.isLoading = true;
//     const { data } = await fetchApi('/accommodations');
//     this.accommodations = data;
//     this.isLoading = false;
//   }
// }

const Accommodation = types.model('Accommodation', {
  id: types.identifier(types.number),
  type: types.string,
  room_nbr: types.number,
  room_available: types.number,
  rent_price: types.number,
  name: types.string,
  longitude: types.number,
  latitude: types.number,
  draft: false,
  date_end: types.maybe(types.string),
  date_begin: types.string,
  contract_type: types.string,
  accommodation_medias: types.array(types.model({
    urls: types.model({
      thumb: types.string,
      original: types.string,
    }),
    id: types.identifier(types.number),
  })),

  get thumb() {
    const medias = this.accommodation_medias.toJSON();
    if (medias.length && medias[0].urls && medias[0].urls.thumb) {
      return `${config.API_URL}${medias[0].urls.thumb}`;
    }
    return 'https://cloud.githubusercontent.com/assets/675092/26089303/a09ea682-39ca-11e7-8278-472c26b51e18.png';
  },
});

const AccommodationsStore = types.model('AccommodationsStore', {
  accommodations: types.map(Accommodation),
  isLoading: true,
}, {
  loadAccommodations() {
    fetchApi('/accommodations').then((json) => {
      this.updateBooks(json.data);
      this.markLoading(false);
    })
    .catch((err) => {
      console.error('Failed to load Accommodations ', err);
    });
  },
  markLoading(loading) {
    this.isLoading = loading;
  },
  updateBooks(data) {
    console.log(data);
    data.forEach((accommodation) => {
      this.accommodations.put(Accommodation.create(accommodation));
    });
  },
  afterCreate() {
    this.loadAccommodations();    
  },
});

const accommodationsStore = AccommodationsStore.create({ accommodations: {} });

// accommodationsStore.accommodations = [
//   {
//     "type": "house",
//     "room_nbr": 4,
//     "room_available": 1,
//     "rent_price": 100,
//     "name": "aaaaaa",
//     latitude: 13.352014,
//     longitude: 74.7862949,
//     "id": 1,
//     "draft": true,
//     "date_end": null,
//     "date_begin": "2012-04-23T18:25:43.511000Z",
//     "contract_type": "full",
//     "accommodation_medias": [
//       {
//         "urls": {
//           "thumb": "/uploads/accommodations/pictures/thumb_2017-05-14-175931_1920x1080_scrot.png.png?v=63662079778",
//           "original": "/uploads/accommodations/pictures/original_2017-05-14-175931_1920x1080_scrot.png.png?v=63662079778"
//         },
//         "id": 1
//       },
//     ]
//   },
//   {
//     "type": "house",
//     "room_nbr": 4,
//     "room_available": 1,
//     "rent_price": 100,
//     "name": "aaaaaa",
//     "latitude": 13.353314,
//     "longitude": 74.7889949,
//     "id": 2,
//     "draft": true,
//     "date_end": null,
//     "date_begin": "2012-04-23T18:25:43.511000Z",
//     "contract_type": "full",
//     "accommodation_medias": []
//   },
// ];

// accommodationsStore.fetch();


export default accommodationsStore;
