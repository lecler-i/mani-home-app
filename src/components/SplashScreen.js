import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { inject, observer } from 'mobx-react';
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

@inject('appStore', 'authStore', 'theme') @observer
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
    const { loaded, me } = this.props.appStore;
    const { loading } = this.props.authStore;

    console.log('App Loaded : ', loaded);
    console.log('Auth Loading: ', loading);
    console.log('Me: ', me);

    if (loaded && !!me) Actions.drawer();
    else if (loaded && !this.props.authStore.loading) Actions.auth();
  }

  render() {
    const { loaded, me } = this.props.appStore;
    const { loading } = this.props.authStore;
  
    return (
      <View style={styles.container}>
        <ActivityIndicator size={'large'} color="white" />
      </View>
    );
  }
}

export default SplashScreen;
