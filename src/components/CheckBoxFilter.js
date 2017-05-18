import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import ItemCheckbox from 'react-native-item-checkbox';

export const CustomFilter = ({ title, description, component, value, onTouch = false }) => {
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
};

const CheckBoxFilter = props => (
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
  />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  typeContainer: {
    paddingHorizontal: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    height: 66,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  filterLabelContainer: {
    flexDirection: 'column',
    alignSelf: 'center',
    marginRight: 46,
    flex: 1,
  },
  filterLabelTitle: {
    fontSize: 20,
  },
  filterLabelDescription: {
  },
  filterElementContainer: {
    alignSelf: 'center',
  },
});

export default CheckBoxFilter;
