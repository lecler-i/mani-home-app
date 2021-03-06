import React from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { inject, observer } from 'mobx-react';
import I18n from 'react-native-i18n';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

import styles from './styles';

const window = Dimensions.get('window');

const navBar = () => (
  <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', height: 56, paddingHorizontal: 16, backgroundColor: '#FFFFFFAA' }}>
    <TouchableOpacity onPress={Actions.pop}>
      <Icon style={{ fontSize: 28, color: '#FF5A5F' }} name="times" />
    </TouchableOpacity>
    <Icon style={{ fontSize: 28, color: '#FF5A5F' }} name="heart-o" />
  </View>
);

const AccommodationDetailsScreen = inject('appStore')(observer(({ accommodation, appStore }) => {
  const { me } = appStore;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <ParallaxScrollView
          backgroundColor="#FFFFFFAA"
          renderBackground={() => <Image source={{ uri: accommodation.thumb, width: window.width, height: 350 }} />}
          renderFixedHeader={navBar}
          stickyHeaderHeight={56}
          parallaxHeaderHeight={300}
        >
          <View style={{ padding: 16 }}>
            <Text style={{ fontSize: 30 }}>{accommodation.name}</Text>

            <View style={{ margin: 8 }} />

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{I18n.t(accommodation.contract_type)} {I18n.t(accommodation.type)}</Text>
                <Text>Posted by <Text style={{ color: '#FF5A5F' }}>{me.name}</Text></Text>
              </View>
              <View>
                <Image source={{ uri: me.picture }} style={styles.ownerProfilePicture} />
              </View>
            </View>

            <View style={{ margin: 16 }} />

            <View style={{ alignItems: 'center', borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'lightgrey', paddingVertical: 16 }}>
              <Text style={{ fontSize: 18 }}><Text style={{ fontWeight: 'bold', fontSize: 28 }}>{accommodation.rent_price}</Text> INR</Text>
              <Text style={{ marginTop: -8 }}>per months</Text>
            </View>

            <View style={{ margin: 8 }} />

            <View>
              <Text>1 private room in 3bhk</Text>
              <Text>3bhk house</Text>
              <Text>Non furnished</Text>

            </View>
          </View>
        </ParallaxScrollView>
        <View style={{ height: 36, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FF5A5F' }}>
          <Text style={{ color: 'white' }}>MESSAGE NOW</Text>
        </View>
      </View>
    </View>

  );
}));

export default AccommodationDetailsScreen;

