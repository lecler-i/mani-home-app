import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Actions } from 'react-native-router-flux';

import RightButtonFilters from '../../components/NavBar/RightButtonFilters';
import MapScreen from './MapScreen';

@inject('appStore', 'accommodationsStore') @observer
class MapScreenContainer extends Component {

  static renderRightButton() {
    return <RightButtonFilters />;
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedIdx: 3,
    };
  }

  onMarkerPress = (accommodation, idx) => {
    this.setState({ selectedIdx: idx });
  }

  onDetailPress = () => {
    const { accommodations } = this.props.accommodationsStore;
    Actions.accommodation_details({ accommodation: accommodations.get(this.state.selectedIdx) });
  }

  render() {
    const { accommodations, loading } = this.props.accommodationsStore;

    return (
      <MapScreen
        data={accommodations}
        onMarkerPress={this.onMarkerPress}
        onDetailPress={this.onDetailPress}
        selectedIdx={this.state.selectedIdx}
      />
    );
  }
}

export default MapScreenContainer;
