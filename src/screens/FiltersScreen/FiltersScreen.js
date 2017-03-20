import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { inject, observer } from 'mobx-react';
import ItemCheckbox from 'react-native-item-checkbox';
import Slider from 'react-native-multi-slider';

import I18n from 'react-native-i18n';

import styles from './styles';


const CheckBoxFilter = observer(({ title, description, value, onChange}) => {
  console.log(`${title} new val : `, value);
  return (
    <View style={styles.filterContainer}>
      <View style={styles.filterLabelContainer}>
        <Text style={styles.filterLabelTitle}>{title}</Text>
        <Text>{description}</Text>
      </View>
      <View style={styles.filterElementContainer}>
        <ItemCheckbox
          checked={value}
          onCheck={() => onChange(true)}
          onUncheck={() => onChange(false)}
          color="#FF5A5F"
        />
      </View>
    </View>
  );
});

const FiltersScreen = inject('filtersStore')(observer(({ filtersStore }) => {
  console.log('Contract type: ', filtersStore.contractType);
  return (
    <ScrollView style={[styles.container]}>

      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>
          Home Type
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex:1 }}>
            <Text style={{ color: 'lightgrey', alignSelf: 'flex-end', fontSize: 30 }}>HOUSE</Text>
          </View>
          <Text style={{ fontSize: 22 }}> | </Text>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#FF5A5F', fontSize: 30 }}>FLAT</Text>
          </View>
        </View>
      </View>


      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>
          Price
        </Text>
        <View style={{ flexDirection: 'row', alignSelf: 'center', height: 46 }}>
          <Slider
            values={[3,7]}
            sliderLength={200}
            containerStyle={{ height: 46 }}
            markerStyle={{ height: 100, width: 100, borderRadius: 15, backgroundColor:'#E8E8E8', borderWidth: 0.5, borderColor: 'grey' }}
          />
        </View>
      </View>


      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>
          Accommodation Details
        </Text>
        <CheckBoxFilter
          title="Entire place"
          description="Have a place for yourself."
          value={(filtersStore.contractType === 'full')}
          onChange={val => (filtersStore.contractType = (val ? 'full' : 'None'))}
        />
        <CheckBoxFilter
          title="Shared place"
          description="Get a room with other peoples."
          value={filtersStore.contractType === 'shared'}
          onChange={val => (filtersStore.contractType = (val ? 'shared' : 'None'))}
        />
      </View>
    </ScrollView>
  );
}));

export default FiltersScreen;
