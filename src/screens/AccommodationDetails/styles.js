import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 16,
  },
  accommodationContainer: {
    height: 280,
    marginTop: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
  },
  thumbnail: {
    flex: 1,
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
  textContainer: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 18,
  },

  ownerProfilePicture: {
    height: 50,
    width: 50,
    borderRadius: 25,
    resizeMode: 'contain',
    padding: 2,
  }

})

export default styles;

