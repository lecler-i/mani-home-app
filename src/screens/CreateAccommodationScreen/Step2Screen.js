import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { inject, observer } from 'mobx-react';

import I18n from 'react-native-i18n';

import styles from './styles';
import CheckBoxFilter from '../../components/CheckBoxFilter';

const Step2Screen = observer(({ accommodation, changeType }) => (
  <View style={styles.typeContainer}>
    <CheckBoxFilter
      title={I18n.t('appartment')}
      value={accommodation.type === 'appartment'}
      onChange={val => changeType(val ? 'appartment' : null)}
    />
    <CheckBoxFilter
      title={I18n.t('house')}
      value={accommodation.type === 'house'}
      onChange={val => changeType(val ? 'house' : null)}
    />
  </View>
));

export default Step2Screen;
