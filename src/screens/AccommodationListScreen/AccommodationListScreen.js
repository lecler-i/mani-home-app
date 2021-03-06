import React from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { inject, observer } from 'mobx-react';
import I18n from 'react-native-i18n';
import config from '../../config';

import styles from './styles';

const AccomodationItem = ({ accommodation, onPress }) => 
  <TouchableOpacity onPress={onPress} >
    <View style={styles.accommodationContainer}>
      <Image source={{ uri: accommodation.thumb }} style={styles.thumbnail} />
      <View style={styles.textContainer}>
        <Text style={styles.priceText}>
          {accommodation.rent_price} INR/Month
        </Text>
        <Text>
          {I18n.t(accommodation.contract_type)} {I18n.t(accommodation.type)}
        </Text>
      </View>
      <Text>
        <Text>2 {I18n.t('bedroom', 2)}</Text>
      </Text>
    </View>
  </TouchableOpacity>;

const AccommodationListScreen = inject('appStore')(observer(({ data, onAccommodationPress }) => {
  const accommodations = data.values().map((e, idx) =>
    <AccomodationItem key={e.id} accommodation={e} onPress={() => onAccommodationPress(e)} />);

  return (
    <ScrollView style={[styles.container]} keyboardShouldPersistTaps="always">
      {accommodations}
    </ScrollView>
  );
}));

export default AccommodationListScreen;
