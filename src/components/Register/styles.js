import { StyleSheet } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.brandPrimary,
    padding: 8,
  },
  header: {
    marginBottom: 16,
  },
  buttonContainer: {
    margin: 16,
    alignSelf: 'center',
    flexDirection: 'column',  
  },
  registerButton: {
    marginTop: 8,
    borderColor: '#ffffff',
  },
  backText: {
    marginTop: 8,
  },
})

export default styles;
