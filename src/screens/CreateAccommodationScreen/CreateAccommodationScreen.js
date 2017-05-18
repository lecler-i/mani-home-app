import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { inject, observer } from 'mobx-react';
import I18n from 'react-native-i18n';
import styles from './styles';

import CheckBoxFilter from '../../components/CheckBoxFilter';

@observer
class CreateAccommodationScreen extends Component {
  render() {
    const { accommodation, changeContractType } = this.props;

    return (
      <View style={styles.typeContainer}>
        <CheckBoxFilter
          title={I18n.t('entire-place')}
          value={accommodation.contract_type === 'full'}
          onChange={val => changeContractType(val ? 'full' : null)}
        />
        <CheckBoxFilter
          title={I18n.t('private-room')}
          value={accommodation.contract_type === 'private'}
          onChange={val => changeContractType(val ? 'private' : null)}
        />
        <CheckBoxFilter
          title={I18n.t('shared-room')}
          value={accommodation.contract_type === 'shared'}
          onChange={val => changeContractType(val ? 'shared' : null)}
        />
      </View>
    );
  }
}

export default CreateAccommodationScreen;
