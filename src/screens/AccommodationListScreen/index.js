import React from 'react';
import { inject, observer } from 'mobx-react';
import { Actions } from 'react-native-router-flux';

import RightButtonFilters from '../../components/NavBar/RightButtonFilters';
import AccommodationListScreen from './AccommodationListScreen';

@inject('appStore', 'accommodationsStore') @observer
class AccommodationListScreenContainer extends React.Component {
  
  static renderRightButton() {
    return <RightButtonFilters />;
  }

  onAccommodationPress = (accommodation) => {
    console.log("Sending Accommodation :", accommodation);
    Actions.accommodation_details({ accommodation });
  }

  onBackPress = () => {
    Actions.back();
  }

  render() {
    const { accommodations, loading } = this.props.accommodationsStore;


        console.log("LALALA : ", accommodations[0])


    return (
      <AccommodationListScreen
        data={accommodations}
        onAccommodationPress={this.onAccommodationPress}
        onBackPress={this.onBackPress}
      />
    );
  }
}
export default AccommodationListScreenContainer;
