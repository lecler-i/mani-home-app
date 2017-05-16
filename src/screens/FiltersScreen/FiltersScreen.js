import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { inject, observer } from 'mobx-react';
import ItemCheckbox from 'react-native-item-checkbox';
import Slider from 'react-native-multi-slider';

import I18n from 'react-native-i18n';

import styles from './styles';


const CustomFilter = observer(({ title, description, component, value, onTouch = false }) => {
  const element = (
    <View style={styles.filterContainer}>
      <View style={styles.filterLabelContainer}>
        <Text style={styles.filterLabelTitle}>{title}</Text>
        <Text style={styles.filterLabelDescription}>{description}</Text>
      </View>
      <View style={styles.filterElementContainer}>
        {component}
      </View>
    </View>
  );

  if (onTouch) {
    return <TouchableOpacity onPress={onTouch}>{element}</TouchableOpacity>;
  }
  return element;
});

const CheckBoxFilter = observer(props =>
  <CustomFilter
    {...props}
    onTouch={() => props.onChange(!props.value)}
    component={
      <ItemCheckbox
        onCheck={() => props.onChange(true)}
        onUncheck={() => props.onChange(false)}
        checked={props.value}
        color="#FF5A5F"
        size={28}
        icon={props.icon}
      />
    }
  />);

const FiltersScreen = inject('filtersStore')(observer(({ filtersStore }) => {
  const { contractTypes, accommodationTypes, availableNow } = filtersStore;
  
  return (
    <ScrollView style={[styles.container]}>
      <View style={styles.categoryContainer}>
        <CheckBoxFilter
          title="Available now"
          description="Available today or in the next 7-days"
          value={availableNow}
          onChange={val => (filtersStore.availableNow = val)}
        />
      </View>

      <View style={[styles.categoryContainer, { flexDirection: 'row' }]}>
          <TouchableOpacity style={{ flex:1 }} onPress={() => filtersStore.toggleAccommodationType('house')}>
            <Text style={[styles.accommodationTypeText, (accommodationTypes.indexOf('house') >= 0 && styles.accommodationTypeSelectedText), {alignSelf: 'flex-end'}]}>HOUSE</Text>
          </TouchableOpacity>
  
          <Text style={{ fontSize: 22, width: 89, textAlign: 'center', alignSelf: 'center'}}> {(accommodationTypes.length % 2) ? 'or' : 'only'} </Text>
  
          <TouchableOpacity style={{ flex:1 }} onPress={() => filtersStore.toggleAccommodationType('flat')}>
            <Text style={[styles.accommodationTypeText, (accommodationTypes.indexOf('flat') >= 0 && styles.accommodationTypeSelectedText)]}>FLAT</Text>
          </TouchableOpacity>
       </View>

      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>
          Accommodation Details
        </Text>
        <CheckBoxFilter
          title="Entire place"
          description="Have a place for yourself."
          value={(contractTypes.indexOf('full') >= 0)}
          onChange={() => (filtersStore.toggleContractType('full'))}
        />
        <CheckBoxFilter
          title="Shared place"
          description="Get a private room in a shared-place."
          value={(contractTypes.indexOf('shared') >= 0)}
          onChange={() => filtersStore.toggleContractType('shared')}
        />
      </View>
    </ScrollView>
  );
}));

export default FiltersScreen;
