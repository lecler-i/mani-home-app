import React from 'react';
import { inject, observer } from 'mobx-react';

import AccommodationDetailsScreen from './AccommodationDetailsScreen';

@inject('appStore') @observer
class AccommodationDetailsScreenContainer extends React.Component {
  
  render() {
    const { accommodation } = this.props;
    
    return (
      <AccommodationDetailsScreen {...{ accommodation }} />
    );
  }
}

export default AccommodationDetailsScreenContainer;
