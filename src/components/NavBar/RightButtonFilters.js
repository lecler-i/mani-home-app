import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

export default () => (
  <TouchableOpacity onPress={() => Actions.filters()}>
    <Icon size={28} style={{ marginTop: -5 }} name="sliders" />
  </TouchableOpacity>
);
