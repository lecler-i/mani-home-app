import React, { Component } from 'react';

import { View, Button, InputGroup, Icon, Input, Text, List, ListItem, Spinner, H2 } from 'native-base';

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

const registerRules = {
  username: 'min:3',
  email: 'required|email',
  password: 'required|min:6',
  phone_number: 'required',
};

@inject('appStore') @observer
class Register extends Component {
  constructor(...arg) {
    super(...arg);
    this.state = {
      data: {
        role: 'employee',
        gender: true,
        country: 'unknown',
        phone_area_code: '00',
      },
      errors: {},
      isLoading: false,
    };
  }

  onRegisterPress = () => {
    const v = Validator.make(this.state.data, registerRules);
    if (v.fails()) {
      this.setState({errors: v.getErrors()});
    } else {
      this.setState({errors: {}});
      this.register(this.state.data);
    }
  }

  async register(data) {
    try {
      this.setState({ isLoading: true });
      const resp = await api('/users', 'POST', data);
      this.setState({ isLoading: false });
      this.props.appStore.authToken = resp.token;
    } catch (err) {
      this.setState({errors: { main: e.message }, isLoading: false});
    }
  }

  render() {
    console.log(this.state);
    return (
      <View theme={customTheme} style={styles.container}>
        <H2 style={styles.header}>Registration</H2>

        <List>
          {Object.entries(this.state.errors).map((v, k) => <Text key={k}>- {v[1][0]}</Text>)}
        </List>

        <InputGroup error={!!this.state.errors.username}>
          <Icon name='user' style={styles.inputIcon} />
          <Input 
            placeholder='Username'
            onChangeText={(username) => this.setState({data: {...this.state.data, username}})}
            onSubmitEditing={() => this.emailInput._root.focus()}
          />
        </InputGroup>
        <InputGroup error={!!this.state.errors.email}>
          <Icon name='at' style={styles.inputIcon} />
          <Input
            ref={r => this.emailInput = r}
            placeholder='Email address'
            keyboardType='email-address'
            onChangeText={(email) => this.setState({data: {...this.state.data, email}})}
            onSubmitEditing={() => this.passwordInput._root.focus()}
          />
        </InputGroup>
        <InputGroup error={!!this.state.errors.password}>
          <Icon name='lock' style={styles.inputIcon} />
          <Input
            ref={r => this.passwordInput = r}
            placeholder='Password'
            secureTextEntry
            onChangeText={(password) => this.setState({ data: {...this.state.data, password}})}
            onSubmitEditing={() => this.phoneInput._root.focus()}
          />
        </InputGroup>
        <InputGroup error={!!this.state.errors.phone_number}>
          <Icon name='phone' style={styles.inputIcon} />
          <Input
            ref={r => this.phoneInput = r}
            placeholder='Phone number'
            keyboardType='phone-pad'
            onChangeText={(phone_number) => this.setState({data: {...this.state.data, phone_number}})}
            onSubmitEditing={this.onRegisterPress}
          />
        </InputGroup>


        <View style={styles.buttonContainer}>
          <Button block rounded color={theme.brandPrimary} onPress={this.onRegisterPress}>
            {!this.state.isLoading ? 
              'Register' :
              <Spinner color={theme.brandPrimary} />
            }
          </Button>
          <Text style={styles.backText} onPress={Actions.pop}>Back to Login</Text>
        </View>
      </View>
    );
  }
}

export default Register;
