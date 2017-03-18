import { StyleSheet, Dimensions } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  logout: {
    textAlign: 'center',
    color: theme.brandPrimary,
    marginBottom: 5,
  },
})

export default styles;
