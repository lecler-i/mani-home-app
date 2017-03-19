import React, { Component } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { inject, observer } from 'mobx-react';
import { Actions } from 'react-native-router-flux';
import MapView from 'react-native-maps';
import I18n from 'react-native-i18n';

import PriceMarker from '../../components/Map/PriceMarker';
import AccommodationDetails from '../../components/Map/AccommodationDetails';

import styles from './styles';

@inject('appStore', 'theme') @observer
class AccommodationListScreen extends Component {
  
  render() {
    const { data, onMarkerPress, onDetailPress, selectedIdx } = this.props;

    console.log('Selected Idx:', selectedIdx);

    const accommodations = data.map((e, id) => {
      console.log('Current one', id);
      return (
        <TouchableOpacity key={id}>
          <View key={id} style={[styles.accommodationContainer, ]}>
            <Image source={{ uri: e.image}} style={styles.thumbnail} />
            <View style={styles.textContainer}>
              <Text style={styles.priceText}>
                {e.price} INR/Month
              </Text>
              <Text>
                {I18n.t(e.contract_type)} {I18n.t(e.accommodation_type)}
              </Text>
            </View>
            <Text>
              <Text>2 {I18n.t('bedroom', 2)}</Text>
            </Text>
          </View>
        </TouchableOpacity>
      );
    });

    return (
      <ScrollView style={[styles.container]}>
        {accommodations}
     </ScrollView>
    );
  }
}

export default AccommodationListScreen;
