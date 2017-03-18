import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { inject, observer } from 'mobx-react';
import { Actions } from 'react-native-router-flux';
import MapView from 'react-native-maps';

import PriceMarker from '../../components/Map/PriceMarker';

import styles from './styles';

@inject('appStore', 'theme') @observer
class MapScreen extends Component {
  static renderRightButton() {
    return <Text>Right</Text>;
  }
  static onRight() {
    console.log('PRESSED');
  }
  
  render() {
    const { me } = this.props.appStore;
    return (
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 13.352014,
              longitude: 74.7862949,
              latitudeDelta: 0.0222,
              longitudeDelta: 0.0071,
            }}
          >
          </MapView>
        </View>
      </View>
    );
  }
}


// <MapView.Marker
            // title={'TEST'}
            // coordinate={{
              // latitude: 13.352014,
              // longitude: 74.7862949,
            // }}
            // onPress={(ev) => {
              // console.log("Pressed me !", ev);
            // }}
          // >
            // <PriceMarker amount={300} /> 
          // </MapView.Marker>

export default MapScreen;
