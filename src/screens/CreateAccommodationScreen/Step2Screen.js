import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { inject, observer } from 'mobx-react';

import ItemCheckbox from 'react-native-item-checkbox';

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

const Step2Screen = inject('createAccommodationStore')(observer(({createAccommodationStore}) => {
  return (
      <View style={styles.typeContainer}>
        <CheckBoxFilter
          title={I18n.t('appartment')}
          value={createAccommodationStore.contractType === 'appartment'}
          onChange={(val) => createAccommodationStore.setContractType(val ? 'appartment' : null)}
        />
        <CheckBoxFilter
          title={I18n.t('house')}
          value={createAccommodationStore.contractType === 'house'}
          onChange={(val) => createAccommodationStore.setContractType(val ? 'house' : null)}
        />
      </View>
  );
}));

export default Step2Screen;
