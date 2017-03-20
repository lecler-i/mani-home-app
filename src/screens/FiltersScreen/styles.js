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
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  filterContainer: {
    flexDirection: 'row',
    height: 66,
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
  accommodationTypeText: {
    color: 'lightgrey',
    fontSize: 30,
  },
  accommodationTypeSelectedText: {
    color: '#FF5A5F',
    fontWeight: 'bold',
  },


});

export default styles;
