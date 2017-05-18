import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import { observer } from 'mobx-react';
import I18n from 'react-native-i18n';

import styles from './styles';

const AccommodationDetails = observer(({ accommodation, onPress }) => (
  <View style={styles.container}>
    <TouchableOpacity style={{ flex: 1 }} onPress={onPress} >
      <View style={styles.detailWrapper}>
        <Image source={{ uri: accommodation.thumb }} style={styles.thumbnail} />
        <View style={styles.mainDetails}>
          <Text
            style={styles.nameText}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {accommodation.name}
          </Text>
          <Text>{I18n.t(accommodation.contract_type)} {I18n.t(accommodation.type)}</Text>
          <Text>{accommodation.room_available} {I18n.t('bedroom')}</Text>
        </View>
        <View style={styles.leftDetails}>
          <Text>{accommodation.rent_price} Rs</Text>
        </View>
      </View>
    </TouchableOpacity>
  </View>
));

export default AccommodationDetails;
