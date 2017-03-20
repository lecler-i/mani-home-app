import React, { PropTypes } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { inject, observer } from 'mobx-react';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import I18n from 'react-native-i18n';

import styles from './styles';

@inject('appStore') @observer
class SideMenu extends React.Component {

  _renderRow = (item, id) => 
    <TouchableOpacity
      key={id}
      onPress={() => {
        this.props.appStore.drawerOpen = false;
        Actions[item.route]();
      }}
    >
      <View style={styles.menuItemContainer}>
        <Icon name={item.icon} style={styles.menuItemIcon}/>
        <Text>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>

  render() {
    const { me } = this.props.appStore;
    
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Image source={{ uri: me.picture }} style={styles.profilePicture}/>
          <View style={{flexDirection: 'column', marginLeft: 8,}}>
            <Text style={styles.nameText}>{me.name}</Text>
            <Text>{me.email}</Text>
          </View>
        </View>
        <View style={styles.menuContainer}>
          {menuEntries.map(this._renderRow)}
        </View>
      </View>
    );
  }
}


const menuEntries = [
  {
    name: 'Listing',
    route: 'home',
    icon: 'list-ul'
  },
  {
    name: 'Map',
    route: 'map',
    icon: 'map-o'
  },
  {
    name: 'Inbox',
    route: 'inbox',
    icon: 'envelope-o'
  },
  {
    name: 'Logout',
    route: 'auth',
    icon: 'times-circle-o'
  }
];

export default SideMenu;
