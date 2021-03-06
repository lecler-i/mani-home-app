import React, { Component } from 'react'; 
import Drawer from 'react-native-drawer';
import { inject, observer } from 'mobx-react';
import { DefaultRenderer } from 'react-native-router-flux';

import SideMenu from './SideMenu';

@inject('appStore') @observer
class NavigationDrawer extends Component {
  render() {
    const state = this.props.navigationState;
    const children = state.children;

    return (
      <Drawer
        open={this.props.appStore.drawerOpen}
        onOpen={() => (this.props.appStore.drawerOpen = true)}
        onClose={() => (this.props.appStore.drawerOpen = false)}
        type="displace"
        style={drawerStyles}
        content={<SideMenu />}
        tapToClose={true}
        openDrawerOffset={0.3}
        panCloseMask={0.3}
        negotiatePan={true}
        tweenHandler={Drawer.tweenPresets.parallax}
      >
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
      </Drawer>
    );
  }
}

const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: { paddingLeft: 3 },
};

export default NavigationDrawer;
