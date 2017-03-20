import React, { PropTypes } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { inject } from 'mobx-react';
import Icon from 'react-native-vector-icons/FontAwesome';

@inject('appStore')
class DrawerButton extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={() => (this.props.appStore.drawerOpen = true)}>
        <Icon size={28} style={{marginTop: -3}} name="navicon" />
      </TouchableOpacity>
    );
  }
}

export default DrawerButton;
