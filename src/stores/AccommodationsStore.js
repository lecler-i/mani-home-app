import { types } from 'mobx-state-tree';
import fetchApi from '../utils/fetch';
import config from '../config';
import filtersStore from './FiltersStore';

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
    get thumb() {
      return `${config.API_URL}${this.urls.thumb}`;
    },
    get original() {
      return `${config.API_URL}${this.urls.original}`;
    },
    id: types.identifier(types.number),
  })),

  get thumb() {
    const medias = this.accommodation_medias;
    if (medias.length && medias[0].urls && medias[0].urls.thumb) {
      return medias[0].thumb;
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
      this.updateAccommodations(json.data);
      this.markLoading(false);
    })
    .catch((err) => {
      console.error('Failed to load Accommodations ', err);
    });
  },
  markLoading(loading) {
    this.isLoading = loading;
  },
  updateAccommodations(data) {
    data.forEach((accommodation) => {
      this.accommodations.put(Accommodation.create(accommodation));
    });
  }
});

const accommodationsStore = AccommodationsStore.create({ accommodations: {} });

export default accommodationsStore;
