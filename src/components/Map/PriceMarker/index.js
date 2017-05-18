import React, { PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import styles from './styles';

const propTypes = {
  amount: PropTypes.number.isRequired,
  fontSize: PropTypes.number,
  selected: PropTypes.bool,
};

const defaultProps = {
  fontSize: 13,
  selected: false,
};

class PriceMarker extends React.Component {
  render() {
    const { fontSize, amount, selected } = this.props;
    return (
      <View style={styles.container}>
        <View style={[styles.bubble, (selected ? styles.bubbleSelected : null)]}>
          <Text style={[styles.amount, (selected ? styles.amountSelected : null), { fontSize }]}>₹ </Text>
          <Text style={[styles.amount, (selected ? styles.amountSelected : null), { fontSize }]}>{amount}</Text>
        </View>
        <View style={styles.arrowBorder} />
        <View style={[styles.arrow, (selected ? styles.arrowSelected : null)]} />
      </View>
    );
  }
}

PriceMarker.propTypes = propTypes;
PriceMarker.defaultProps = defaultProps;

export default PriceMarker;
