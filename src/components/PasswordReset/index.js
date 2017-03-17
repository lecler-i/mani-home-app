import React, { Component } from 'react';
import { Image } from 'react-native';
import { View, Button, InputGroup, Icon, Input, Text, List, ListItem, Spinner, H2 } from 'native-base';

import { Actions } from 'react-native-router-flux';
import { inject, observer } from 'mobx-react';
import Validator from 'Validator';

import styles from './styles';
import theme from '../../theme';

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

const passwordResetRules = {
  email: 'required|email',
};

@inject('appStore') @observer
class PasswordReset extends Component {
  constructor(...arg) {
    super(...arg);
    this.state = {
      data: {},
      errors: {},
      isLoading: false,
    };
  }

  onSendPress = () => {
    const v = Validator.make(this.state.data, passwordResetRules);
    if (v.fails()) {
      const errors = Object.entries(v.getErrors()).reduce((a, [field, errors]) => {
        a[field] = errors[0];
        return a;
      }, {});
      this.setState({errors});
    } else {
      this.setState({errors: {}});
      this.passwordReset(this.state.data);
    }
  }

  passwordReset = async (data) => {
    try {
      this.setState({ isLoading: true });
      const resp = await api('/password/email', 'POST', data); 
      this.setState({ isLoading: false, success: true });
    } catch (e) {
      console.log('Error :', e);
      this.setState({errors: { main: e.message }});
      this.emailInput._root.clear();
      this.emailInput._root.focus();
      this.setState({ isLoading: false });
    }
  }

  successRender = () => {
    return (
      <View theme={customTheme} style={styles.container}>
        <Icon style={styles.successIcon} name='check-circle' />
        <Text style={styles.successText}>You will receive an email with a link to reset your password.</Text>
        <Text style={styles.backText} onPress={Actions.pop}>Back to Login</Text>
      </View>
    );
  }

  render() {
    if (!!this.state.success) return this.successRender();

    return (
      <View theme={customTheme} style={styles.container}>
        <H2 style={styles.header}>Password Reset</H2>

        <List>
          {Object.entries(this.state.errors).map(([k, v]) => <Text key={k}>- {v}</Text>)}
        </List>

        <InputGroup error={!!this.state.errors.email}>
          <Icon name='at' />
          <Input
            ref={r => this.emailInput = r}
            placeholder='Email address'
            keyboardType='email-address'
            onChangeText={(email) => this.setState({data: {...this.state.data, email}})}
            onSubmitEditing={this.onSendPress}
          />
        </InputGroup>
        <View style={styles.buttonContainer}>
          <Button color={theme.brandPrimary} block rounded onPress={this.onSendPress}>
            {!this.state.isLoading ? 
              'Send' :
              <Spinner color={theme.brandPrimary} />
            }
          </Button>
          <Text style={styles.backText} onPress={Actions.pop}>Back to Login</Text>
        </View>
      </View>
    );
  }
}

export default PasswordReset;
