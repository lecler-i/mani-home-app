import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { inject, observer } from 'mobx-react';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae, Hoshi } from 'react-native-textinput-effects';
import Slider from 'react-native-slider';
import I18n from 'react-native-i18n';

import theme from '../../configs/theme';

import styles from './styles';
import CheckBoxFilter from '../../components/CheckBoxFilter';
 
const MainInfosStep = observer(({ accommodation, changeName, changeRentPrice, changeRoomAvailable }) => (
  <View style={styles.typeContainer}>
    <Sae
      label={'Name'}
      iconClass={FontAwesomeIcon}
      iconName={'pencil'}
      iconColor={theme.brandColor}
      // TextInput props
      autoCapitalize={'none'}
      autoCorrect={false}
      onChange={changeName}
      inputStyle={{ color: '#000' }}
    />
    <Sae
      label={'Price'}
      iconClass={FontAwesomeIcon}
      iconName={'pencil'}
      iconColor={theme.brandColor}
      // TextInput props
      autoCapitalize={'none'}
      autoCorrect={false}
      onChange={changeRentPrice}
      inputStyle={{ color: '#000' }}
    />
    <Slider
      value={accommodation.room_available}
      onValueChange={changeRoomAvailable}
      maximumValue={4}
      step={1}
      style={{ margin: 16 }}
      minimumTrackTintColor={theme.brandColor}
      trackStyle={sliderStyle.track}
      thumbStyle={sliderStyle.thumb}
    />
    <Text>Number of rooms: {accommodation.room_available}</Text>
  </View>
));

const sliderStyle = StyleSheet.create({
  track: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#d0d0d0',
  },
  thumb: {
    width: 10,
    height: 30,
    borderRadius: 5,
    backgroundColor: theme.brandColor,
  }
});

export default MainInfosStep;
