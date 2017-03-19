import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react';
import { Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';

import Auth0Lock from 'react-native-lock';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.brandPrimary,
  },
});

@inject('appStore') @observer
class SplashScreen extends Component {
  
  componentWillMount() {
    if (this.props.fn)
      this.props.fn();
    this.checkLoadingStatus();
  }

  componentWillReact() {
    this.checkLoadingStatus();
  }

  checkLoadingStatus = () => {
    const { loaded, loggedIn } = this.props.appStore;
    
    console.log("SplashScreen : ", loaded, loggedIn);
    if (loaded && loggedIn) Actions.drawer();
    else if (loaded && !loggedIn) Actions.auth();
  }

  render() {
    console.log('I loaded', this.props.appStore.loaded);
    return (
      <View style={styles.container}>
        <Spinner color="#FFFFFF" />
      </View>
    );
  }
}

export default SplashScreen;
