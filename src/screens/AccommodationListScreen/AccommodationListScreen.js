import React, { Component } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { inject, observer } from 'mobx-react';
import { Actions } from 'react-native-router-flux';
import MapView from 'react-native-maps';
import I18n from 'react-native-i18n';

import PriceMarker from '../../components/Map/PriceMarker';
import AccommodationDetails from '../../components/Map/AccommodationDetails';

import styles from './styles';

const AccomodationItem = ({ accommodation, onPress }) => 
  <TouchableOpacity onPress={onPress} >
    <View style={styles.accommodationContainer}>
      <Image source={{ uri: accommodation.image}} style={styles.thumbnail} />
      <View style={styles.textContainer}>
        <Text style={styles.priceText}>
          {accommodation.price} INR/Month
        </Text>
        <Text>
          {I18n.t(accommodation.contract_type)} {I18n.t(accommodation.type)}
        </Text>
      </View>
      <Text>
        <Text>2 {I18n.t('bedroom', 2)}</Text>
      </Text>
    </View>
  </TouchableOpacity>


const AccommodationListScreen = inject('appStore')(observer(({ data, onAccommodationPress }) => {

  const accommodations = data.map((e, idx) => <AccomodationItem key={idx} accommodation={e} onPress={() => onAccommodationPress(e, idx)} />);

  return (
    <ScrollView style={[styles.container]} keyboardShouldPersistTaps='always'>
      {accommodations}
   </ScrollView>
  );
}));

export default AccommodationListScreen;
