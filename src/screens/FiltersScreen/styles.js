import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },

  categoryContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  categoryTitle: {

  },

  filterContainer: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  filterLabelContainer: {
    flexDirection: 'column',
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

export default styles;
