import React from 'react';
import { inject, observer } from 'mobx-react';

import RightButtonFilters from '../../components/NavBar/RightButtonFilters';
import AccommodationListScreen from './AccommodationListScreen';

@inject('appStore') @observer
class AccommodationListScreenContainer extends React.Component {
  
  static renderRightButton() {
    return <RightButtonFilters />;
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedIdx: 0,
    };
  }

  onAccommodationPress = (marker, idx) => {
    console.log('Marker have been pressed', marker, idx);
    this.setState({ selectedIdx: idx });
  }

  render() {
    return (
      <AccommodationListScreen 
        data={data}
        onAccommodationPress={this.onAccommodationPress}
        selectedIdx={this.state.selectedIdx}
      />
    );
  }
}

const data = [
  {
    coordinate: {
      latitude: 13.352014,
      longitude: 74.7862949,
    },
    image: 'http://www.tvdaijiworld.com/images6/kvn_140614_kirthi3.jpg',
    price: '15,000',
    name: 'Kirthi Samrat',
    accommodation_type: 'appartment',
    contract_type: 'shared',
  },
  {
    coordinate: {
      latitude: 13.353314,
      longitude: 74.7889949,
    },
    image: 'http://3.bp.blogspot.com/-wFdFFIt2yCE/T9dc2RaYOqI/AAAAAAAAO_E/JzjHd_2ItUo/s1600/india-house-design-01.jpg',
    price: '8,000',
    name: 'Suraksha',
    accommodation_type: 'house',
    contract_type: 'full',
  }
];


export default AccommodationListScreenContainer;
