import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { inject, observer } from 'mobx-react';
import { Actions } from 'react-native-router-flux';


@observer(['appStore'])
class ProtectedScreenComponent extends Component {
  constructor(...args) {
    super(...args);
    console.log('IN PRO?TECTED', this.props, this.context);
    //if (!this.props.appStore.loggedIn) Actions.auth();
  }
  render() {
    return React.createElement(this.props);
  }
}

export default ProtectedScreenComponent;
