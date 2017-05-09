import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Actions } from 'react-native-router-flux';

import CreateAccommodationScreen from './CreateAccommodationScreen';

@inject('appStore', 'createAccommodationStore') @observer
class CreateAccommodationScreenContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <CreateAccommodationScreen />
    );
  }
 }

export default CreateAccommodationScreenContainer;
