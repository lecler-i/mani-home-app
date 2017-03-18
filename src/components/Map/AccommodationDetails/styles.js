import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 80, 
    flexDirection: 'row',
  },
  detailWrapper: {
    flex:1,
    flexDirection: 'row',
  },
  thumbnail: {
    maxHeight: 78,
    width: 100,
    resizeMode: 'contain',
    padding: 2,
  },
  mainDetails: {
    flex:1,
    padding: 8,
    flexDirection: 'column',
  },
  leftDetails: {
    padding: 8,
    marginTop: 4,
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 18,
  },

});

export default styles;
