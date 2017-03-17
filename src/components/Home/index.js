import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { inject, observer } from 'mobx-react';
import { Actions } from 'react-native-router-flux';
import { Spinner } from 'native-base';

//import ProtectedScreenComponent from '../../utils/ProtectedScreenComponent';

import styles from './styles';

@inject('appStore', 'theme') @observer
class Home extends Component {

  render() {
    const { me } = this.props.appStore;
    console.log(this.context);
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Mani-home</Text>
      </View>
    );
  }
}

export default Home;
