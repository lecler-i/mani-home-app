import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },

  typeContainer: {
    paddingHorizontal: 16,
  },


  nextButtonText: {
    backgroundColor: '#FF5A5F',

    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 16,
    color: '#fff'
  },
  nextButton: {
    flex: 1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-end',
    padding: 16,
  }


});

export default styles;
