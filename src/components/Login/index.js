import React, { Component } from 'react';
import { View as NativeView, Image } from 'react-native';
import { Container, Content ,View, Button, InputGroup, Icon, Input, Text, List, ListItem, Spinner } from 'native-base';

import { Actions } from 'react-native-router-flux';
import { observer, inject } from 'mobx-react';
import Validator from 'Validator';

import styles from './styles';
import theme from '../../theme';
import logo from'../../assets/img/logo.png';

import api from '../../utils/fetch';

const customTheme = {...theme, 
  get inputColorPlaceholder () {
    return '#FFBBBB';
  },
  get inputColor() {
    return '#FFFFFF';
  },
  get btnPrimaryBg () {
      return '#FFFFFF';
  },
  textColor: '#FFFFFF',
};

const loginRules = {
  email: 'required|email',
  password: 'required'
};

@inject('appStore') @observer
class Login extends Component {
  constructor(...arg) {
    super(...arg);
    this.state = {
      data: {},
      errors: {},
      isLoading: false,
    };
    this.props.appStore.authToken = null;
  }

  onLoginPress = () => {
    const v = Validator.make(this.state.data, loginRules);
    if (v.fails()) {
      const errors = Object.entries(v.getErrors()).reduce((a, [field, errors]) => {
        a[field] = errors[0];
        return a;
      }, {});
      //if (!!errors.email && !!this.state.data.email) this.emailInput._root.focus();
      //else if (!!errors.password && !!this.state.data.password) this.passwordInput._root.focus();
      this.passwordInput._root.clear();
      this.setState({errors});
    } else {
      this.setState({errors: {}});
      this.login(this.state.data);
    }
  }

  async login(data) {
    try {
      this.setState({ isLoading: true });
      const resp = await api('/login', 'POST', data); 
      this.setState({ isLoading: false });
      this.props.appStore.authToken = resp.token;
    } catch (e) {
      this.setState({errors: { main: e.message }});
      this.passwordInput._root.clear();
      this.emailInput._root.focus();
      this.setState({ isLoading: false });
    }
  }

  render() {
    return (
      <View theme={customTheme} style={styles.container}>

        <Image source={logo} style={styles.logo} />

        <List>
          {Object.entries(this.state.errors).map(([k, v]) => <Text key={k}>- {v}</Text>)}
        </List>

        <InputGroup error={!!this.state.errors.email}>
          <Icon name='at' />
          <Input
            ref={r => this.emailInput = r}
            placeholder='Email address'
            keyboardType='email-address'
            returnKeyType='next'
            onChangeText={(email) => this.setState({data: {...this.state.data, email}})}
            onSubmitEditing={() => this.passwordInput._root.focus()}
          />
        </InputGroup>
        <InputGroup error={!!this.state.errors.password}>
            <Icon name='lock' />
            <Input
              ref={r => this.passwordInput = r}
              placeholder='Password'
              secureTextEntry
              onChangeText={(password) => this.setState({ data: {...this.state.data, password}})}
              onSubmitEditing={this.onLoginPress}
            />
        </InputGroup>
        <View style={styles.buttonContainer}>
          <Button color={theme.brandPrimary} block rounded onPress={this.onLoginPress}>
            {!this.state.isLoading ? 
              'Login' :
              <Spinner color={theme.brandPrimary} />
            }
          </Button>
          <Button style={styles.registerButton} block bordered rounded onPress={Actions.register} >
            Register
          </Button>
          <Text style={styles.passwordResetText} onPress={Actions.passwordReset}>Forgot your password ?</Text>
        </View>
      </View>
    );
  }
}

export default Login;
