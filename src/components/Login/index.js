import React, { Component } from 'react';
import { View, Image } from 'react-native';

import { Actions } from 'react-native-router-flux';
import { observer, inject } from 'mobx-react';

import Auth0Lock from 'react-native-lock';


import styles from './styles';
import theme from '../../theme';
import logo from'../../assets/img/logo.png';

@inject('appStore', 'authStore') @observer
class Login extends Component {
  constructor(...arg) {
    super(...arg);
    this.lock = new Auth0Lock({clientId: 'WtBYagql92oaE6fhJ1r6jeJFzmMiH9cM', domain: 'lecler-i.auth0.com'});
  }

  componentWillMount() {

    this.props.authStore.authToken = null;
    this.lock.show({}, (err, profile, token) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('Logged in with Auth0!');
      this.props.authStore.login(token.idToken, profile);
      Actions.splashscreen();
    });
  }

  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}

export default Login;
