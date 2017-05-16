import { observable, action, computed } from 'mobx';

import fetchApi from '../utils/fetch';
import filtersStore from './FiltersStore';

class AccommodationsStore {
  @observable accommodations = [];
  @observable isLoading = false;

  @action
  async fetch() {
    this.isLoading = true;
    const { data } = await fetchApi('/accommodations');
    this.accommodations = data;
    this.isLoading = false;
  }

}

const accommodationsStore = new AccommodationsStore();

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

accommodationsStore.fetch();


export default accommodationsStore;
