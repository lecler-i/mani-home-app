import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Actions } from 'react-native-router-flux';

import FiltersScreen from './FiltersScreen';

@inject('appStore') @observer
class FiltersScreenContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <FiltersScreen
      />
    );
  }
 }

export default FiltersScreenContainer;
