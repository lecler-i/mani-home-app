import React, { PropTypes } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import styles from './styles';

class AccommodationDetails extends React.Component {
  render() {
    const { accommodation, onPress } = this.props;

    return (
      <View style={[styles.container, {marginTop: 0}]}>
        <TouchableOpacity style={{flex:1}} onPress={onPress} >
          <View style={styles.detailWrapper}>
            <Image source={{uri: accommodation.image}} style={styles.thumbnail} />
            <View style={styles.mainDetails}>
              <Text 
                style={styles.nameText}
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                {accommodation.name}
              </Text>
              <Text>Full House</Text>
              <Text>2 bedrooms</Text>
            </View>
            <View style={styles.leftDetails}>
              <Text>{accommodation.price} Rs</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default AccommodationDetails;
