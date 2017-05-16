import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Actions } from 'react-native-router-flux';
import { Text, View, ScrollView, TouchableOpacity, Switch } from 'react-native';


import styles from './styles';

import CreateAccommodationScreen from './CreateAccommodationScreen';
import Step2Screen from './Step2Screen';

@inject('appStore', 'createAccommodationStore') @observer
class CreateAccommodationScreenContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      step: 1,
    };
  }

  nextStep = () => {
    this.setState({ step: this.state.step + 1 })
  }

  onBack() {
    console.log("GOOOING BACK MOFO");
    if (this.state.step === 0) {
      Actions.pop();
    } else {
      this.setState({ step: this.state.step - 1 })
    } 
  }

  render() {
    let currentStepScreen = null;

    if (this.state.step === 1)
      currentStepScreen = <CreateAccommodationScreen />;
    else if (this.state.step === 2)
      currentStepScreen = <Step2Screen />;

    return (
      <ScrollView style={[styles.container]}>
        {currentStepScreen}
        <TouchableOpacity onPress={this.nextStep} >
        <View style={styles.nextButton}>
          <Text style={styles.nextButtonText} >Next</Text>
        </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

export default CreateAccommodationScreenContainer;
