import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Actions } from 'react-native-router-flux';
import { Text, View, ScrollView, TouchableOpacity, Switch } from 'react-native';


import styles from './styles';

import CreateAccommodationScreen from './CreateAccommodationScreen';
import Step2Screen from './Step2Screen';
import MainInfosStep from './MainInfosStep';

@inject('appStore', 'createAccommodationStore') @observer
class CreateAccommodationScreenContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      step: props.createAccommodationStore.currentStep,
      validStep: false,
    };
  }

  onBack() {
    if (this.state.step === 0) {
      Actions.pop();
    } else {
      this.setState({ step: this.state.step - 1 });
    }
  }

  nextStep = () => {
    const { currentStep } = this.props.createAccommodationStore;
    console.log("Current step :", currentStep);
    if (currentStep > this.state.step)
      this.setState({ step: this.state.step + 1 });
  }

  render() {
    const { step } = this.state;
    const accommodation = this.props.createAccommodationStore;
    const stepProps = {
      accommodation,
      step: this.state.step,
    };

    return (
      <ScrollView style={[styles.container]}>
        {step === 1 &&
          <CreateAccommodationScreen {...stepProps} changeContractType={v => accommodation.changeContractType(v)} />
        }{step === 2 &&
          <Step2Screen {...stepProps} changeType={v => accommodation.changeType(v)} />
        }{step === 3 &&
          <MainInfosStep
            {...stepProps}
            changeRoomAvailable={v => accommodation.changeRoomAvailable(v)}
            changeRentPrice={v => accommodation.changeRentPrice(v)}
            changeName={v => accommodation.changeName(v)}
          />
        }
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
