import { StyleSheet, Dimensions } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  mapContainer: {
    flex: 1,
  },
  listContainer: {
    height: 56,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
})

export default styles;
