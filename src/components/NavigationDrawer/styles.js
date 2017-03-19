import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },

  headerContainer: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  profilePicture: {
    height: 50,
    width: 50,
    borderRadius: 25,
    resizeMode: 'contain',
    padding: 2,
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 18,
  },

  menuContainer: {
    flexDirection: 'column',
  },
  menuItemContainer : {
    alignItems: 'center',
    padding: 8,
    flexDirection: 'row',
  },
  menuItemIcon: {
    marginRight: 16,
    fontSize: 24,
  },

});

export default styles;
