import React, { Component } from 'react';
import { Text } from 'react-native';
import { inject, observer } from 'mobx-react';
import { Actions } from 'react-native-router-flux';
import { View, Spinner } from 'native-base';

//import ProtectedScreenComponent from '../../utils/ProtectedScreenComponent';
import MapView from 'react-native-maps';

import styles from './styles';

import HouseIcon from '../../assets/img/house-64.png';

@inject('appStore', 'theme') @observer
class MapScreen extends Component {

  render() {
    const { me } = this.props.appStore;
    console.log(me.email);
    return (
      <View style={styles.container}>
      <MapView
        style={styles.mapContainer}
        initialRegion={{
          latitude: 13.352014,
          longitude: 74.7862949,
          latitudeDelta: 0.0222,
          longitudeDelta: 0.0071,
        }}
      >
        <MapView.Marker
          title={'TEST'}
          image={HouseIcon}
          coordinate={{
            latitude: 13.352014,
            longitude: 74.7862949,
          }}
        />
      </MapView>
      </View>
    );
  }
}

export default MapScreen;
