import React, { PropTypes } from 'react';
import {
  View,
  Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

class DrawerButton extends React.Component {
  render() {
    return (
      <View>
        <Icon size={28} style={{marginTop: -3}} name="navicon" />
      </View>
    );
  }
}

export default DrawerButton;
