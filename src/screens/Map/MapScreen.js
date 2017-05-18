import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { inject, observer } from 'mobx-react';
import { Actions } from 'react-native-router-flux';
import MapView from 'react-native-maps';

import PriceMarker from '../../components/Map/PriceMarker';
import AccommodationDetails from '../../components/Map/AccommodationDetails';

import styles from './styles';

@inject('appStore') @observer
class MapScreen extends Component {
  
  render() {
    const { data, onMarkerPress, onDetailPress, selectedIdx } = this.props;

    console.log('Selected Idx:', selectedIdx);
    console.log('Accos :', data);

    const markers = data.values().map((e, id) => {
      console.log('Acc ici :', e);
      return (
        <MapView.Marker
          key={e.id}
          coordinate={{ longitude: e.longitude, latitude: e.latitude }}
          onPress={() => onMarkerPress(e, id)}
        >
          <PriceMarker amount={e.rent_price} selected={(selectedIdx === id)} /> 
        </MapView.Marker>
      );
    });

    return (
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <MapView
            showsUserLocation
            showsMyLocationButton
            showsPointsOfInterest={false}
            toolbarEnabled={false}
            loadingEnabled
            style={styles.map}
            initialRegion={{
              latitude: 13.352014,
              longitude: 74.7862949,
              latitudeDelta: 0.0222,
              longitudeDelta: 0.0071,
            }}
          >
            {markers}
          </MapView>
        </View>
        <AccommodationDetails accommodation={data.get(selectedIdx)} onPress={onDetailPress}/>
     </View>
    );
  }
}

export default MapScreen;
